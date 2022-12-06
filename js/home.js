const player1Tickbox = document.querySelector(`.player-1`);
const player2Tickbox = document.querySelector(`.player-2`);
const startButton = document.querySelector(`.play-button`);

const settingsButton = document.querySelector(`.settings-button`);
const settingsDiv = document.querySelector(`.settings-tab`);

const gridChoiceOne = document.querySelector(`.grid-3x3`);
const gridChoiceTwo = document.querySelector(`.grid-4x4`);

const difficultyBtn0 = document.querySelector(`.difficulty-0`);
const difficultyBtn1 = document.querySelector(`.difficulty-1`);
const difficultyBtn2 = document.querySelector(`.difficulty-2`);
const difficultyBtn3 = document.querySelector(`.difficulty-3`);


let gridThree = true;
let twoPlayers = true;

let settingsTabOpen = false;
let animationPlaying = false;

player1Tickbox.addEventListener(`click`, onePlayerButton);
player2Tickbox.addEventListener(`click`, twoPlayerButton);
startButton.addEventListener(`click`, redirectToGame);
settingsButton.addEventListener(`click`, toggleSettings);

gridChoiceOne.addEventListener(`click`, grid3x3Btn);
gridChoiceTwo.addEventListener(`click`, grid4x4Btn);

// difficultyBtn0.addEventListener(`click`, );
// difficultyBtn1.addEventListener(`click`, );
// difficultyBtn2.addEventListener(`click`, );
// difficultyBtn3.addEventListener(`click`, );

function redirectToGame() {
    sessionStorage.setItem(`Twoplayers`, twoPlayers);
    if (gridThree == true) {
        window.location = `/html/threeGame.html`;
    } else if (gridThree == false) {
        window.location = `/html/fourGame.html`;
    }
}

function onePlayerButton() {
    twoPlayers = false;
}

function twoPlayerButton() {
    twoPlayers = true;
}

function grid3x3Btn() {
    gridThree = true;
}

function grid4x4Btn() {
    gridThree = false;
}

// function difficulyButtonRandom() {

// }

function toggleSettings() {
    if (settingsTabOpen == false && animationPlaying == false) {
        settingsTabOpen = true;
        settingsDiv.style.display = `grid`;
        setTimeout(() => {
            settingsDiv.style.opacity = `1`;
            settingsDiv.style.marginTop = `0px`;
        }, 1);
    } else if (settingsTabOpen == true) {
        settingsTabOpen = false;
        animationPlaying = true;
        settingsDiv.style.opacity = `0`;
        settingsDiv.style.marginTop = `-2250px`;
        setTimeout(() => {
            settingsDiv.style.display = `none`;
            animationPlaying = false;
            settingsDiv.style.marginTop = `-225px`;
        }, 1000);
    }
}