/* Processed with JSLint */
/* Assume: in Development, a Browser */
/* Tolerate: for statement, long lines */

/* Processed with JSHint */
/* Default Settings */
/* Max Line Length: 250 characters */

/*jshint maxlen: 250 */

/*global c4, dataGridDisplayClicked, stopTurnTimer, elementDisplay, restartTurnTimer,
createDynamicGameStyle, setTurnTimeLimit, saveTurnTimeLimit, show, stopStartDelay,
dataGridDisplayRemove, menuBackButton, checkSideNavState, togglePauseLink, pauseTurnTimer,
resumeTurnTimer, togglePauseButton, getElementPos, mainOnResize */

/* JSHint warns that selectRandCol, gameClicked, startGame, refreshGame, quitGame, pauseGame, resumeGame, resetGame are unusued.  These are called externally */
/* from this file */

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
    let x = parseInt(startX);
    let y = parseInt(startY);

    let tokenCount = 1;
    if (results === undefined || results[0] === undefined) { //If no results array has been passed then initialise the array and leave the token count set to 1 (our starting position)
        results = [1];
    } else {
        tokenCount = parseInt(results[0]); //Otherwise set the token count to match the current count from the results array
    }

    /* results array */
    /* results[0] = tokenCount */
    /* results[1] through [4] = array, containing x and y for each valid token */
    results[1] = [x, y]; //First position matches our startX and startY coordinates

    /* Initialise variables */
    let i;
    let ii;
    let brk;
    let dBrk;
    let mod;
    let dMod;
    let inc = 1;
    let dec = -1;
    let val;

    /* Preparation Switch Statement */
    /* Set variables for use during the scan based on the scanDir argument value */
    switch (scanDir) {
    case "r": //Right scan
        if (x < 6) { //Col is 0-5
            i = x + 1; //right scan begins one col to the right of the current col
            brk = 7; //break when we hit the final column
            mod = inc; //Scan coords are incremental
        } else { //Otherwise Col is 6, can't right scan from rightmost column, so return results.
            return results;
        }
        break;
    case "l": //Left scan
        if (x > 0) { //Col is 1-6
            i = x - 1; //left scan begins one col to the left of the current col
            brk = -1; //break when we hit the first column
            mod = dec; //Scan coords are decremental
        } else { //Otherwise Col is 0, can't left scan from leftmost column, so return results.
            return results;
        }
        break;
    case "d": //Down scan
        if (y < 5) { //Row is 0-4
            i = y + 1; //down scan begins one row below the current row
            brk = 6; //break when we hit the bottom row
            mod = inc; //Scan coords are incremental
        } else { //Otherwise Row is 5, can't down scan from bottom column, so return results.
            return results;
        }
        break;
    case "rd": //Right/Down scan
        if (x < 6 && y < 5) { //Col is 0-5, Row is 0-4
            i = x + 1; //right scan begins one col to the right of the current col
            ii = y + 1; //down scan begins one row below the current row
            brk = 7; //Break if we hit the final column
            dBrk = 6; //Or Break if we hit the bottom row
            mod = inc; //Horizontal scan coords are incremental
            dMod = inc; //Vertical scan coords are incremental
        } else { //Otherwise Col is 6 or Row is 5, can't scan right from rightmost column or down from bottom row, so return results
            return results;
        }
        break;
    case "lu": //Left/Up scan
        if (x > 0 && y > 0) { //Col is 1-6, Row is 1-5
            i = x - 1; //Left scan begins one col to the left of the current col
            ii = y - 1; //Up scan begins one row above the current row
            brk = -1; //Break if we hit the first column
            dBrk = -1; //or Break if we hit the top row
            mod = dec; //Horizontal scan coords are decremental
            dMod = dec; //Vertical scan coords are decremental
        } else { //Otherwise Col is 0 or Row is 0, can't scan left from leftmost column or up from top row, so return results
            return results;
        }
        break;
    case "ld": //Left/Down scan
        if (x > 0 && y < 5) { //Col is 1-5, Row is 0-4
            i = x - 1; //Left scan begins one col to the left of the current col
            ii = y + 1; //Down scan begins one row below the current row
            brk = -1; //Break if we hit the first column
            dBrk = 6; //or Break if we hit the bottom row
            mod = dec; //Horizontal scan coords are decremental
            dMod = inc; //Vertical scan coords are incremental
        } else { //Otherwise Col is 0 or Row is 5, can't scan left from leftmost column or down from bottom row, so return results
            return results;
        }
        break;
    case "ru": //Right/up scan
        if (x < 6 && y > 0) { //Col is 0-5, Row is 1-5
            i = x + 1; //Right scan begins one col to the right of the current col
            ii = y - 1; //Up scan begins one row above the current row
            brk = 7; //Break if we hit the final column
            dBrk = -1; //or Break if we hit the top row
            mod = inc; //Horizontal scan coords are incremental
            dMod = dec; //Vertical scan coords are decremental
        } else { //Otherwise Col is 6 or Row is 0, can't scan right from rightmost column or up from top row, so return results
            return results;
        }
        break;
    }

    /* Called by for loop below */
    /* Compare current i/ii values against brk/dBrk values */
    /* Return false on a match to break the for loop */
    function brkCheck(i, ii) {
        if (i === brk) { //If i matches our break value, then break
            return false;
        }

        if (ii !== undefined && ii === dBrk) { //Otherwise if ii is not undefined (we are scanning diagonally) and matches our diagonal break value, then break
            return false;
        }

        return true;
    }

    /* Create for loop */
    /* Variable values are set in the preparation switch statement */
    for (i = i; brkCheck(i, ii); i += mod) {
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
        if (val === c4.game.activePlayer) { //The Cell value is a match for the active player
            tokenCount += 1; //Increment the tokenCount
            results[0] = tokenCount; //Update the tokenCount within the results array
            switch (scanDir) {
            case "r":
            case "l":
                results[tokenCount] = [i, y]; //Apply the coords of this horizontal scan match to the results array
                break;
            case "d":
                results[tokenCount] = [x, i]; //Apply the coords of this vertical scan match to the results array
                break;
            case "rd":
            case "lu":
            case "ld":
            case "ru":
                results[tokenCount] = [i, ii]; //Apply the coords of this diagonal scan match to the results array
                break;
            }
            if (tokenCount === 4) { //If we have found 4 matches within the same scan (or scan pair) then return results
                return results;
            }
        } else { //The Cell value is not a match for the active player, so break
            break;
        }

        if (ii !== undefined) { //If ii is not undefined then we are performing a diagonal scan, so adjust ii by the dMod value
            ii += dMod;
        }
    }
    return results; //Scan finished, but we have not found a matching pattern, so return the existing results
}

/* Add the highlightPn class to each winning cell to allow them to 'flash' via keyframes animation */
/* Requires: */
/*      results: array containing the coordinates of each cell in the winning pattern, returned by checkWin() */
function highlightWinningCells(results) {
    /* Iterate through the results array, applying the highlightPn class of the active player to the relevant child elements within the game board */
    let i;
    for (i = 1; i < 5; i += 1) {
        document.getElementById(`gBoardCol${results[i][0]}RowId${results[i][1]}`).firstElementChild.lastElementChild.classList.add(`highlightP${c4.game.activePlayer}`);
    }
}

/* Check For Win Condition */
/* Requires: */
/*      x: Row coordinate from which to start search */
/*      y: Col coordinate from which to start search */
function checkWin(x, y) {
    if (c4.game.completedTurns < 7) {
        return false; //Game cannot be won in less than 7 turns
    }

    x = parseInt(x);
    y = parseInt(y);

    /* Horizontal Scan */
    let results = scanDir("r", x, y);  //Scan right from our starting position
    let tokenCount = results[0]; //Set the number of sequentially located matching tokens from this direction
    if (tokenCount < 4) { //If we do not yet have 4 tokens...
        results = scanDir("l", x, y, results); //...Scan left from our starting position
        tokenCount = results[0]; //Update the number of sequentially located matching tokens from this direction
    }

    /* Vertical Scan */
    if (tokenCount < 4) { //No winning pattern found from the horizontal scan
        results = scanDir("d", x, y); //Scan down from our starting position
        tokenCount = results[0]; //Set the number of sequentially located matching tokens from this direction
    }

    /* Diagonal Scan, Right/Down, Left/Up */
    if (tokenCount < 4) { //No winning pattern found from the horizontal or vertical scans
        results = scanDir("rd", x, y); //Scan right and down from our starting position
        tokenCount = results[0]; //Set the number of sequentially located matching tokens from this direction
        if (tokenCount < 4) { //If we do not yet have 4 tokens...
            results = scanDir("lu", x, y, results); //...Scan left and up from our starting position
            tokenCount = results[0]; //Update the number of sequentially located matching tokens from this direction
        }
    }

    /* Diagonal Scan, Left/Down, Right/Up */
    if (tokenCount < 4) { //No winning pattern found from the horizontal, vertical, or first diagonal scan
        results = scanDir("ld", x, y); //Scan left and down from our starting position
        tokenCount = results[0]; //Set the number of sequentially located matching tokens from this direction
        if (tokenCount < 4) { //If we do not yet have 4 tokens...
            results = scanDir("ru", x, y, results); //...Scan right and up from our starting position
            tokenCount = results[0]; //Update the number of sequentially located matching tokens from this direction
        }
    }

    if (tokenCount === 4) { //If we have located a winning pattern, then highlight the winning cells and return the id of the active player
        highlightWinningCells(results);
        return c4.game.activePlayer;
    } else { //Otherwise return false, as we do not yet have a winner
        return false;
    }
}

/* Select the clicked column */
/* Requires: */
/*      object: the object that was clicked, passed to the argument as 'this' */
function selectCol(object) {
    let result = dataGridDisplayClicked(object, "col"); //Get the id of the clicked column by passing the object to dataGridDisplayClicked()

    /* Iterate through the rows on this column, starting with the bottom row and working up until an empty cell is located.  Select that cell for the active player.*/
    let i;
    for (i = result[1]; i > 0; i -= 1) {
        if (c4.game.boardState[result[2]][i - 1] === undefined) {
            c4.game.boardState[result[2]][i - 1] = c4.game.activePlayer; //Set the cell value to match the active player in the boardState array
            document.getElementById(`gBoardCol${result[2]}RowId${i - 1}`).firstElementChild.lastElementChild.classList.add(`gbP${c4.game.activePlayer}`); //utilise the same co-ords to set the gbPn class on the cell within the dataGrid display.
            c4.game.completedTurns += 1; //Increment the completed turn count
            let winner = checkWin(result[2], i - 1); //Check for a winner
            return winner; //Return the result of the checkWin function call
        }
    }
    return false; //Otherwise return false
}

/* Automatically select a random column */
/* Called when a player does not respond within their turn by the time that the turn time limit expires */
function selectRandCol() {
    /* Build an array of column id's that relate to columns which have at least 1 empty cell */
    let colArray = [];
    let i;
    for (i = 0; i < 7; i += 1) {
        if (c4.game.boardState[i][0] === undefined) { //If col[i]row[0] is undefined, then the top row does not have a value, which means that this column is not full
            colArray.push(i);
        }
    }

    /* Select a random value from the colArray.  This is our selected column. */
    let col = colArray[Math.floor(Math.random() * colArray.length)];

    /* Iterate through the rows on this column, starting with the bottom row and working up until an empty cell is located.  Select that cell for the active player.*/
    let winner;
    for (i = 5; i > -1; i -= 1) {
        if (c4.game.boardState[col][i] === undefined) { //If the cell is empty
            c4.game.boardState[col][i] = c4.game.activePlayer; //Set the cell value to match the active player in the boardState array
            document.getElementById(`gBoardCol${col}RowId${i}`).firstElementChild.lastElementChild.classList.add(`gbP${c4.game.activePlayer}`); //utilise the same co-ords to set the gbPn class on the cell within the dataGrid display.
            c4.game.completedTurns += 1; //Increment the completed turn count
            winner = checkWin(col, i); //Check for a winner
            return winner; //Return the result of the checkWin function call
        }
    }
    return false; //Otherwise return false
}

/* When a game is complete, show the result */
/* Requires: */
/*      result (OPTIONAL): undefined/draw */
function feedbackWinner(result) {
    stopTurnTimer(); //Stop the turn timer
    if (result === "draw") {
        document.getElementById("feedbackMessage").innerHTML = "<h2>Draw!</h2>"; //If result = draw, then set the feedback message innerHTML value to the "Draw!" message
        document.getElementById("feedbackMessage").style.removeProperty("color"); //Set the text to the default color by removing any inline color styling
        document.getElementById("turnTimeLimit").firstElementChild.style.removeProperty("color"); //Set the turnTimeLimit text to the default color
        document.getElementById("turnTimeLimit").firstElementChild.innerHTML = "Draw!"; //Display the draw message in the turnTimeLimit column
    } else {
        document.getElementById("turnTimeLimit").firstElementChild.innerHTML = "Winner!"; //Display the winner text in the turnTimeLimit column
        /* Set the feedback message text. Set the feedback message text color and turnTimeLimit text color to that of the tokenColor of the winning player */
        switch (c4.game.activePlayer) {
        case 1:
            document.getElementById("feedbackMessage").innerHTML = `<h2>${c4.game.p1.name} Wins!</h2>`;
            document.getElementById("feedbackMessage").style.color = c4.game.p1.tokenColor;
            document.getElementById("turnTimeLimit").firstElementChild.style.color = c4.game.p1.tokenColor;
            break;
        case 2:
            document.getElementById("feedbackMessage").innerHTML = `<h2>${c4.game.p2.name} Wins!</h2>`;
            document.getElementById("feedbackMessage").style.color = c4.game.p2.tokenColor;
            document.getElementById("turnTimeLimit").firstElementChild.style.color = c4.game.p2.tokenColor;
            break;
        }
    }
    elementDisplay("hide", "ctrlPauseLink"); //Hide the Pause link
    elementDisplay("hide", "pauseControls"); //Hide the Pause Controls
    elementDisplay("show", "gameOverControls"); //Show the Rematch & Quit buttons
    document.getElementById("ctrlResetLink").innerHTML = "Rematch"; //Alter the innerHTML value of the Reset link to display 'Rematch'

    mainOnResize();
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
    }
}

/* Switch the active player, and update the color styles for the player info elements */
function switchPlayer() {
    switchActivePlayer(); //Switch the active player
    switch (c4.game.activePlayer) {
    case 1:
        /* set the color style property of the player1Info element to match the p1 tokenColor and underline, remove underline from the player2Info element and set the color style property to match the --inactivePlayer css variable */
        document.getElementById("player1Info").style.color = c4.game.p1.tokenColor;
        document.getElementById("player1Info").style.textDecoration = "underline";
        document.getElementById("player2Info").style.removeProperty("text-decoration");
        document.getElementById("player2Info").style.color = window.getComputedStyle(document.documentElement).getPropertyValue(`--inactivePlayer`).trim();
        break;
    case 2:
        /* set the color style property of the player2Info element to match the p2 tokenColor and underline, remove underline from the player1Info element and set the color style property to match the --inactivePlayer css variable */
        document.getElementById("player2Info").style.color = c4.game.p2.tokenColor;
        document.getElementById("player2Info").style.textDecoration = "underline";
        document.getElementById("player1Info").style.removeProperty("text-decoration");
        document.getElementById("player1Info").style.color = window.getComputedStyle(document.documentElement).getPropertyValue(`--inactivePlayer`).trim();
        break;
    }
}

/* Parse the column selection to determine game result */
/* Requires: */
/*      result: The result of the previous column selection */
function parseColSelection(result) {
    if (result !== false) { //The result was not false, therefore we have a winner, so call feedbackWinner()
        feedbackWinner();
        return true;
    }

    if (c4.game.completedTurns === 42) { //The result was false, but 42 turns have been completed, therefore the game is a draw, so call feedbackWinner("draw")
        feedbackWinner("draw");
        return true;
    }

    /* We have no win/draw result yet, so switch the player and restart the turn timer */
    switchPlayer();
    restartTurnTimer();
    return false;
}

/* When the game board is clicked, if the Rematch & Quit buttons are not visible (we do not have a win/draw) and the game is not paused, select a row and place a token */
/* Requires: */
/*      object: the object that was clicked, passed to the argument as 'this' */
function gameClicked(object) {
    let gameInProgress = true;
    let gameIsActive = true;
    let gameIsStarting = false;

    //Only Fire on Single Click!
    if (event.detail === 1) {
        gameInProgress = document.getElementById("gameOverControls").classList.contains("d-none"); //Game is not over
        gameIsActive = document.getElementById("resumeButton").classList.contains("d-none"); //Game is not Paused
        if (document.getElementById("pauseControls").classList.contains("d-none") === true && document.getElementById("gameOverControls").classList.contains("d-none") === true) {
            gameIsStarting = true; //Game start countdown is active
        }
        if (gameInProgress === false || gameIsActive === false || gameIsStarting === true) {
            return; //If we have a win/draw, the game is paused, or the game start countdown is active, do nothing
        }
        parseColSelection(selectCol(object)); //Otherwise place a token for the active player in the selected column
    }
}

/* Clear the game state */
function clearGameState() {
    let i = c4.game.boardState.length;
    let ii;

    /* Iterate through the boardState arrays, setting each value to undefined */
    for (i = 0; i < c4.game.boardState.length; i += 1) {
        for (ii = 0; ii < c4.game.boardState[i].length; ii += 1) {
            c4.game.boardState[i][ii] = undefined;
        }
    }
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
        /* set the color style property of the player1Info element to match the p1 tokenColor and underline, remove underline from the player2Info element and set the color style property to match the --inactivePlayer css variable */
        document.getElementById("player1Info").style.color = c4.game.p1.tokenColor;
        document.getElementById("player1Info").style.textDecoration = "underline";
        document.getElementById("player2Info").style.removeProperty("text-decoration");
        document.getElementById("player2Info").style.color = window.getComputedStyle(document.documentElement).getPropertyValue(`--inactivePlayer`).trim();
        break;
    case 2:
        /* set the color style property of the player2Info element to match the p2 tokenColor and underline, remove underline from the player1Info element and set the color style property to match the --inactivePlayer css variable */
        document.getElementById("player2Info").style.color = c4.game.p2.tokenColor;
        document.getElementById("player2Info").style.textDecoration = "underline";
        document.getElementById("player1Info").style.removeProperty("text-decoration");
        document.getElementById("player1Info").style.color = window.getComputedStyle(document.documentElement).getPropertyValue(`--inactivePlayer`).trim();
        break;
    default:
        switchPlayer();  //No player is set as active, so switchPlayer() to set one
    }
}

/* Start the Game */
function startGame() {
    createDynamicGameStyle(); //Read p1 and p2 token color values from the global settings object, and write them to a dynamic css file.  Append this to the document head.
    setTurnTimeLimit(); //Set the turn time limit based on the selected turn time limit value
    saveTurnTimeLimit(); //Write the selected turn time limit to local storage
    show("startGame"); //Display the hotseat game board and start the game
}

/* Refresh the game state */
function refreshGame() {
    stopTurnTimer(); //Stop the turn timer
    elementDisplay("hide", "gameOverControls"); //Hide the Rematch & Quit buttons
    elementDisplay("hide", "resumeButton"); //Hide the Resume button
    elementDisplay("show", "pauseButton"); //Show the Pause button
    elementDisplay("show", "pauseControls"); //Show the Pause Controls
    clearGameState(); //Clear the game state
    resetTurnCount(); //Reset the turn count to 0
    getActivePlayer(); //Get the active player
}

/* Stop the game */
function stopGame() {
    stopTurnTimer(); //Stop the turn timer
    clearGameState(); //Clear the game state
    resetTurnCount(); //Reset the turn count to 0
}

/* Quit an active game and return to the main pane */
function quitGame() {
    stopStartDelay(); //If the game start delay is running, stop it
    dataGridDisplayRemove("gBoard"); //Remove the game board data grid display
    stopGame(); //Stop the active hotseat game
    menuBackButton(); //Display the main pane and refresh the logo
}

/* Refresh the game board */
function refreshGameBoard() {
    show("startGame");
}

/* Pause the game */
function pauseGame() {
    checkSideNavState(function () {
        togglePauseLink();
    }); //Check the state of the sideNav, then toggle the Pause link
    togglePauseButton(); //Toggle the Pause Button
    document.getElementById("pauseControls").style.removeProperty("margin-top"); //Clear the margin top from the pause controls to maintain vertical position when the feedback text is visible
    pauseTurnTimer(); //Pause the turn time limit timer
}

/* Resume the game */
function resumeGame() {
    checkSideNavState(function () {
        togglePauseLink();
    }); //Check the state of the sideNav, then toggle the Pause Link
    togglePauseButton(); //Toggle the Pause Button
    document.getElementById("pauseControls").style.marginTop = `${getElementPos(document.getElementById("feedbackMessage").firstElementChild).height}px`; //Margin top of the Pause controls = height of the first line of the feedback message
    resumeTurnTimer(); //Resume the turn time limit timer
}

/* Clear the board and reset the Game */
function resetGame() {
    checkSideNavState(function () {
        refreshGameBoard();
    }); //Check the state of the sideNav, then refresh the game board
}