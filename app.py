from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # ✅ Import CORS at the top
import pyttsx3
import datetime
import webbrowser
import wikipedia
import random
import requests

app = Flask(__name__)  # ✅ Define Flask app first
CORS(app)  # ✅ Move this below app initialization

# Initialize the speech engine
engine = pyttsx3.init()
engine.setProperty("rate", 150)

# Rest of your code...

def speak(text):
    """Convert text to speech."""
    engine.say(text)
    engine.runAndWait()

@app.route("/")
def home():
    """Render the main UI."""
    return render_template("index.html")

@app.route("/process_command", methods=["POST"])
def process_command():
    data = request.get_json() 
    command = data.get("command", "").lower()
    
    response = "Sorry, I didn't understand that."

    if "time" in command:
        response = datetime.datetime.now().strftime("The time is %H:%M")
    elif "open youtube" in command:
        webbrowser.open("https://www.youtube.com")
        response = "Opening YouTube"
    elif "search wikipedia for" in command:
        query = command.replace("search wikipedia for", "").strip()
        try:
            response = wikipedia.summary(query, sentences=2)
        except wikipedia.exceptions.DisambiguationError:
            response = "There are multiple results. Be more specific."
        except wikipedia.exceptions.PageError:
            response = "No matching results found."
    elif "joke" in command:
        jokes = [
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "Why don’t skeletons fight each other? They don’t have the guts.",
            "What do you call fake spaghetti? An impasta!"
        ]
        response = random.choice(jokes)
    elif "weather in" in command:
        city = command.replace("weather in", "").strip()
        response = get_weather(city)
    elif "exit" in command or "quit" in command:
        response = "Goodbye!"

    speak(response)
    return jsonify({"response": response})

def get_weather(city):
    """Fetch weather information for a given city."""
    api_key = "1066332d442715c3c912950d575728d5"  # Replace with your real API key
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url).json()
    
    if response.get("cod") != 200:
        return "City not found. Try again."
    
    temp = response["main"]["temp"]
    weather = response["weather"][0]["description"]
    return f"The current temperature in {city} is {temp}°C with {weather}."

if __name__ == "__main__":
    app.run(port=8080, debug=True)

