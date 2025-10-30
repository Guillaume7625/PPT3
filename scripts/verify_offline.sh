#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HTML_FILE="${ROOT_DIR}/improved/index-improved.html"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js est requis pour exécuter la suite de tests offline." >&2
  exit 1
fi

if grep -nE '(^|\s)on[a-z]+\s*=' "${HTML_FILE}"; then
  echo "Des gestionnaires inline subsistent dans improved/index-improved.html" >&2
  exit 1
fi

if grep -n 'style="' "${HTML_FILE}"; then
  echo "Des styles inline subsistent dans improved/index-improved.html" >&2
  exit 1
fi

cd "${ROOT_DIR}"
node tests/run-tests.js
