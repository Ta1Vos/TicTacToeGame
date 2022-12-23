const player1Input = document.querySelector(`.player-1-name`);
const player2Input = document.querySelector(`.player-2-name`);
const startButton = document.querySelector(`.play-button`);

const settingsButton = document.querySelector(`.settings-button`);
const settingsDiv = document.querySelector(`.settings-tab`);

const aboutUsBtn = document.querySelector(`.about-us-button`);
const aboutUsDiv = document.querySelector(`.about-us-tab`);

const closeCustomPopupBtn = document.querySelector(`.popup-close`);
const customPopupContent = document.querySelector(`.popup-content`);
const customPopupDiv = document.querySelector(`.custom-popup`);

//Instantly get all radio inputs with same name, put into an array
const difficultyButtons = document.querySelectorAll(`input[name="computer-difficulty"]`);
const gridChoices = document.querySelectorAll(`input[name="grid-choice"]`);
const playerTickboxes = document.querySelectorAll(`input[name="player-amount"]`);

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
    twoPlayers = Boolean(sessionStorage.getItem(`Twoplayers`));
    gridThree = Boolean(sessionStorage.getItem(`TicTacToeGrid`));
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

aboutUsBtn.addEventListener(`click`, function () {
    toggleExplanations();
})

//Save every necessary value in the sessionstorage
function leavePage() {
    sessionStorage.setItem(`Twoplayers`, twoPlayers);
    sessionStorage.setItem(`difficultySettings`, computerDifficulty);
    sessionStorage.setItem(`TicTacToeGrid`, gridThree);
    sessionStorage.setItem(`player1Name`, player1Input.value);
    sessionStorage.setItem(`player2Name`, player2Input.value);
}

//Open custom popup
function launchPopup(content) {
    customPopupIsOpen = true;
    customPopupContent.innerHTML = content;
    customPopupDiv.style.opacity = `1`;
}

//Close custom popup
function closeCustomPopup() {
    customPopupDiv.style.opacity = `0`;
    customPopupIsOpen = false;
}

//Start button function, saves everything before continuing to the game
function redirectToGame() {
    debugger;
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
        loadButtonValues();
        leavePage();
        if (gridThree == `true`) {
            window.location = `/html/threeGame.html`;
        } else if (gridThree == `false`) {
            window.location = `/html/fourGame.html`;
        }
    }
}

//Loops in which all the setting-options are put into the values
function loadButtonValues() {
    //This loop notes which radio button is active
    for (i = 0; i < difficultyButtons.length; i++) {
        const currentButton = document.querySelector(`input.difficulty-${i}`);
        if (currentButton.checked == true) {
            computerDifficulty = Number(currentButton.value);
        }
    }
    //Grid
    for (i = 0; i < gridChoices.length; i++) {
        const currentButton = document.querySelector(`input.grid-${i}`);
        if (currentButton.checked == true) {
            gridThree = currentButton.value;
            console.log(`knop ${i}`)
        }
    }
    //Player amount
    for (i = 0; i < playerTickboxes.length; i++) {
        const currentButton = document.querySelector(`input.player-${i}`);
        if (currentButton.checked == true) {
            twoPlayers = Boolean(currentButton.value);
        }
    }
}

//Animation for settings
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

//Animation for Explanations
function toggleExplanations() {
    if (aboutUsTabOpen == false && animationPlaying == false) {
        aboutUsTabOpen = true;
        aboutUsDiv.style.display = `grid`;
        setTimeout(() => {
            aboutUsDiv.style.opacity = `1`;
            aboutUsDiv.style.marginTop = `0px`;
        }, 1);
    } else if (aboutUsTabOpen == true) {
        aboutUsTabOpen = false;
        animationPlaying = true;
        aboutUsDiv.style.opacity = `0`;
        aboutUsDiv.style.marginTop = `-2250px`;
        setTimeout(() => {
            aboutUsDiv.style.display = `none`;
            animationPlaying = false;
            aboutUsDiv.style.marginTop = `-225px`;
        }, 1000);
    }
}