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
        i = 3;
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
    if (option != "rules" && option !="starthotseat") {
        elementDisplay("show", "imgContainer");
        hideAll("menuContentContainer");
        elementDisplay("show", "menuBlockContainer");                
    } 
    if (option == "settings") {
        elementDisplay("hide", "mainBlockContainer");
    } else {
        elementDisplay("show", "mainBlockContainer");
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
            document.getElementById("p1UserName").value = c4.game.p1.name;
            document.getElementById("p1TokenColor").value = c4.game.p1.tokenColor;
            document.getElementById("p2UserName").value = c4.game.p2.name;
            document.getElementById("p2TokenColor").value = c4.game.p2.tokenColor;
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
            displayDataGrid(c4.game.gBoardDG, "gBoard", "col", false);
            dataGridDisplaySetOnClick("gBoard", "gameClicked(this)");
            elementDisplay("show", "gameBoardContainer");
            feedbackStartDelay();
            break;
        case "createp2settings":
            document.getElementById("p2TokenColor").value = getPlayerColor(2, "token");
            elementDisplay("show", "menuCreateP2Settings");
            break;
        case "createmultiplayer":
            elementDisplay("show", "menuCreateMultiplayer");
            break;
        case "createsetturntime":
            loadTurnTimeLimit();
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
                    break;
                case "options":
                    break;
                case "settings":
                    sideNavLinkDisplay("show", "sn-options");
                    sideNavLinkDisplay("show", "sn-settings");
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
            break;
        case "settings":
            sideNavLinkDisplay("show", "sn-options");
            sideNavLinkDisplay("show", "sn-leaderboard");
            sideNavLinkDisplay("show", "sn-rules");
            break;
        case "creategame":
        case "createsingle":
        case "createhotseat":
        case "createmultiplayer":
        case "createp2settings":
        case "createsetturntime":
            sideNavLinkDisplay("show", "sn-back");
            break;
        case "starthotseat":
            document.getElementById("ctrlResetLink").innerHTML = "Reset";
            sideNavLinkDisplay("show", "sn-ctrlgroup");
            sideNavLinkDisplay("hide", "sn-pause-reset")
            sideNavLinkDisplay("hide", "sn-concede");
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