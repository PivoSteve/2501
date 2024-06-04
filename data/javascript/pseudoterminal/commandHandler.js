export function handleCommand(command, displayOutput, terminalInput, terminalOutput) {
    const commandParts = command.split(' ');
    const commandName = commandParts[0];
    const commandArgs = commandParts.slice(1);

    switch (commandName) {
        case 'help':
            showHelp(displayOutput);
            break;
        case 'neofetch':
            displayOutput(command, neofetch());
            break;
        case 'clear':
            clearTerminal(terminalOutput);
            break;
        case 'echo':
            displayOutput(command, commandArgs.join(' '));
            break;
        case 'date':
            displayOutput(command, new Date().toLocaleString());
            break;
        case 'exit':
            displayOutput(command, 'Exiting terminal...');
            setTimeout(() => {
                document.querySelector('body').classList.add('hidden');
                setTimeout(function() { location.reload(); }, 300);
            }, 1000);
            break;
        case 'hostname':
            displayOutput(command, window.location.hostname);
            break;
        case 'calc':
            displayOutput(command, calculate(commandArgs.join('')));
            break;
        case 'who':
            displayOutput(command, `${getUser()}&nbsp;&nbsp;&nbsp;&nbsp;pseudo&nbsp;&nbsp;&nbsp;&nbsp;${new Date().toLocaleString()}`);
            break;
        case 'reverse':
            displayOutput(command, commandArgs.join(' ').split('').reverse().join(''));
            break;
        case 'random':
            displayOutput(command, getRandomInt(commandArgs));
            break;
        case 'for':
            handleForLoop(commandArgs, displayOutput);
            break;
        default:
            displayOutput(command, `Command not found: ${command}`);
    }

    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function showHelp(displayOutput) {
    const commandsList = [
        'help - Display this help message',
        'clear - Clear terminal session',
        'echo [text] - Display text',
        'date - Display current date and time',
        'exit - Close the terminal session',
        'hostname - Display the hostname',
        'calc [expression] - Command-line calculator',
        'who - Display who is logged in',
        'reverse [text] - Reverse the given text',
        'random [min] [max] - Display a random integer between min and max',
        'for [n]: [command] - Execute a command n times'
    ];
    displayOutput('help', commandsList.join('<br>'));
}

function clearTerminal(terminalOutput) {
    terminalOutput.innerHTML = '';
}

function calculate(args) {
    const operators = ['+', '-', '*', '/'];
    let currentOperator = '';
    let currentNumber = '';
    const numbers = [];
    
    for (let char of args) {
        if (operators.includes(char)) {
            if (currentNumber !== '') {
                numbers.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            currentOperator = char;
        } else {
            currentNumber += char;
        }
    }
    
    if (currentNumber !== '') {
        numbers.push(parseFloat(currentNumber));
    }
    
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        switch (currentOperator) {
            case '+':
                result += numbers[i];
                break;
            case '-':
                result -= numbers[i];
                break;
            case '*':
                result *= numbers[i];
                break;
            case '/':
                result /= numbers[i];
                break;
        }
    }
    
    return result;
}

function getRandomInt(args) {
    let min = parseInt(args[0], 10);
    let max = parseInt(args[1], 10);

    if (isNaN(min)) min = 0;
    if (isNaN(max)) max = 100;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleForLoop(args, displayOutput) {
    const [iterations, ...commandParts] = args.join(' ').split(':');
    const command = commandParts.join(':').trim();
    const count = parseInt(iterations.trim(), 10);

    if (isNaN(count)) {
        displayOutput(`for ${iterations}: ${command}`, 'Error: Invalid iteration count');
        return;
    }

    displayOutput(`for ${count}: ${command}`, '');
    for (let i = 0; i < count; i++) {
        const [cmdName, ...cmdArgs] = command.split(' ');
        const cmdResult = executeCommand(cmdName, cmdArgs);
        displayOutput('', cmdResult);
    }
}

function executeCommand(commandName, commandArgs) {
    switch (commandName) {
        case 'help':
            return "You cannot use 'help' in this way";
        case 'neofetch':
            return neofetch();
        case 'exit':
            return "You cannot use 'exit' in this way";
        case 'calc':
            return calculate(commandArgs.join(''));
        case 'who':
            return `user1     console     ${new Date().toLocaleString()}`;
        case 'date':
            return new Date().toLocaleString();
        case 'hostname':
            return window.location.hostname;
        case 'random':
            return getRandomInt(commandArgs);
        case 'for':
            return "You cannot use 'for' in this way";
        case 'reverse':
            return commandArgs.join(' ').split('').reverse().join('');
        case 'echo':
            return commandArgs.join(' ');
        default:
            return `Command not found: ${commandName}`;
    }
}

function neofetch() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const systemInfo = [
        `${getUser()}@PseudoTerminal`,
        '------------------',
        'OS: PseudoTerminal',
        `Host: ${window.location.hostname + location.pathname}`,
        'Kernel: 10.0.19044.0',
        `Uptime: ${getUptime()}`,
        'Shell: pseudo',
        `Resolution: ${screenWidth}x${screenHeight}`,
        `Terminal: PseudoTerminal`,
        `Disk: 20MiB / 20MiB (100%)`,
    ];

    return systemInfo.join('<br>');
}

function getUser() {
    if (localStorage.getItem('logined') === "true") {
        return localStorage.getItem('username');
    } else {
        return 'user1';
    }
}

function getUptime() {
    const now = Date.now();
    const seconds = Math.floor((now - performance.timing.navigationStart) / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${days} days ${hours} hours ${minutes} minutes ${remainingSeconds} seconds`;
}