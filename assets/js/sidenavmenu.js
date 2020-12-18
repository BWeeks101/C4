/* show/hide main block/menu block/sideNav elements */
/* Requires: */
/*      option: element 'group' to affect */
/*      newstate (OPTIONAL): new value for global state property */
function show(option, newstate) {
    /* If newstate is provided, then change c4.game.state to newstate */
    if (newstate != undefined) {
        c4.game.state = newstate;
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
        elementDisplay("show", "imgContainer");
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
        case "leaderboard": //Deprecated
            dataGridDisplayRemove("lBoard");
            displayDataGrid(lBoardDG, "lBoard", "off");
            elementDisplay("show", "leaderboardContainer");
            break;
        case "options":
            /* Show the options pane */
            elementDisplay("show", "menuOptions");            
            break;
        case "settings":
            /* Get the current properties of the player 1 and player 2 objects, and apply them to elements in the settings pane before showing it */
            document.getElementById("p1UserName").value = c4.game.p1.name;
            document.getElementById("p1TokenColor").value = c4.game.p1.tokenColor;
            document.getElementById("p2UserName").value = c4.game.p2.name;
            document.getElementById("p2TokenColor").value = c4.game.p2.tokenColor;
            elementDisplay("show", "menuSettings");            
            break;
        case "creategame": //Deprecated
            elementDisplay("show", "menuCreateGame"); 
            break;
        case "createsingle": //Deprecated
            elementDisplay("show", "menuCreateSingle");
            break;
        case "createhotseat": //Deprecated
            elementDisplay("show", "menuCreateHotseat");
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
        case "createp2settings": //Deprecated
            document.getElementById("p2TokenColor").value = getPlayerColor(2, "token");
            elementDisplay("show", "menuCreateP2Settings");
            break;
        case "createmultiplayer": //Deprecated
            elementDisplay("show", "menuCreateMultiplayer");
            break;
        case "createsetturntime":
            /* Show the Turn Time Limit pane */
            loadTurnTimeLimit(); //Get the last turn time limit value and apply it to to the drop down list
            elementDisplay("show", "menuCreateSetTurnTime"); //Show the turn time limit pane
            break;
        case "joingame": //Deprecated
            displayDataGrid(gameListDG, "gameList");
            elementDisplay("show", "menuJoinGame");
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

function showGameSideNavMenu() {
    sideNavLinkDisplay("show", "sn-pause-reset");
    elementDisplay("hide", "ctrlResumeLink");            
}

function cancelJoinGame() {    
    dataGridDisplayRemove("gameList");
    show("options", "options");
}

function menuBackButton(refreshLogo) {
    if (refreshLogo == undefined || refreshLogo == "" || refreshLogo == false) {
        saveTurnTimeLimit();
        show("options", "options");
    } else {
        saveSettings();
        show("options", "options");
        refreshLogoGrid();
    }
    
}

function saveTurnTimeLimit() {
    localStorage.removeItem("turnTimeLimit");
    localStorage.setItem("turnTimeLimit", document.getElementById("turnTime").value);
};

function loadTurnTimeLimit() {
    let turnTimeLimit = localStorage.getItem("turnTimeLimit");
    if (turnTimeLimit != null) {
        document.getElementById("turnTime").value = turnTimeLimit;
    }
}

function quitGame() {
    switch (c4.game.state) {
        case "joingame":
            dataGridDisplayRemove("gameList");
            break;
        case "createhotseat":
            stopStartDelay();
            dataGridDisplayRemove("gBoard");
            stopHotseat();
            break;
    }

    show("options", "default");
    refreshLogoGrid();
}

function refreshGameBoard() {
    switch (c4.game.state) {
        case "createhotseat":
            show("starthotseat");
            break;
    }
}

function togglePauseLink() {
    elementDisplay("toggle", "ctrlPauseLink");
    elementDisplay("toggle", "ctrlResumeLink");
}

function pauseGame() {
    switch (c4.game.state) {
        case "createhotseat":
            checkSideNavState(function(){togglePauseLink()});
            pauseTurnTimer();
            break;
    }
}

function resumeGame() {
    switch (c4.game.state) {
        case "createhotseat":
            checkSideNavState(function(){togglePauseLink()});
            resumeTurnTimer();
            break;
    }
}

function resetGame() {
    switch (c4.game.state) {
        case "createhotseat":
            checkSideNavState(function(){refreshGameBoard()});
            break;
    }
}

function radioGroupGetValue(option) {
    let elementCollection = document.getElementsByName(option);
    let i;
    for (i = 0; i < elementCollection.length; i++) {        
        if (elementCollection[i].checked) {            
            return elementCollection[i].value;
        }
    }     
}

function startGame() {
    createDynamicGameStyle();
    setTurnTimeLimit()
    switch (c4.game.state) {
        case "createhotseat":
            saveTurnTimeLimit();
            show("starthotseat");
            break;
        case "createmultiplayer":
            show("createmultiplayer");
            break;
        case "createsingle":
            show("startsingle");
            break;
    }
}

function createDynamicGameStyle() {
    let gameStyle = document.createElement("style");
    document.head.appendChild(gameStyle);
    let sheet = gameStyle.sheet;
    sheet.type = "text/css";
    sheet.insertRule(`.gbP1 { background-color: ${c4.game.p1.tokenColor}; }`);
    sheet.insertRule(`.gbP2 { background-color: ${c4.game.p2.tokenColor}; }`);
    sheet.insertRule(`@keyframes highlightP1 { 0% {background-color: ${c4.game.p1.tokenColor};} 50% {background-color: #fafafa;} 100% {background-color: ${c4.game.p1.tokenColor};} }`);
    sheet.insertRule(`@keyframes highlightP2 { 0% {background-color: ${c4.game.p2.tokenColor};} 50% {background-color: #fafafa;} 100% {background-color: ${c4.game.p2.tokenColor};} }`);
}

function setTurnTimeLimit() {
    c4.game.turnTimeLimit = document.getElementById("turnTime").value;
}

function createGameNextButton(value) {
    switch (value) {
        case "single":
            show("createsingle", "createsingle");
            break;
        case "hotseat":
            show("createhotseat", "createhotseat");
            break;
        case "multiplayer":
            show("createsetturntime", "createmultiplayer");
            break;
        case "easy":
        case "normal":
        case "hard":
            show("createsetturntime", c4.game.state);
            break;
        case "setp2":
            show("createp2settings", c4.game.state);
    }
}

function createSetTurnTimeBackButton() {
    switch (c4.game.state) {
        case "createsingle":
            show("createsingle", c4.game.state);
            break;
        case "createhotseat":
            show("createp2settings", c4.game.state);
            break;
        case "createmultiplayer":
            show("creategame", c4.game.state);
            break;
    }
}