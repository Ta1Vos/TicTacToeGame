const homeBtn = document.querySelector(`.home-button`);

const resetPopup = document.querySelector(`.reset-popup`);
const resetPopupBtn = document.querySelector(`.reset-button`);
const resetConfirmBtn = document.querySelector(`.reset-confirm`);
const resetDenyBtn = document.querySelector(`.reset-deny`);

homeBtn.addEventListener(`click`, backToHome);
resetConfirmBtn.addEventListener(`click`, resetConfirm);
resetDenyBtn.addEventListener(`click`, resetDeny);
resetPopupBtn.addEventListener(`click`, openResetPopup);


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