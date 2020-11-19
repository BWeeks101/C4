/* Global 'state' variable */
let state = "default"

function show(option, newstate) {
    console.log(`original state: ${state}`);
    if (newstate != undefined) {
        state = newstate;
    }
    console.log(`new state: ${state}`);
    mainShow(option);
    if (sideNavState() == "open") {
        console.log(`nav is open. close and wait 650ms`);
        closeNav();
        setTimeout(function() {
            sideNavShow(option);
        }, 650);
    } else {
        console.log(`nav is closed.  Continue.`)
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
            sideNavLinkDisplay("show", "sn-cancelcreate");    
            sideNavSoutSelectShow("sout");
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
            console.log("it worked");
            break;
        case "hotseat":
            break;
        case "multiplayer":
            break;
    }
}