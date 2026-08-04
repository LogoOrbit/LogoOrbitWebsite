#!/usr/bin/env bash
# Renders tools/certificate-sample.html to the public specimen PDF.
#
# Chromium is the renderer so the file is printed from the same CSS the
# /copyright-certificate page uses on screen — the specimen and the preview
# cannot drift apart if they are drawn from the same declarations.
#
#   CHROME=/path/to/chrome tools/build-certificate-pdf.sh

set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out="$root/public/documents/logoorbit-sample-copyright-assignment-certificate.pdf"

chrome="${CHROME:-}"
if [ -z "$chrome" ]; then
  for candidate in \
    /opt/pw-browsers/chromium-*/chrome-linux/chrome \
    "$(command -v google-chrome || true)" \
    "$(command -v chromium || true)"; do
    if [ -x "$candidate" ]; then chrome="$candidate"; break; fi
  done
fi

if [ -z "$chrome" ]; then
  echo "No Chromium binary found. Set CHROME=/path/to/chrome." >&2
  exit 1
fi

"$chrome" \
  --headless \
  --disable-gpu \
  --no-sandbox \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=5000 \
  --print-to-pdf="$out" \
  "file://$root/tools/certificate-sample.html"

echo "Wrote $out"

# Cost guard.
#
# This is a four-page text document that people download and open on a phone.
# It once took ~2s to draw the first page, because Chromium turns a handful of
# innocuous CSS declarations into per-page compositing work: alpha of any kind
# becomes a transparency group, a repeating gradient becomes a tiling pattern
# stroked across the whole page box, and a gradient behind a border-radius
# becomes a raster tile. certificate-sample.html is written to avoid all three
# — every colour in it is pre-composited onto the #fbf8f1 stock.
#
# The counts below are what that discipline looks like in the output. If a
# change to the print source pushes them up, the specimen has started
# collecting compositing work again; flatten the paint rather than raising the
# budget. See the comments in certificate-sample.html.
# grep exits 1 on no matches, which is the result we are hoping for, so it must
# not trip the pipefail set at the top of the script.
count() { { LC_ALL=C grep -a -o -- "$1" "$out" || true; } | wc -l | tr -d ' '; }
groups=$(count '/S /Transparency')
smasks=$(count '/SMask')
tiles=$(count '/PatternType 1')

echo "  transparency groups: $groups (budget 0)"
echo "  soft masks:          $smasks (budget 0)"
echo "  tiling patterns:     $tiles (budget 1 — the stock strip)"

if [ "$groups" -gt 0 ] || [ "$smasks" -gt 0 ] || [ "$tiles" -gt 1 ]; then
  echo "" >&2
  echo "WARNING: the specimen is over its rendering budget — it will be slow to" >&2
  echo "open. Look for rgba()/opacity, repeating gradients, or a gradient or" >&2
  echo "dashed border sitting on a border-radius, and flatten it." >&2
  exit 1
fi
