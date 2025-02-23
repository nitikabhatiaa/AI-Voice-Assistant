#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

# Install espeak
apt-get update && apt-get install -y espeak-ng

# Install Python dependencies
pip install --no-cache-dir -r requirements.txt
