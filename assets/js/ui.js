/*
=========================================================
UI
=========================================================

Responsabilidades:
- Mostrar pantallas.
- Pintar tablero.
- Actualizar marcador.
- Pintar rankings.
- Refrescar la interfaz.

No contiene:
- Lógica de puntuación.
- Persistencia.
- Reglas del juego.
*/

/*
=========================================================
ELEMENTOS DOM
=========================================================
*/

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const board = document.getElementById('board');
const difficultyValue = document.getElementById('difficulty-value');
const scoreValue = document.getElementById('score-value');
const attemptsValue = document.getElementById('attempts-value');
const finalScore = document.getElementById('final-score');
const menuScoresContainer = document.getElementById('menu-scores-container');
const resultsScoresContainer = document.getElementById('results-scores-container');

/*
=========================================================
PANTALLAS
=========================================================
*/

function hideAllScreens() {
    const screens = [
        menuScreen,
        gameScreen,
        resultsScreen
    ];

    screens.forEach(screen => {
        screen.classList.remove('active-screen');

        screen.hidden = true;
    });
}

function showMenuScreen() {
    hideAllScreens();

    menuScreen.hidden = false;

    menuScreen.classList.add('active-screen');

    State.setScreen(State.SCREENS.MENU);
}

function showGameScreen() {
    hideAllScreens();

    gameScreen.hidden = false;

    gameScreen.classList.add('active-screen');

    State.setScreen(State.SCREENS.GAME);
}

function showResultsScreen() {
    hideAllScreens();

    resultsScreen.hidden = false;

    resultsScreen.classList.add('active-screen');

    State.setScreen(State.SCREENS.RESULTS);

    renderFinalScore();
}

/*
=========================================================
DIFICULTAD
=========================================================
*/

function formatDifficulty(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 'Fácil';

        case 'medium':
            return 'Media';

        case 'hard':
            return 'Difícil';

        default:
            return '-';
    }
}

function updateDifficulty() {
    difficultyValue.textContent = formatDifficulty(State.getDifficulty());
}

/*
=========================================================
MARCADOR
=========================================================
*/

function updateGameStats() {
    const stats = Scoreboard.getGameStats();

    scoreValue.textContent = `${stats.score} %`;

    attemptsValue.textContent = stats.flippedPairs;
}

function renderFinalScore() {
    finalScore.textContent = `${Scoreboard.getCurrentScore()} %`;
}

/*
=========================================================
TABLERO
=========================================================
*/

function getBoardColumns(cardCount) {
    if (cardCount <= 8) {
        return 4;
    }

    if (cardCount <= 30) {
        return 6;
    }

    return 8;
}

function createCardElement(card) {
    const cardElement = document.createElement('button');
    cardElement.type = 'button';
    cardElement.classList.add('card');
    cardElement.dataset.instanceId = card.instanceId;
    cardElement.dataset.pairId = card.pairId;
    cardElement.setAttribute('aria-label', card.description);

    if (card.flipped) cardElement.classList.add('card-flipped');
    if (card.matched) cardElement.classList.add('card-matched', 'card-disabled');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = card.content;

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    cardElement.appendChild(cardInner);

    return cardElement;
}

function renderBoard(cards) {
    // Si el tablero está vacío, lo inicializamos una sola vez
    if (board.children.length === 0) {
        board.style.gridTemplateColumns = `repeat(${getBoardColumns(cards.length)}, 1fr)`;
        cards.forEach(card => {
            board.appendChild(createCardElement(card));
        });
        return;
    }

    // Si ya existen las cartas, solo actualizamos las clases visuales sin destruir el DOM
    cards.forEach(card => {
        const cardElement = board.querySelector(`[data-instance-id="${card.instanceId}"]`);
        if (cardElement) {
            if (card.flipped) {
                cardElement.classList.add('card-flipped');
            } else {
                cardElement.classList.remove('card-flipped');
            }

            if (card.matched) {
                cardElement.classList.add('card-matched', 'card-disabled');
            } else {
                cardElement.classList.remove('card-matched', 'card-disabled');
            }
        }
    });
}

/*
=========================================================
REFRESH GENERAL
=========================================================
*/

function refreshGameUI() {
    updateDifficulty();
    updateGameStats();
    renderBoard(
        State.getState().cards
    );
}

/*
=========================================================
EXPOSICIÓN GLOBAL
=========================================================
*/

window.UI = {
    showMenuScreen,
    showGameScreen,
    showResultsScreen,

    updateDifficulty,
    updateGameStats,

    renderFinalScore,
    renderBoard,

    refreshGameUI
};