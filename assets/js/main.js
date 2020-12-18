/* Initialise global settings object */
let c4 = new appGlobals();

/* When the document is ready, call the onLoad function */
$(document).ready(mainOnLoad);

/* on Load */
function mainOnLoad() {    
    c4.game.state = "default"; //Set the default state
    loadColorMode(); //Apply the appropriate theme (light or dark(default))
    sideNavOnLoad(); //Initialise the sideNav
    drawLogoGrid(); //draw the logo
    elementDisplay("toggle","menuBlockContainer"); //Show the menu block
    loadPlayerSettings(); //Initialise player settings
    mainOnResize(); //Call the onResize function to ensure our content fits within a single page
}

/* on Resize */
function mainOnResize() {
    sideNavResize(); //Resize the sideNav
    mainBlockResize(); //Resize the main block
    menuBlockResize(); //Resize the menu block
}

function switchColorMode(ihtml) {
    let option;
    switch (ihtml) {
        case "Dark Mode":
            checkSideNavState(function(){document.getElementById("colorMode").innerHTML = "Light Mode";});
            option = "dark";
            break;
        case "Light Mode":
            checkSideNavState(function(){document.getElementById("colorMode").innerHTML = "Dark Mode";});
            option = "light";
            break;
    }
    document.head.removeChild(document.getElementById("colorStyle"));
    let colorModeStyle = document.createElement("link");
    document.head.appendChild(colorModeStyle);
    colorModeStyle.rel = "stylesheet";
    colorModeStyle.type = "text/css";
    colorModeStyle.id = "colorStyle";
    colorModeStyle.href = `assets/css/${option}.css`;
    localStorage.removeItem("colorMode");
    localStorage.setItem("colorMode", option);
}

function loadColorMode() {    
    if (localStorage.getItem("colorMode") == "light") {        
        switchColorMode("Light Mode");
    } else {        
        switchColorMode("Dark Mode");
    }    
}

function mainBlockResize() {
    document.getElementById("mainBlockContainer").style.removeProperty("height");
    document.getElementById("mainBlockContainer").style.removeProperty("padding-bottom");
    if (document.getElementById("menuBlockContainer").classList.contains("d-none") == true) {
        mainBlockContainerHeight = calcBlockHeight();
        document.getElementById("mainBlockContainer").style.height = `${mainBlockContainerHeight}px`;
        mainBlockContainerPadBottom = getElementPropertyVal("mainBlockContainer", "padding-top", "int");
        document.getElementById("mainBlockContainer").style.paddingBottom = `${mainBlockContainerPadBottom}px`;

        if (document.getElementById("gameBoardContainer").classList.contains("d-none") == false) {

            document.getElementById("gameBoardContainer").style.removeProperty("height");
            document.getElementById("gameBoardContainer").style.removeProperty("max-width");
            document.getElementById("gameContainer").style.removeProperty("height");
            document.getElementById("feedbackContainer").style.removeProperty("height");
            document.getElementById("gBoardContentContainer").style.removeProperty("max-height");
            document.getElementById("gBoard").style.removeProperty("height");

            mainBlockContainerPadTop = getElementPropertyVal("mainBlockContainer", "padding-top", "int");
            mainBlockContainerPadBottom = getElementPropertyVal("mainBlockContainer", "padding-bottom", "int");
            mainBlockContainerPadTotal = mainBlockContainerPadTop + mainBlockContainerPadBottom;

            gameBoardContainerHeight = mainBlockContainerHeight - (mainBlockContainerPadTotal);
            document.getElementById("gameBoardContainer").style.height = `${gameBoardContainerHeight}px`;

            playerInfoContainerHeight = getElementPos("playerInfoContainer").height;
            gameContainerHeight = gameBoardContainerHeight - playerInfoContainerHeight;
            document.getElementById("gameContainer").style.height = `${gameContainerHeight}px`;

            feedbackMessageHeight = getElementPos("feedbackMessage").height;
            feedbackControlRowHeight = getElementPos("feedbackControlRow").height;
            feedbackContainerHeight = feedbackMessageHeight + feedbackControlRowHeight;
            if (feedbackContainerHeight < 87) {
                feedbackContainerHeight = 87;
            }
            document.getElementById("feedbackContainer").style.height = `${feedbackContainerHeight}px`;

            gBoardContentContainerMaxHeight = gameContainerHeight - feedbackContainerHeight;
            document.getElementById("gBoardContentContainer").style.maxHeight = `${gBoardContentContainerMaxHeight}px`;
            gameBoardContainerMaxWidth = (gBoardContentContainerMaxHeight / 85.8) * 100;
            document.getElementById("gameBoardContainer").style.maxWidth = `${gameBoardContainerMaxWidth}px`;

            gBoardContentContainerHeight = getElementPos("gBoardContentContainer").height;            
            gBoardHeight = gBoardContentContainerHeight;
            document.getElementById("gBoard").style.height = `${gBoardHeight}px`;
        }
    }    
}

function menuBlockResize() {
    menuBlockHeight = calcBlockHeight();
    document.getElementById("menuBlock").style.height = `${menuBlockHeight}px`;    
}

/* Get Computed Property of element */
function getElementPropertyVal(elementId, propertyName, resFormat) {
    let propertyVal = window.getComputedStyle(document.getElementById(elementId), null).getPropertyValue(propertyName);
    switch (resFormat) {
        case "int":
            let propertyNum = parseInt(propertyVal);
            return propertyNum;
        case "float":
            let propertyFloat = parseFloat(propertyVal);
            return propertyFloat;
        default:
            return propertyVal;
    }
}

/* Get position and size of element */
function getElementPos(elementId) {
    let elementPos = document.getElementById(elementId).getBoundingClientRect();
    elementPos.top = elementPos.top + window.pageYOffset;
    elementPos.right = elementPos.right + window.pageXOffset;
    elementPos.bottom = elementPos.bottom + window.pageYOffset;
    elementPos.left = elementPos.left + window.pageXOffset;    
    return elementPos;
}

/* Calculate Desired Height of mainBlock or menuBlock */
/* If: 
/* mainBlockContainer is Hidden, and menuBlockContainer is visible
/* Or:
/* mainBlockContainer and menuBlockContainer are both visible
/* Then:
/* Output is suitable for menuBlockContainer
/* Else:
/* Output is suitable for mainBlockContainer */
function calcBlockHeight() {
    /* Browser Viewport Height */
    let wHeight = window.innerHeight;

    /* Min Supported Browser Height */
    if (wHeight < 620) {
        wHeight = 620;
    }

    /* Fixed Header and Footer Heights */
    let headerHeight = 66;
    let footerHeight = 50;

    /* main Element Height */
    let mainHeight = getElementPos("main").height;

    /* Is mainBlockContainer Hidden */
    let mainBlockContainerHidden = document.getElementById("mainBlockContainer").classList.contains("d-none");

    /* mainBlockContainer Height */
    let mainBlockContainerHeight;

    if (mainBlockContainerHidden == false) {        
        mainBlockContainerHeight = getElementPos("mainBlockContainer").height;
    }

    /* Is menuBlockContainer Hidden */
    let menuBlockContainerHidden = document.getElementById("menuBlockContainer").classList.contains("d-none");
    
    /* Calculated Block Height and Full Content Height */
    let blockHeight;
    let contentHeight;

    if (mainBlockContainerHidden == true && menuBlockContainerHidden == false) {
        blockHeight = mainHeight - 10;
        contentHeight = headerHeight + blockHeight + footerHeight + 10;
    } else if (mainBlockContainerHidden == false && menuBlockContainerHidden == false) {
        blockHeight = mainHeight - mainBlockContainerHeight - 10;
        contentHeight = headerHeight + mainBlockContainerHeight + blockHeight + footerHeight + 10;
    } else if (mainBlockContainerHidden == false && menuBlockContainerHidden == true) {
        blockHeight = mainHeight;
        contentHeight = headerHeight + blockHeight + footerHeight;
    }    

    /* If Calculated Full Content Height is Greater than Browser Viewport */
    /* Reduce Block Height by the difference to prevent vertical scroll */
    /* Will need revising for mobile views in portrait - probably add a minheight */
    if (contentHeight > wHeight) {
        blockHeight = blockHeight - (contentHeight - wHeight);
    }

    return blockHeight;
}

function elementDisplay(action, elementID) {
    switch (action) {
        case "toggle":
            document.getElementById(elementID).classList.toggle("d-none");
            break;
        case "show":
            document.getElementById(elementID).classList.remove("d-none");
            break;
        case "hide":
            document.getElementById(elementID).classList.add("d-none");
            break;            
    }
}