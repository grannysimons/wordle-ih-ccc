// variables globales

const MAX_WORDS = 6;
const MAX_LENGTH = 5;

let wordToGuess = '';

let currentWord = 1;
let words = [[], [], [], [], [], []];
let existingLetters = [];
let unexistingLetters = [];
let won = false;