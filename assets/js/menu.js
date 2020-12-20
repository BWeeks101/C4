/* show/hide main block/menu block/sideNav elements */
/* Requires: */
/*      option: element 'group' to affect */
/*      newstate (OPTIONAL): new value for global state property */
function show(option, newstate) {
    checkSave(); //Check whether data should be saved (and do so if appropriate) before changing the UI
    /* If newstate is provided, then change c4.uiState to newstate */
    if (newstate != undefined) {
        c4.uiState = newstate;
    }    
    mainShow(option); //Run the mainShow() function against the value of the option argument
    checkSideNavState(function(){sideNavShow(option)}); //Check the state of the sideNav (waiting for close if open), the run sideNavShow() against the value of the option argument
}

/* Determine if data should be saved (and do so if appropriate) before changing the ui */
function checkSave() {
    switch (c4.uiState) {
        case "settings":
            saveSettings(); //player settings menu, so save settings
            break;
        case "turnTimeLimit": //turn time limit pane,  so save the turn time limit value
            saveTurnTimeLimit();
            break;
    }
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

/* Show the main block/menu block elements appropriate to the provided Option argument */
/* Requires: */
/*      option: default/rules/startGame/settings/turnTimeLimit */
function mainShow(option) {
    hideAll("mainBlockContainer"); //Hide all main and menu block child elements
    if (option != "rules" && option !="startGame") { //If option is not rules or startGame then display the logo container, hide all children of the menu content container, and display the menu block conainer
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
            c4.uiState = "default";            
            break;            
        case "rules":
            /* Display the rules container */
            c4.uiState = "rules";
            elementDisplay("show", "rulesContainer");
            break;
        case "settings":
            c4.uiState = "settings";
            /* Get the current properties of the player 1 and player 2 objects, and apply them to elements in the settings pane before showing it */
            document.getElementById("p1UserName").value = c4.game.p1.name;
            document.getElementById("p1TokenColor").value = c4.game.p1.tokenColor;
            document.getElementById("p2UserName").value = c4.game.p2.name;
            document.getElementById("p2TokenColor").value = c4.game.p2.tokenColor;
            elementDisplay("show", "menuSettings");            
            break;
        case "startGame":
            c4.uiState = "startGame";
            /* Initialise a hotseat game */
            refreshGame(); //Refresh the game board values
            dataGridDisplayRemove("gBoard"); //Remove the game board from display
            displayDataGrid(c4.game.gBoardDG, "gBoard", "col", false); //Recreate the game board
            dataGridDisplaySetOnClick("gBoard", "gameClicked(this)"); //Replace the default datagrid onclick function for the game board
            elementDisplay("show", "gameBoardContainer"); //Show the game board container
            feedbackStartDelay(); //Begin the game start countdown
            break;
        case "turnTimeLimit":
            c4.uiState = "turnTimeLimit"
            /* Show the Turn Time Limit pane */
            loadTurnTimeLimit(); //Get the last turn time limit value and apply it to to the drop down list
            elementDisplay("show", "menuTurnTimeLimit"); //Show the turn time limit pane
            break;        
    }

    mainOnResize(); //Call the resize function to ensure all elements are drawn correctly
}

/* Show the sideNav elements appropriate to the provided Option argument */
/* Requires: */
/*      option: default/rules/startGame/settings/turnTimeLimit */
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
            /* Show the home, start game and settings links on the sideNav */
            sideNavLinkDisplay("show", "sn-default");
            sideNavLinkDisplay("show", "sn-startGame");
            sideNavLinkDisplay("show", "sn-settings");    
            break;
        case "settings":
            /* Show the home, start game and rules links on the sideNav */
            sideNavLinkDisplay("show", "sn-default");
            sideNavLinkDisplay("show", "sn-startGame");
            sideNavLinkDisplay("show", "sn-rules");
            break;
        case "turnTimeLimit":
            /* Show the home, settings and rules links on the sideNav */
            sideNavLinkDisplay("show", "sn-default");
            sideNavLinkDisplay("show", "sn-settings");
            sideNavLinkDisplay("show", "sn-rules");
            break;
        case "startGame":
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
function menuBackButton() {
    switch (c4.uiState) {
        case "startGame": //game board, rules pane or player settings menu. Show the default pane then refresh the logo
        case "rules":
        case "settings": 
            show("default"); 
            refreshLogoGrid();
            break;
        case "turnTimeLimit": //turn time limit pane.  Load the default pane, do not refresh the logo
            show("default");
            break;
    }
}

/* Toggle between the Pause and Resume links on the sideNav */
function togglePauseLink() {
    elementDisplay("toggle", "ctrlPauseLink");
    elementDisplay("toggle", "ctrlResumeLink");
}