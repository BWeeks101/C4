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

/* Get the numerical id of the active player */
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

/* Switch the active player, and update the color styles for the player info elements */
function switchPlayer() {
    switchActivePlayer(); //Switch the active player
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
    }
}

/* Switch the active player */
/* If no player is active, set player 1 as active */
function switchActivePlayer() {
    switch (c4.game.activePlayer) {
        case 1:
            c4.game.activePlayer = 2; //Player 1 is active, so set Player 2 as active
            break;
        case 2:
            c4.game.activePlayer = 1; //Player 2 is active, so set Player 1 as active
            break;
        default:
            c4.game.activePlayer = 1; //No player is active, so set Player 1 as active
            break;
    }
}

/* Automatically select a random column */
/* Called when a player does not respond within their turn by the time that the turn time limit expires */
function selectRandCol() {
    /* Build an array of column id's that relate to columns which have at least 1 empty cell */
    let colArray = [];
    for (i = 0; i < 7; i++) {
        if (c4.game.boardState[i][0] == undefined) { //If col[i]row[0] is undefined, then the top row does not have a value, which means that this column is not full
            colArray.push(i);
        }
    }
    
    /* Select a random value from the colArray.  This is our selected column. */
    let col = colArray[Math.floor((Math.random() * colArray.length))];

    /* Iterate through the rows on this column, starting with the bottom row and working up until an empty cell is located.  Select that cell for the active player.*/
    for (i = 5; i > -1; i--) {
        if (c4.game.boardState[col][i] == undefined) { //If the cell is empty
            c4.game.boardState[col][i] = c4.game.activePlayer; //Set the cell value to match the active player in the boardState array
            document.getElementById(`gBoardCol${col}RowId${i}`).firstElementChild.lastElementChild.classList.add(`gbP${c4.game.activePlayer}`); //utilise the same co-ords to set the appropriate gbPn class on the cell within the dataGrid display.  This will set the background color appropriately.
            c4.game.completedTurns++; //Increment the completed turn count
            winner = checkWin(col, i); //Check for a winner
            return winner; //Return the result of the checkWin function call
        }
    }
    return false; //Otherwise return false
}

/* Select the clicked column */
/* Requires: */
/*      object: the object that was clicked, passed to the argument as 'this' */
function selectCol(object) {
    let result = dataGridDisplayClicked(object, "col"); //Get the id of the clicked column by passing the object to dataGridDisplayClicked()

    /* Iterate through the rows on this column, starting with the bottom row and working up until an empty cell is located.  Select that cell for the active player.*/
    for (i = result[1]; i > 0; i--) {
        if (c4.game.boardState[result[2]][i-1] == undefined) {
            c4.game.boardState[result[2]][i-1] = c4.game.activePlayer; //Set the cell value to match the active player in the boardState array
            document.getElementById(`gBoardCol${result[2]}RowId${i-1}`).firstElementChild.lastElementChild.classList.add(`gbP${c4.game.activePlayer}`); //utilise the same co-ords to set the appropriate gbPn class on the cell within the dataGrid display.  This will set the background color appropriately.
            c4.game.completedTurns++; //Increment the completed turn count
            winner = checkWin(result[2], i-1); //Check for a winner
            return winner; //Return the result of the checkWin function call
        }
    }
    return false; //Otherwise return false
}

/* Parse the column selection to determine game result */
/* Requires: */
/*      result: The result of the previous column selection */
function parseColSelection(result) {
    if (result != false) { //The result was not false, therefore we have a winner, so call feedbackWinner()
        //console.log(`P${c4.game.activePlayer} Wins!`);
        feedbackWinner();
        return true;
    } else if (c4.game.completedTurns == 42) { //The result was false, but 42 turns have been completed, therefore the game is a draw, so call feedbackWinner("draw")
        //console.log("draw");
        feedbackWinner("draw");
        return true;
    }
    /* We have no win/draw result yet, so switch the player and restart the turn timer */
    switchPlayer();  
    restartTurnTimer();
    return false;
}

/* Check For Win Condition */
/* Requires: */
/*      x: Row coordinate from which to start search */
/*      y: Col coordinate from which to start search */
function checkWin(x, y) {
    if (c4.game.completedTurns < 7) {
        //console.log("Game cannot be won in less than 7 turns.  Skipping");
        return false; //Game cannot be won in less than 7 turns
    }

    x = parseInt(x);
    y = parseInt(y);

    /* Horizontal Scan */
    //console.log(`Start Scan Right`);
    let results = scanDir("r", x, y);  //Scan right from our starting position
    let tokenCount = results[0]; //Set the number of sequentially located matching tokens from this direction
    //console.log(`Scan Right Found ${tokenCount} tokens`);
    if (tokenCount < 4) { //If we do not yet have 4 tokens...
        //console.log(`Start Scan Left`);
        results = scanDir("l", x, y, results); //...Scan left from our starting position
        tokenCount = results[0]; //Update the number of sequentially located matching tokens from this direction
        //console.log(`Scan Left Found ${tokenCount} tokens`);
    }

    /* Vertical Scan */
    if (tokenCount < 4) { //No winning pattern found from the horizontal scan
        //console.log(`Start Scan Down`);
        results = scanDir("d", x, y); //Scan down from our starting position
        tokenCount = results[0]; //Set the number of sequentially located matching tokens from this direction
        //console.log(`Scan Down Found ${tokenCount} tokens`);
    }

    /* Diagonal Scan, Right/Down, Left/Up */
    if (tokenCount < 4) { //No winning pattern found from the horizontal or vertical scans
        //console.log(`Start Scan Right/Down`);
        results = scanDir("rd", x, y); //Scan right and down from our starting position
        tokenCount = results[0]; //Set the number of sequentially located matching tokens from this direction
        //console.log(`Scan Right/Down Found ${tokenCount} tokens`);
        if (tokenCount < 4) { //If we do not yet have 4 tokens...
            //console.log(`Start Scan Left/Up`);
            results = scanDir("lu", x, y, results); //...Scan left and up from our starting position
            tokenCount = results[0]; //Update the number of sequentially located matching tokens from this direction
            //console.log(`Scan Left/Up Found ${tokenCount} tokens`);
        }
    }

    /* Diagonal Scan, Left/Down, Right/Up */
    if (tokenCount < 4) { //No winning pattern found from the horizontal, vertical, or first diagonal scan
        //console.log(`Start Scan Left/Down`);
        results = scanDir("ld", x, y); //Scan left and down from our starting position
        tokenCount = results[0]; //Set the number of sequentially located matching tokens from this direction
        //console.log(`Scan Left/Down Found ${tokenCount} tokens`);
        if (tokenCount < 4) { //If we do not yet have 4 tokens...
            //console.log(`Start Scan Right/Up`);
            results = scanDir("ru", x, y, results); //...Scan right and up from our starting position
            tokenCount = results[0]; //Update the number of sequentially located matching tokens from this direction
            //console.log(`Scan Right/Up Found ${tokenCount} tokens`);
        }
    }

    //console.log(`Counted ${tokenCount} tokens`);
    if (tokenCount == 4) { //If we have located a winning pattern, then highlight the winning cells and return the id of the active player
        //console.log(`Win for P${c4.game.activePlayer}`);
        highlightWinningCells(results);
        return c4.game.activePlayer;
    } else { //Otherwise return false, as we do not yet have a winner
        //console.log(`No Winner Yet`);
        return false;
    }    
}

/* Add the highlightPn class to each winning cell to allow them to 'flash' via keyframes animation */
/* Requires: */
/*      results: array containing the coordinates of each cell in the winning pattern, returned by checkWin() */
function highlightWinningCells(results) {
    /* Iterate through the results array, applying the highlightPn class of the active player to the relevant child elements within the game board */
    for (i = 1; i < 5; i++) {
        document.getElementById(`gBoardCol${results[i][0]}RowId${results[i][1]}`).firstElementChild.lastElementChild.classList.add(`highlightP${c4.game.activePlayer}`);
    }
}

/* Scan through rows and cols looking for matching columns */
/* Utilised by checkWin() to determine winning patterns */
/* Requires: */
/*      scanDir: The direction to scan.  l/r/d/rd/lu/ld/ru */
/*      startX: starting row coordinate */
/*      startY: starting col coordinate */
/*      results array (OPTIONAL): number of matching tokens and cell coordinates found on the previous scan */
/*                                Except for vertical d(own) scans, use scans in pairs. */
/*                                Pair r(ight) scans with l(eft) to create a complete horizontal scan */
/*                                Pair r(ight)d(own) scans with l(eft)u(p), and l(eft)d(own) scans with r(ight)u(p) to create complete diagonal scans */
/*                                Pass the results value of the first paired scan to the second to complete the count for that direction */
function scanDir(scanDir, startX, startY, results) {
    x = parseInt(startX);
    y = parseInt(startY);
    
    if (results == undefined || results[0] == undefined) { //If no results array has been passed then initialise the array and set the token count to 1 (our starting position)
        results = [1];
        tokenCount = 1;
    } else {
        tokenCount = parseInt(results[0]); //Otherwise set the token count to match the current count from the results array
    }

    /* results array */
    /* results[0] = tokenCount */
    /* results[1] through [4] = array, containing x and y for each valid token */
    results[1] = [x,y]; //First position matches our startX and startY coordinates

    /* Initialise variables */
    let i;
    let ii;
    let brk;
    let dBrk;
    let mod;
    let dMod;
    let inc = 1;
    let dec = -1;
    //let scanDesc;
    let val;

    /* Preparation Switch Statement */
    /* Set variables for use during the scan based on the scanDir argument value */
    switch (scanDir) {
        case "r": //Right scan
            if (x < 6) { //Col is 0-5
                //scanDesc = "Right";
                i = x+1; //right scan begins one col to the right of the current col
                brk = 7; //break when we hit the final column
                mod = inc; //Scan coords are incremental
            } else { //Otherwise Col is 6, can't right scan from rightmost column, so return results.
                //console.log(`Right Scan Aborted.  Rightmost Col Selected (${x})`);
                return results;
            }
            break;
        case "l": //Left scan
            if (x > 0) { //Col is 1-6
                //scanDesc = "Left";
                i = x-1; //left scan begins one col to the left of the current col
                brk = -1; //break when we hit the first column 
                mod = dec; //Scan coords are decremental
            } else { //Otherwise Col is 0, can't left scan from leftmost column, so return results.
                //console.log(`Left Scan Aborted.  Leftmost Col Selected (${x})`);
                return results;
            }
            break;
        case "d": //Down scan
            if (y < 5) { //Row is 0-4
                //scanDesc = "Down";
                i = y+1; //down scan begins one row below the current row
                brk = 6; //break when we hit the bottom row
                mod = inc; //Scan coords are incremental
            } else { //Otherwise Row is 5, can't down scan from bottom column, so return results.
                //console.log(`Down Scan Aborted.  Token in Bottom Row (${y})`);
                return results;
            }
            break;
        case "rd": //Right/Down scan
            if (x < 6 && y < 5) { //Col is 0-5, Row is 0-4
                //scanDesc = "Right/Down";
                i = x+1; //right scan begins one col to the right of the current col
                ii = y+1; //down scan begins one row below the current row
                brk = 7; //Break if we hit the final column
                dBrk = 6; //Or Break if we hit the bottom row
                mod = inc; //Horizontal scan coords are incremental
                dMod = inc; //Vertical scan coords are incremental
            } else { //Otherwise Col is 6 or Row is 5, can't scan right from rightmost column or down from bottom row, so return results
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
        case "lu": //Left/Up scan
            if (x > 0 && y > 0) { //Col is 1-6, Row is 1-5
                //scanDesc = "Left/Up";
                i = x-1; //Left scan begins one col to the left of the current col
                ii = y-1; //Up scan begins one row above the current row
                brk = -1; //Break if we hit the first column
                dBrk = -1; //or Break if we hit the top row
                mod = dec; //Horizontal scan coords are decremental
                dMod = dec; //Vertical scan coords are decremental
            } else { //Otherwise Col is 0 or Row is 0, can't scan left from leftmost column or up from top row, so return results
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
        case "ld": //Left/Down scan
            if (x > 0 && y < 5) { //Col is 1-5, Row is 0-4
                //scanDesc = "Left/Down";
                i = x-1; //Left scan begins one col to the left of the current col
                ii = y+1; //Down scan begins one row below the current row
                brk = -1; //Break if we hit the first column
                dBrk = 6; //or Break if we hit the bottom row
                mod = dec; //Horizontal scan coords are decremental
                dMod = inc; //Vertical scan coords are incremental
            } else { //Otherwise Col is 0 or Row is 5, can't scan left from leftmost column or down from bottom row, so return results
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
        case "ru": //Right/up scan
            if (x < 6 && y > 0) { //Col is 0-5, Row is 1-5
                //scanDesc = "Right/Up";
                i = x+1; //Right scan begins one col to the right of the current col
                ii = y-1; //Up scan begins one row above the current row
                brk = 7; //Break if we hit the final column
                dBrk = -1; //or Break if we hit the top row
                mod = inc; //Horizontal scan coords are incremental
                dMod = dec; //Vertical scan coords are decremental
            } else { //Otherwise Col is 6 or Row is 0, can't scan right from rightmost column or up from top row, so return results
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

    /* Create for loop */
    /* Variable values are set in the preparation switch statement */
    for (i;;i = i+mod) {
        if (i == brk) { //If i matches our break value, then break
            break;
        } else if (ii != undefined && ii == dBrk) { //Otherwise if ii is not undefined (we are scanning diagonally) and matches our diagonal break value, then break
            break;
        }

        switch (scanDir) {
            case "r":
            case "l":
                val = c4.game.boardState[i][y]; //Horizontal Scan
                break;
            case "d":
                val = c4.game.boardState[x][i]; //Vertical Scan
                break;
            case "rd":
            case "lu":
            case "ld":
            case "ru":
                val = c4.game.boardState[i][ii]; //Diagonal Scan
                break;                
        }
        if (val == c4.game.activePlayer) { //The Cell value is a match for the active player
            tokenCount++; //Increment the tokenCount
            results[0] = tokenCount; //Update the tokenCount within the results array
            switch (scanDir) {
                case "r":
                case "l":
                    results[tokenCount] = [i,y]; //Apply the coords of this horizontal scan match to the results array
                    //console.log(`MATCH on Player ${c4.game.activePlayer}.  ${scanDesc} Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i} on Row ${y}.  Count: ${tokenCount}.`);
                    break;
                case "d":
                    results[tokenCount] = [x,i]; //Apply the coords of this vertical scan match to the results array
                    //console.log(`MATCH on Player ${c4.game.activePlayer}.  ${scanDesc} Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${x} on Row: ${i}.  Count: ${tokenCount}.`);
                    break;
                case "rd":
                case "lu":
                case "ld":
                case "ru":
                    results[tokenCount] = [i,ii]; //Apply the coords of this diagonal scan match to the results array
                    //console.log(`MATCH on Player ${c4.game.activePlayer}.  ${scanDesc} Scan starting at Col: ${x} on Row: ${y}.  Match at Col ${i} on Row ${ii}.  Count: ${tokenCount}.`);
                    break;
            }
            if (tokenCount == 4) { //If we have found 4 matches within the same scan (or scan pair) then return results
                //console.log(`${scanDesc} Scan from Col: ${x} on Row: ${y}`);
                //console.log(`TokenCount: ${tokenCount}`);
                //console.log(results);
                return results;
            }
        } else { //The Cell value is not a match for the active player, so break           
            break;            
        }

        if (ii != undefined) { //If ii is not undefined then we are performing a diagonal scan, so adjust ii by the dMod value
            ii = ii+dMod;
        }
    }
    return results; //Scan finished, but we have not found a matching pattern, so return the existing results
}

/* Save Custom Player names and token colours from the settings pane */
function saveSettings() {
    /* Commit values for both players to global settings object and localStorage */
    setPlayerName(1, document.getElementById(`p1UserName`).value); 
    setPlayerSetting(`p1TokenColor`, document.getElementById(`p1TokenColor`).value);
    setPlayerName(2, document.getElementById(`p2UserName`).value);
    setPlayerSetting(`p2TokenColor`, document.getElementById(`p2TokenColor`).value);    
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