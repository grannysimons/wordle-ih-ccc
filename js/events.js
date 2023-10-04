//eventos del juego
setRandomWord();

let keys = document.getElementsByClassName('key');  //HTMLCollection
Array.from(keys).forEach((key) => {
    key.addEventListener('click', ()=>{
         console.log(key.innerHTML)

        let keyPressed = key.innerHTML;

         //if-else if-else

         if(isEnviarPressed(keyPressed)) {
            if(isWordCompleted()) {
                if(!wordExists()) {
                    bounceWord();
                } else {
                    let result = checkWord();
                    updateKeyboard();

                    if(result) wonGame();
                    else if(!oportunitiesLeft()) loseGame();
                    else updateCurrentWord();

                }
            } else {
                bounceWord();
            }
         } else if(isBorrarPressed(keyPressed)) {
            if(!isWordEmpty()) {
                removeLetter();
            }
         } else {
            if(!isWordCompleted()) {
                addLetter(keyPressed);
            }
         }
    })

})
