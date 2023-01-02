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
const backgroundButtons = document.querySelectorAll(`input[name="background-image"]`);

const customBackgroundLink = document.querySelector(`.custom-link`);
const customBackgroundColor = document.querySelector(`.custom-color`);

//Sessionstorage values
let gridThree = `true`;
let twoPlayers = true;
let computerDifficulty = 0;
let backgroundImageCode = `white`;

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
    gridThree = sessionStorage.getItem(`TicTacToeGrid`);
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
let gameReadyForLaunch = true;

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
    //Selected player amount
    sessionStorage.setItem(`Twoplayers`, twoPlayers);
    //Selected difficulty in settings
    sessionStorage.setItem(`difficultySettings`, computerDifficulty);
    //Selected grid in settings
    sessionStorage.setItem(`TicTacToeGrid`, gridThree);
    //Selected usernames
    sessionStorage.setItem(`player1Name`, player1Input.value);
    sessionStorage.setItem(`player2Name`, player2Input.value);
    //Selected image in settings
    sessionStorage.setItem(`backgroundImageCode`, backgroundImageCode);
}

//Open custom popup
function launchPopup(content) {
    customPopupDiv.style.display = `block`;
    customPopupDiv.style.opacity = `0`;
    customPopupIsOpen = true;
    customPopupContent.innerHTML = content;
    customPopupDiv.style.opacity = `1`;
}

//Close custom popup
function closeCustomPopup() {
    customPopupDiv.style.opacity = `0`;
    customPopupIsOpen = false;
    setTimeout(() => {
        customPopupDiv.style.display = `none`;
    }, 1000);
}

//Start button function, saves everything before continuing to the game
function redirectToGame() {
    debugger;
    let tooLongUsernames = [false, false];
    if (player1Input.value.length > 25) {
        tooLongUsernames[0] = true;
    }
    if (player2Input.value.length > 25) {
        tooLongUsernames[1] = true;
    }

    if (tooLongUsernames[0] == true && tooLongUsernames[1] == true) {
        launchPopup(`De namen van speler 1 en 2 zijn te lang! (max. 25)`);
    } else if (tooLongUsernames[0] == true) {
        launchPopup(`De naam van speler 1 is te lang! (max. 25)`);
    } else if (tooLongUsernames[1] == true) {
        launchPopup(`De naam van speler 2 is te lang! (max. 25)`);
    } else {
        loadButtonValues();
        leavePage();
        if (gameReadyForLaunch == true) {
            if (gridThree == `true`) {
                window.location = `/html/threeGame.html`;
            } else if (gridThree == `false`) {
                window.location = `/html/fourGame.html`;
            }
        }
    }
    gameReadyForLaunch = true;
}

//Loops in which all the setting radio options are put into the values
function loadButtonValues() {
    //This loop notes which radio button is active of the computer difficulty
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
        }
    }
    //Player amount
    for (i = 0; i < playerTickboxes.length; i++) {
        const currentButton = document.querySelector(`input.player-${i}`);
        if (currentButton.checked == true) {
            twoPlayers = Boolean(currentButton.value);
        }
    }
    //Background image selection
    for (i = 0; i < backgroundButtons.length; i++) {
        const currentButton = document.querySelector(`input.background-${i}`);
        if (currentButton.checked == true) {
            backgroundImageCode = Number(currentButton.value);
            //IF the user picked a custom input
            if (backgroundImageCode >= 6) {
                backgroundImageCode = currentButton.value;
                //IF the user picked a custom link
                if (backgroundImageCode == 6) {
                    const customBackgroundValue = customBackgroundLink.value
                    if (customBackgroundValue.includes(`https://`)) {
                        sessionStorage.setItem(`customizedBackground`, customBackgroundLink.value);
                    } else {
                        gameReadyForLaunch = false;
                        launchPopup(`De link voor de afbeelding is incorrect`);
                    }
                //IF the user picked a custom color
                } else if (backgroundImageCode == 7) {
                    console.log(customBackgroundColor.value)
                    debugger
                    sessionStorage.setItem(`customizedBackground`, customBackgroundColor.value);
                }
            }
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