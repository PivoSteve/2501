export function displayOutput(input, output) {
    saveToLocalStorage();

    const terminalOutput = document.getElementById('terminal-output');
    const checked = document.getElementById("prompt-checkbox").checked;
    const prompt = document.getElementById("prompt").value;

    if (input) {
        if (checked) {
            terminalOutput.innerHTML += `<p class="terminal-output-text">${prompt} ${input}</p>`;
        } else {
            terminalOutput.innerHTML += `<p class="terminal-output-text">~ ${input}</p>`;
        }
    }
    terminalOutput.innerHTML += `<p class="terminal-output-text">${output}</p>`;
}

function saveToLocalStorage() {
    var checkbox = document.getElementById("prompt-checkbox");
    var prompt = document.getElementById("prompt").value;
    localStorage.setItem("promptCheckbox", checkbox.checked);
    localStorage.setItem("promptText", prompt);
}

function loadFromLocalStorage() {
    var checkbox = document.getElementById("prompt-checkbox");
    var prompt = document.getElementById("prompt");
    checkbox.checked = localStorage.getItem("promptCheckbox") === "true";
    prompt.value = localStorage.getItem("promptText") || "";
}

window.onload = loadFromLocalStorage;
