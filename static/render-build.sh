#!/bin/bash

# Install espeak
apt-get update && apt-get install -y espeak-ng


# Continue with default build
pip install -r requirements.txt
