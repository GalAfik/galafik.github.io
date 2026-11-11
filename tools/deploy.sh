#!/usr/bin/env bash
# Deploy every site in dist/ (run tools/build.py first) plus Flamingo Fury.
# Needs a logged-in Netlify CLI (npx netlify-cli login).
set -euo pipefail
cd "$(dirname "$0")/.."
deploy() { npx -y netlify-cli@latest deploy --prod --no-build --dir "$2" --site "$1" --message "${3:-deploy}" | grep -E "Deployed to production|Error" || true; }
deploy c070cae9-8e3d-4efa-9a80-148768f6e6fd dist/galafik
deploy 965ebf7d-5831-4071-8895-6a6839115d77 dist/expense-tracker
deploy b2149e21-9b9c-4613-9194-fbfe7913495b dist/job-search-tracker
deploy 78278236-9ef8-4a2c-b736-f24588640f1c dist/littlefreewebsite
deploy f2ce8684-9ef9-4829-b8bf-86da8f314026 dist/ronirosenthal
# Flamingo Fury lives in its own repo, next to this one.
deploy b7d53f2a-a280-4cd0-8141-507882271fed ../GnomeLife
