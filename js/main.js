// const oHover = document.querySelector(`.grid-O`);
// const xHover = document.querySelector(`.grid-X`);

let playField = [false, false, false, false, false, false, false, false, false];
let playerTurn = 1;
let fieldOccupation = 0;
let winValue = false;
let blockClicked = false;

const winCondition = [
    //Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonal
    [0, 4, 8],
    [2, 4, 6],
]

const playFields = document.querySelectorAll(".grid-item");

for (i = 0; i < playFields.length; i++) {
    const currentNumber = i + 1;
    const playField = playFields[i];
    //Click eventlistener
    document.querySelector(`.block${currentNumber}`).addEventListener(`click`, function () {
        placeFigure(playField, currentNumber);
    });

    //Hover Eventlisteners below
    document.querySelector(`.block${currentNumber}`).addEventListener(`mouseenter`, function () {
        blockEnter(playField, currentNumber);
    });

    document.querySelector(`.block${currentNumber}`).addEventListener(`mouseleave`, function () {
        blockLeave(playField, currentNumber);
    });
}

function checkWin(symbol) {
    if (winValue == false) {
        for (i = 0; i <= 7; i++) {
            //Gets the value from the object
            const currentRow = winCondition[i];
            //n = number
            let nOne = currentRow[0];
            let nTwo = currentRow[1];
            let nThree = currentRow[2];

            if (playField[nOne] == symbol && playField[nTwo] == symbol && playField[nThree] == symbol) {
                setTimeout(() => {
                    alert(`${symbol} wint`);
                }, 100);
                winValue = true;
            }
        }
        if (fieldOccupation == 9 && winValue == false) {
            alert(`het is gelijk`);
        }
    }
    if (winValue == true) {
        for (i = 1; i < 10; i++) {
            let currentNumber = i;
            document.querySelector(`.block${currentNumber}`).removeEventListener(`click`, placeFigure);
        }
    }
}

function placeFigure(fieldItem, fieldNumber) {
    currentNumber = fieldNumber - 1;
    console.log(fieldNumber);
    const currentBlock = document.querySelector(`.block${fieldNumber}`);
    if (winValue == false && playField[(fieldNumber - 1)] == false) {
        if (playerTurn == 1) {
            fieldOccupation++;
            removeHoverListeners(fieldItem, fieldNumber);
            blockClicked = true;
            playerTurn = 2;
            currentBlock.removeEventListener(`click`, placeFigure);
            currentBlock.innerHTML = `<img src="img/X.png" alt="X" height="175px" width="175px">`;
            playField[currentNumber] = `X`;
            checkWin(`X`);
        } else if (playerTurn == 2) {
            fieldOccupation++;
            removeHoverListeners(fieldItem, fieldNumber);
            blockClicked = true;
            playerTurn = 1;
            currentBlock.removeEventListener(`click`, placeFigure);
            currentBlock.innerHTML = `<img src="img/O.png" alt="O" height="175px" width="175px">`;
            playField[currentNumber] = `O`;
            checkWin(`O`);
        }
    }
}

function removeHoverListeners(fieldItem, currentNumber) {
    fieldItem.removeEventListener(`mouseenter`, function () {
        blockEnter(playField, currentNumber);
    });

    fieldItem.removeEventListener(`mouseleave`, function () {
        blockLeave(playField, currentNumber);
    });
}

function blockEnter(currentBlock) {
    if (currentBlock.innerHTML == ``) {
        if (playerTurn == 1) {
            currentBlock.innerHTML += `<img src="img/X.png" alt="X" class="hover-opacity" height="175px" width="175px">`;
        } else if (playerTurn == 2) {
            currentBlock.innerHTML += `<img src="img/O.png" alt="O" class="hover-opacity" height="175px" width="175px">`;
        }
    }
}

function blockLeave(fieldItem, blockNumber) {
    if (playField[(blockNumber - 1)] != `X` && playField[(blockNumber - 1)] != `O`) {
        if (blockClicked == false) {
            document.querySelector(`.block${blockNumber}`).innerHTML = ``;
        }
    }
    blockClicked = false;
}