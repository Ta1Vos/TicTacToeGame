let playField = [false, false, false, false, false, false, false, false, false];
let playerTurn = 1;
let fieldOccupation = 0;
let winValue = false;
let blockClicked = false;
let twoPlayers = true;

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
            const fieldItem = document.querySelector(`.block${i}`);
            fieldItem.removeEventListener(`click`, placeFigure);
            removeHoverListeners(fieldItem, i);
        }
    }
}

function computerTurn() {
    fieldOccupation++;
    const savingArray = [];
    let guessedNumber = Math.floor(Math.random() * 9);
    const fieldItem = document.querySelector(`.block${guessedNumber + 1}`);

    for (let i = 0; i < playField.length; i++) {
        if (playField[i] == false) {
            savingArray.push(i);
        }
    }
    console.log(savingArray);
    // placeFigure(fieldItem, guessedNumber);
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
            if (twoPlayers == false) {
                computerTurn();
            }
        } else if (playerTurn == 2 && twoPlayers == true) {
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

function removeHoverListeners(playField, currentNumber) {
    console.log("playField " + playField);
    
    playField.removeEventListener(`mouseenter`, blockEnter);


    playField.removeEventListener(`mouseleave`, blockLeave);
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







for (i = 0; i < playFields.length; i++) {
    const currentNumber = i + 1;
    const playField = playFields[i];
    //Click eventlistener
    playField.addEventListener(`click`, function () {
        placeFigure(playField, currentNumber);
    });

    //Hover Eventlisteners below
    playField.addEventListener(`mouseenter`, function () {
        blockEnter(playField, currentNumber);
    });

    playField.addEventListener(`mouseleave`, function () {
        blockLeave(playField, currentNumber);
    });
}