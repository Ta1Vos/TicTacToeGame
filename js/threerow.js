const homeBtn = document.querySelector(`.home-button`);

const playFields = document.querySelectorAll(".grid-item");

homeBtn.addEventListener(`click`, backToHome);

function backToHome() {
    window.location = `/index.html`;
}

let playField = [false, false, false, false, false, false, false, false, false];
let blockClicked = false;
let fieldOccupation = 0;
let winValue = false;

let playerTurn = 1;

let computerPlaying = false;
let computerDifficulty = 0;
if (sessionStorage.getItem(`difficultySettings`)) {
    computerDifficulty = Number(sessionStorage.getItem(`difficultySettings`));
}

let twoPlayers = false;
let player1Name = `Speler 1`;
let player2Name = `Speler 2`;

if (sessionStorage.getItem(`Twoplayers`) == `false`) {
    twoPlayers = false;
} else if (sessionStorage.getItem(`Twoplayers`) == `true`) {
    twoPlayers = true;
}

//Eventlisteners are at the bottom due to it repeating and needing functions

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

const winPossibilities = [
    // The 3rd number on the right or the 2nd number in array.length is the one that will be placed
    //Horizontal
    //Row 1
    [0, 1, 2],
    [0, 2, 1],
    [1, 2, 0],
    //Row 2
    [3, 4, 5],
    [3, 5, 4],
    [4, 5, 3],
    //Row 3
    [6, 7, 8],
    [6, 8, 7],
    [7, 8, 6],
    //Vertical
    //column 1
    [0, 3, 6],
    [0, 6, 3],
    [3, 6, 0],
    //column 2
    [1, 4, 7],
    [1, 7, 4],
    [4, 7, 1],
    //column 3
    [2, 5, 8],
    [2, 8, 5],
    [5, 8, 2],
    //Diagonal
    //lefttop-bottomright
    [0, 4, 8],
    [0, 8, 4],
    [4, 8, 0],
    //leftbottom-topright
    [2, 4, 6],
    [2, 6, 4],
    [4, 6, 2],
]

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
    let nFill;
    //The for checks out all possible ways the computer can lose.
    for (i = 0; i < winPossibilities.length; i++) {
        const currentRow = winPossibilities[i];
        nOne = currentRow[0];
        nTwo = currentRow[1];
        nFill = currentRow[2];
        if (playField[nOne] == `O` && playField[nTwo] == `O` && playField[nFill] == false) {
            guessedArrayNumber = nFill + 1;
            i = 100;
            winDetected = true;
            return guessedArrayNumber;
        }
    }

    //If there is no way for the computer to win it will check if the player wins, else it will place randomly
    if (winDetected == false && computerDifficulty >= 3) {
        return computerLosePossibility();
    } else {
        return computerRandom();
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
    for (i = 0; i < winPossibilities.length; i++) {
        const currentRow = winPossibilities[i];
        nOne = currentRow[0];
        nTwo = currentRow[1];
        nFill = currentRow[2];
        if (playField[nOne] == `X` && playField[nTwo] == `X` && playField[nFill] == false) {
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

    if (computerDifficulty <= 0) {
        fieldNumber = computerRandom();
    } else if (computerDifficulty == 1) {
        fieldNumber = computerWinPossibility();
    } else if (computerDifficulty == 2) {
        fieldNumber = computerLosePossibility();
    } else if (computerDifficulty >= 3) {
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