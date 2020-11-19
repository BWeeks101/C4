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

function signOut() {
    show("default", "default");
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
    if (option != "rules" && option != "leaderboard") {
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
        case "createsetturntime":
            elementDisplay("show", "menuCreateSetTurnTime");
            break;
    }        
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
        case "createsetturntime":
            sideNavLinkDisplay("show", "sn-cancelcreate");    
            sideNavSoutSelectShow("sout");
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

function beginCreateGame() {
    createGameNextButton(radioGroupGetValue("creategame"));
}

function createGameSetDifficulty() {
    createGameNextButton(radioGroupGetValue("diff"));
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

function createGameNextButton(value) {
    switch (value) {
        case "single":
            show("createsingle", "createsingle");
            break;
        case "hotseat":
            break;
        case "multiplayer":
            break;
        case "easy":
        case "normal":
        case "hard":
            show("createsetturntime", state);
            break;
    }
}

function createSetTurnTimeBackButton() {
    switch (state) {
        case "createsingle":
            show("createsingle", state);
            break;
        case "createhotseat":
            show("createhotseat", state);
            break;
        case "createmultiplayer":
            show("createmultiplayer", state);
            break;
    }
}