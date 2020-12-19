/* show/hide main block/menu block/sideNav elements */
/* Requires: */
/*      option: element 'group' to affect */
/*      newstate (OPTIONAL): new value for global state property */
function show(option, newstate) {
    /* If newstate is provided, then change c4.uiState to newstate */
    if (newstate != undefined) {
        c4.uiState = newstate;
    }
    mainShow(option); //Run the mainShow() function against the value of the option argument
    checkSideNavState(function(){sideNavShow(option)}); //Check the state of the sideNav (waiting for close if open), the run sideNavShow() against the value of the option argument
}

/* Check the state of the sideNav.  If open, then close it before executing the provided function */
/* Requires: */
/*      func: callback function to be executed */
/* Syntax: */
/*      checkSideNavState(function(){function_here()}); */
function checkSideNavState(func) {
    if (sideNavState() == "open") {
        closeNav();
        setTimeout(function() {
            func();
        }, 650);
    } else {
        func();
    };
}

/* Hide/Show a sideNav Link in conjunction with its divider element */
/* Requires: */
/*      action: show/hide/toggle */
/*      className: Class appropriate to the link and divider */
function sideNavLinkDisplay(action, className) {
    /* Build a collection of all elements with the appropriate class */
    let elementCollection = document.getElementsByClassName(className)

    /* Iterate through the collection, calling elementDisplay() with the provided action argument for the appropriate elementId */
    let i;
    for (i = 0; i < elementCollection.length; i++) {
       elementDisplay(action, elementCollection[i].id);
    }
}

/* Hide all children of the provided element */
/* Requires: */
/*      elementId: Any valid element Id.  Intended use for sideNav/mainBlockContainer/menuContentContainer */
function hideAll(elementId) {
    /* Verify that the elementId argument refers to a valid HTML element */
    let valid = document.getElementById(elementId);
    if (valid == null) { //If not, return false
        console.log(`Error.  Target element (${elementId}) does not exist.`);
        return false;
    }

    /* Build a collection of all child elements for the provided element Id */
    let elementCollection = document.getElementById(elementId).children;

    /* If elementId = sideNav, skip the first three elements (do not hide the close button, color mode link or its divider) */
    let i;
    if (elementId == "sideNav") {
        i = 3;
    } else {
        i = 0;
    }

    /* Iterate through the collection, hiding all elements */
    for (i; i < elementCollection.length; i++) {
        elementDisplay("hide", elementCollection[i].id);        
    }

    /* If elementId = mainBlockContainer then also hide the menuBlockContainer element and children */
    if (elementId == "mainBlockContainer") {
        elementDisplay("hide", "menuBlockContainer");
        hideAll("menuContentContainer");
    }
}

/* Show the main block/menu block elements appropriate to the provided Option argument */
/* Requires: */
/*      option: default/rules/starthotseat/settings/createsetturntime */
function mainShow(option) {
    hideAll("mainBlockContainer"); //Hide all main and menu block child elements
    if (option != "rules" && option !="starthotseat") { //If option is not rules or starthotseat then display the logo container, hide all children of the menu content container, and display the menu block conainer
        elementDisplay("show", "logoContainer");
        hideAll("menuContentContainer");
        elementDisplay("show", "menuBlockContainer");                
    }
    if (option == "settings") { //If option = settings hide the main block container
        elementDisplay("hide", "mainBlockContainer");
    } else { //Otherwise show the main block container
        elementDisplay("show", "mainBlockContainer");
    }

    switch (option) {
        case "default":
            /* Build a collection of elements with the 'default' class */
            let elementCollection = document.getElementsByClassName("default");

            /* Iterate through the collection, looking for children of the main, mainBlockContainer and menuContentContainer elements, then displaying those children */
            let i;    
            for (i = 0; i < elementCollection.length; i++) {        
                if (elementCollection[i].parentElement.id == "main" || elementCollection[i].parentElement.id == "mainBlockContainer" || elementCollection[i].parentElement.id == "menuContentContainer") {                        
                    elementDisplay("show", elementCollection[i].id);
                }
            }             
            break;
        case "rules":
            /* Display the rules container */
            elementDisplay("show", "rulesContainer");
            break;
        case "options":
            /* Show the options pane */
            elementDisplay("show", "menuDefault");            
            break;
        case "settings":
            /* Get the current properties of the player 1 and player 2 objects, and apply them to elements in the settings pane before showing it */
            document.getElementById("p1UserName").value = c4.game.p1.name;
            document.getElementById("p1TokenColor").value = c4.game.p1.tokenColor;
            document.getElementById("p2UserName").value = c4.game.p2.name;
            document.getElementById("p2TokenColor").value = c4.game.p2.tokenColor;
            elementDisplay("show", "menuSettings");            
            break;
        case "starthotseat":
            /* Initialise a hotseat game */
            refreshHotseat(); //Refresh the game board values
            dataGridDisplayRemove("gBoard"); //Remove the game board from display
            displayDataGrid(c4.game.gBoardDG, "gBoard", "col", false); //Recreate the game board
            dataGridDisplaySetOnClick("gBoard", "gameClicked(this)"); //Replace the default datagrid onclick function for the game board
            elementDisplay("show", "gameBoardContainer"); //Show the game board container
            feedbackStartDelay(); //Begin the game start countdown
            break;
        case "createsetturntime":
            /* Show the Turn Time Limit pane */
            loadTurnTimeLimit(); //Get the last turn time limit value and apply it to to the drop down list
            elementDisplay("show", "menuCreateSetTurnTime"); //Show the turn time limit pane
            break;        
    }

    mainOnResize(); //Call the resize function to ensure all elements are drawn correctly
}

/* Show the sideNav elements appropriate to the provided Option argument */
/* Requires: */
/*      option: default/rules/starthotseat/settings/createsetturntime */
function sideNavShow(option) {
    hideAll("sideNav");
    switch (option) {
        case "default":
            /* Build a collection of elements with the 'default' class */
            let elementCollection = document.getElementsByClassName("default");

            /* Iterate through the collection, looking for children of the sideNav element, then displaying those children */
            let i;
            for (i = 0; i < elementCollection.length; i++) {
                if (elementCollection[i].parentElement.id == "sideNav") {
                    elementDisplay("show", elementCollection[i].id);
                }
            }
            break;
        case "rules":
            /* Show the options and settings links on the sideNav */
            sideNavLinkDisplay("show", "sn-options");
            sideNavLinkDisplay("show", "sn-settings");    
            break;        
        case "options":
            /* Show the settings and rules links on the sideNav */
            sideNavLinkDisplay("show", "sn-settings");
            sideNavLinkDisplay("show", "sn-rules");
            break;
        case "settings":
            /* Show the options and rules links on the sideNav */
            sideNavLinkDisplay("show", "sn-options");            
            sideNavLinkDisplay("show", "sn-rules");
            break;
        case "createsetturntime":
            /* Show the Back link on the sideNav */
            sideNavLinkDisplay("show", "sn-back");
            break;
        case "starthotseat":
            /* Show the appropriate game controls on the sideNav */
            document.getElementById("ctrlResetLink").innerHTML = "Reset"; //Reset game link
            sideNavLinkDisplay("show", "sn-ctrlgroup"); //Show the game controles group
            sideNavLinkDisplay("hide", "sn-pause-reset") //Initially hide the pause/resume controls - they will be shown once the game start countdown completes
            break;
        default:
            break;
    }        
}

/* Show the pause Link, hide the Resume Link */
function showGameSideNavMenu() {
    sideNavLinkDisplay("show", "sn-pause-reset");
    elementDisplay("hide", "ctrlResumeLink");            
}

/* Determine which pane is shown, apply the appropriate action, then show the main pane */
/* Requires: */
/*      refreshLogo: true/false */
function menuBackButton() {

    switch (c4.uiState) {
        case "setings":
            saveSettings(); //player settings menu, so save settings, show the main pane then refresh the logo
            show("options", "options");
            refreshLogoGrid();
            break;
        case "turnTimeLimit": //turn time limit pane.  Save the turn time limit value, then load the main pain
            saveTurnTimeLimit();
            show("options", "options");
            break;
        case "rules": //rules pane.  Show the main pane then refresh the logo
            show("options", "options");
            refreshLogoGrid();
            break;
    }
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

/* Quit an active game and return to the main pane */
function quitGame() {
    switch (c4.uiState) {
        case "createhotseat":
            stopStartDelay(); //If the game start delay is running, stop it
            dataGridDisplayRemove("gBoard"); //Remove the game board data grid display
            stopHotseat(); //Stop the active hotseat game
            break;
    }

    show("options", "default"); //Display the main pane
    refreshLogoGrid(); //Refresh the logo
}

/* Refresh the game board */
function refreshGameBoard() {
    switch (c4.uiState) {
        case "createhotseat":
            show("starthotseat");
            break;
    }
}

/* Toggle between the Pause and Resume links on the sideNav */
function togglePauseLink() {
    elementDisplay("toggle", "ctrlPauseLink");
    elementDisplay("toggle", "ctrlResumeLink");
}

/* Pause the game */
function pauseGame() {
    switch (c4.uiState) {
        case "createhotseat":
            checkSideNavState(function(){togglePauseLink()}); //Check the state of the sideNav, then toggle the Pause link
            pauseTurnTimer(); //Pause the turn time limit timer
            break;
    }
}

/* Resume the game */
function resumeGame() {
    switch (c4.uiState) {
        case "createhotseat":
            checkSideNavState(function(){togglePauseLink()}); //Check the state of the sideNav, then toggle the Pause Link
            resumeTurnTimer(); //Resume the turn time limit timer
            break;
    }
}

/* Clear the board and reset the Game */
function resetGame() {
    switch (c4.uiState) {
        case "createhotseat":
            checkSideNavState(function(){refreshGameBoard()}); //Check the state of the sideNav, then refresh the game board
            break;
    }
}

/* Start the Game */
function startGame() {
    createDynamicGameStyle(); //Read p1 and p2 token color values from the global settings object, and write them to a dynamic css file.  Append this to the document head.
    setTurnTimeLimit() //Set the turn time limit based on the selected turn time limit value
    switch (c4.uiState) {
        case "createhotseat":
            saveTurnTimeLimit(); //Write the selected turn time limit to local storage
            show("starthotseat"); //Display the hotseat game board and start the game
            break;
        case "createmultiplayer": //Deprecated
            show("createmultiplayer");
            break;
        case "createsingle": //Deprecated
            show("startsingle");
            break;
    }
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

/* Set the turn time limit based on the selected turn time limit value */
function setTurnTimeLimit() {
    c4.game.turnTimeLimit = document.getElementById("turnTime").value;
}