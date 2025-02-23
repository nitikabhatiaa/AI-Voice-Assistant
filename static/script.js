document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const userOutput = document.getElementById("user-output");
    const assistantOutput = document.getElementById("assistant-output");

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    startBtn.addEventListener("click", () => {
        recognition.start();
    });

    recognition.onresult = (event) => {
        const userText = event.results[0][0].transcript;
        userOutput.textContent = "You said: " + userText;
        getAssistantResponse(userText);
    };

    function getAssistantResponse(text) {
        // Replace this with actual AI response logic
        let response = "I heard you say: " + text; // Placeholder response

        assistantOutput.textContent = response; // Display assistant's response
        speak(response);
    }

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
});
