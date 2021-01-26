/* Processed with JSLint */
/* Assume: in Development, a Browser */
/* Tolerate: for statement, long lines */

/* Processed with JSHint */
/* Default Settings */
/* Max Line Length: 250 characters */

/*jshint maxlen: 250 */

/*global checkSideNavState, elementDisplay, c4, getElementPropertyVal */

/* JSHint warns that saveSettings, loadPlayerSettings, setDefaultSettings, saveTurnTimeLimit, loadTurnTimeLimit, setTurnTimeLimit, createDynamicGameStyle are */
/* unusued.  These are called externally from this file */

/* Validate data before saving */
function validateSaveData() {
    let errMessage;
    if (document.getElementById(`p1UserName`).value.trim() === document.getElementById(`p2UserName`).value.trim()) { //player names are not unique
        errMessage = "Please ensure players have selected unique names";
    }

    if (document.getElementById(`p1TokenColor`).value === document.getElementById(`p2TokenColor`).value) { //player colours are not unique
        if (errMessage !== undefined) {
            errMessage = errMessage + " and colours";
        } else {
            errMessage = "Please ensure players have selected unique colors";
        }
    }

    if (errMessage !== undefined) { //If the error message value is not undefined, then we have validation errors
        errMessage = errMessage + ".";
        document.getElementById("alertMessage").innerHTML = errMessage; //Set the error message

        /* Disable All Controls and Links */
        checkSideNavState(function () { //If the Navbar is open, close it
            function checkNavBarTogglerDisabled() {
                if (document.getElementById("navBarToggler").disabled === false) { //Check every 25ms if the navBarToggler is enabled, when it is, stop checking and disable it again.
                    clearInterval(id);
                    document.getElementById("navBarToggler").disabled = true;
                }
            }
            let id = setInterval(checkNavBarTogglerDisabled, 25);
        });
        document.getElementById("smLogoURL").removeAttribute("onclick");
        document.getElementById("p1UserName").disabled = true;
        document.getElementById("p1TokenColor").disabled = true;
        document.getElementById("p1DefaultButton").disabled = true;
        document.getElementById("p2UserName").disabled = true;
        document.getElementById("p2TokenColor").disabled = true;
        document.getElementById("p2DefaultButton").disabled = true;
        document.getElementById("settingsBackButton").disabled = true;
        document.getElementById("facebook").removeAttribute("href");
        document.getElementById("instagram").removeAttribute("href");
        document.getElementById("twitter").removeAttribute("href");

        /* Show the Validation Alert and return false */
        elementDisplay("show", "saveValidationAlert");
        return false;
    } else {
        return true; //Otherwise, everything is ok, so return true
    }
}

/* Update global settings object and local storage with custom name or token color */
/* Requires: */
/*      setting: p1Name/p1TokenColor/p2Name/p2TokenColor */
/*      value: value to the assigned to the specified setting */
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

/* Set a custom player name */
/* Requires: */
/*      player: integer.  Id of player.  1 or 2. */
/*      name (OPTIONAL): value of custom name */
/*                       If not supplied, name = Player 1 or Player 2 depending on supplied Id. */
function setPlayerName(player, name) {
    /* If no name is supplied, name = "Player 1" or "Player 2" depending on player Id */
    if (name === undefined || name === "" || name.length < 1) {
        name = `Player ${player}`;
    }

    /* Add the new name value to the global settings object, localStorage, and the innerHTML of the relevant player info element */
    setPlayerSetting(`p${player}Name`, name);
    document.getElementById(`player${player}Info`).firstElementChild.innerHTML = `${name}`;
}

/* Save Custom Player names and token colours from the settings pane */
function saveSettings() {
    /* Check if the input values are valid */
    let validated = validateSaveData();
    if (validated === false) {
        return false; //If not, return false
    }
    /* Commit values for both players to global settings object and localStorage */
    setPlayerName(1, document.getElementById(`p1UserName`).value);
    setPlayerSetting(`p1TokenColor`, document.getElementById(`p1TokenColor`).value);
    setPlayerName(2, document.getElementById(`p2UserName`).value);
    setPlayerSetting(`p2TokenColor`, document.getElementById(`p2TokenColor`).value);
}

/* Read Player names and token colors from local storage, and apply non-null values to the global settings object */
function loadPlayerSettings() {
    let p1Name = localStorage.getItem("p1Name");
    if (p1Name !== null) {
        c4.game.p1.name = p1Name;
    }
    document.getElementById("player1Info").firstElementChild.innerHTML = `${c4.game.p1.name}`;

    let p1TokenColor = localStorage.getItem("p1TokenColor");
    if (p1TokenColor !== null) {
        c4.game.p1.tokenColor = p1TokenColor;
    }

    let p2Name = localStorage.getItem("p2Name");
    if (p2Name !== null) {
        c4.game.p2.name = p2Name;
    }
    document.getElementById("player2Info").firstElementChild.innerHTML = `${c4.game.p2.name}`;

    let p2TokenColor = localStorage.getItem("p2TokenColor");
    if (p2TokenColor !== null) {
        c4.game.p2.tokenColor = p2TokenColor;
    }
}

/* Apply default player name and token color to elements on the settings pane */
/* Requires: */
/*      player: Integer.  Id value of Player.  (1 or 2) */
function setDefaultSettings(player) {
    document.getElementById(`p${player}UserName`).value = `Player ${player}`; //Set value of name input to Player 1/2
    document.getElementById(`p${player}TokenColor`).value = getElementPropertyVal(document.documentElement, `--p${player}TokenColor`); //Set value of color selector to default token color for player 1/2
}

/* Remove the turnTimeLimit kv pair from localStorage, and replace it with the current value from the turnTime drop down list element */
function saveTurnTimeLimit() {
    localStorage.removeItem("turnTimeLimit");
    localStorage.setItem("turnTimeLimit", document.getElementById("turnTime").value);
}

/* Get the value of the turnTimeLimit kv pair from localStorage.  If it is not null, then assign that value to the value attribute of the turnTime drop down list element */
function loadTurnTimeLimit() {
    let turnTimeLimit = localStorage.getItem("turnTimeLimit");
    if (turnTimeLimit !== null) {
        document.getElementById("turnTime").value = turnTimeLimit;
        document.getElementById("c4TurnTime").children[1].innerHTML = `${turnTimeLimit} Seconds`;
    }
}

/* Set the turn time limit based on the selected turn time limit value */
function setTurnTimeLimit() {
    c4.game.turnTimeLimit = document.getElementById("turnTime").value;
}

/* Build a new CSS style element, append it to the document head, and insert rules for p1 and p2 token colors */
function createDynamicGameStyle() {
    let gameStyle = document.createElement("style"); //Create new style element
    document.head.appendChild(gameStyle); //Append this to the document head
    let sheet = gameStyle.sheet;
    sheet.type = "text/css"; //Set the type to CSS
    /* Add rules for the gbP1 and gbP2 classes, overriding the default background-colors with the currently selected values */
    sheet.insertRule(`.gbP1 { background-color: ${c4.game.p1.tokenColor}; }`);
    sheet.insertRule(`.gbP2 { background-color: ${c4.game.p2.tokenColor}; }`);
    /* Add rules for the highlightP1 and highlightP2 keyframes, overriding the default 0% and 100% background-colors with the currently selected values */
    sheet.insertRule(`@keyframes highlightP1 { 0% {background-color: ${c4.game.p1.tokenColor};} 50% {background-color: #fafafa;} 100% {background-color: ${c4.game.p1.tokenColor};} }`);
    sheet.insertRule(`@keyframes highlightP2 { 0% {background-color: ${c4.game.p2.tokenColor};} 50% {background-color: #fafafa;} 100% {background-color: ${c4.game.p2.tokenColor};} }`);
}