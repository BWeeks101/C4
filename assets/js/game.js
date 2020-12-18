/* When the game board is clicked, if the feedback container is not visible (we do not have a win/draw) and the game is not paused, select a row and place a token */
/* Requires: */
/*      object: the object that was clicked, passed to the argument as 'this' */
function gameClicked(object) {
    //Only Fire on Single Click!
    if (event.detail == 1) {
        if (document.getElementById("feedbackContainer").classList.contains("d-none") == false || document.getElementById("ctrlPauseLink").classList.contains("d-none") == true) {
            return; //If we have a win/draw, the game start countdown is active, or the game is paused, do nothing
        } else {
            parseColSelection(selectCol(object)); //Otherwise place a token for the active player in the selected column
        }
    }    
}

/* When a game is complete, show the result */
/* Requires: */
/*      result (OPTIONAL): undefined/draw */
function feedbackWinner(result) {
    stopTurnTimer(); //Stop the turn timer
    if (result == "draw") { 
        document.getElementById("feedbackMessage").innerHTML = "<h2>Draw!</h2>"; //If result = draw, then set the feedback message innerHTML value to the "Draw!" message
        document.getElementById("feedbackMessage").style.removeProperty("color"); //Set the text to the default color by removing any inline color styling
    } else {
        document.getElementById("feedbackMessage").innerHTML = `<h2>P${c4.game.activePlayer} Wins!</h2>`; //The result is not a draw, so set the feedback message innerHTML value to show the activePlayer as the winner
        /* Set the feedback message text color to that of the tokenColor of the winning player */
        switch (c4.game.activePlayer) {
            case 1:                
                document.getElementById("feedbackMessage").style.color = c4.game.p1.tokenColor;
                break;
            case 2:
                document.getElementById("feedbackMessage").style.color = c4.game.p2.tokenColor;
                break;
        }
    }
    elementDisplay("hide", "ctrlPauseLink") //Hide the Pause link
    document.getElementById("ctrlResetLink").innerHTML = "Rematch"; //Alter the innerHTML value of the Reset link to display 'Rematch'
    elementDisplay("show", "feedbackContainer"); //Show the feedback container
}

/* Before a game starts, use the feedback message element do display a 5 second countdown timer, then start the game */
function feedbackStartDelay() {
    /* Remove any color styling from the feedback message, display the countdown text, hide the feedback buttons and show the feedback container */
    document.getElementById("feedbackMessage").style.removeProperty("color");
    document.getElementById("feedbackMessage").innerHTML = `<h2>Game Start In:</h2><h2 id="startDelay">5</h2>`;
    elementDisplay("hide", "feedbackControlRow");
    elementDisplay("show", "feedbackContainer");

    /* Execute once a second, reducing the countdown text each time until we hit 0, then start the game */
    startDelay = setInterval(function() {
        timerVal = parseInt(document.getElementById("startDelay").innerHTML); //Get the current integer
        if (timerVal > 0) {
            document.getElementById("startDelay").innerHTML = `${timerVal-1}`; //If we're not at 0, then reduce the timer by 1
        } else {
            stopStartDelay(); //We're at 0, so stop the timer
            elementDisplay("hide", "feedbackContainer"); //Hide the feedback container
            elementDisplay("show", "feedbackControlRow"); //Show the feedback button (they will not be displayed until the feedback container is shown)
            document.getElementById("feedbackMessage").innerHTML = ""; //Clear the feedback message innerHTML
            startTurnTimer(); //Start the turn timer (and therefore the game)
            showGameSideNavMenu(); //Show the relevant links on the sideNav
        }
    }, 1000);    
}

/* Stop the game start countdown */
function stopStartDelay() {
    clearInterval(startDelay);
}

/* Refresh the game state */
function refreshHotseat() {
    stopTurnTimer(); //Stop the turn timer
    elementDisplay("hide", "feedbackContainer"); //Hide the feedback container
    clearGameState(); //Clear the game state
    resetTurnCount(); //Reset the turn count to 0
    getActivePlayer(); //Get the active player
}

/* Stop the game */
function stopHotseat() {
    stopTurnTimer(); //Stop the turn timer
    elementDisplay("hide", "feedbackContainer"); //Hide the feedback container
    clearGameState(); //Clear the game state
    resetTurnCount(); //Reset the turn count to 0
}

/* Start the turn time limit timer */
function startTurnTimer() {
    document.getElementById("turnTimeLimit").firstElementChild.innerHTML = `${c4.game.turnTimeLimit}`; //Set the turnTimeLimit elements innerHTML to the value of the turnTimeLimit global setting
    c4.game.activeTurnTimer = setInterval(updateTurnTimer, 1000); //Update once a second
}

/* Update the turn time limit timer */
function updateTurnTimer() {
    timerVal = parseInt(document.getElementById("turnTimeLimit").firstElementChild.innerHTML); //Get the current value of the timer
    if (timerVal > 0) {
        document.getElementById("turnTimeLimit").firstElementChild.innerHTML = `${timerVal-1}`; //If not 0, then reduce the value by 1
    } else {
        //console.log(`P${c4.game.activePlayer} Missed Turn - selecting random column`)
        parseColSelection(selectRandCol()); //Otherwise, the player missed their turn, so select a random column on their behalf!
    }    
}

/* Pause the turn time limit timer */
function pauseTurnTimer() {
    clearInterval(c4.game.activeTurnTimer);
}

/* Resume the turn time limit timer */
function resumeTurnTimer() {
    c4.game.activeTurnTimer = setInterval(updateTurnTimer, 1000);
}

/* Stop the turn time limit timer and clear the current value */
function stopTurnTimer() {
    clearInterval(c4.game.activeTurnTimer);
    document.getElementById("turnTimeLimit").firstElementChild.innerHTML = ``;
}

/* Clear and restart the turn time limit timer */
function restartTurnTimer() {
    stopTurnTimer(); //Stop the timer, clearing the current value
    startTurnTimer(); //Start the timer from scratch
}

/* Clear the game state */
function clearGameState() {
    let i = c4.game.boardState.length;
    let ii;

    /* Iterate through the boardState arrays, setting each value to undefined */
    for (i = 0; i < c4.game.boardState.length; i++) {
        for (ii = 0; ii < c4.game.boardState[i].length; ii++) {
            c4.game.boardState[i][ii] = undefined;
        }
    }

    //console.log(c4.game.boardState);
    //console.log(c4.game.gBoardDG);
}

/* Set the number of completed turns to 0 */
/* Used to track potential wins (unable to win in less than 7 turns) and draws (42 turns is the max until the board state is full) */
function resetTurnCount() {
    c4.game.completedTurns = 0;
}

/* get the numerical id of the active player */
function getActivePlayer() {
    switch (c4.game.activePlayer) {
        case 1:
            /* set the color style property of the player1Info element to match the p1 tokenColor, and remove color styling from the player2Info element */
            document.getElementById("player1Info").style.color = c4.game.p1.tokenColor;
            document.getElementById("player2Info").style.removeProperty("color");
            break;
        case 2:
            /* set the color style property of the player2Info element to match the p2 tokenColor, and remove color styling from the player1Info element */
            document.getElementById("player2Info").style.color = c4.game.p2.tokenColor;
            document.getElementById("player1Info").style.removeProperty("color");
            break;
        default:
            switchPlayer();  //No player is set as active, so switchPlayer() to set one
            break;
    }
}

function switchPlayer() {
    switchActivePlayer();
    switch (c4.game.activePlayer) {
        case 1:
            document.getElementById("player1Info").style.color = c4.game.p1.tokenColor;
            document.getElementById("player2Info").style.removeProperty("color");
            break;
        case 2:
            document.getElementById("player2Info").style.color = c4.game.p2.tokenColor;
            document.getElementById("player1Info").style.removeProperty("color");
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
            document.getElementById(`gBoardCol${col}RowId${i}`).firstElementChild.lastElementChild.classList.add(`gbP${c4.game.activePlayer}`);
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
            document.getElementById(`gBoardCol${result[2]}RowId${i-1}`).firstElementChild.lastElementChild.classList.add(`gbP${c4.game.activePlayer}`);
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
        document.getElementById(`gBoardCol${results[i][0]}RowId${results[i][1]}`).firstElementChild.lastElementChild.classList.add(`highlightP${c4.game.activePlayer}`);
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

function saveSettings(player) {
    if (player == undefined) {
        setPlayerName(1, document.getElementById(`p1UserName`).value);
        setPlayerSetting(`p1TokenColor`, document.getElementById(`p1TokenColor`).value);
        setPlayerName(2, document.getElementById(`p2UserName`).value);
        setPlayerSetting(`p2TokenColor`, document.getElementById(`p2TokenColor`).value);
    } else {
        setPlayerName(player, document.getElementById(`p${player}UserName`).value);
        setPlayerSetting(`p${player}TokenColor`, document.getElementById(`p${player}TokenColor`).value);
    }    
}

function loadPlayerSettings() {
    let p1Name = localStorage.getItem("p1Name");
    if (p1Name != null) {
        c4.game.p1.name = p1Name;
    }
    
    let p1TokenColor = localStorage.getItem("p1TokenColor");
    if (p1TokenColor != null) {
        c4.game.p1.tokenColor = p1TokenColor;
    }
    
    let p2Name = localStorage.getItem("p2Name");
    if (p2Name != null) {
        c4.game.p2.name = p2Name;
    }
    
    let p2TokenColor = localStorage.getItem("p2TokenColor");
    if (p2TokenColor != null) {
        c4.game.p2.tokenColor = p2TokenColor;
    }
}

function setPlayerSetting(setting, value) {
    switch (setting) {
        case "p1Name":
            c4.game.p1.name = value;
            localStorage.removeItem("p1Name");
            localStorage.setItem("p1Name", value);
            break;
        case "p1TokenColor":
            c4.game.p1.tokenColor = value;
            localStorage.removeItem("p1TokenColor");
            localStorage.setItem("p1TokenColor", value);
            break;
        case "p2Name":
            c4.game.p2.name = value;
            localStorage.removeItem("p2Name");
            localStorage.setItem("p2Name", value);
            break;
        case "p2TokenColor":
            c4.game.p2.tokenColor = value;
            localStorage.removeItem("p2TokenColor");
            localStorage.setItem("p2TokenColor", value);
            break;
    }
}

function setPlayerName(player, name) {
    if (name == undefined || name == "" || name.length < 1) {
        name = `Player ${player}`;
    }
    setPlayerSetting(`p${player}Name`, name)
    /*document.getElementById(`soutMultP${player}Link`).innerHTML = `Sign Out (${name})`;*/
    document.getElementById(`player${player}Info`).firstElementChild.innerHTML = `${name}`;    
    /*switch (player) {
        case 1:
            show("options", "options");
            break;
        case 2:
            createGameSetP2();
            break;
    }*/
}

function setDefaultSettings(player) {
    document.getElementById(`p${player}UserName`).value = `Player ${player}`;
    document.getElementById(`p${player}TokenColor`).value = getComputedStyle(document.documentElement).getPropertyValue(`--p${player}TokenColor`).trim();
}

/*function setPlayerColor(player, option, elementId) {
    setPlayerSetting(`p${player}.${option}Color`, document.getElementById(elementId).value);
}*/

/*function setPlayerColors(player) {
    setPlayerColor(player, "token", `p${player}TokenColor`);
    setPlayerColor(player, "altToken", `p${player}AltTokenColor`);
}*/

function getPlayerColor(player, option) {
    switch (player) {
        case 1:
            switch (option) {
                case "token":
                    return c4.game.p1.tokenColor;
                case "altToken":
                    return c4.game.p1.altTokenColor;
            }
            break;
        case 2:
            switch (option) {
                case "token":
                    return c4.game.p2.tokenColor;
                case "altToken":
                    return c4.game.p2.altTokenColor;
            }
            break;
    }
}