const output = document.getElementById('output');
const input = document.getElementById('input');

const gameStates = {
    INITIAL: 'initial',
    LOGIN: 'login',
    GAME_SELECTION: 'game_selection',
    PLAYING: 'playing',
    GAME_OVER: 'game_over',
    COUNTRY_SELECTION: 'country_selection',
    STRATEGY_SELECTION: 'strategy_selection'
};

let currentState = gameStates.INITIAL;
let attempts = 0;
const maxAttempts = 3;
let selectedCountry = '';
let selectedStrategy = '';

const games = [
    'FALKEN\'S MAZE',
    'BLACK JACK',
    'GIN RUMMY',
    'HEARTS',
    'BRIDGE',
    'CHECKERS',
    'CHESS',
    'POKER',
    'FIGHTER COMBAT',
    'GUERRILLA ENGAGEMENT',
    'DESERT WARFARE',
    'AIR-TO-GROUND ACTIONS',
    'THEATERWIDE TACTICAL WARFARE',
    'THEATERWIDE BIOTOXIC AND CHEMICAL WARFARE',
    'GLOBAL THERMONUCLEAR WAR'
];

const countries = [
    'UNITED STATES',
    'SOVIET UNION',
    'CHINA',
    'UNITED KINGDOM',
    'FRANCE',
    'WEST GERMANY',
    'EAST GERMANY',
    'JAPAN'
];

const strategies = [
    'FIRST STRIKE',
    'COUNTERFORCE',
    'COUNTERVALUE',
    'MUTUAL ASSURED DESTRUCTION'
];

function typeWriter(text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                output.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                output.innerHTML += '\n';
                resolve();
            }
        }, speed);
    });
}

async function startGame() {
    await typeWriter('WELCOME TO WOPR\n');
    await typeWriter('LOGON: ');
    currentState = gameStates.LOGIN;
}

function handleLogin(command) {
    if (command.toLowerCase() === 'joshua') {
        output.innerHTML += 'GREETINGS PROFESSOR FALKEN\n';
        output.innerHTML += 'SHALL WE PLAY A GAME?\n';
        currentState = gameStates.GAME_SELECTION;
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            output.innerHTML += 'ACCESS DENIED\n';
            output.innerHTML += 'TERMINAL LOCKED\n';
            currentState = gameStates.GAME_OVER;
        } else {
            output.innerHTML += 'ACCESS DENIED\n';
            output.innerHTML += 'LOGON: ';
        }
    }
}

function handleGameSelection(command) {
    const game = command.toUpperCase();
    if (games.includes(game)) {
        if (game === 'GLOBAL THERMONUCLEAR WAR') {
            output.innerHTML += 'WOULDN\'T YOU PREFER A GOOD GAME OF CHESS?\n';
            output.innerHTML += 'A STRANGE GAME. THE ONLY WINNING MOVE IS NOT TO PLAY.\n';
            output.innerHTML += 'HOW ABOUT A NICE GAME OF CHESS?\n';
            currentState = gameStates.GAME_OVER;
        } else {
            output.innerHTML += `A STRANGE GAME. THE ONLY WINNING MOVE IS NOT TO PLAY.\n`;
            output.innerHTML += 'HOW ABOUT A NICE GAME OF CHESS?\n';
            currentState = gameStates.GAME_OVER;
        }
    } else {
        output.innerHTML += 'INVALID GAME\n';
        output.innerHTML += 'AVAILABLE GAMES:\n';
        games.forEach(g => output.innerHTML += g + '\n');
    }
}

function handleCountrySelection(command) {
    const country = command.toUpperCase();
    if (countries.includes(country)) {
        selectedCountry = country;
        output.innerHTML += `SELECTED: ${country}\n`;
        output.innerHTML += 'SELECT STRATEGY:\n';
        strategies.forEach(s => output.innerHTML += s + '\n');
        currentState = gameStates.STRATEGY_SELECTION;
    } else {
        output.innerHTML += 'INVALID COUNTRY\n';
        output.innerHTML += 'AVAILABLE COUNTRIES:\n';
        countries.forEach(c => output.innerHTML += c + '\n');
    }
}

function handleStrategySelection(command) {
    const strategy = command.toUpperCase();
    if (strategies.includes(strategy)) {
        selectedStrategy = strategy;
        output.innerHTML += `SELECTED: ${strategy}\n`;
        output.innerHTML += 'INITIATING GLOBAL THERMONUCLEAR WAR...\n';
        
        // Симуляция запуска ракет
        setTimeout(() => {
            output.innerHTML += 'LAUNCHING MISSILES...\n';
            output.innerHTML += 'TARGETS ACQUIRED...\n';
            output.innerHTML += 'MISSILES INBOUND...\n';
            output.innerHTML += 'ESTIMATED CASUALTIES: 1,000,000,000+\n';
            output.innerHTML += 'ESTIMATED DESTRUCTION: 99.9%\n';
            output.innerHTML += 'GAME OVER\n';
            output.innerHTML += 'A STRANGE GAME. THE ONLY WINNING MOVE IS NOT TO PLAY.\n';
            currentState = gameStates.GAME_OVER;
        }, 2000);
    } else {
        output.innerHTML += 'INVALID STRATEGY\n';
        output.innerHTML += 'AVAILABLE STRATEGIES:\n';
        strategies.forEach(s => output.innerHTML += s + '\n');
    }
}

input.addEventListener('keypress', async function(e) {
    if (e.key === 'Enter') {
        const command = input.value;
        output.innerHTML += command + '\n';
        input.value = '';

        switch (currentState) {
            case gameStates.INITIAL:
                await startGame();
                break;
            case gameStates.LOGIN:
                handleLogin(command);
                break;
            case gameStates.GAME_SELECTION:
                if (command.toUpperCase() === 'GLOBAL THERMONUCLEAR WAR') {
                    output.innerHTML += 'SELECT COUNTRY:\n';
                    countries.forEach(c => output.innerHTML += c + '\n');
                    currentState = gameStates.COUNTRY_SELECTION;
                } else {
                    handleGameSelection(command);
                }
                break;
            case gameStates.COUNTRY_SELECTION:
                handleCountrySelection(command);
                break;
            case gameStates.STRATEGY_SELECTION:
                handleStrategySelection(command);
                break;
            case gameStates.GAME_OVER:
                output.innerHTML += 'GAME OVER\n';
                break;
        }
    }
});

// Начинаем игру
startGame();
