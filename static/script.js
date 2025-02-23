const button = document.getElementById("start-btn");
const output = document.getElementById("output");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    output.textContent = "Listening... 🎤";
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    output.textContent = "You said: " + transcript;
    
    // Check if "open YouTube" was spoken and open YouTube directly from JavaScript
    if (transcript.toLowerCase().includes("open youtube")) {
        output.textContent += "\nOpening YouTube...";
        window.open("https://www.youtube.com", "_blank");  // ✅ Opens in a new tab
        return;
    }

    // Send the command to Flask backend
    fetch("https://ai-voice-assistant-2x3x.onrender.com/process_command", {
        method: "POST",
        body: JSON.stringify({ command: transcript }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        output.textContent += "\nAI: " + data.response;
        speakResponse(data.response);
    })
    .catch(error => {
        console.error("Error:", error);
        output.textContent = "Error connecting to backend!";
    });
};

button.addEventListener("click", () => {
    recognition.start();
});

// Convert assistant's response into speech
function speakResponse(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
