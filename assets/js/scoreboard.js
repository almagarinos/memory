/*
=========================================================
SCOREBOARD
=========================================================

Responsabilidades:
- Registrar intentos.
- Registrar aciertos.
- Calcular puntuación.
- Actualizar estadísticas.

No contiene:
- Manipulación del DOM.
- Persistencia.
- Gestión de pantallas.
*/

/*
=========================================================
CÁLCULO DE PUNTUACIÓN
=========================================================

Regla de este MVP: (aciertos / intentos) * 100

donde:
- aciertos = pares encontrados
- intentos = parejas volteadas

Ejemplos:
4 aciertos / 4 intentos = 100 %
4 aciertos / 8 intentos = 50 %
4 aciertos / 10 intentos = 40 %
*/

function calculateScore(matchedPairs, flippedPairs) {
    if (flippedPairs === 0) {
        return 0;
    }

    const score = (matchedPairs / flippedPairs) * 100;

    return Number(score.toFixed(2));
}

/*
=========================================================
LECTURA DE ESTADÍSTICAS
=========================================================
*/

function getMatchedPairs() {
    return State.getState().matchedPairs;
}

function getFlippedPairs() {
    return State.getState().flippedPairs;
}

function getCurrentScore() {
    return State.getState().score;
}

/*
=========================================================
ACTUALIZACIÓN DE ESTADÍSTICAS
=========================================================
*/

function registerAttempt() {
    State.incrementFlippedPairs();

    updateScore();

    return getFlippedPairs();
}

function registerMatch() {
    State.incrementMatchedPairs();

    updateScore();

    return getMatchedPairs();
}

function updateScore() {
    const currentState = State.getState();

    const score = calculateScore(currentState.matchedPairs, currentState.flippedPairs);

    State.setScore(score);

    return score;
}

/*
=========================================================
RESUMEN DE LA PARTIDA
=========================================================
*/

function getGameStats() {
    const currentState = State.getState();

    return {
        matchedPairs: currentState.matchedPairs,
        flippedPairs: currentState.flippedPairs,
        score: currentState.score,
        totalPairs: currentState.totalPairs,
        difficulty: currentState.difficulty
    };
}

/*
=========================================================
PROGRESO
=========================================================
*/

function getCompletionPercentage() {
    const currentState = State.getState();

    if (currentState.totalPairs === 0) {
        return 0;
    }

    const progress = (currentState.matchedPairs / currentState.totalPairs) * 100;

    return Number(progress.toFixed(2));
}

function isPerfectGame() {
    const currentState = State.getState();

    return (
        currentState.matchedPairs > 0 && currentState.matchedPairs === currentState.flippedPairs
    );
}

/*
=========================================================
REINICIO
=========================================================
*/

function resetStats() {
    State.setMatchedPairs(0);
    State.setFlippedPairs(0);
    State.setScore(0);
}

/*
=========================================================
EXPOSICIÓN GLOBAL
=========================================================
*/

window.Scoreboard = {
    calculateScore,
    getMatchedPairs,
    getFlippedPairs,
    getCurrentScore,
    registerAttempt,
    registerMatch,
    updateScore,
    getGameStats,
    getCompletionPercentage,
    isPerfectGame,
    resetStats
};