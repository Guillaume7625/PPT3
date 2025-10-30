#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_ZIP="${ROOT_DIR}/PowerPointGeneratorPro_v2.2_offline.zip"
OUTPUT_SHA="${OUTPUT_ZIP}.sha256"

if ! command -v zip >/dev/null 2>&1; then
  echo "L'outil 'zip' est requis pour créer le package offline." >&2
  exit 1
fi

rm -f "${OUTPUT_ZIP}" "${OUTPUT_SHA}"

cd "${ROOT_DIR}"

if [[ -x "scripts/verify_offline.sh" ]]; then
  scripts/verify_offline.sh
fi

zip -rq "${OUTPUT_ZIP}" improved -x "*/__MACOSX/*" "*/.DS_Store"

if command -v sha256sum >/dev/null 2>&1; then
  sha256sum "$(basename "${OUTPUT_ZIP}")" > "$(basename "${OUTPUT_SHA}")"
else
  shasum -a 256 "$(basename "${OUTPUT_ZIP}")" > "$(basename "${OUTPUT_SHA}")"
fi

echo "Archive créée : ${OUTPUT_ZIP}"
echo "Somme SHA-256 :"
cat "${OUTPUT_SHA}"
