let randomNumber = parseInt(Math.random()*100+1);
const userInput = document.getElementById("guessField");
const submit = document.getElementById("subt");
const guessSlot = document.getElementById("guesses");
const remaining = document.getElementById("lastResult");
const lowOrHi = document.getElementById("lowOrHi");
const startOver = document.getElementById("resultParas");

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault()
       const guess = parseInt(userInput.value);
       vaildateGuess(guess)
    })
}

function vaildateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number');
    } else if(guess < 1){
        alert('Please enter a number greater than 1');
    } else if(guess > 100 ){
        alert('Please enter a number less than 100');
    } else {
        prevGuess.push(guess)
        if(numGuess===10){
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        } else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess===randomNumber){
        displayMessage(`You guessed it right`);
        endGame();
    } else if(guess < randomNumber){
        displayMessage(`Number is tooo low`);;
    } else if(guess > randomNumber){
        displayMessage(`Number is tooo high`)
    }
    
}


function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess},  `;
    numGuess++;
    remaining.innerHTML = `${11-numGuess}`
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}


function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled','');
    p.classList.add('button')
    p.innerHTML = `<h2  id="newGame" class="p">Start new Game</h2>`
    startOver.appendChild(p)
    playGame = false;
    newGame()
}


function newGame(){
    const newGameButton = document.querySelector("#newGame")
    newGameButton.addEventListener('click',function(e){
        randomNumber = parseInt(Math.random()*100+1);
        prevGuess= [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        displayMessage() = ' ';


        playGame = true;

    });
}

