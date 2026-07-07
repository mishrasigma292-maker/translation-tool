const fromText = document.getElementById("from-text");
const toText = document.getElementById("to-text");
const selectSource = document.getElementById("source-lang");
const selectTarget = document.getElementById("target-lang");
const translateBtn = document.getElementById("translate-btn");

// 1. Translation API Logic
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    let translateFrom = selectSource.value;
    let translateTo = selectTarget.value;

    if (!text) return;

    toText.setAttribute("placeholder", "Translating...");
    
    // Using MyMemory Free Translation API
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
            toText.setAttribute("placeholder", "Translation will appear here...");
        })
        .catch(error => {
            console.error("Error fetching translation:", error);
            toText.value = "Error: Could not translate text.";
        });
});

// 2. Optional Feature: Copy to Clipboard
document.getElementById("copy-from").addEventListener("click", () => {
    navigator.clipboard.writeText(fromText.value);
    alert("Source text copied!");
});

document.getElementById("copy-to").addEventListener("click", () => {
    navigator.clipboard.writeText(toText.value);
    alert("Translated text copied!");
});

// 3. Optional Feature: Text-to-Speech (Web Speech API)
function speakText(text, lang) {
    if (!text) return;
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
}

document.getElementById("speech-from").addEventListener("click", () => {
    speakText(fromText.value, selectSource.value);
});

document.getElementById("speech-to").addEventListener("click", () => {
    speakText(toText.value, selectTarget.value);
});