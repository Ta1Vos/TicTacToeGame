const player1Tickbox = document.querySelector(`.player-1`);
const player2Tickbox = document.querySelector(`.player-2`);
const startButton = document.querySelector(`.play-button`);

const settingsButton = document.querySelector(`.settings-button`);
const settingsDiv = document.querySelector(`.settings-tab`);

const explanationBtn = document.querySelector(`.explanation-button`);
const explanationDiv = document.querySelector(`.explanation-tab`);
const aboutUsBtn = document.querySelector(`.about-us-button`);

const gridChoiceOne = document.querySelector(`.grid-3x3`);
const gridChoiceTwo = document.querySelector(`.grid-4x4`);

const difficultyBtn0 = document.querySelector(`.difficulty-0`);
const difficultyBtn1 = document.querySelector(`.difficulty-1`);
const difficultyBtn2 = document.querySelector(`.difficulty-2`);
const difficultyBtn3 = document.querySelector(`.difficulty-3`);
const difficultyBtn4 = document.querySelector(`.difficulty-4`);

//Sessionstorage values
let gridThree = true;

if (sessionStorage.getItem(`TicTacToeGrid`) == `false`) {
    gridThree = false;
}

console.log(`Sessionstorage detetcted: ${gridThree}`);

let twoPlayers = true;

if (sessionStorage.getItem(`Twoplayers`) == `false`) {
    twoPlayers = false;
}

let computerDifficulty = 0;

if (sessionStorage.getItem(`difficultySettings`)) {
    computerDifficulty = Number(sessionStorage.getItem(`difficultySettings`));
}

//Regular values
let settingsTabOpen = false;
let explanationTabOpen = false;
let aboutUsTabOpen = false;
let animationPlaying = false;

startButton.addEventListener(`click`, redirectToGame);
settingsButton.addEventListener(`click`, toggleSettings);

explanationBtn.addEventListener(`click`, function () {
    leavePage();
    toggleExplanations()
})

//Settings grid
gridChoiceOne.addEventListener(`click`, function () {
    gridThree = true;
});

gridChoiceTwo.addEventListener(`click`, function () {
    gridThree = false;
});

//Player selection
player1Tickbox.addEventListener(`click`, function () {
    twoPlayers = false;
});

player2Tickbox.addEventListener(`click`, function () {
    twoPlayers = true;
});

//Settings difficulty
difficultyBtn0.addEventListener(`click`, function () {
    computerDifficulty = 0;
});
difficultyBtn1.addEventListener(`click`, function () {
    computerDifficulty = 1;
});
difficultyBtn2.addEventListener(`click`, function () {
    computerDifficulty = 2;
});
difficultyBtn3.addEventListener(`click`, function () {
    computerDifficulty = 3;
});
difficultyBtn4.addEventListener(`click`, function () {
    computerDifficulty = 4;
});

function leavePage() {
    sessionStorage.setItem(`Twoplayers`, twoPlayers);
    sessionStorage.setItem(`difficultySettings`, computerDifficulty);
    sessionStorage.setItem(`TicTacToeGrid`, gridThree)
}

function redirectToGame() {
    leavePage();
    if (gridThree == true) {
        window.location = `/html/threeGame.html`;
    } else if (gridThree == false) {
        window.location = `/html/fourGame.html`;
    }
}

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

function toggleExplanations() {
    if (explanationTabOpen == false && animationPlaying == false) {
        explanationTabOpen = true;
        explanationDiv.style.display = `grid`;
        setTimeout(() => {
            explanationDiv.style.opacity = `1`;
            explanationDiv.style.marginTop = `0px`;
        }, 1);
    } else if (explanationTabOpen == true) {
        explanationTabOpen = false;
        animationPlaying = true;
        explanationDiv.style.opacity = `0`;
        explanationDiv.style.marginTop = `-2250px`;
        setTimeout(() => {
            explanationDiv.style.display = `none`;
            animationPlaying = false;
            explanationDiv.style.marginTop = `-225px`;
        }, 1000);
    }
}