# Update package lists and install eSpeak
Invoke-Expression "choco install espeak -y"

# Install dependencies
pip install -r requirements.txt
