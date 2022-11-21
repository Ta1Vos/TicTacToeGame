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

for (i = 1; i < 10; i++) {
    let currentNumber = i;
    document.querySelector(`.block${currentNumber}`).addEventListener(`click`, placeFigure);
    document.querySelector(`.block${currentNumber}`).addEventListener(`mouseenter`, function() {
        blockEnter(currentNumber);
    });
    document.querySelector(`.block${currentNumber}`).addEventListener(`mouseleave`, function() {
        blockLeave(currentNumber);
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
                alert(`${symbol} wint`);
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

function placeFigure(clickEvent) {
    fieldOccupation++;
    blockNumber = clickEvent.target.textContent;
    currentNumber = blockNumber - 1;
    console.log(blockNumber);
    // const gridItemLocation = document.querySelector(`.block${blockNumber}`);
    if (playerTurn == 1) {
        blockClicked = true;
        playerTurn = 2;
        document.querySelector(`.block${blockNumber}`).removeEventListener(`click`, placeFigure);
        document.querySelector(`.block${blockNumber}`).innerHTML = `<img src="img/X.png" alt="X" height="175px" width="175px">`;
        playField[currentNumber] = `X`;
        checkWin(`X`);
    } else if (playerTurn == 2) {
        blockClicked = true;
        playerTurn = 1;
        document.querySelector(`.block${blockNumber}`).removeEventListener(`click`, placeFigure);
        document.querySelector(`.block${blockNumber}`).innerHTML = `<img src="img/O.png" alt="O" height="175px" width="175px">`;
        playField[currentNumber] = `O`;
        checkWin(`O`);
    }
}

// function switchHover() {
//     if (playerTurn == 1) {

//         document.querySelector(`grid-item:hover`).background-image = url(`/img/X.png`);
//     } else if (playerTurn == 2) {
//         for (i = 1; i < 10; i++) {
//             let currentNumber = i;
//             document.querySelector(`grid-item:hover`).style.background = url(`/img/O.png`);
//         }
//     }
// }

// switchHover();

function removeHoverListeners(blockNumber) {
    document.querySelector(`.block${blockNumber}`).removeEventListener(`mouseenter`, function() {
        blockEnter(currentNumber);
    });
    document.querySelector(`.block${blockNumber}`).removeEventListener(`mouseleave`, function() {
        blockLeave(currentNumber);
    });
}

function blockEnter(blockNumber) {
    if (playerTurn == 1) {
        document.querySelector(`.block${blockNumber}`).innerHTML += `<img src="img/X.png" alt="X" height="175px" width="175px">`;
    } else if (playerTurn == 2) {
        document.querySelector(`.block${blockNumber}`).innerHTML += `<img src="img/O.png" alt="O" height="175px" width="175px">`;
    }
}

function blockLeave(blockNumber) {
    if (blockClicked == false) {
        document.querySelector(`.block${blockNumber}`).innerHTML = blockNumber;
    }
    blockClicked = false;
}