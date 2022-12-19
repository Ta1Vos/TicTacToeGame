const playFields = document.querySelectorAll(".grid-item");
const player1ScoreLocation = document.querySelector(`.player1-score`);
const player2ScoreLocation = document.querySelector(`.player2-score`);

//Game values
let playField = [false, false, false, false, false, false, false, false, false];
let blockClicked = false;
let fieldOccupation = 0;
let playerTurn = 1;
//Win values
let winValue = false;
let playerWhoWon;
let Xstarts = true;
//Player values
let twoPlayers = false;
let player1Name = `Speler 1`;
let player2Name = `Speler 2`;
let player1Score = 0;
let player2Score = 0;
//Computer values
let computerPlaying = false;
let computerDifficulty = 0;

//Sessionstorage loaders
if (sessionStorage.getItem(`difficultySettings`)) {
    computerDifficulty = Number(sessionStorage.getItem(`difficultySettings`));
}

if (sessionStorage.getItem(`Twoplayers`) == `false`) {
    twoPlayers = false;
} else if (sessionStorage.getItem(`Twoplayers`) == `true`) {
    twoPlayers = true;
}

//Eventlisteners are at the bottom due to it repeating and requiring functions

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
];

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
];

//This array is used for impossible mode with the random placing near X's
const blockingPossibilities = [
    //1 - 3
    [1, 3, 4],
    [0, 2, 4],
    [1, 4, 5],
    //3 - 6
    [0, 4, 6],
    [0, 1, 2, 3, 5, 6, 7, 8],
    [2, 4, 8],
    //7 - 9
    [3, 4, 7],
    [4, 6, 8],
    [4, 5, 7],
];

//Checks whether the conditions are true where someone wins
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

                if (symbol == `X`) {
                    player1Score++;
                    player1ScoreLocation.innerHTML = player1Score;
                } else if (symbol == `O`) {
                    player2Score++;
                    player2ScoreLocation.innerHTML = player2Score;
                }
            }
        }
        if (fieldOccupation == 9 && winValue == false) {
            alert(`het is gelijk`);
        }
    }
    if (winValue == true) {
        console.log(`${symbol} won`);
        playerWhoWon = symbol;
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

//This function puts a symbol around the symbol the player places
function computerBlocking(currentNumber) {
    let availableSpace = [];
    let arrayNumber;
    //Launches random number if O starts, otherwise it will block X
    if (Xstarts == true) {
        //The pickedArray picks an array out of the possibilies in the blocking. The currentNumber would be the space the place selects.
        let pickedArray = blockingPossibilities[currentNumber];

        let randomNumberInArray;

        //This loop finds non-occupied space in an array which has to be defined as 'false'.
        for (i = 0; i < pickedArray.length; i++) {
            let pickedNumber = pickedArray[i];
            if (playField[pickedNumber] == false) {
                availableSpace.push(pickedNumber);
            }
        }

        //Uses a random number generator to pick a random space in the available space around the placed X, if there is no available spot it will place randomly
        for (i = 0; i < availableSpace.length; i++) {
            //Picks a random number out of the array available space, then adding up a number to make it equal to the selected space in the front-end playfield.
            randomNumberInArray = Math.floor(Math.random() * availableSpace.length);
            arrayNumber = availableSpace[randomNumberInArray] + 1;
            if (playField[arrayNumber] == false) {
                fieldNotOccupied = true;
                debugger
            }
        }
    } 

    //If availableSpace is empty, it means that there is no available space and that the computer will have to place randomly.
    if (Xstarts == false || availableSpace == []) {
        return computerRandom();
    }
    return arrayNumber;
}

//This function searches for any ways the computer can lose
function computerLosePossibility(currentNumber) {
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
    //If the difficulty is at hardest it will block the player, otherwise it will place randomly
    if (loseDetected == false) {
        if (computerDifficulty <= 3) {
            return computerRandom();
        } else if (computerDifficulty >= 4) {
            return computerBlocking(currentNumber);
        } 
    }
}

function computerWinPossibility(currentNumber) {
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
    //This is for the winning mode and the hardcore modes
    if (winDetected == false) {
        if (computerDifficulty >= 3) {
            return computerLosePossibility(currentNumber);
        } else {
            return computerRandom();
        } 
    }
}

//Main engine for the computer, chooses what to do depending on the difficulty, then it will launch the right function.
function computerTurn(currentNumber) {
    let fieldNumber;
    computerPlaying = true;

    if (computerDifficulty <= 0) {
        fieldNumber = computerRandom();
    } else if (computerDifficulty == 1) {
        fieldNumber = computerWinPossibility();
    } else if (computerDifficulty == 2) {
        fieldNumber = computerLosePossibility();
    } else if (computerDifficulty >= 3) {
        fieldNumber = computerWinPossibility(currentNumber);
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
    if (winValue == false && playField[currentNumber] == false) {
        if (playerTurn == 1) {
            fieldOccupation++;
            blockClicked = true;
            playerTurn = 2;
            currentBlock.innerHTML = `<img src="/img/X.png" alt="X" height="175px" width="175px">`;
            playField[currentNumber] = `X`;
            checkWin(`X`);
            if (twoPlayers == false) {
                //CurrentNumber is for the blocking function of the computer
                computerTurn(currentNumber);
            }
        } else if ((playerTurn == 2 && twoPlayers == true) || computerPlaying == true) {
            fieldOccupation++;
            blockClicked = true;
            playerTurn = 1;
            currentBlock.innerHTML = `<img src="/img/O.png" alt="O" height="175px" width="175px">`;
            playField[currentNumber] = `O`;
            checkWin(`O`);
            if (computerPlaying == true) {
                computerPlaying = false;
            }
        }
    }
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

//Resets the game, puts values back in their standard
function gameReset() {
    computerPlaying = false;
    
        if (winValue == true) {
            if (playerWhoWon == `X`) {
                Xstarts = false;
            } else if (playerWhoWon == `O`) {
                Xstarts = true;
            }
        }

    playerWhoWon = undefined;
    winValue = false;
    blockClicked = false;
    fieldOccupation = 0;
    playField = [false, false, false, false, false, false, false, false, false];

    for (i = 0; i < playFields.length; i++) {
        playFields[i].innerHTML = ``;
    }

    if (Xstarts == false) {
        playerTurn = 2;
    } else if (Xstarts == true) {
        playerTurn = 1;
    }

    if (playerTurn == 2 && twoPlayers == false) {
        computerTurn();
    }
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