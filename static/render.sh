notepad render-build.sh
#!/bin/bash

# Install espeak
apt-get update && apt-get install -y espeak

# Continue with default build
pip install -r requirements.txt
