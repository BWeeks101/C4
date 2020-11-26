/* Show/Hide Default */
function showDefault() {
    state = "default";
    mainShow("default");
    closeNav();
    setTimeout(function() {
        sideNavShow("default");
    }, 650);    
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

/* Show/Hide Options */
function showOptions() {
    state = "options";
    mainShow("options");
    if (sideNavState() == "open") {
        closeNav();
        setTimeout(function() {
            sideNavShow("options");
        }, 650);
    } else {
        sideNavShow("options");
    };
}

function mainShowOptions() {    
    mainHideAll();
    elementDisplayShow("imgContainer");
    mainHideMenuContent();
    elementDisplayShow("menuBlockContainer");
    elementDisplayShow("menuOptions");    
}

function sideNavShowOptions() {
    sideNavHideAll();
    sideNavLinkShow("sn-settings");
    sideNavLinkShow("sn-leaderboard");
    sideNavLinkShow("sn-rules");
    sideNavSoutSelectShow("sout");
}

/* Show/Hide Settings */
function showSettings() {
    state = "settings";
    mainShow("settings");
    if (sideNavState() == "open") {
        closeNav();
        setTimeout(function() {
            sideNavShow("settings");
        }, 650);
    } else {
        sideNavShow("settings");
    };
}

function mainShowSettings() {
    mainHideAll();
    elementDisplayShow("imgContainer");
    mainHideMenuContent();
    elementDisplayShow("menuBlockContainer");
    elementDisplayShow("menuSettings");
}

function sideNavShowSettings() {
    sideNavHideAll();
    sideNavLinkShow("sn-options");
    sideNavLinkShow("sn-leaderboard");
    sideNavLinkShow("sn-rules");
    sideNavSoutSelectShow("sout");
}

/* Show/Hide Create Game */
function showCreateGame() {
    state = "creategame";
    mainShow("creategame");
    if (sideNavState() == "open") {
        closeNav();
        setTimeout(function() {
            sideNavShow("creategame");
        }, 650);
    } else {
        sideNavShow("creategame");
    };
}

function mainShowCreateGame() {    
    mainHideAll();
    elementDisplayShow("imgContainer");
    mainHideMenuContent();
    elementDisplayShow("menuBlockContainer");
    elementDisplayShow("menuCreateGame");    
}

function sideNavShowCreateGame() {
    sideNavHideAll();
    sideNavLinkShow("sn-cancelcreate");    
    sideNavSoutSelectShow("sout");
}

/* Show/Hide Rules */
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
                sideNavLinkShow("sn-settings");
                sideNavSoutSelectShow("sout");
                break;
        }        
        sideNavLinkShow("sn-leaderboard");
    }, 650);    
}

/* Show/Hide Leaderboard */
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
                sideNavLinkShow("sn-settings");
                sideNavSoutSelectShow("sout");
                break;
        }        
        sideNavLinkShow("sn-rules");
    }, 650);
}

/* Toggle Display of sideNav Links and Dividers */
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

function elementDisplayToggle(elementID) {
    document.getElementById(elementID).classList.toggle("d-none");
}

function elementDisplayHide(elementID) {
    document.getElementById(elementID).classList.add("d-none");
}

function elementDisplayShow(elementID) {
    document.getElementById(elementID).classList.remove("d-none");
}

/* Hide sideNav / main / menu Content */
function sideNavHideAll() {
    let elementCollection = document.getElementById("sideNav").children;
    let i;
    for (i = 1; i < elementCollection.length; i++) {
        elementDisplay("hide", elementCollection[i].id);        
    }
}

function mainHideAll() {
    let elementCollection = document.getElementById("mainBlockContainer").children;
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplay("hide", elementCollection[i].id);      
    }
    elementDisplay("hide", "menuBlockContainer");
    mainHideMenuContent();
}


function mainHideMenuContent() {
    let elementCollection = document.getElementById("menuContentContainer").children;
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplay("hide", elementCollection[i].id);      
    }
}


/* Calculate desired height of menuBlock */
function calcMenuHeight() {
    /* Browser Viewport Height */
    let wHeight = window.innerHeight;

    /* Min Supported Browser Height */
    if (wHeight < 760) {
        wHeight = 760;
    }

    /* Fixed Header and Footer Heights */
    let headerHeight = 66;
    let footerHeight = 50;

    /* main Element Height */
    let mainHeight = getElementPos("main").height;

    /* Large Logo Height */
    let mainBlockImgHeight = getElementPos("mainBlockContainer").height;

    /* Is Image Hidden */
    let imgHidden = document.getElementById("mainBlockContainer").classList.contains("d-none");
    
    /* Calculated Menu Height */
    let menuHeight;

    if (imgHidden == true) {
        menuHeight = mainHeight - 10;
    } else {
        menuHeight = mainHeight - mainBlockImgHeight - 10;
    }

    /* Calculated Full Content Height */
    let contentHeight;

    if (imgHidden == true) {
        contentHeight = headerHeight + menuHeight + footerHeight + 10;
    } else {
        contentHeight = headerHeight + mainBlockImgHeight + menuHeight + footerHeight + 10;
    }
    
    /* If Calculated Full Content Height is Greater than Browser Viewport */
    /* Reduce Menu Height by the difference to prevent vertical scroll */
    /* Will need revising for mobile views in portrait - probably add a minheight */
    if (contentHeight > wHeight) {
        menuHeight = menuHeight - (contentHeight - wHeight);
    }

    return menuHeight;
}

/* Calculate desired height of mainBlock */
function calcMainBHeight() {
    /* Browser Viewport Height */
    let wHeight = window.innerHeight;

    /* Min Supported Browser Height */
    if (wHeight < 760) {
        wHeight = 760;
    }

    /* Fixed Header and Footer Heights */
    let headerHeight = 66;
    let footerHeight = 50;

    /* main Element Height */
    let mainHeight = getElementPos("main").height;

    /* Calculated Main Block Container Height */
    let mainBHeight = mainHeight;
    
    /* Calculated Full Content Height */
    let contentHeight = headerHeight + mainBHeight + footerHeight;
    
    /* If Calculated Full Content Height is Greater than Browser Viewport */
    /* Reduce Menu Height by the difference to prevent vertical scroll */
    /* Will need revising for mobile views in portrait - probably add a minheight */
    if (contentHeight > wHeight) {
        mainBHeight = mainBHeight - (contentHeight - wHeight);
    }

    return mainBHeight;
}