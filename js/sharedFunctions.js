//Locations
const homeBtn = document.querySelector(`.home-button`);
const resetPopup = document.querySelector(`.reset-popup`);
const resetPopupBtn = document.querySelector(`.reset-button`);
const resetConfirmBtn = document.querySelector(`.reset-confirm`);
const resetDenyBtn = document.querySelector(`.reset-deny`);

//Custom alert
const closeCustomPopupBtn = document.querySelector(`.popup-close`);
const customPopupContent = document.querySelector(`.popup-content`);
const customPopupDiv = document.querySelector(`.custom-popup`);

//Player scores
const player1ScoreLocation = document.querySelector(`.player1-score`);
const player2ScoreLocation = document.querySelector(`.player2-score`);

const player1NameLocation = document.querySelector(`.player1-loaded-name`);
const player2NameLocation = document.querySelector(`.player2-loaded-name`);

const body = document.querySelector(`body`);
const playfieldGridCss = document.querySelector(`.tictactoe-field`);

let customPopupIsOpen = false;

homeBtn.addEventListener(`click`, backToHome);
resetConfirmBtn.addEventListener(`click`, resetConfirm);
resetDenyBtn.addEventListener(`click`, resetDeny);
resetPopupBtn.addEventListener(`click`, openResetPopup);
closeCustomPopupBtn.addEventListener(`click`, closeCustomPopup);

document.addEventListener(`keydown`, (event) => {
    if (customPopupIsOpen == true && event.key == `Enter`) {
        closeCustomPopup();
    }
})

document.addEventListener(`keydown`, (event) => {
    if (event.key == `r` || event.key == `R`) {
        openResetPopup();
    }
})

//Names are initialized in 4x4 and 3x3
//Fetch the playerNames
if (player1Name && player2Name) {
    if (sessionStorage.getItem(`player1Name`)) {
        player1Name = sessionStorage.getItem(`player1Name`);
    }
    if (sessionStorage.getItem(`player2Name`)) {
        player2Name = sessionStorage.getItem(`player2Name`);
    }
}

//Playername changer if the computer is playing
if (twoPlayers == false) {
    player2Name = `Computer`;
}

player1NameLocation.innerHTML = player1Name;
//Checks if there is a second player, otherwise it will be the computer
if (twoPlayers == true) {
    player2NameLocation.innerHTML = player2Name;
} else {
    player2NameLocation.innerHTML = `Computer`;
}

function backToHome() {
    window.location = `/index.html`;
}

function openResetPopup() {
    resetPopup.style.display = `block`;
}

function resetConfirm() {
    gameReset();
    resetPopup.style.transition = `2s`;
    resetPopup.style.opacity = `0`;
    closeCustomPopup();
    setTimeout(() => {
        resetPopup.style.opacity = `1`;
        resetPopup.style.display = `none`;
        resetPopup.style.transition = `0s`;
    }, 2000);
}

function resetDeny() {
    resetPopup.style.display = `none`;
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

function loadBackground() {
    backgroundImageCode = sessionStorage.getItem(`backgroundImageCode`);
    if (backgroundImageCode == `0`) {
        playfieldGridCss.classList.add(`playfield-no-opacity`);
    } else if (backgroundImageCode == `1`) {
        body.style.backgroundImage = `url(/img-bg/floating_city.jpg)`;
    } else if (backgroundImageCode == `2`) {
        body.style.backgroundImage = `url(/img-bg/forest.jpg)`;
    } else if (backgroundImageCode == `3`) {
        body.style.backgroundImage = `url(/img-bg/world.jpg)`;
    } else if (backgroundImageCode == `4`) {
        body.style.backgroundImage = `url(/img-bg/fireplace.gif)`;
    } else if (backgroundImageCode == `5`) {
        body.style.backgroundImage = `url(/img-bg/movingCity.gif)`;
    } else if (backgroundImageCode == `6`) {
        //Should only contain an IMAGE defined in a LINK
        body.style.backgroundImage = `url(${sessionStorage.getItem(`customizedBackground`)})`;
    } else if (backgroundImageCode == `7`) {
        //Should only contain a COLOR defined in a WORD
        body.style.background = sessionStorage.getItem(`customizedBackground`);
        playfieldGridCss.classList.add(`playfield-no-opacity`);
    }
}

loadBackground();