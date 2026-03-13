#!/usr/bin/env bash
set -euo pipefail

# ========================================
# Deploy script for portfolio
# Builds the Hugo site and rsyncs to VPS
# ========================================

# --- Configuration ---
REMOTE_USER="ec2-user"
REMOTE_HOST="15.207.111.73"
REMOTE_PATH="/var/www/portfolio"
SSH_KEY="$HOME/.ssh/personal_aws.pem"
# ----------------------

echo "Building site..."
hugo --minify

echo "Deploying to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}..."
rsync -avz --delete -e "ssh -i ${SSH_KEY}" public/ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "Done! Site deployed."
