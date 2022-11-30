const homeBtn = document.querySelector(`.home-button`);
homeBtn.addEventListener(`click`, backToHome);

function backToHome() {
    window.location = `/index.html`;
}


let playField = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let blockClicked = false;
let winValue = false;
let fieldOccupation = 0;

let playerTurn = 1;
let twoPlayers = false;
let computerPlaying = false;
let computerDifficulty = 2;

let player1Name = `Speler 1`;
let player2Name = `Speler 2`;

const winCondition = [
    //Horizontal
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    //Vertical
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    //Diagonal
    [0, 5, 10, 15],
    [3, 6, 9, 12],
]

const winPossibilities = [
    // The 4th number on the right or the 3rd number in array. length is the one that will be placed
    //HORIZONTAL
    //Row 0 - 3
    [0, 1, 2, 3],
    [0, 1, 3, 2],
    [0, 2, 3, 1],
    [1, 2, 3, 0],
    //Row 4 - 7
    [4, 5, 6, 7],
    [4, 5, 7, 6],
    [4, 6, 7, 5],
    [5, 6, 7, 4],
    //Row 8 - 11
    [8, 9, 10, 11],
    [8, 9, 11, 10],
    [8, 10, 11, 9],
    [9, 10, 11, 8],
    // Row 12 - 15
    [12, 13, 14, 15],
    [12, 13, 15, 14],
    [12, 14, 15, 13],
    [13, 14, 15, 12],

    //VERTICAL
    //column 0 - 12
    [0, 4, 8, 12],
    [0, 4, 12, 8],
    [0, 8, 12, 4],
    [4, 8, 12, 0],
    //column 1 - 13
    [1, 5, 9, 13],
    [1, 5, 13, 9],
    [1, 9, 13, 5],
    [5, 9, 13, 1],
    //column 2 - 14
    [2, 6, 10, 14],
    [2, 6, 14, 10],
    [2, 10, 14, 6],
    [6, 10, 14, 2],
    //column 3 - 15
    [3, 7, 11, 15],
    [3, 7, 15, 11],
    [3, 11, 15, 7],
    [7, 11, 15, 3],
    //Diagonal
    //lefttop-bottomright
    [0, 5, 10, 15],
    [0, 5, 15, 10],
    [0, 10, 15, 5],
    [5, 10, 15, 0],
    //leftbottom-topright
    [3, 6, 9, 12],
    [3, 6, 12, 9],
    [3, 9, 12, 6],
    [6, 9, 12, 3],
]

const playFields = document.querySelectorAll(".grid-item");

function checkWin(symbol) {
    if (winValue == false) {
        for (i = 0; i <= 9; i++) {
            //Gets the value from the object
            
            const currentRow = winCondition[i];
            console.log("currentRow =" + currentRow);
            //n = number
            let nOne = currentRow[0];
            let nTwo = currentRow[1];
            let nThree = currentRow[2];
            let nFour = currentRow[3]

            if (playField[nOne] == symbol && playField[nTwo] == symbol && playField[nThree] == symbol && playField[nFour] == symbol) {
                setTimeout(() => {
                    alert(`${symbol} wint`);
                }, 100);
                winValue = true;
            }
        }
        if (fieldOccupation == 16) {
            if (winValue == false) {
                alert(`het is gelijk`);
            }
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

//This function basically gets a random available fieldspace
function computerRandom() {
    let selectedFieldNumber;
    let guessedArrayNumber;
    const savingArray = [];
    //The for puts available space in an array and will then choose out of it.
    for (let i = 0; i < playField.length; i++) {
        if (playField[i] == false) {
            savingArray.push(i);
        }
    }

    guessedArrayNumber = Math.floor(Math.random() * (savingArray.length));
    selectedFieldNumber = savingArray[guessedArrayNumber] + 1;

    return selectedFieldNumber;
}

function computerWinPossibility() {
    let winDetected = false;
    //n = number
    let nOne;
    let nTwo;
    let nThree;
    let nFill;
    //The for checks out all possible ways the computer can lose.
    for (i = 0; i < winPossibilities.length; i++) {
        const currentRow = winPossibilities[i];
        nOne = currentRow[0];
        nTwo = currentRow[1];
        nThree = currentRow[2];
        nFill = currentRow[3];
        if (playField[nOne] == `O` && playField[nTwo] == `O` && playField[nThree] == `O` && playField[nFill] == false) {
            guessedArrayNumber = nFill + 1;
            i = 100;
            winDetected = true;
            return guessedArrayNumber;
        }
    }


    //If there is no way for the computer to win it will check if the player wins, else it will place randomly
    if (winDetected == false) {
        return computerLosePossibility();
    }
}

//This function searches for any ways the computer can lose
function computerLosePossibility() {
    let loseDetected = false;
    //n = number
    let nOne;
    let nTwo;
    let nFill;
    //The for checks out all possible ways the computer can lose.
    // Activates when the grid is THREE \/
    for (i = 0; i < winPossibilities.length; i++) {
        const currentRow = winPossibilities[i];
        nOne = currentRow[0];
        nTwo = currentRow[1];
        nThree = currentRow[2]
        nFill = currentRow[3];
        if (playField[nOne] == `X` && playField[nTwo] == `X` && playField[nThree] == `X` && playField[nFill] == false) {
            guessedArrayNumber = nFill + 1;
            i = 100;
            loseDetected = true;
            return guessedArrayNumber;
        }
    }


    //If the player doesn't win yet the computer will proceed to randomly place an O
    if (loseDetected == false) {
        return computerRandom();
    }
}

//Main engine for the computer, chooses what to do depending on the difficulty, then it will launch the right function.
function computerTurn() {
    let fieldNumber;
    computerPlaying = true;

    if (computerDifficulty == 0) {
        fieldNumber = computerRandom();
    } else if (computerDifficulty == 1) {
        fieldNumber = computerLosePossibility();
    } else if (computerDifficulty >= 2) {
        fieldNumber = computerWinPossibility();
    }

    const fieldItem = document.querySelector(`.block${fieldNumber}`);
    setTimeout(() => {
        placeFigure(fieldItem, fieldNumber);
    }, 1);
}

//Places an O or an X depending on current turn
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
            currentBlock.innerHTML = `<img src="/img/X.png" alt="X" height="175px" width="175px">`;
            playField[currentNumber] = `X`;
            checkWin(`X`);
            if (twoPlayers == false) {
                computerTurn();
            }
        } else if ((playerTurn == 2 && twoPlayers == true) || computerPlaying == true) {
            fieldOccupation++;
            removeHoverListeners(fieldItem, fieldNumber);
            blockClicked = true;
            playerTurn = 1;
            currentBlock.removeEventListener(`click`, placeFigure);
            currentBlock.innerHTML = `<img src="/img/O.png" alt="O" height="175px" width="175px">`;
            playField[currentNumber] = `O`;
            checkWin(`O`);
            if (computerPlaying == true) {
                computerPlaying = false;
            }
        }
    }
}

//Removes the hover on fields that have been clicked - THIS IS BROKEN
function removeHoverListeners(playField, currentNumber) {
    console.log("playField " + playField);

    playField.removeEventListener(`mouseenter`, blockEnter);


    playField.removeEventListener(`mouseleave`, blockLeave);
}

//Places the O/X hover and decides which one it should be
function blockEnter(currentBlock) {
    if (currentBlock.innerHTML == `` && winValue == false) {
        if (playerTurn == 1) {
            currentBlock.innerHTML += `<img src="/img/X.png" alt="X" class="hover-opacity" height="175px" width="175px">`;
        } else if (playerTurn == 2 && twoPlayers == true) {
            currentBlock.innerHTML += `<img src="/img/O.png" alt="O" class="hover-opacity" height="175px" width="175px">`;
        }
    }
}

//Turns the X/O hover off
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