/*
=========================================================
CARDS
=========================================================

Responsabilidades:
- Definir las cartas base.
- Obtener cartas según dificultad.
- Generar pares.
- Mezclar el mazo.

No contiene:
- Manipulación del DOM.
- Estado global.
- Lógica de puntuación.
*/

/*
=========================================================
CATÁLOGO DE CARTAS
=========================================================

Patrón que sigue el modelo:

{
    id: 'card-01',
    description: 'Letra A',
    content: 'A'
}

De momento es el abecedario inglés.

*/

const CARD_CATALOG = [
    {
        id: 'card-01',
        description: 'Letra A',
        content: 'A'
    },
    {
        id: 'card-02',
        description: 'Letra B',
        content: 'B'
    },
    {
        id: 'card-03',
        description: 'Letra C',
        content: 'C'
    },
    {
        id: 'card-04',
        description: 'Letra D',
        content: 'D'
    },
    {
        id: 'card-05',
        description: 'Letra E',
        content: 'E'
    },
    {
        id: 'card-06',
        description: 'Letra F',
        content: 'F'
    },
    {
        id: 'card-07',
        description: 'Letra G',
        content: 'G'
    },
    {
        id: 'card-08',
        description: 'Letra H',
        content: 'H'
    },
    {
        id: 'card-09',
        description: 'Letra I',
        content: 'I'
    },
    {
        id: 'card-10',
        description: 'Letra J',
        content: 'J'
    },
    {
        id: 'card-11',
        description: 'Letra K',
        content: 'K'
    },
    {
        id: 'card-12',
        description: 'Letra L',
        content: 'L'
    },
    {
        id: 'card-13',
        description: 'Letra M',
        content: 'M'
    },
    {
        id: 'card-14',
        description: 'Letra N',
        content: 'N'
    },
    {
        id: 'card-15',
        description: 'Letra O',
        content: 'O'
    },
    {
        id: 'card-16',
        description: 'Letra P',
        content: 'P'
    },
    {
        id: 'card-17',
        description: 'Letra Q',
        content: 'Q'
    },
    {
        id: 'card-18',
        description: 'Letra R',
        content: 'R'
    },
    {
        id: 'card-19',
        description: 'Letra S',
        content: 'S'
    },
    {
        id: 'card-20',
        description: 'Letra T',
        content: 'T'
    },
    {
        id: 'card-21',
        description: 'Letra U',
        content: 'U'
    },
    {
        id: 'card-22',
        description: 'Letra V',
        content: 'V'
    },
    {
        id: 'card-23',
        description: 'Letra W',
        content: 'W'
    },
    {
        id: 'card-24',
        description: 'Letra X',
        content: 'X'
    },
    {
        id: 'card-25',
        description: 'Letra Y',
        content: 'Y'
    },
    {
        id: 'card-26',
        description: 'Letra Z',
        content: 'Z'
    }
];

/*
=========================================================
UTILS
=========================================================
*/

function shuffle(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(
            Math.random() * (i + 1)
        );

        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[i]
        ];
    }

    return shuffled;
}

/*
=========================================================
SELECCIÓN DE CARTAS
=========================================================
*/

function getCardsForDifficulty(difficulty) {
    const pairCount = State.DIFFICULTIES[difficulty];

    if (!pairCount) {
        return [];
    }

    return CARD_CATALOG.slice(0, pairCount);
}

/*
=========================================================
GENERACIÓN DE PARES
=========================================================
*/

function createDeck(difficulty) {
    const baseCards = getCardsForDifficulty(difficulty);

    const deck = [];

    baseCards.forEach(card => {
        deck.push({
            ...card,
            pairId: card.id,
            instanceId: `${card.id}-a`,
            matched: false,
            flipped: false
        });

        deck.push({
            ...card,
            pairId: card.id,
            instanceId: `${card.id}-b`,
            matched: false,
            flipped: false
        });
    });

    return shuffle(deck);
}

/*
=========================================================
VALIDACIONES
=========================================================
*/

function isMatchingPair(firstCard, secondCard) {
    if (!firstCard || !secondCard) {
        return false;
    }

    return firstCard.pairId === secondCard.pairId;
}

/*
=========================================================
EXPOSICIÓN GLOBAL
=========================================================
*/

window.Cards = {
    CARD_CATALOG,
    shuffle,
    getCardsForDifficulty,
    createDeck,
    isMatchingPair
};