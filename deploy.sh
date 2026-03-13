#!/usr/bin/env bash
set -euo pipefail

# ========================================
# Deploy script for portfolio
# Builds the Hugo site and rsyncs to VPS
# ========================================

# --- Configuration (edit these) ---
REMOTE_USER="your-user"
REMOTE_HOST="your-server.com"
REMOTE_PATH="/var/www/portfolio"
# ----------------------------------

echo "Building site..."
hugo --minify

echo "Deploying to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}..."
rsync -avz --delete public/ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "Done! Site deployed."
