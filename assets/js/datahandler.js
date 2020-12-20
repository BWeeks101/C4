/* Save Custom Player names and token colours from the settings pane */
function saveSettings() {
    /* Commit values for both players to global settings object and localStorage */
    setPlayerName(1, document.getElementById(`p1UserName`).value); 
    setPlayerSetting(`p1TokenColor`, document.getElementById(`p1TokenColor`).value);
    setPlayerName(2, document.getElementById(`p2UserName`).value);
    setPlayerSetting(`p2TokenColor`, document.getElementById(`p2TokenColor`).value);    
}

/* Read Player names and token colors from local storage, and apply non-null values to the global settings object */
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
    if (name == undefined || name == "" || name.length < 1) {
        name = `Player ${player}`;
    }
    
    /* Add the new name value to the global settings object, localStorage, and the innerHTML of the relevant player info element */
    setPlayerSetting(`p${player}Name`, name);
    document.getElementById(`player${player}Info`).firstElementChild.innerHTML = `${name}`;
}

/* Apply default player name and token color to elements on the settings pane */
/* Requires: */
/*      player: Integer.  Id value of Player.  (1 or 2) */
function setDefaultSettings(player) {
    document.getElementById(`p${player}UserName`).value = `Player ${player}`; //Set value of name input to Player 1/2
    document.getElementById(`p${player}TokenColor`).value = getComputedStyle(document.documentElement).getPropertyValue(`--p${player}TokenColor`).trim(); //Set value of color selector to default token color for player 1/2
}

/* Remove the turnTimeLimit kv pair from localStorage, and replace it with the current value from the turnTime drop down list element */
function saveTurnTimeLimit() {
    localStorage.removeItem("turnTimeLimit");
    localStorage.setItem("turnTimeLimit", document.getElementById("turnTime").value);
};

/* Get the value of the turnTimeLimit kv pair from localStorage.  If it is not null, then assign that value to the value attribute of the turnTime drop down list element */
function loadTurnTimeLimit() {
    let turnTimeLimit = localStorage.getItem("turnTimeLimit");
    if (turnTimeLimit != null) {
        document.getElementById("turnTime").value = turnTimeLimit;
    }
}