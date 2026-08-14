#!/usr/bin/env python3
"""Inline a certificate's artwork master before Chromium renders it.

Exhibit A reproduces the assigned logo. The print master is not committed as
markup, so the source HTML carries only a pointer:

    <div class="plate" data-artwork="clients/<slug>/<name>">

This reads that pointer, looks for <repo>/<pointer>.{png,jpg,jpeg}, and if the
file is there replaces the placeholder inside the plate with an <img> holding
the file as a data URI. If it is not there the placeholder is left alone and
the caller is told. Either way the result goes to stdout.

Inlined rather than linked because the rendered PDF has to be a single file a
client can be sent, and because a <img src="file://..."> that silently fails to
load would produce a certificate with an empty black panel and no complaint.

Usage: inline-artwork.py <source.html> <repo-root>
Exits non-zero only on a real problem - a missing master is a normal state and
reports on stderr while still emitting usable HTML.
"""

import base64
import pathlib
import re
import sys

EXTENSIONS = (".png", ".jpg", ".jpeg")
MIME = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg"}

# The plate opening tag, its pointer, and the placeholder block it wraps.
PLATE = re.compile(
    r'(<div class="plate" data-artwork="(?P<ref>[^"]+)">)'
    r'\s*(?P<placeholder><div class="plate-pending">.*?</div>)\s*'
    r'(?=</div>)',
    re.DOTALL,
)


def has_alpha(path, data):
    """True if the file carries an alpha channel.

    Only PNG is inspected: JPEG has no alpha to find. Byte 25 of a PNG is the
    IHDR colour type, and types 4 (grey+alpha) and 6 (RGBA) are the ones that
    become a soft mask in the exported PDF.
    """
    if path.suffix.lower() != ".png" or len(data) < 26:
        return False
    return data[25] in (4, 6)


def main():
    if len(sys.argv) != 3:
        print(__doc__, file=sys.stderr)
        return 2

    source = pathlib.Path(sys.argv[1])
    root = pathlib.Path(sys.argv[2])
    html = source.read_text(encoding="utf-8")

    match = PLATE.search(html)
    if not match:
        # A certificate with no artwork plate is fine - the sample has none.
        sys.stdout.write(html)
        return 0

    ref = match.group("ref")
    found = next((p for e in EXTENSIONS if (p := root / (ref + e)).is_file()), None)

    if found is None:
        print(
            f"  artwork:             none at {ref}.{{png,jpg,jpeg}} - placeholder kept",
            file=sys.stderr,
        )
        sys.stdout.write(html)
        return 0

    data = found.read_bytes()
    if has_alpha(found, data):
        print(
            f"\nERROR: {found} has an alpha channel.\n"
            "The transparency exports as a soft mask and will fail the render cost\n"
            "guard. Flatten it onto the black plate colour (#0b0b0d) and re-run:\n"
            f"  magick {found} -background '#0b0b0d' -alpha remove -alpha off {found}",
            file=sys.stderr,
        )
        return 1

    uri = f"data:{MIME[found.suffix.lower()]};base64,{base64.b64encode(data).decode()}"
    img = f'<img src="{uri}" alt="Revelation Ministries composite logo" />'

    html = html[: match.start("placeholder")] + img + html[match.end("placeholder") :]
    print(f"  artwork:             {found.name} inlined ({len(data) // 1024} KB)", file=sys.stderr)
    sys.stdout.write(html)
    return 0


if __name__ == "__main__":
    sys.exit(main())
