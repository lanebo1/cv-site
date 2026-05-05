#!/usr/bin/env bash
# Export English CV (index.html) to PDF via headless Chrome/Chromium.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${ROOT}/resume/CV_site_en.pdf"
HTML="${ROOT}/index.html"

if [[ ! -f "$HTML" ]]; then
  echo "Missing $HTML" >&2
  exit 1
fi

CHROME=""
for c in google-chrome google-chrome-stable chromium chromium-browser; do
  if command -v "$c" &>/dev/null; then
    CHROME="$c"
    break
  fi
done

if [[ -z "$CHROME" ]]; then
  echo "Install Google Chrome or Chromium, or set CHROME to the browser binary." >&2
  exit 1
fi

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$OUT" \
  "file://${HTML}"

echo "Wrote $(du -h "$OUT" | cut -f1) → $OUT"
