const homeBtn = document.querySelector(`.home-button`);

const resetPopup = document.querySelector(`.reset-popup`);
const resetPopupBtn = document.querySelector(`.reset-button`);
const resetConfirmBtn = document.querySelector(`.reset-confirm`);
const resetDenyBtn = document.querySelector(`.reset-deny`);

const player1ScoreLocation = document.querySelector(`.player1-score`);
const player2ScoreLocation = document.querySelector(`.player2-score`);

const player1NameLocation = document.querySelector(`.player1-loaded-name`);
const player2NameLocation = document.querySelector(`.player2-loaded-name`);

homeBtn.addEventListener(`click`, backToHome);
resetConfirmBtn.addEventListener(`click`, resetConfirm);
resetDenyBtn.addEventListener(`click`, resetDeny);
resetPopupBtn.addEventListener(`click`, openResetPopup);

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
    setTimeout(() => {
        resetPopup.style.opacity = `1`;
        resetPopup.style.display = `none`;
        resetPopup.style.transition = `0s`;
    }, 2000);
}

function resetDeny() {
    resetPopup.style.display = `none`;
}