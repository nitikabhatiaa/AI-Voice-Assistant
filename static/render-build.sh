#!/bin/bash
set -e  # Stop script on first error

# Install espeak-ng system package (alternative to espeak)
apt-get update && apt-get install -y espeak-ng

# Install Python dependencies
pip install --no-cache-dir -r requirements.txt
