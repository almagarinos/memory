/*
=========================================================
APP
=========================================================

Punto de entrada de la aplicación.

Responsabilidades:
- Inicialización.
- Gestión de eventos.
- Flujo principal del juego.
- Coordinación entre módulos.

No contiene:
- Renderizado complejo.
- Persistencia directa.
- Cálculos de puntuación.
*/

/*
=========================================================
CONFIGURACIÓN
=========================================================
*/

const FLIP_DELAY = 1000;
let boardLocked = false;

/*
=========================================================
HELPERS
=========================================================
*/

function getCardByInstanceId(instanceId) {
    return State
        .getState()
        .cards
        .find( card => card.instanceId === instanceId );
}

function updateCard(instanceId, changes) {
    const cards = State.getState().cards;

    const updatedCards =
        cards.map(card => {
            if (card.instanceId !== instanceId) {
                return card;
            }

            return {
                ...card,
                ...changes
            };
        });

    State.setCards(updatedCards);
}

function updatePair(pairId, changes) {
    const cards = State.getState().cards;

    const updatedCards =
        cards.map(card => {
            if (card.pairId !== pairId) {
                return card;
            }

            return {
                ...card,
                ...changes
            };
        });

    State.setCards(updatedCards);
}

/*
=========================================================
SELECCIÓN DE CARTAS
=========================================================
*/

function handleCardSelection(instanceId) {
    if (boardLocked) {
        return;
    }

    const card = getCardByInstanceId(instanceId);

    if (!card) {
        return;
    }

    if (card.matched) {
        return;
    }

    if (card.flipped) {
        return;
    }

    updateCard(instanceId, {flipped: true});

    State.addSelectedCard(instanceId);

    UI.refreshGameUI();

    bindBoardEvents();

    const selectedCards = State.getState().selectedCards;

    if (selectedCards.length === 2) {
        evaluateTurn();
    }
}

/*
=========================================================
TURNO
=========================================================
*/

function evaluateTurn() {
    boardLocked = true;

    const selected = State.getState().selectedCards;

    const firstCard = getCardByInstanceId(selected[0]);

    const secondCard = getCardByInstanceId(selected[1]);

    Scoreboard.registerAttempt();

    UI.updateGameStats();

    if ( Cards.isMatchingPair(firstCard, secondCard) ) {
        handleMatch(firstCard, secondCard);
        return;
    }

    handleMismatch(firstCard, secondCard);
}

function handleMatch(firstCard, secondCard) {
    updatePair(firstCard.pairId, {matched: true, flipped: true});

    Scoreboard.registerMatch();

    State.clearSelectedCards();

    UI.refreshGameUI();

    bindBoardEvents();

    boardLocked = false;

    checkGameCompletion();
}

function handleMismatch(firstCard, secondCard) {
    setTimeout(() => {
        updateCard(firstCard.instanceId,{flipped: false});

        updateCard(secondCard.instanceId,{flipped: false});

        State.clearSelectedCards();

        UI.refreshGameUI();

        bindBoardEvents();

        boardLocked = false;
    }, FLIP_DELAY);
}

/*
=========================================================
FINAL DE PARTIDA
=========================================================
*/

function checkGameCompletion() {
    if (!State.isGameCompleted()) {
        return;
    }

    const stats = Scoreboard.getGameStats();

    UI.showResultsScreen();
}

/*
=========================================================
INICIOS DE PARTIDA
=========================================================
*/

function startGame(difficulty) {
    boardLocked = false;
    Scoreboard.resetStats();
    State.clearSelectedCards();
    State.setDifficulty(difficulty);

    const deck = Cards.createDeck(difficulty);
    State.setCards(deck);

    // Forzamos la limpieza del contenedor del DOM para la nueva cuadrícula
    const boardElement = document.getElementById('board');
    if (boardElement) {
        boardElement.innerHTML = '';
    }

    UI.showGameScreen();
    UI.refreshGameUI();
    bindBoardEvents();
}

function playAgain() {
    const currentDifficulty = State.getDifficulty();

    if (!currentDifficulty) {
        UI.showMenuScreen();
        return;
    }

    startGame(currentDifficulty);
}

function returnToMenu() {
    boardLocked = false;
    State.resetGameState();
    UI.showMenuScreen();
}

/*
=========================================================
EVENTOS DEL MENÚ
=========================================================
*/

function bindDifficultyEvents() {
    document.querySelectorAll('.difficulty-button')
        .forEach(button => {
            button.addEventListener(
                'click',
                () => {
                    startGame(button.dataset.difficulty);
                }
            );
        });
}

/*
=========================================================
EVENTOS DEL TABLERO
=========================================================
*/

function bindBoardEvents() {
    document.querySelectorAll('.card')
        .forEach(card => {
            card.addEventListener(
                'click',
                () => {
                    handleCardSelection(card.dataset.instanceId);
                }
            );
        });
}

/*
=========================================================
INTERRUPCIÓN DE PARTIDA Y CONTINUIDAD TRAS VER RESULTADOS
=========================================================
*/

function bindResultsEvents() {
    const cancelGameButton = document.getElementById('cancel-game-button');
    const playAgainButton = document.getElementById('play-again-button');
    const backMenuButton = document.getElementById('back-menu-button');

    cancelGameButton.addEventListener('click', returnToMenu);
    playAgainButton.addEventListener('click', playAgain);
    backMenuButton.addEventListener('click', returnToMenu);
}

/*
=========================================================
INICIO
=========================================================
*/

function initializeApp() {
    UI.showMenuScreen();
    bindDifficultyEvents();
    bindResultsEvents();
}

document.addEventListener('DOMContentLoaded',initializeApp);