/* Game Board */
let gBoardHeaders = ["","","","","","",""];
let gBoardDG = new DataGrid(gBoardHeaders, c4.game.boardState);
/* end Game Board */

function gameClicked(object) {
    //Only Fire on Single Click!
    if (event.detail == 1) {
        if (document.getElementById("feedbackContainer").classList.contains("d-none") == false || document.getElementById("ctrlPauseLink").classList.contains("d-none") == true) {
            return;
        } else {
            parseColSelection(selectCol(object));
        }
    }    
}

function feedbackWinner(result) {
    stopTurnTimer();
    if (result == "draw") {
        document.getElementById("feedbackMessage").innerHTML = "<h2>Draw!</h2>";
        document.getElementById("feedbackMessage").style.color = "#fafafa";
    } else {
        document.getElementById("feedbackMessage").innerHTML = `<h2>P${c4.game.activePlayer} Wins!</h2>`;
        switch (c4.game.activePlayer) {
            case 1:
                document.getElementById("feedbackMessage").style.color = "rgb(236,76,76)";
                break;
            case 2:
                document.getElementById("feedbackMessage").style.color = "blue";
                break;
        }
    }     
    elementDisplay("show", "feedbackContainer");
}

function refreshHotseat() {
    stopTurnTimer();
    elementDisplay("hide", "feedbackContainer");
    clearGameState();
    resetTurnCount();
    getActivePlayer();
    startTurnTimer();
}

function stopHotseat() {
    stopTurnTimer();
    elementDisplay("hide", "feedbackContainer");
    clearGameState();
    resetTurnCount();
}

function startTurnTimer() {
    document.getElementById("turnTimeLimit").innerHTML = `${c4.game.turnTimeLimit}`;
    c4.game.activeTurnTimer = setInterval(updateTurnTimer, 1000);
}

function updateTurnTimer() {
    timerVal = parseInt(document.getElementById("turnTimeLimit").innerHTML);
    if (timerVal > 0) {
        document.getElementById("turnTimeLimit").innerHTML = `${timerVal-1}`;
    } else {
        //console.log(`P${c4.game.activePlayer} Missed Turn - selecting random column`)
        parseColSelection(selectRandCol());
    }    
}

function pauseTurnTimer() {
    clearInterval(c4.game.activeTurnTimer);
}

function resumeTurnTimer() {
    c4.game.activeTurnTimer = setInterval(updateTurnTimer, 1000);
}

function stopTurnTimer() {
    clearInterval(c4.game.activeTurnTimer);
    document.getElementById("turnTimeLimit").innerHTML = ``;
}

function restartTurnTimer() {
    stopTurnTimer();
    startTurnTimer();
}

function clearGameState() {
    let i = c4.game.boardState.length;
    let ii;

    for (i = 0; i < c4.game.boardState.length; i++) {
        for (ii = 0; ii < c4.game.boardState[i].length; ii++) {
            c4.game.boardState[i][ii] = undefined;
        }
    }

    //console.log(c4.game.boardState);
    //console.log(gBoardDG);
}

function resetTurnCount() {
    c4.game.completedTurns = 0;
}

function getActivePlayer() {
    switch (c4.game.activePlayer) {
        case 1:
            document.getElementById("player1Info").style.color = "rgb(236,76,76)";
            document.getElementById("player2Info").style.color = "#fafafa";
            break;
        case 2:
            document.getElementById("player2Info").style.color = "blue";
            document.getElementById("player1Info").style.color = "#fafafa";
            break;
        default:
            switchPlayer();
            break;
    }
}

function switchPlayer() {
    switchActivePlayer();
    switch (c4.game.activePlayer) {
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
    switch (c4.game.activePlayer) {
    case 1:
        c4.game.activePlayer = 2;
        break;
    case 2:
        c4.game.activePlayer = 1;
        break;
    default:
        c4.game.activePlayer = 1;
        break;
    }
}

function selectRandCol() {
    let colArray = [];
    for (i = 0; i < 7; i++) {
        if (c4.game.boardState[i][0] == undefined) {
            colArray.push(i);
        }
    }
    
    //console.log(colArray);
    let col = colArray[Math.floor((Math.random() * colArray.length))];
    //console.log(col);

    for (i = 5; i > -1; i--) {
        if (c4.game.boardState[col][i] == undefined) {
            c4.game.boardState[col][i] = c4.game.activePlayer;
            document.getElementById(`gBoardCol${col}RowId${i}`).firstChild.lastChild.classList.add(`gbP${c4.game.activePlayer}`);
            c4.game.completedTurns++;
            //console.log(`Col: ${col}, Row: ${i}`);
            winner = checkWin(col, i);
            return winner;
        }
    }
    return false;
}

function selectCol(object) {
    let result = dataGridDisplayClicked(object, "col");
    //console.log(result);
    //console.log(object);

    for (i = result[1]; i > 0; i--) {
        if (c4.game.boardState[result[2]][i-1] == undefined) {
            c4.game.boardState[result[2]][i-1] = c4.game.activePlayer;
            document.getElementById(`gBoardCol${result[2]}RowId${i-1}`).firstChild.lastChild.classList.add(`gbP${c4.game.activePlayer}`);
            c4.game.completedTurns++;
            winner = checkWin(result[2], i-1);
            return winner;
        }
    }
}

function parseColSelection(result) {
    if (result != false) {
        //console.log(`P${c4.game.activePlayer} Wins!`);
        feedbackWinner();
        return true;
    } else if (c4.game.completedTurns == 42) {
        //console.log("draw");
        feedbackWinner("draw");
        return true;
    }
    switchPlayer();  
    restartTurnTimer();
    return false;
}

/* Check For Win Condition */
function checkWin(x, y) {
    if (c4.game.completedTurns < 7) {
        //console.log("Game cannot be won in less than 7 turns.  Skipping");
        return false; //Game cannot be won in less than 7 turns
    }

    x = parseInt(x);
    y = parseInt(y);

    //console.log(`Col x: ${x}`);
    //console.log(`Row y: ${y}`);    

    /* Horizontal Scan */
    //console.log(`Start Scan Right`);
    let results = scanDir("r", x, y);
    let tokenCount = results[0];
    //console.log(`Scan Right Found ${tokenCount} tokens`);
    if (tokenCount < 4) {
        //console.log(`Start Scan Left`);
        results = scanDir("l", x, y, results);
        tokenCount = results[0];
        //console.log(`Scan Left Found ${tokenCount} tokens`);
    }

    /* Vertical Scan */
    if (tokenCount < 4) {
        //console.log(`Start Scan Down`);
        results = scanDir("d", x, y);
        tokenCount = results[0];
        //console.log(`Scan Down Found ${tokenCount} tokens`);
    }

    /* Diagonal Scan, Right/Down, Left/Up */
    if (tokenCount < 4) {
        //console.log(`Start Scan Right/Down`);
        results = scanDir("rd", x, y);
        tokenCount = results[0];
        //console.log(`Scan Right/Down Found ${tokenCount} tokens`);
        if (tokenCount < 4) {
            //console.log(`Start Scan Left/Up`);
            results = scanDir("lu", x, y, results);
            tokenCount = results[0];
            //console.log(`Scan Left/Up Found ${tokenCount} tokens`);
        }
    }

    /* Diagonal Scan, Left/Down, Right/Up */
    if (tokenCount < 4) {
        //console.log(`Start Scan Left/Down`);
        results = scanDir("ld", x, y);
        tokenCount = results[0];
        //console.log(`Scan Left/Down Found ${tokenCount} tokens`);
        if (tokenCount < 4) {
            //console.log(`Start Scan Right/Up`);
            results = scanDir("ru", x, y, results);
            tokenCount = results[0];
            //console.log(`Scan Right/Up Found ${tokenCount} tokens`);
        }
    }

    //console.log(`Counted ${tokenCount} tokens`);
    if (tokenCount == 4) {
        //console.log(`Win for P${c4.game.activePlayer}`);
        highlightWinningCells(results);
        return c4.game.activePlayer;
    } else {
        //console.log(`No Winner Yet`);
        return false;
    }    
}

function highlightWinningCells(results) {
    for (i = 1; i < 5; i++) {
        document.getElementById(`gBoardCol${results[i][0]}RowId${results[i][1]}`).firstChild.lastChild.classList.add(`highlightP${c4.game.activePlayer}`);
    }
}

function scanDir(scanDir, startX, startY, results) {
    x = parseInt(startX);
    y = parseInt(startY);
    
    if (results == undefined || results[0] == undefined) {
        results = [1];
        tokenCount = 1;
    } else {
        tokenCount = parseInt(results[0]);
    }

    /* results[0] = tokenCount */
    /* results[1] through results[4] = array, containing x and y for each valid token */
    results[1] = [x,y];

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
                return results;
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
                return results;
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
                return results;
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
                return results;
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
                return results;
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
                return results;
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
                return results;
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
                val = c4.game.boardState[i][y];
                break;
            case "d":
                val = c4.game.boardState[x][i];
                break;
            case "rd":
            case "lu":
            case "ld":
            case "ru":
                val = c4.game.boardState[i][ii];
                break;                
        }
        //console.log(`value: ${val}`);
        if (val == c4.game.activePlayer) {            
            tokenCount++;
            results[0] = tokenCount;
            switch (scanDir) {
                case "r":
                case "l":
                    results[tokenCount] = [i,y];
                    //console.log(`MATCH on Player ${c4.game.activePlayer}.  ${scanDesc} Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i} on Row ${y}.  Count: ${tokenCount}.`);
                    break;
                case "d":
                    results[tokenCount] = [x,i];
                    //console.log(`MATCH on Player ${c4.game.activePlayer}.  ${scanDesc} Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${x} on Row: ${i}.  Count: ${tokenCount}.`);
                    break;
                case "rd":
                case "lu":
                case "ld":
                case "ru":
                    results[tokenCount] = [i,ii];
                    //console.log(`MATCH on Player ${c4.game.activePlayer}.  ${scanDesc} Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i} on Row ${ii}.  Count: ${tokenCount}.`);
                    break;
            }
            if (tokenCount == 4) {
                //console.log(`${scanDesc} Scan from Col: ${x} on Row: ${y}`);
                //console.log(`TokenCount: ${tokenCount}`);
                //console.log(results);
                return results;
            }
        } else {            
            break;            
        }

        if (ii != undefined) {
            ii = ii+dMod;
        }
    }
    return results;
}