/* Processed with JSLint */
/* Assume: in Development, a Browser */
/* Tolerate: for statement, long lines */

/* Processed with JSHint */
/* Default Settings */
/* Max Line Length: 250 characters */

/*jshint maxlen: 250 */

/*global parseColSelection, selectRandCol, c4, elementDisplay, showGameSideNavMenu, getElementPos */

/* JSHint warns that pauseTurnTimer, resumeTurnTimer, restartTurnTimer, feedbackStartDelay are unusued.  These are called externally from this file */

/* Use the feedback message element to display a message when the game is paused */
function feedbackPauseMessage(action) {
    if (action === "show") {
        document.getElementById("feedbackMessage").firstElementChild.innerHTML = "PAUSED"; //Set the feedback message text
        mainOnResize();
        return;
    }

    if (action === "hide") {
        document.getElementById("feedbackMessage").firstElementChild.innerHTML = ""; //Clear the feedback message innerHTML
        mainOnResize();
        return;
    }
}

/* Update the turn time limit timer */
function updateTurnTimer() {
    let timerVal = parseInt(document.getElementById("turnTimeLimit").firstElementChild.innerHTML); //Get the current value of the timer
    if (timerVal > 0) {
        document.getElementById("turnTimeLimit").firstElementChild.innerHTML = `${timerVal - 1}`; //If not 0, then reduce the value by 1
    } else {
        parseColSelection(selectRandCol()); //Otherwise, the player missed their turn, so select a random column on their behalf!
    }
}

/* Pause the turn time limit timer */
function pauseTurnTimer() {
    clearInterval(c4.game.activeTurnTimer);
    c4.game.activeTurnTimer = parseInt(document.getElementById("turnTimeLimit").firstElementChild.innerHTML); //Store the current value of the timer
    document.getElementById("turnTimeLimit").firstElementChild.innerHTML = "PAUSED"; //Alter the timer text to show that the game is paused
    feedbackPauseMessage("show");
}

/* Resume the turn time limit timer */
function resumeTurnTimer() {
    document.getElementById("turnTimeLimit").firstElementChild.innerHTML = `${c4.game.activeTurnTimer}`; //Alter the timer text to show the current stored value of the timer
    feedbackPauseMessage("hide");
    c4.game.activeTurnTimer = setInterval(updateTurnTimer, 1000);
}

/* Stop the turn time limit timer and clear the current value */
function stopTurnTimer() {
    clearInterval(c4.game.activeTurnTimer);
    document.getElementById("turnTimeLimit").firstElementChild.innerHTML = ``;
}

/* Start the turn time limit timer */
function startTurnTimer() {
    document.getElementById("turnTimeLimit").firstElementChild.innerHTML = `${c4.game.turnTimeLimit}`; //Set the turnTimeLimit elements innerHTML to the value of the turnTimeLimit global setting
    c4.game.activeTurnTimer = setInterval(updateTurnTimer, 1000); //Update once a second
}

/* Clear and restart the turn time limit timer */
function restartTurnTimer() {
    stopTurnTimer(); //Stop the timer, clearing the current value
    startTurnTimer(); //Start the timer from scratch
}

/* Stop the game start countdown */
function stopStartDelay() {
    clearInterval(c4.game.startDelay);
}

/* Before a game starts, use the feedback message element to display a 5 second countdown timer, then start the game */
function feedbackStartDelay() {
    /* Remove any in-line color styling from the feedback message, display the countdown text, hide the feedback buttons and show the feedback message */
    document.getElementById("turnTimeLimit").firstElementChild.style.removeProperty("color");
    document.getElementById("feedbackMessage").style.removeProperty("color");
    document.getElementById("feedbackMessage").firstElementChild.innerHTML = "Game Start In:";
    mainOnResize(); //Call a resize to ensure the feedbackMessage text is scaled correctly
    let feedbackControlContainerHeight = getElementPos(document.getElementById("feedbackControlContainer")).height; //Get the height of the feedbackControlContainer
    elementDisplay("show", "startDelay"); //Show the startDelay element so that we can get it's height
    let startDelayHeight = getElementPos(document.getElementById("startDelay")).height;  //Get the height of the startDelay element
    /* Calculate the difference in height between the startDelay and feedbackContainer elements, and apply a margin-top to the startDelay to compensate */
    let startDelayMarginTop = feedbackControlContainerHeight - startDelayHeight;
    document.getElementById("startDelay").style.marginTop = `${startDelayMarginTop}px`;

    elementDisplay("hide", "pauseControls");
    elementDisplay("show", "feedbackContainer");

    /* Execute once a second, reducing the countdown text each time until we hit 0, then start the game */
    c4.game.startDelay = setInterval(function () {
        let timerVal = parseInt(document.getElementById("startDelay").innerHTML); //Get the current integer
        if (timerVal > 0) {
            document.getElementById("startDelay").innerHTML = `${timerVal - 1}`; //If we're not at 0, then reduce the timer by 1
        } else {
            stopStartDelay(); //We're at 0, so stop the timer            
            elementDisplay("hide", "startDelay"); //Hide the startDelay element
            document.getElementById("startDelay").innerHTML = "5"; //Reset the startDelay innerHTML to it's default value
            document.getElementById("pauseControls").style.marginTop = `${getElementPos(document.getElementById("feedbackMessage").firstElementChild).height}px`; //Margin top of the Pause button = height of the first line of the feedback message
            document.getElementById("feedbackMessage").firstElementChild.innerHTML = ""; //Clear the feedback message innerHTML
            elementDisplay("show", "pauseControls"); //Display the Pause Button
            startTurnTimer(); //Start the turn timer (and therefore the game)
            showGameSideNavMenu(); //Show the relevant links on the sideNav
        }
    }, 1000);
}