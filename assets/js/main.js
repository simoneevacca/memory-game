const play = document.getElementById('play');
const playHard = document.getElementById('play-hard');
const grid = document.getElementById('grid');
let showError = document.getElementById('error');
const winMessage = document.getElementById('win-message');
const gameOver = document.getElementById('game-over');
const info = document.getElementById('info');
const closeInfo = document.getElementById('close');



let cardEl;
let checkEl = [];
let rearCheck = [];
let errorCounter = 0;
let randCard = [];
let cardArray = [];
let matchedArray = [];
let canClick = true;
let arrayValue = 0;



/**
 * function to genare random number
 * @param {number} min 
 * @param {number} max 
 * @returns number between min and max
*/
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * After click Play Normal the game start
 */
play.addEventListener('click', function () {
    gameOver.innerHTML = '';
    console.log('inizia');
    arrayValue = 12;
    info.innerHTML = 'Ci sono 6 copie di emoji uguali nascoste, tovale tutte per vincere!!';
    closeInfo.innerHTML = 'Ho capito';
    //clear grid
    grid.innerHTML = '';
    //reset variables
    checkEl = [];
    rearCheck = [];
    errorCounter = 0;
    randCard = [];
    matchedArray = [];
    canClick = true;
    showError.innerHTML = 'Errori: ' + errorCounter;
    winMessage.innerHTML = '';


    //Array of content card
    cardArray = ['🍄', '🍄', '💩', '💩', '🍩', '🍩', '🏀', '🏀', '❤️', '❤️', '🍺', '🍺',];


    //Generate 12 card
    for (let i = 0; i < 12; i++) {
        while (randCard.length < 12) {
            let randNum = getRndInteger(0, 11);
            if (!randCard.includes(randNum)) {
                randCard.push(randNum);
                const card = `<div class='card-container'>
            <div class='on-card'>${cardArray[randNum]}</div>
            <div class='off-card'></div>
            </div>`
                grid.insertAdjacentHTML('beforeend', card);
            }
        }

        //Assign at each card the click function
        cardEl = document.querySelectorAll('.card-container');
        cardEl[i].addEventListener('click', cardClick);
    }
});


/**
 * After click Play Hard the game start
 */
playHard.addEventListener('click', function () {
    console.log('inizia');
    gameOver.innerHTML = '';
    arrayValue = 20;
    info.innerHTML = 'Ci sono 10 copie di emoji uguali nascoste, tovale tutte per vincere!! <br> Ma attenzione, ci sono 4 ☠️ nascosti, se ne trovi 2 di fila hai perso. <br> Inoltre, non puoi commettere più di 15 errori.'
    closeInfo.innerHTML = 'Ho capito';
    
    //clear grid
    grid.innerHTML = '';
    //reset variables
    checkEl = [];
    rearCheck = [];
    errorCounter = 0;
    randCard = [];
    matchedArray = [];
    canClick = true;
    showError.innerHTML = 'Errori: ' + errorCounter;
    winMessage.innerHTML = '';


    //Array of content card
    cardArray = ['🍄', '🍄', '💩', '💩', '🍩', '🍩', '🏀', '🏀', '❤️', '❤️', '☠️', '☠️', '🍄', '🍄', '💩', '💩', '🍩', '🍩', '🏀', '🏀', '❤️', '❤️', '☠️', '☠️' ];


    //Generate 24 card
    for (let i = 0; i < 24; i++) {
        while (randCard.length < 24) {
            let randNum = getRndInteger(0, 23);
            if (!randCard.includes(randNum)) {
                randCard.push(randNum);
                const card = `<div class='card-container hard'>
            <div class='on-card'>${cardArray[randNum]}</div>
            <div class='off-card'></div>
            </div>`
                grid.insertAdjacentHTML('beforeend', card);
            }
        }

        //Assign at each card the click function
        cardEl = document.querySelectorAll('.card-container');
        cardEl[i].addEventListener('click', cardClick);
    }
});

/**
 * Function for click of card
 * @returns 
 */
function cardClick() {

    if (!canClick) return;

    //push in array the card to check
    checkEl.push(this.children[0].innerHTML);
    //push in array the card for modify style
    rearCheck.push(this.children[1]);
    this.children[1].style.zIndex = "-1";


    //If 2 card has been selected
    if (checkEl.length == 2) {
        //disable click
        canClick = false;
        //if the cards match
        if (checkEl[0] == checkEl[1]) {
            if (checkEl[1] && checkEl[0] == '☠️'){
                console.log('boooom');
                setTimeout(() => {
                    grid.innerHTML = '';
                    gameOver.innerHTML = 'GAME OVER';
                },1000);

            }
            const a = rearCheck[0];
            const b = rearCheck[1];
            matchedArray.push(a, b);
            matched();
        } else{
            errorCounter++;
            if (errorCounter == 15) {
                setTimeout(() => {
                    grid.innerHTML = '';
                    gameOver.innerHTML = 'GAME OVER <br> 15 ERRORI';
                },1000);
            }
            error();
            showError.innerHTML = 'Errori: ' + errorCounter;
        }
        checkEl = [];
    }
}

function error() {
    console.log(rearCheck);
    setTimeout(function () {
        rearCheck[0].style.zIndex = "1";
        rearCheck[1].style.zIndex = "1";
        rearCheck = [];
        canClick = true;
        console.log(rearCheck);


    }, 1000)

}

function matched() {
    console.log(matchedArray.length);
    rearCheck = [];
    canClick = true;
    if (matchedArray.length == arrayValue) {
        winMessage.innerHTML = 'Congratulazioni, la tua memoria è stata allenata!! <br> Clicca su Play e prova a battere il tuo punteggio.'
    }
}

closeInfo.addEventListener('click', function() {
    info.innerHTML = '';
    closeInfo.innerHTML = '';

})