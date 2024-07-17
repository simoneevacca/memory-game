const play = document.getElementById('play');
const grid = document.getElementById('grid');
let showError = document.getElementById('error');
const winMessage = document.getElementById('win-message');
let cardEl;
let checkEl = [];
let rearCheck = [];
let errorCounter = 0;
let randCard = [];
let cardArray = [];
let matchedArray = [];
let canClick = true;



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
 * After click Play the game start
 */
play.addEventListener('click', function () {
    console.log('inizia');

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
            const a = rearCheck[0];
            const b = rearCheck[1];
            matchedArray.push(a, b);
            matched();
        } else {
            errorCounter++;
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
    if (matchedArray.length == 12) {
        winMessage.innerHTML = 'Congratulazioni, la tua memoria è stata allenata!! <br> Clicca su Play e prova a battere il tuo punteggio.'
    }
}

