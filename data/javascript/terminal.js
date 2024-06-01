import './pseudoterminal/buttons.js';
import { handleCommand } from './pseudoterminal/commandHandler.js';
import { displayOutput } from './pseudoterminal/displayHandler.js';

document.addEventListener('DOMContentLoaded', function () {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    document.getElementById('terminal-submit-button').addEventListener('click', function () {
        const command = terminalInput.value.trim();
        if (command !== '') {
            handleCommand(command, displayOutput, terminalInput, terminalOutput);
        }
    });

    terminalInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim();
            if (command !== '') {
                handleCommand(command, displayOutput, terminalInput, terminalOutput);
            }
        }
    });
});
