function show(option, newstate) {    
    if (newstate != undefined) {        
        c4.game.state = newstate;
    }
    mainShow(option);
    checkSideNavState(function(){sideNavShow(option)});
}

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
            switch (c4.game.state) {
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
            switch (c4.game.state) {
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
            elementDisplay("hide", "ctrlResumeLink");
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
    switch (c4.game.state) {
        case "joingame":
            dataGridDisplayRemove("gameList");
            break;
        case "createhotseat":
            dataGridDisplayRemove("gBoard");
            stopHotseat();
            break;
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
    show("createsetturntime", c4.game.state);
}

function refreshGameBoard() {
    switch (c4.game.state) {
        case "createhotseat":
            mainShow("starthotseat");
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
    setTurnTimeLimit()
    switch (c4.game.state) {
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