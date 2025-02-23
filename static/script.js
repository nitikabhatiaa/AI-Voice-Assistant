const button = document.getElementById("start-btn");
const output = document.getElementById("output");

// Set up Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    output.textContent = "Listening...";
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    output.textContent = "You said: " + transcript;
    
    // Send the transcript to Flask backend on Render
    fetch("https://ai-voice-assistant-2x3x.onrender.com/process_command", {  // ✅ Updated URL
        method: "POST",
        body: JSON.stringify({ command: transcript }),  // ✅ Updated key to match Flask
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
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
