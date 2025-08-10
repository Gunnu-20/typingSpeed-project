const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes a man perfect every day.",
    "JavaScript is a versatile programming language.",
    "Never stop learning new things in life.",
    "Coding is fun when you solve real problems.",
    "Stay positive, work hard, make it happen.",
    "Success is not final, failure is not fatal.",
    "Believe in yourself and all that you are.",
    "Dream big and dare to fail.",
    "Consistency is the key to success."
];

let currentSentence = "";
let startTime = null;
let endTime = null;

const displaySentence = document.getElementById("display-sentence");
const typedInput = document.getElementById("typed-input");
const submitBtn = document.getElementById("submit-btn");
const reloadBtn = document.getElementById("reload");
const refreshImg = document.getElementById("refresh-btn");
const resultDiv = document.getElementById("result");

// Load a random sentence
function loadSentence(skipCurrent = false) {
    let newSentence = currentSentence;
    if (skipCurrent && sentences.length > 1) {
        while (newSentence === currentSentence) {
            newSentence = sentences[Math.floor(Math.random() * sentences.length)];
        }
    } else {
        newSentence = sentences[Math.floor(Math.random() * sentences.length)];
    }
    currentSentence = newSentence;
    displaySentence.textContent = currentSentence;
    typedInput.value = "";
    resultDiv.innerHTML = "";
    startTime = null;
    endTime = null;
}
loadSentence();

// Start timer on first input
typedInput.addEventListener("input", function() {
    if (!startTime && typedInput.value.length > 0) {
        startTime = new Date();
    }
});

// Submit button logic
submitBtn.onclick = function() {
    const typed = typedInput.value.trim();
    if (typed.length === 0) {
        resultDiv.innerHTML = `<span style="color:#e74c3c;">Please type the sentence!</span>`;
        return;
    }
    endTime = new Date();

    // Calculate time
    let totalMs = endTime - startTime;
    let totalSec = Math.floor(totalMs / 1000);
    let minutes = Math.floor(totalSec / 60);
    let seconds = totalSec % 60;

    // Character & word count
    const chars = typed.length;
    const words = typed.split(/\s+/).filter(w => w.length > 0).length;

    // Mistake highlighting
    const origWords = currentSentence.trim().split(/\s+/);
    const typedWords = typed.split(/\s+/);
    let mistakeCount = 0;
    let mistakeHtml = "";

    for (let i = 0; i < origWords.length; i++) {
        const orig = origWords[i];
        const typedW = typedWords[i] || "";
        if (typedW === orig) {
            mistakeHtml += `<span style="color:green;">${typedW}</span> `;
        } else if (typedW) {
            mistakeHtml += `<span style="color:#e74c3c;">${typedW}</span> `;
            mistakeCount++;
        } else {
            mistakeHtml += `<span style="color:#555;">${orig}</span> `;
            mistakeCount++;
        }
    }
    // Extra words typed
    if (typedWords.length > origWords.length) {
        for (let i = origWords.length; i < typedWords.length; i++) {
            mistakeHtml += `<span style="color:#e74c3c;">${typedWords[i]}</span> `;
            mistakeCount++;
        }
    }

    // Result message
    let resultMsg = "";
    if (typed === currentSentence) {
        resultMsg = `<span style="color:green;">Correct!</span>`;
    } else {
        resultMsg = `<span style="color:#e74c3c;">Incorrect!</span>`;
    }
    resultMsg += `<br>Time: ${minutes} min ${seconds} sec`;
    resultMsg += `<br>Characters: ${chars}`;
    resultMsg += `<br>Words: ${words}`;
    resultMsg += `<br>Mistakes: ${mistakeCount}`;
    resultMsg += `<br><b>Mistake Details:</b><br>${mistakeHtml.trim()}`;

    resultDiv.innerHTML = resultMsg;
};

// Refresh logic (button & image)
function refreshSentence() {
    loadSentence(true);
}
reloadBtn.onclick = refreshSentence;
refreshImg.onclick = refreshSentence;