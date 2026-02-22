#!/bin/bash
set -euo pipefail

# Only run in remote/web environment
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Install dependencies
npm install

# Start dev server in background if not already running
if ! lsof -i :3000 -t > /dev/null 2>&1; then
  nohup npm run dev > /tmp/nextjs-dev.log 2>&1 &
  echo "Next.js dev server started in background on port 3000"
else
  echo "Dev server already running on port 3000"
fi
