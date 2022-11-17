let playField = [false, false, false, false, false, false, false, false, false];
let playerTurn = 1;
let fieldOccupation = 0;

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

function checkWin(symbol) {

    for (i = 0; i <= 7; i++) {
        let winValue;
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

for (i = 1; i < 10; i++) {
    let currentNumber = i;
    document.querySelector(`.block${currentNumber}`).addEventListener(`click`, placeFigure);
}

function placeFigure(clickEvent) {
    fieldOccupation++;
    blockClick = clickEvent.target.textContent;
    currentNumber = blockClick - 1;
    console.log(blockClick)
    if (playerTurn == 1) {
        playerTurn = 2;
        document.querySelector(`.block${blockClick}`).removeEventListener(`click`, placeFigure);
        document.querySelector(`.block${blockClick}`).innerText = `X`;
        playField[currentNumber] = `X`;
        checkWin(`X`);
    } else if (playerTurn == 2) {
        playerTurn = 1;
        document.querySelector(`.block${blockClick}`).removeEventListener(`click`, placeFigure);
        document.querySelector(`.block${blockClick}`).innerText = `O`;
        playField[currentNumber] = `O`;
        checkWin(`O`);
    }
}