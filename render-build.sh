#!/bin/bash

# Make script executable (in case it's needed)
chmod +x render-build.sh

# Install espeak
apt-get update && apt-get install -y espeak

# Install dependencies
pip install -r requirements.txt
