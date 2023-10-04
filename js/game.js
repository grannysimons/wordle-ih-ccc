//funciones de manejo del juego
const setRandomWord = () => {
    wordToGuess = 'AVENA';
    // wordToGuess = allWords[Math.floor(Math.random()*allWords.length)].toUpperCase();
}
const isEnviarPressed = (letter) => {
    return letter == 'ENVIAR';
}
const isBorrarPressed = (letter) => {
    return letter == 'BORRAR';
}
const isWordCompleted = () => {
    let word = words[currentWord-1];
    return word.length == MAX_LENGTH;
}
const addLetter = (letter) => {
    //añadir en el array
    words[currentWord - 1].push(letter);

    //añadir en el html
    let lastLetterElem = document.querySelector(`.letters .row:nth-child(${currentWord}) .letter:nth-child(${words[currentWord-1].length})`);

    lastLetterElem.innerHTML = letter;
}
const isWordEmpty = () => {
    let word = words[currentWord-1];
    return word.length == 0;
}
const removeLetter = () => {
    let lastPos = words[currentWord-1].length - 1;
    
    //eliminar del array
    words[currentWord-1].splice(lastPos, 1);

    //eliminar del html
    let lastLetterElem = document.querySelector(`.letters .row:nth-child(${currentWord}) .letter:nth-child(${lastPos + 1})`);
    
    lastLetterElem.innerHTML = '';
}
const bounceWord = () => {
    let letterElems = document.querySelectorAll(`.letters .row:nth-child(${currentWord}) .letter`);

    Array.from(letterElems).forEach(letterElem => {
        letterElem.classList.add('wordIncomplete')
    })
}
const wordExists = () => {
    let word = words[currentWord-1];
    let wordStr = word.reduce((prev, curr) => prev+curr, '');   //metodo reduce para arrays

    return allWords.includes(wordStr);
}

const isLetterIncluded = (letter) => {
    return wordToGuess.includes(letter);
}
const isLetterInCorrectPosition = (letter, k) => {
    return wordToGuess.charAt(k) == letter;
}
const letterNotIncluded = (letter, pos) => {
    let letterElem = document.querySelector(`.letters .row:nth-child(${currentWord})`).querySelector(`.letter:nth-child(${pos + 1})`)
    letterElem.classList.add('notIncluded');

    if (!unexistingLetters.includes(letter)) unexistingLetters.push(letter);
}
const letterInCorrectPosition = (letter, pos) => {
    let letterElem = document.querySelector(`.letters .row:nth-child(${currentWord})`).querySelector(`.letter:nth-child(${pos + 1})`)
    letterElem.classList.add('correct');

    if (!existingLetters.includes(letter)) existingLetters.push(letter);
}
const letterInNotCorrectPosition = (letter, pos) => {
    let letterElem = document.querySelector(`.letters .row:nth-child(${currentWord})`).querySelector(`.letter:nth-child(${pos + 1})`)
    letterElem.classList.add('badPosition');
    
    if (!existingLetters.includes(letter)) existingLetters.push(letter);
}
const checkWord = () => {
    let word = words[currentWord - 1];

    let guessed = true;

    word.forEach((letter, k) => {
        if(!isLetterIncluded(letter)) {
            letterNotIncluded(letter, k);
            guessed = false;
        } else if(isLetterInCorrectPosition(letter, k)) {
            letterInCorrectPosition(letter, k)
        } else {
            letterInNotCorrectPosition(letter, k)
            guessed = false;
        }
    })

    return guessed;
}

const updateKeyboard = () => {
    let keys = document.querySelectorAll('.keyboard .key');

    Array.from(keys).forEach(key => {
        if(existingLetters.includes(key.innerHTML)) key.classList.add('included');

        else if(unexistingLetters.includes(key.innerHTML)) key.classList.add('notIncluded')
    })
}
const wonGame = () => {
    won = true;

    document.querySelector('.result').innerHTML = 'YOU WON!';

    let imgConfeti = document.createElement('img');
    imgConfeti.src = 'images/won.gif';
    document.querySelector('.confeti').appendChild(imgConfeti);
}
const loseGame = () => {
    won = false;
    document.querySelector('.result').innerHTML = 'YOU LOSED!';
}
const oportunitiesLeft = () => {
    return currentWord < MAX_WORDS;
}
const updateCurrentWord = () => {
    currentWord ++;
}
