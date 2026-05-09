#!/usr/bin/env bash
# Export CV pages (index.html / index-ru.html) to PDF via headless Chrome.
# Usage: ./scripts/export-site-pdf.sh          # both EN + RU
#        ./scripts/export-site-pdf.sh en      # English only
#        ./scripts/export-site-pdf.sh ru      # Russian only
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RESUME="${ROOT}/resume"
mkdir -p "$RESUME"

resolve_chrome() {
  local c p

  if [[ -n "${CHROME:-}" ]]; then
    if [[ -f "$CHROME" ]] || command -v "$CHROME" &>/dev/null; then
      printf '%s' "$CHROME"
      return 0
    fi
  fi

  for c in google-chrome google-chrome-stable chromium chromium-browser microsoft-edge-stable edge; do
    if command -v "$c" &>/dev/null; then
      printf '%s' "$c"
      return 0
    fi
  done

  for p in \
    "/c/Program Files/Google/Chrome/Application/chrome.exe" \
    "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" \
    "${PROGRAMFILES:-}/Google/Chrome/Application/chrome.exe"
  do
    [[ -z "$p" ]] && continue
    if [[ -f "$p" ]]; then
      printf '%s' "$p"
      return 0
    fi
  done

  if [[ -n "${LOCALAPPDATA:-}" ]]; then
    p="${LOCALAPPDATA}/Google/Chrome/Application/chrome.exe"
    if [[ -f "$p" ]]; then
      printf '%s' "$p"
      return 0
    fi
  fi

  for p in \
    "/c/Program Files/Chromium/Application/chrome.exe" \
    "${LOCALAPPDATA:-}/Chromium/Application/chrome.exe"
  do
    [[ -z "$p" ]] && continue
    if [[ -f "$p" ]]; then
      printf '%s' "$p"
      return 0
    fi
  done

  return 1
}

export_one() {
  local html_name="$1" pdf_name="$2"
  local html="${ROOT}/${html_name}"
  local out="${RESUME}/${pdf_name}"

  if [[ ! -f "$html" ]]; then
    echo "Skip: missing $html" >&2
    return 1
  fi

  echo "→ $pdf_name ← $html_name"
  "$CHROME_BIN" \
    --headless=new \
    --disable-gpu \
    --no-pdf-header-footer \
    --print-to-pdf="$out" \
    "file://${html}"

  echo "  wrote $(du -h "$out" | cut -f1) $out"
}

CHROME_BIN="$(resolve_chrome)" || true
if [[ -z "${CHROME_BIN:-}" ]]; then
  echo "Chrome/Chromium not found. Install Chrome or set CHROME to chrome.exe" >&2
  echo "Example: export CHROME=\"/c/Program Files/Google/Chrome/Application/chrome.exe\"" >&2
  exit 1
fi

MODE="${1:-all}"
case "$MODE" in
  en|EN)
    export_one index.html CV_site_en.pdf
    ;;
  ru|RU)
    export_one index-ru.html CV_site_ru.pdf
    ;;
  all|both|"")
    export_one index.html CV_site_en.pdf
    export_one index-ru.html CV_site_ru.pdf
    ;;
  *)
    echo "Usage: $0 [en|ru|all]" >&2
    exit 1
    ;;
esac

echo Done.
