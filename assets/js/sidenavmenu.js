/* Global 'state' variable */
let state = "default"

function showDefault() {
    state = "default";
    mainShowDefault();
    closeNav();
    setTimeout(function() {
        sideNavShowDefault();
    }, 650);    
}

function showRules() {
    mainHideAll();
    elementDisplayShow("rulesContainer");
    closeNav();
    setTimeout(function() {
        sideNavHideAll();
        switch (state) {
            case "default":
                sideNavLinkShow("sn-signin");
                break;
            case "options":
                sideNavLinkShow("sn-options");
                sideNavSoutSelectShow("sout");
                break;
            case "settings":
                sideNavLinkShow("sn-options");
                sideNavSoutSelectShow("sout");
                break;
        }        
        sideNavLinkShow("sn-leaderboard");
    }, 650);    
}

function showLeaderboard() {
    mainHideAll();
    elementDisplayShow("leaderboardContainer");
    closeNav();
    setTimeout(function() {
        sideNavHideAll();
        switch (state) {
            case "default":
                sideNavLinkShow("sn-signin");
                break;
            case "options":
                sideNavLinkShow("sn-options");
                sideNavSoutSelectShow("sout");
                break;
            case "settings":
                sideNavLinkShow("sn-options");
                sideNavSoutSelectShow("sout");
                break;
        }        
        sideNavLinkShow("sn-rules");
    }, 650);
}

function showOptions() {
    state = "options";
    mainShowOptions();
    if (sideNavState() == "open") {
        closeNav();
        setTimeout(function() {
            sideNavShowOptions();
        }, 650);
    } else {
        sideNavShowOptions();
    };
}

function showSettings() {
    state = "settings";
    mainShowSettings();
    if (sideNavState() == "open") {
        closeNav();
        setTimeout(function() {
            sideNavShowSettings();
        }, 650);
    } else {
        sideNavShowSettings();
    };
}

function signOut() {
    showDefault();
}

function sideNavLinkToggle(className) {
    let elementCollection = document.getElementsByClassName(className)
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplayToggle(elementCollection[i].id);
    }
}

function sideNavLinkShow(className) {
    let elementCollection = document.getElementsByClassName(className)
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplayShow(elementCollection[i].id);
    }
}

function sideNavLinkHide(className) {
    let elementCollection = document.getElementsByClassName(className)
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplayHide(elementCollection[i].id);
    }
}

function sideNavHideAll() {
    let elementCollection = document.getElementById("sideNav").children;
    let i;
    for (i = 1; i < elementCollection.length; i++) {
        elementDisplayHide(elementCollection[i].id);        
    }
}

function mainHideAll() {
    let elementCollection = document.getElementById("mainBlockContainer").children;
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplayHide(elementCollection[i].id);      
    }
    elementDisplayHide("menuBlockContainer");
    mainHideMenuContent();
}

function mainHideMenuContent() {
    let elementCollection = document.getElementById("menuContentContainer").children;
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplayHide(elementCollection[i].id);      
    }
}

function mainShowDefault() {
    mainHideAll();
    let elementCollection = document.getElementsByClassName("default");
    let i;    
    for (i = 0; i < elementCollection.length; i++) {        
        if (elementCollection[i].parentElement.id == "main" || elementCollection[i].parentElement.id == "mainBlockContainer" || elementCollection[i].parentElement.id == "menuContentContainer") {
            console.log(elementCollection[i].id)
            elementDisplayShow(elementCollection[i].id);
        }
    }
}

function sideNavShowOptions() {
    sideNavHideAll();
    sideNavLinkShow("sn-settings");
    sideNavLinkShow("sn-leaderboard");
    sideNavLinkShow("sn-rules");
    sideNavSoutSelectShow("sout");
}

function mainShowOptions() {    
    mainHideAll();
    elementDisplayShow("imgContainer");
    mainHideMenuContent();
    elementDisplayShow("menuBlockContainer");
    elementDisplayShow("menuOptions");    
}

function sideNavShowSettings() {
    sideNavHideAll();
    sideNavLinkShow("sn-options");
    sideNavLinkShow("sn-leaderboard");
    sideNavLinkShow("sn-rules");
    sideNavSoutSelectShow("sout");
}

function mainShowSettings() {
    mainHideAll();
    elementDisplayShow("imgContainer");
    mainHideMenuContent();
    elementDisplayShow("menuBlockContainer");
    elementDisplayShow("menuSettings");
}

function sideNavSoutSelectShow(option) {
    if (option === undefined || option === "sout") {
        sideNavLinkHide("sn-sout-mult");
        sideNavLinkShow("sn-sout");
        elementDisplayShow("soutGroup");
    } else {
        sideNavLinkHide("sn-sout");
        sideNavLinkShow("sn-sout-mult");
        elementDisplayShow("soutGroup");
    };    
}



function sideNavShowDefault() {
    sideNavHideAll();
    let elementCollection = document.getElementsByClassName("default");
    let i;    
    for (i = 0; i < elementCollection.length; i++) {
        if (elementCollection[i].parentElement.id == "sideNav") {
            elementDisplayShow(elementCollection[i].id);
        }        
    }
}