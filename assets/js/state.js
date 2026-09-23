/*
=========================================================
STATE
=========================================================

Fuente única de verdad de la aplicación.

Responsabilidades:
- Mantener el estado global.
- Permitir lectura del estado.
- Permitir actualizaciones controladas.
- Permitir reiniciar la partida.

No contiene:
- Manipulación del DOM.
- Cálculos de puntuación.
- Acceso a localStorage.
*/

const SCREENS = {
    MENU: 'menu',
    GAME: 'game',
    RESULTS: 'results'
};

const DIFFICULTIES = {
    easy: 4,
    medium: 12,
    hard: 24
};

const initialState = {
    screen: SCREENS.MENU,

    difficulty: null,

    totalPairs: 0,

    cards: [],

    selectedCards: [],

    matchedPairs: 0,

    flippedPairs: 0,

    score: 0
};

/*
    Función nativa de JavaScript para realizar copias
    de objetos de manera sencilla y sin dependencias
*/
const state = structuredClone(initialState);

/*
=========================================================
GETTERS
=========================================================
*/

function getState() {
    return state;
}

function getScreen() {
    return state.screen;
}

function getDifficulty() {
    return state.difficulty;
}

/*
=========================================================
SETTERS
=========================================================
*/

function setScreen(screen) {
    state.screen = screen;
}

function setDifficulty(difficulty) {
    state.difficulty = difficulty;
    state.totalPairs = DIFFICULTIES[difficulty];
}

function setCards(cards) {
    state.cards = cards;
}

function setSelectedCards(cards) {
    state.selectedCards = cards;
}

function setMatchedPairs(value) {
    state.matchedPairs = value;
}

function setFlippedPairs(value) {
    state.flippedPairs = value;
}

function setScore(value) {
    state.score = value;
}

/*
=========================================================
HELPERS
=========================================================
*/

function addSelectedCard(cardId) {
    state.selectedCards.push(cardId);
}

function clearSelectedCards() {
    state.selectedCards = [];
}

function incrementMatchedPairs() {
    state.matchedPairs += 1;
}

function incrementFlippedPairs() {
    state.flippedPairs += 1;
}

function isGameCompleted() {
    return state.matchedPairs === state.totalPairs;
}

/*
=========================================================
RESET
=========================================================
*/

function resetGameState() {
    state.screen = SCREENS.MENU;

    state.difficulty = null;

    state.totalPairs = 0;

    state.cards = [];

    state.selectedCards = [];

    state.matchedPairs = 0;

    state.flippedPairs = 0;

    state.score = 0;
}

/*
=========================================================
EXPOSICIÓN GLOBAL
=========================================================

Sin módulos ES, así todos los ficheros podrán acceder al estado
*/

window.State = {
    SCREENS,
    DIFFICULTIES,

    getState,
    getScreen,
    getDifficulty,

    setScreen,
    setDifficulty,
    setCards,
    setSelectedCards,
    setMatchedPairs,
    setFlippedPairs,
    setScore,

    addSelectedCard,
    clearSelectedCards,
    incrementMatchedPairs,
    incrementFlippedPairs,
    isGameCompleted,

    resetGameState
};