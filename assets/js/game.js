let activePlayer;
let completedTurns = 0;
let turnTimeLimit = 30;
let activeTurnTimer;
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
        if (document.getElementById("winnerPopup").classList.contains("d-none") == false) {
            return;
        } else {
            done = selectCol(object);
            if (done != false) {
                console.log(`P${activePlayer} Wins!`);
                winnerPopup();
            } else if (completedTurns == 42) {
                console.log("draw");
                winnerPopup("draw");
            }
            switchPlayer();
            restartTurnTimer();
        }
    }
    
}

function winnerPopup(result) {
    stopTurnTimer();
    if (result == "draw") {
        document.getElementById("winnerPopupText").innerHTML = "<h2>Draw!</h2>";
        document.getElementById("winnerPopupText").style.color = "#fafafa";
    } else {
        document.getElementById("winnerPopupText").innerHTML = `<h2>P${activePlayer} Wins!</h2>`;
        switch (activePlayer) {
            case 1:
                document.getElementById("winnerPopupText").style.color = "rgb(236,76,76)";
                break;
            case 2:
                document.getElementById("winnerPopupText").style.color = "blue";
                break;
        }
    } 
    
    elementDisplay("show", "winnerPopup");
}

function refreshHotseat() {
    stopTurnTimer();
    elementDisplay("hide", "winnerPopup");
    clearGameState();
    resetTurnCount();
    getActivePlayer();
    startTurnTimer();
}

function stopHotseat() {
    stopTurnTimer();
    elementDisplay("hide", "winnerPopup");
    clearGameState();
    resetTurnCount();
}

function startTurnTimer() {
    document.getElementById("turnTimeLimit").innerHTML = `${turnTimeLimit}`;
    activeTurnTimer = setInterval(updateTurnTimer, 1000);
}

function updateTurnTimer() {
    timerVal = parseInt(document.getElementById("turnTimeLimit").innerHTML);
    if (timerVal > 0) {
        document.getElementById("turnTimeLimit").innerHTML = `${timerVal-1}`;
    } else {
        console.log(`P${activePlayer} Missed Turn - selecting random column`)
        done = selectRandCol();
        if (done != false) {
            console.log(`P${activePlayer} Wins!`);
            winnerPopup();
            stopTurnTimer();
            return;
        } else if (completedTurns == 42) {
            console.log("draw");
            winnerPopup("draw");
            stopTurnTimer();
            return;
        }
        switchPlayer();
        restartTurnTimer();
    }    
}

function stopTurnTimer() {
    clearInterval(activeTurnTimer);
    document.getElementById("turnTimeLimit").innerHTML = ``;
}

function restartTurnTimer() {
    stopTurnTimer();
    startTurnTimer();
}

function clearGameState() {
    let i = gameState.length;
    let ii;

    for (i = 0; i < gameState.length; i++) {
        for (ii = 0; ii < gameState[i].length; ii++) {
            gameState[i][ii] = undefined;
        }
    }

    console.log(gameState);
    console.log(gBoardDG);
}

function resetTurnCount() {
    completedTurns = 0;
}

function getActivePlayer() {
    switch (activePlayer) {
        case 1:
            document.getElementById("player1Info").style.color = "rgb(236,76,76)";
            document.getElementById("player2Info").style.color = "#fafafa";
            break;
        case 2:
            document.getElementById("player2Info").style.color = "blue";
            document.getElementById("player1Info").style.color = "#fafafa";
            break;
        default:
            switchActivePlayer();
            break;
    }
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

function selectRandCol() {
    let colArray = [];
    for (i = 0; i < 7; i++) {
        if (gameState[0][i] == undefined) {
            colArray.push(i);
        }
    }
    
    let col = colArray[Math.floor((Math.random() * colArray.length))];

    for (i = 5; i > -1; i--) {
        if (gameState[i][col] == undefined) {
            gameState[i][col] = activePlayer;
            document.getElementById(`gBoardCol${col}RowId${i}`).firstChild.lastChild.classList.add(`gbP${activePlayer}`);
            completedTurns = completedTurns + 1;
            console.log(`Col: ${col}, Row: ${i}`);
            winner = checkWin(col, i);
            return winner;
        }
    }

    return false;
}

function selectCol(object) {
    let result = dataGridDisplayClicked(object, "col");
    console.log(result);
    console.log(object);

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
    if (completedTurns < 7) {
        console.log("Game cannot be won in less than 7 turns.  Skipping");
        return false; //Game cannot be won in less than 7 turns
    }

    x = parseInt(x);
    y = parseInt(y);

    //console.log(`Col x: ${x}`);
    //console.log(`Row y: ${y}`);    

    /* Horizontal Scan */
    //console.log(`Start Scan Right`);
    let tokenCount = scanDir("r", x, y);
    //console.log(`Scan Right Found ${tokenCount} tokens`);
    if (tokenCount < 4) {
        //console.log(`Start Scan Left`);
        tokenCount = scanDir("l", x, y, tokenCount);
        //console.log(`Scan Left Found ${tokenCount} tokens`);
    }

    /* Vertical Scan */
    if (tokenCount < 4) {
        //console.log(`Start Scan Down`);
        tokenCount = scanDir("d", x, y);
        //console.log(`Scan Down Found ${tokenCount} tokens`);
    }

    /* Diagonal Scan, Right/Down, Left/Up */
    if (tokenCount < 4) {
        //console.log(`Start Scan Right/Down`);
        tokenCount = scanDir("rd", x, y);
        //console.log(`Scan Right/Down Found ${tokenCount} tokens`);
        if (tokenCount < 4) {
            //console.log(`Start Scan Left/Up`);
            tokenCount = scanDir("lu", x, y, tokenCount);
            //console.log(`Scan Left/Up Found ${tokenCount} tokens`);
        }
    }

    /* Diagonal Scan, Left/Down, Right/Up */
    if (tokenCount < 4) {
        //console.log(`Start Scan Left/Down`);
        tokenCount = scanDir("ld", x, y);
        //console.log(`Scan Left/Down Found ${tokenCount} tokens`);
        if (tokenCount < 4) {
            //console.log(`Start Scan Right/Up`);
            tokenCount = scanDir("ru", x, y, tokenCount);
            //console.log(`Scan Right/Up Found ${tokenCount} tokens`);
        }
    }

    //console.log(`Counted ${tokenCount} tokens`);
    if (tokenCount == 4) {
        //console.log(`Win for P${activePlayer}`);
        return activePlayer;
    } else {
        //console.log(`No Winner Yet`);
        return false;
    }    
}

function scanDir(scanDir, startX, startY, tokenCount) {
    x = parseInt(startX);
    y = parseInt(startY);
    if (tokenCount == undefined) {
        tokenCount = 1;        
    } else {
        tokenCount = parseInt(tokenCount);
    }

    let i;
    let ii;
    let brk;
    let dBrk;
    let mod;
    let dMod;
    let inc = 1;
    let dec = -1;
    let scanDesc;
    let val;

    //console.log(`Prepping Scan Values`)
    switch (scanDir) {
        case "r":
            if (x < 6) {
                scanDesc = "Right";
                i = x+1;
                brk = 7;
                mod = inc;
            } else {
                //console.log(`Right Scan Aborted.  Rightmost Col Selected (${x})`);
                return tokenCount;
            }
            break;
        case "l":
            if (x > 0) {
                scanDesc = "Left";
                i = x-1;
                brk = -1;
                mod = dec;
            } else {
                //console.log(`Left Scan Aborted.  Leftmost Col Selected (${x})`);
                return tokenCount;
            }
            break;
        case "d":
            if (y < 5) {
                scanDesc = "Down";
                i = y+1;
                brk = 6;
                mod = inc;
            } else {
                //console.log(`Down Scan Aborted.  Token in Bottom Row (${y})`);
                return tokenCount;
            }
            break;
        case "rd":
            if (x < 6 && y < 5) {
                scanDesc = "Right/Down";
                i = x+1;
                ii = y+1;
                brk = 7;
                dBrk = 6;
                mod = inc;
                dMod = inc;
            } else {
                /*
                if (x > 5) {
                    console.log(`Right/Down Scan Aborted.  Rightmost Col Selected (${x})`);
                }
                if (y > 4) {
                    console.log(`Right/Down Scan Aborted.  Token in Bottom Row (${y})`);
                }
                */               
                return tokenCount;
            }
            break;
        case "lu":
            if (x > 0 && y > 0) {
                scanDesc = "Left/Up";
                i = x-1;
                ii = y-1;
                brk = -1;
                dBrk = -1;
                mod = dec;
                dMod = dec;
            } else {
                /*
                if (x < 1) {
                    console.log(`Left/Up Scan Aborted.  Leftmost Col Selected (${x})`);
                }
                if (y < 1) {
                    console.log(`Left/Up Scan Aborted.  Token in Top Row (${y})`);
                }
                */               
                return tokenCount;
            }
            break;
        case "ld":
            if (x > 0 && y < 5) {
                scanDesc = "Left/Down";
                i = x-1;
                ii = y+1;
                brk = -1;
                dBrk = 6;
                mod = dec;
                dMod = inc;
            } else {
                /*
                if (x < 1) {
                    console.log(`Left/Down Scan Aborted.  Leftmost Col Selected (${x})`);
                }
                if (y > 4) {
                    console.log(`Left/Down Scan Aborted.  Token in Bottom Row (${y})`);
                }
                */               
                return tokenCount;
            }
            break;
        case "ru":
            if (x < 6 && y > 0) {
                scanDesc = "Right/Up";
                i = x+1;
                ii = y-1;
                brk = 7;
                dBrk = -1;
                mod = inc;
                dMod = dec;
            } else {
                /*
                if (x > 5) {
                    console.log(`Right/Up Scan Aborted.  Rightmost Col Selected (${x})`);
                }
                if (y < 1) {
                    console.log(`Right/Up Scan Aborted.  Token in Top Row (${y})`);
                }
                */               
                return tokenCount;
            }
            break;
    }

    //console.log(`Starting For Loop`);
    //console.log(`${i}, ${ii}, ${brk}, ${dBrk}, ${mod}, ${dMod}`);
    for (i;;i = i+mod) {
        if (i == brk) {
            //console.log (`i(${i}) == brk(${brk})`);
            break;
        } else if (ii != undefined && ii == dBrk) {
            //console.log (`ii(${ii}) == dBrk(${dBrk})`);
            break;
        }

        switch (scanDir) {
            case "r":
            case "l":
                val = gameState[i][y];
                break;
            case "d":
                val = gameState[x][i];
                break;
            case "rd":
            case "lu":
            case "ld":
            case "ru":
                val = gameState[i][ii];
                break;                
        }
        //console.log(`value: ${val}`);
        if (val == activePlayer) {            
            tokenCount++;            
            //console.log(`MATCH on Player ${activePlayer}.  ${scanDesc} Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i}.  Count: ${tokenCount}.`);
            if (tokenCount == 4) {
                //console.log(`${scanDesc} Scan from Col: ${x} on Row: ${y}`);
                return tokenCount;
            }
        } else {
            break;
        }

        if (ii != undefined) {
            ii = ii+dMod;
        }
    }

    return tokenCount;
}