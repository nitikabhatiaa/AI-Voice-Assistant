const button = document.getElementById("start-btn");
const output = document.getElementById("output");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    output.textContent = "Listening...";
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    output.textContent = "You said: " + transcript;
    
    // Send the transcript to Flask backend
    fetch('/process_command', {
        method: 'POST',
        body: JSON.stringify({ text: transcript }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        speakResponse(data.response);
    });
};

button.addEventListener("click", () => {
    recognition.start();
});

function speakResponse(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
