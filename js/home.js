const player1Tickbox = document.querySelector(`.player-1`);
const player2Tickbox = document.querySelector(`.player-2`);
const startButton = document.querySelector(`.play-button`);

let gridThree = true;
let twoPlayers = true;

function redirectToGame() {
    const buttonOne = player1Tickbox.value;
    const buttonTwo = player2Tickbox.value;
    if (gridThree == true) {
        window.location = `/html/threeGame.html`;
    } else if (gridThree == false) {
        window.location = `/html/fourGame.html`;
    }
}

function onePlayerButton() {
    twoPlayers = false;
    alert("")
}

function twoPlayerButton() {
    twoPlayers = true;
    alert(``)
}
 
player1Tickbox.addEventListener(`click`, onePlayerButton);
player2Tickbox.addEventListener(`click`, twoPlayerButton);
startButton.addEventListener(`click`, redirectToGame);