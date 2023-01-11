const playFields = document.querySelectorAll(".grid-item");

//Playfield values
const corners = [0, 2, 6, 8];
const edges = [1, 3, 5, 7];
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
let firstTurn = [false, false];
let simulationLoopCount = 0;
//This array is used for the simulation to recognize loses
let gameLoseList = [];

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
                winValue = true;

                if (symbol == `X`) {
                    player1Score++;
                    player1ScoreLocation.innerHTML = player1Score;
                    launchPopup(`X (${player1Name}) wint`);
                } else if (symbol == `O`) {
                    player2Score++;
                    player2ScoreLocation.innerHTML = player2Score;
                    launchPopup(`O (${player2Name}) wint`);
                }
            }
        }
        if (fieldOccupation == 9 && winValue == false) {
            launchPopup(`Het is gelijk`);
            console.log(`Nobody won (TIE)`);
            console.log(`------------------`);
        }
    }
    if (winValue == true) {
        console.log(`${symbol} won`);
        console.log(`------------------`);
        playerWhoWon = symbol;
    }
}

//This function basically gets a random available fieldspace
function computerRandom() {
    let selectedFieldNumber;

    const pickedNumber = randomEmptyPickInArray(playField);
    selectedFieldNumber = pickedNumber + 1;

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
            }
        }
    }

    //If availableSpace is empty, it means that there is no available space and that the computer will have to place randomly.
    if (Xstarts == false || availableSpace.length == 0) {
        return computerRandom();
    }
    return arrayNumber;
}

function computerImpossibleBlocking(currentNumber) {
    const freeCornerSpace = findUnoccupiedSpace(corners);

    if (freeCornerSpace.length == 2 && firstTurn[1] == false) {
        let xCount = 0;

        for (let i = 0; i < corners.length; i++) {
            if (playField[corners[i]] == `X`) {
                xCount++;
            }
        }

        if (xCount == 2) {
            const freeEdgeSpace = findUnoccupiedSpace(edges);
            const randomSpace = Math.floor(Math.random() * freeEdgeSpace.length);
            firstTurn[1] = true;
            return freeEdgeSpace[randomSpace] + 1;
        }
    }

    if (firstTurn[0] == true && freeCornerSpace.length == 2) {
        return placeCorner();
    }

    let generatedNumber = computerSimulation(currentNumber);
    if (generatedNumber === undefined) {
        generatedNumber = computerBlocking(currentNumber);
    }

    return generatedNumber;
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
        } else if (computerDifficulty == 4) {
            return computerBlocking(currentNumber);
        } else if (computerDifficulty == 5) {
            return computerImpossibleBlocking(currentNumber);
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

function computerPlaceMiddle(currentNumber) {
    if (firstTurn[0] == false) {
        if (playField[4] == false) {
            firstTurn[0] = true;
            return 5;
        } else if (playField[4] == `X`) {
            firstTurn[0] = true;
            return placeCorner();
        }
        firstTurn[0] = true;
        return computerPlaceMiddle(currentNumber);
    }
    return computerWinPossibility(currentNumber);
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
    } else if (computerDifficulty == 3 || computerDifficulty == 4) {
        fieldNumber = computerWinPossibility(currentNumber);
    } else if (computerDifficulty == 5) {
        fieldNumber = computerPlaceMiddle(currentNumber);
    }

    //Saves the field location, adds in every function by one as the div count starts at 1
    const fieldItem = document.querySelector(`.block${fieldNumber}`);
    setTimeout(() => {
        placeFigure(fieldItem, fieldNumber);
    }, 1);
}

function placeCorner() {
    const freeCornerSpace = findUnoccupiedSpace(corners);
    const randomSpace = Math.floor(Math.random() * freeCornerSpace.length);
    return freeCornerSpace[randomSpace] + 1;
}

//Places an O or an X depending on current turn
function placeFigure(fieldItem, fieldNumber) {
    currentNumber = fieldNumber - 1;
    const currentBlock = document.querySelector(`.block${fieldNumber}`);
    if (winValue == false && playField[currentNumber] == false) {
        if (playerTurn == 1) {
            console.log(`X: ${fieldNumber}. Turn: ${fieldOccupation}`);
            fieldOccupation++;
            blockClicked = true;
            playerTurn = 2;
            currentBlock.innerHTML = `<img src="/img/X.png" alt="X" class="placed-figure" height="175px" width="175px">`;
            playField[currentNumber] = `X`;
            checkWin(`X`);
            if (twoPlayers == false) {
                //CurrentNumber is for the blocking function of the computer
                computerTurn(currentNumber);
            }
        } else if ((playerTurn == 2 && twoPlayers == true) || computerPlaying == true) {
            console.log(`O: ${fieldNumber} Turn: ${fieldOccupation}`);
            fieldOccupation++;
            blockClicked = true;
            playerTurn = 1;
            currentBlock.innerHTML = `<img src="/img/O.png" alt="O" class="placed-figure" height="175px" width="175px">`;
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

    //Game values
    playerWhoWon = undefined;
    winValue = false;
    blockClicked = false;
    fieldOccupation = 0;
    playField = [false, false, false, false, false, false, false, false, false];

    //Computer values
    firstTurn = [false, false];

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

//Just like the windetection for the game, this only has a whole different function.
function checkSimulationWin(turn, simulatedPlayfield) {
    for (i = 0; i <= 7; i++) {
        //Gets the value from the object
        const currentRow = winCondition[i];
        //n = number
        let nOne = currentRow[0];
        let nTwo = currentRow[1];
        let nThree = currentRow[2];

        if (simulatedPlayfield[nOne] == turn && simulatedPlayfield[nTwo] == turn && simulatedPlayfield[nThree] == turn) {
            turnNotFound = false;
            let winArray = [turn, nOne, nTwo, nThree];

            if (turn == `X`) {
                return winArray;
            } else if (turn == `O`) {
                return winArray;
            } else {
                return undefined;
            }
        }
    }
}

//Computer generates an amount of games with random moves, when 
function computerSimulation() {
    let simulatedPlayfield = playField.slice();
    let turnNotFound = true;
    let loseNotFound = true;
    let simFieldOccupation = fieldOccupation;
    let loseCombinations = [];

    let Xturn;
    let Oturn;
    let symbolWon;

    let loopCount = 0;

    while (turnNotFound == true && loopCount < 15000) {
        Xturn = randomEmptyPickInArray(simulatedPlayfield);
        simulatedPlayfield[Xturn] = `X`;
        symbolWon = checkSimulationWin(`X`, simulatedPlayfield);
        simFieldOccupation++;

        if (symbolWon == undefined) {
            Oturn = randomEmptyPickInArray(simulatedPlayfield);
            simulatedPlayfield[Oturn] = `O`;
            symbolWon = checkSimulationWin(`O`, simulatedPlayfield);
            simFieldOccupation++;
        }

        if (symbolWon != undefined) {
            if (symbolWon[0] == `X`) {
                //Combination in which the computer loses
                let loseArray = [symbolWon[1], symbolWon[2], symbolWon[3], 0];

                //This if statement only activates the first time when loseCombinations is empty.
                if (loseCombinations.length == 0) {
                    loseCombinations.push(loseArray);
                }

                //The loop checks if the combination has been noted already, if it is it will only increase a value to spare up memory.
                for (let i = 0; i < loseCombinations.length; i++) {
                    let tempArray = loseCombinations[i];
                    //If the combinations are equal to the combinations in the saved loseCombination it will only increase a single value
                    if (loseArray[0] == tempArray[0] && loseArray[1] == tempArray[1] && loseArray[2] == tempArray[2]) {
                        tempArray[3]++;
                        loseNotFound = false;
                        break;
                    }
                }

                if (loseNotFound == true) {
                    loseCombinations.push(loseArray);
                    for (let i = 0; i < loseCombinations.length; i++) {
                        let tempArray = loseCombinations[i];
                        //If the combinations are equal to the combinations in the saved loseCombination it will only increase a single value
                        if (loseArray[0] == tempArray[0] && loseArray[1] == tempArray[1] && loseArray[2] == tempArray[2]) {
                            tempArray[3]++;
                            loseNotFound = false;
                            break;
                        }
                    }
                }
            }
        }

        if (simFieldOccupation >= 10 || loseNotFound == false) {
            simulatedPlayfield = playField.slice();
            simFieldOccupation = fieldOccupation;
            loseNotFound = true;
        }
        loopCount++;
    }

    //If there are barely any results there won't be many possibilities anymore, so the computer can simply place randomly.
    if (loseCombinations.length <= 1) {
        return undefined;
    } else {
        let losePossibilities = [];
        let totalComparisons;
        //This loop removes occupied spaces and ignores arrays of 3
        for (let i = 0; i < loseCombinations.length; i++) {
            const tempArray = findUnoccupiedSpace(loseCombinations[i]);

            if (tempArray.length == 2) {
                losePossibilities.push(tempArray.slice());
            }
        }

        /* This loop compares arrays with eachother and notes if numbers that are found are the same in other arrays, these would make the computer lose next turn!
        i = current array that is being compared. x = the array that the main is being compared to.
        (this loop picks out every array) */
        for (let i = 0; i < losePossibilities.length; i++) {
            const tempArray = losePossibilities[i];
            //This loop compares both arrays and makes sure the same wont be compared
            for (let x = 0; x < losePossibilities.length; x++) {
                const currentArray = losePossibilities[x];

                if (tempArray != losePossibilities[x]) {
                    //This loop compares the exact numbers
                    for (let y = 0; y < tempArray.length; y++) {
                        const tempArrayNumber = tempArray[y];
                        if (tempArrayNumber == currentArray[0]) {
                            totalComparisons = tempArrayNumber;
                            break;
                        } else if (tempArrayNumber == currentArray[1]) {
                            totalComparisons = tempArrayNumber;
                            break;
                        }
                    }
                }
            }
        }

        if (totalComparisons === undefined) {
            return undefined;
        }
        return totalComparisons + 1;
    }
}

//Function finds values that are listed as 'false' within an array
function findUnoccupiedSpace(givenArray) {
    const savingArray = [];
    //The for puts available space in an array and will then choose out of it.
    for (let i = 0; i < givenArray.length; i++) {
        if (playField[givenArray[i]] == false) {
            savingArray.push(givenArray[i]);
        }
    }

    return savingArray;
}

//Function finds 'false' within an array and picks a random false out of it.
function randomEmptyPickInArray(givenArray) {
    let guessedArrayNumber;
    const savingArray = [];
    //The for puts available space in an array and will then choose out of it.
    for (let i = 0; i < givenArray.length; i++) {
        if (givenArray[i] == false) {
            savingArray.push(i);
        }
    }

    guessedArrayNumber = Math.floor(Math.random() * (savingArray.length));
    return savingArray[guessedArrayNumber];
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