#!/usr/bin/env bash
# Create scripts/.venv and install the pinned font tooling into it.
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

python3 -m venv "$script_dir/.venv"
"$script_dir/.venv/bin/python" -m pip install --upgrade pip
"$script_dir/.venv/bin/pip" install -r "$script_dir/requirements.txt"
