function show(option, newstate) {    
    if (newstate != undefined) {        
        state = newstate;
    }
    mainShow(option);
    if (sideNavState() == "open") {
        closeNav();
        setTimeout(function() {
            sideNavShow(option);
        }, 650);
    } else {
        sideNavShow(option);
    };
}

function sideNavLinkDisplay(action, className) {
    let elementCollection = document.getElementsByClassName(className)
    let i;
    for (i = 0; i < elementCollection.length; i++) {
       elementDisplay(action, elementCollection[i].id);
    }
}

/* options are 'sideNav', 'mainBlockContainer', or 'menuContentContainer' */
function hideAll(option) {
    let elementCollection = document.getElementById(option).children;
    let i;
    if (option == "sideNav") {
        i = 1;
    } else {
        i = 0;
    }
    for (i; i < elementCollection.length; i++) {
        elementDisplay("hide", elementCollection[i].id);        
    }    
    if (option == "mainBlockContainer") {
        elementDisplay("hide", "menuBlockContainer");
        hideAll("menuContentContainer");
    }
}

function mainShow(option) {
    hideAll("mainBlockContainer");
    if (option != "rules" && option != "leaderboard" && option !="starthotseat") {
        elementDisplay("show", "imgContainer");
        hideAll("menuContentContainer");
        elementDisplay("show", "menuBlockContainer");                
    }    
    switch (option) {
        case "default":            
            let elementCollection = document.getElementsByClassName("default");
            let i;    
            for (i = 0; i < elementCollection.length; i++) {        
                if (elementCollection[i].parentElement.id == "main" || elementCollection[i].parentElement.id == "mainBlockContainer" || elementCollection[i].parentElement.id == "menuContentContainer") {                        
                    elementDisplay("show", elementCollection[i].id);
                }
            }             
            break;
        case "rules":
            elementDisplay("show", "rulesContainer");
            break;
        case "leaderboard":
            dataGridDisplayRemove("lBoard");
            displayDataGrid(lBoardDG, "lBoard", "off");
            elementDisplay("show", "leaderboardContainer");
            break;
        case "options":
            elementDisplay("show", "menuOptions");  
            break;
        case "settings":
            elementDisplay("show", "menuSettings");
            break;
        case "creategame":
            elementDisplay("show", "menuCreateGame"); 
            break;
        case "createsingle":
            elementDisplay("show", "menuCreateSingle");
            break;
        case "createhotseat":
            elementDisplay("show", "menuCreateHotseat");
            break;
        case "starthotseat":
            refreshHotseat();
            dataGridDisplayRemove("gBoard");
            displayDataGrid(gBoardDG, "gBoard", "col", false);
            dataGridDisplaySetCols("gBoard");            
            dataGridDisplaySetOnClick("gBoard", "gameClicked(this)");
            elementDisplay("show", "gameBoardContainer");
            break;
        case "createp2settings":
            elementDisplay("show", "menuCreateP2Settings");
            break;
        case "createmultiplayer":
            elementDisplay("show", "menuCreateMultiplayer");
            break;
        case "createsetturntime":
            elementDisplay("show", "menuCreateSetTurnTime");
            break;
        case "joingame":
            displayDataGrid(gameListDG, "gameList");
            elementDisplay("show", "menuJoinGame");
            break;
    }

    mainOnResize();
}

function sideNavShow(option) {
    hideAll("sideNav");
    switch (option) {
        case "default":            
            let elementCollection = document.getElementsByClassName("default");
                let i;    
                for (i = 0; i < elementCollection.length; i++) {
                    if (elementCollection[i].parentElement.id == "sideNav") {
                    elementDisplay("show", elementCollection[i].id);
                }        
            }                
            break;
        case "rules":
            switch (state) {
                case "default":
                    sideNavLinkDisplay("show", "sn-signin");
                    break;
                case "options":
                    sideNavLinkDisplay("show", "sn-options");
                    sideNavSoutSelectShow("sout");
                    break;
                case "settings":
                    sideNavLinkDisplay("show", "sn-options");
                    sideNavLinkDisplay("show", "sn-settings");
                    sideNavSoutSelectShow("sout");
                    break;
            }        
            sideNavLinkDisplay("show", "sn-leaderboard");
            break;
        case "leaderboard":
            switch (state) {
                case "default":
                    sideNavLinkDisplay("show", "sn-signin");
                    break;
                case "options":
                    sideNavLinkDisplay("show", "sn-options");
                    sideNavSoutSelectShow("sout");
                    break;
                case "settings":
                    sideNavLinkDisplay("show", "sn-options");
                    sideNavLinkDisplay("show", "sn-settings");
                    sideNavSoutSelectShow("sout");
                    break;
            }        
            sideNavLinkDisplay("show", "sn-rules");
            break;
        case "options":
            sideNavLinkDisplay("show", "sn-settings");
            sideNavLinkDisplay("show", "sn-leaderboard");
            sideNavLinkDisplay("show", "sn-rules");
            sideNavSoutSelectShow("sout");
            break;
        case "settings":
            sideNavLinkDisplay("show", "sn-options");
            sideNavLinkDisplay("show", "sn-leaderboard");
            sideNavLinkDisplay("show", "sn-rules");
            sideNavSoutSelectShow("sout");
            break;
        case "creategame":
        case "createsingle":
        case "createhotseat":
        case "createmultiplayer":
        case "createp2settings":
        case "createsetturntime":
            sideNavLinkDisplay("show", "sn-cancelcreate");    
            sideNavSoutSelectShow("sout");
            break;
        case "joingame":
            sideNavLinkDisplay("show", "sn-canceljoin");
            sideNavSoutSelectShow("sout");
            break;
        case "starthotseat":
            sideNavLinkDisplay("show", "sn-ctrlgroup");
            sideNavLinkDisplay("hide", "sn-concede");
            sideNavSoutSelectShow("sn-out-mult");
            break;
        default:
            break;
    }        
}

function sideNavSoutSelectShow(option) {
    if (option === undefined || option === "sout") {
        sideNavLinkDisplay("hide", "sn-sout-mult");
        sideNavLinkDisplay("show", "sn-sout");
        elementDisplay("show", "soutGroup");
    } else {
        sideNavLinkDisplay("hide", "sn-sout");
        sideNavLinkDisplay("show", "sn-sout-mult");
        elementDisplay("show", "soutGroup");
    };    
}

function cancelJoinGame() {    
    dataGridDisplayRemove("gameList");
    show("options", "options");
}

function signOut() {
    switch (state) {
        case "joingame":
            dataGridDisplayRemove("gameList");
    }

    show("default", "default");
}

function refreshJoinGame() {
    dataGridDisplayRefresh(gameListDG, "gameList");
    menuBlockResize();
}

function beginCreateGame() {
    createGameNextButton(radioGroupGetValue("creategame"));
}

function createGameSetDifficulty() {
    createGameNextButton(radioGroupGetValue("diff"));
}

function createGameSetP2() {
    createGameNextButton("setp2");
}

function createGameP2Settings() {
    show("createsetturntime", state);
}

function refreshGameBoard() {
    switch (state) {
        case "createhotseat":
            mainShow("starthotseat");
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
    switch (state) {
        case "createhotseat":
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
            show("createsetturntime", state);
            break;
        case "setp2":
            show("createp2settings", state);
    }
}

function createSetTurnTimeBackButton() {
    switch (state) {
        case "createsingle":
            show("createsingle", state);
            break;
        case "createhotseat":
            show("createp2settings", state);
            break;
        case "createmultiplayer":
            show("creategame", state);
            break;
    }
}