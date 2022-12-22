const player1Tickbox = document.querySelector(`.player-1`);
const player2Tickbox = document.querySelector(`.player-2`);
const player1Input = document.querySelector(`.player-1-name`);
const player2Input = document.querySelector(`.player-2-name`);
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

const closeCustomPopupBtn = document.querySelector(`.popup-close`);
const customPopupContent = document.querySelector(`.popup-content`);
const customPopupDiv = document.querySelector(`.custom-popup`);

//Sessionstorage values
let gridThree = true;
let twoPlayers = true;
let computerDifficulty = 0;

//Fetch the grid size
if (sessionStorage.getItem(`TicTacToeGrid`) == `false`) {
    gridThree = false;
}

//Fetch the player amount
if (sessionStorage.getItem(`Twoplayers`) == `false`) {
    twoPlayers = false;
}

//Fetch the computer difficulty
if (sessionStorage.getItem(`difficultySettings`)) {
    computerDifficulty = Number(sessionStorage.getItem(`difficultySettings`));
}

//Fetch the playerNames
if (sessionStorage.getItem(`player1Name`)) {
    player1Input.value = sessionStorage.getItem(`player1Name`);
}
if (sessionStorage.getItem(`player2Name`)) {
    player2Input.value = sessionStorage.getItem(`player2Name`);
}

//Regular values
let settingsTabOpen = false;
let explanationTabOpen = false;
let aboutUsTabOpen = false;
let customPopupIsOpen = false;
let animationPlaying = false;

startButton.addEventListener(`click`, redirectToGame);
settingsButton.addEventListener(`click`, toggleSettings);
closeCustomPopupBtn.addEventListener(`click`, closeCustomPopup);

document.addEventListener(`keydown`, (event) => {
    if (customPopupIsOpen == true && event.key == `Enter`) {
        closeCustomPopup();
    }
})

explanationBtn.addEventListener(`click`, function () {
    toggleExplanations();
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
    sessionStorage.setItem(`TicTacToeGrid`, gridThree);
    sessionStorage.setItem(`player1Name`, player1Input.value);
    sessionStorage.setItem(`player2Name`, player2Input.value);
}

function launchPopup(content) {
    customPopupIsOpen = true;
    customPopupContent.innerHTML = content;
    customPopupDiv.style.opacity = `1`;
}

function closeCustomPopup() {
    customPopupDiv.style.opacity = `0`;
    customPopupIsOpen = false;
}

function redirectToGame() {
    let tooLongUsernames = [false, false];
    if (player1Input.value.length > 20) {
        tooLongUsernames[0] = true;
    }
    if (player2Input.value.length > 20) {
        tooLongUsernames[1] = true;
    }

    if (tooLongUsernames[0] == true && tooLongUsernames[1] == true) {
        launchPopup(`De namen van speler 1 en 2 zijn te lang!`);
    } else if (tooLongUsernames[0] == true) {
        launchPopup(`De naam van speler 1 is te lang!`);
    } else if (tooLongUsernames[1] == true) {
        launchPopup(`De naam van speler 2 is te lang!`);
    } else {
        leavePage();
        if (gridThree == true) {
            window.location = `/html/threeGame.html`;
        } else if (gridThree == false) {
            window.location = `/html/fourGame.html`;
        }
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