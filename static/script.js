const button = document.getElementById("start-btn");
const output = document.getElementById("output");

// Set up Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;  // Change to `true` if you want continuous listening

recognition.onstart = function() {
    output.textContent = "Listening...";
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    output.textContent = "You said: " + transcript;
    
    // Send the transcript to Flask backend on Render
    fetch("https://ai-voice-assistant-2x3x.onrender.com/process_command", {  // ✅ Fixed URL
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ command: transcript })  // ✅ Ensure proper formatting
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data);  // ✅ Log response for debugging
        speakResponse(data.response);
    })
    .catch(error => {
        console.error("Error:", error);
        output.textContent = "Error connecting to backend!";
    });
};

// Start recognition on button click
button.addEventListener("click", () => {
    recognition.start();
});

// Function to convert text response to speech
function speakResponse(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
