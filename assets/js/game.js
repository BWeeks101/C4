let activePlayer;
let completedTurns = 0;
let gameState = [
    [undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined]
];

/* Game Board */
let gBoardHeaders = ["","","","","","",""];
let gBoardDG = new DataGrid(gBoardHeaders, gameState);
/* end Game Board */

function gameClicked(object) {
    //Only Fire on Single Click!
    if (event.detail == 1) {        
        done = selectCol(object);
        if (done != false) {
            console.log(`P${activePlayer} Wins!`);
        }
        if (completedTurns == 42) {
            console.log("draw");
        }
        switchPlayer();
    }
    
}

function setupHotseat() {
    resetTurnCount();
    switchPlayer();
}

function resetTurnCount() {
    completedTurns = 0;
}

function switchPlayer() {
    switchActivePlayer();
    switch (activePlayer) {
        case 1:
            document.getElementById("player1Info").style.color = "rgb(236,76,76)";
            document.getElementById("player2Info").style.color = "#fafafa";
            break;
        case 2:
            document.getElementById("player2Info").style.color = "blue";
            document.getElementById("player1Info").style.color = "#fafafa";
            break;
    }
}

function switchActivePlayer() {
        switch (activePlayer) {
        case 1:
            activePlayer = 2;
            break;
        case 2:
            activePlayer = 1;
            break;
        default:
            activePlayer = 1;
            break;
    }
}

function selectCol(object) {
    let result = dataGridDisplayClicked(object, "col");

    for (i = result[1]; i > 0; i--) {
        if (gameState[result[2]][i-1] == undefined) {
            gameState[result[2]][i-1] = activePlayer;
            document.getElementById(`gBoardCol${result[2]}RowId${i-1}`).firstChild.lastChild.classList.add(`gbP${activePlayer}`);
            completedTurns = completedTurns + 1;
            winner = checkWin(result[2], i-1);
            return winner;
        }
    }
}

/* Check For Win Condition */
function checkWin(x, y) {
    x = parseInt(x);
    y = parseInt(y);

    console.log(`Col x: ${x}`);
    console.log(`Row y: ${y}`);

    if (completedTurns < 7) {
        return false; //Game cannot be won in less than 7 turns
    }

    let tokenCount = 1;
    //Check right from current position if as long as we are not in the last col
    if (x < 6) {
        for (i = x+1; i < 7; i++) {
            if (gameState[i][y] == activePlayer) {                
                tokenCount = tokenCount+1;
                console.log(`MATCH on Player ${activePlayer}.  Right Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i}.  Count: ${tokenCount}.`);
                if (tokenCount == 4) {
                    console.log(`Right Scan from Col: ${x} on Row: ${y}`);
                    return activePlayer;
                }
            } else {
                break;
            }
        }        
    }

    //We didn't get a winner yet, so search left from starting position as long as we are not in the first col
    if (x > 0) {
        for (i = x-1; i > -1; i--) {
            if (gameState[i][y] == activePlayer) {                
                tokenCount = tokenCount+1;
                console.log(`MATCH on Player ${activePlayer}.  Left Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i}.  Count: ${tokenCount}.`);
                if (tokenCount == 4) {
                    console.log(`Left Scan from Col: ${x} on Row: ${y}`);
                    return activePlayer;
                }
            } else {
                break;
            }
        }
    }
    
    //Still no winner, so reset token count and start looking vertically
    tokenCount = 1;

    //Check down from current position as long as we are not in the bottom row
    if (y < 5) {
        for (i = y+1; i < 6; i++) {
            if (gameState[x][i] == activePlayer) {                
                tokenCount = tokenCount+1;
                console.log(`MATCH on Player ${activePlayer}.  Down Scan starting at Col: ${x} on Row: ${y}.  Match at Row ${i}.  Count: ${tokenCount}.`);
                if (tokenCount == 4) {
                    console.log(`Down Scan from Col: ${x} on Row: ${y}`);
                    return activePlayer;
                }
            } else {
                break;
            }
        }
    }

    //No point in Up Scan, as we can't insert tokens below existing tokens!

    //Still no winner, so reset token count and start looking diagonally
    tokenCount = 1;
    let ii;
    console.log("Start Diagonal Search");

    //Check Right and Down from current position, as long as we are not in the bottom row or the last column
    if (x < 6 && y < 5) {
        ii = y+1;
        for (i = x+1; i < 6; i++) {
            console.log(`Move To Col ${i}, Row ${ii}`);
            if (gameState[i][ii] == activePlayer) {                
                tokenCount = tokenCount+1;
                console.log(`MATCH on Player ${activePlayer}.  Right/Down Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i}, Row ${ii}.  Count: ${tokenCount}.`);
                if (tokenCount == 4) {
                    console.log(`Right/Down Scan from Col: ${x} on Row: ${y}`);
                    return activePlayer;
                }
            } else {
                break;
            }
            if (ii < 5) {
                ii = ii+1;
            } else {
                break;
            }
        }
    }

    //We didn't get a winner yet, so check Left and Up from current position, as long as we are not in the top row or the first column
    if (x > 0 && y > 0) {
        ii = y-1;
        for (i = x-1; i > -1; i--) {
            console.log(`Move To Col ${i}, Row ${ii}`);
            if (gameState[i][ii] == activePlayer) {                
                tokenCount = tokenCount+1;
                console.log(`MATCH on Player ${activePlayer}.  Left/Up Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i}, Row ${ii}.  Count: ${tokenCount}.`);
                if (tokenCount == 4) {
                    console.log(`Left/Up Scan from Col: ${x} on Row: ${y}`);
                    return activePlayer;
                }
            } else {
                break;
            }
            if (ii > -1) {
                ii = ii-1;
            } else {
                break;
            }
        }
    }

    //still no winner, so reset token count and start looking diagonally in the opposite directions
    tokenCount = 1;

    //We didn't get a winner yet, so check Left and Down from current position, as long as we are not in the bottom row or the first column
    if (x > 0 && y < 5) {
        ii = y+1;
        for (i = x-1; i > -1; i--) {
            console.log(`Move To Col ${i}, Row ${ii}`);
            if (gameState[i][ii] == activePlayer) {                
                tokenCount = tokenCount+1;
                console.log(`MATCH on Player ${activePlayer}.  Left/Down Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i}, Row ${ii}.  Count: ${tokenCount}.`);
                if (tokenCount == 4) {
                    console.log(`Left/Down Scan from Col: ${x} on Row: ${y}`);
                    return activePlayer;
                }
            } else {
                break;
            }
            if (ii < 5) {
                ii = ii+1;
            } else {
                break;
            }
        }
    }

    //We didn't get a winner yet, so check Right and Up from current position, as long as we are not in the top row or the last column
    if (x < 6 && y > 0) {
        ii = y-1;
        for (i = x+1; i < 6; i++) {
            console.log(`Move To Col ${i}, Row ${ii}`);
            if (gameState[i][ii] == activePlayer) {                
                tokenCount = tokenCount+1;
                console.log(`MATCH on Player ${activePlayer}.  Right/Up Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i}, Row ${ii}.  Count: ${tokenCount}.`);
                if (tokenCount == 4) {
                    console.log(`Right/Up Scan from Col: ${x} on Row: ${y}`);
                    return activePlayer;
                }
            } else {
                break;
            }
            if (ii > -1) {
                ii = ii-1;
            } else {
                break;
            }
        }
    }

    return false;
}