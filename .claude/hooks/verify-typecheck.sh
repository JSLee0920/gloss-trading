#!/usr/bin/env bash
# Stop hook: typecheck the web app when Claude finishes a turn.
# On failure, emit a decision:"block" JSON so the errors are fed back to the
# model to fix before the turn ends. On success, stay silent (no block).
set -uo pipefail

repo_root="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$repo_root/web" 2>/dev/null || exit 0

out="$(pnpm typecheck 2>&1)"
status=$?

if [ "$status" -ne 0 ]; then
  # Build JSON safely with Node (avoids depending on jq/python on Windows).
  node -e 'process.stdout.write(JSON.stringify({decision:"block",reason:"`pnpm typecheck` failed — fix these TypeScript errors before finishing:\n\n"+process.argv[1]}))' "$out"
fi

exit 0
