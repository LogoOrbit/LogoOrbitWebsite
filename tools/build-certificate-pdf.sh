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
