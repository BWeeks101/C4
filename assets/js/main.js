/* Initialise global settings object */
let c4 = new appGlobals();

/* When the document is ready, call the onLoad function */
$(document).ready(mainOnLoad);

/* on Load */
function mainOnLoad() {
    c4.uiState = "default"; //Set the default state
    loadColorMode(); //Apply the appropriate theme (light or dark(default))
    sideNavOnLoad(); //Initialise the sideNav
    displayDataGrid(c4.logo.smGrid, "smLogoGrid", "off", false);
    displayLogo(); //draw the logo
    elementDisplay("toggle","menuBlockContainer"); //Show the menu block
    loadPlayerSettings(); //Initialise player settings
    initC4Select();
    mainOnResize(); //Call the onResize function to ensure our content fits within a single page
}

/* on Resize */
function mainOnResize() {
    sideNavResize(); //Resize the sideNav
    mainBlockResize(); //Resize the main block
    logoResize(); //Resize the logo
    menuBlockResize(); //Resize the menu block
}

/* Switch between light and dark themes */
/* Requires: */
/*      ihtml: "Dark Mode" or "Light Mode".  Usually provided as this.innerHTML from the clicked element*/
function switchColorMode(ihtml) {
    let option;
    switch (ihtml) {
        case "Dark Mode": //We are switching to Dark Mode, so change the text of the element to read "Light Mode" and set option = dark
            checkSideNavState(function(){document.getElementById("colorMode").innerHTML = "Light Mode";});
            option = "dark";
            break;
        case "Light Mode": //We are switching to Light Mode, so change the text of the element to read "Dark Mode" and set option = light
            checkSideNavState(function(){document.getElementById("colorMode").innerHTML = "Dark Mode";});
            option = "light";
            break;
    }
    document.head.removeChild(document.getElementById("colorStyle")); //The link to the light/dark css files has id=colorStyle.  Remove this element.
    let colorModeStyle = document.createElement("link"); //Create a new link element
    document.head.appendChild(colorModeStyle); //Apply the new link element to the document head
    colorModeStyle.rel = "stylesheet"; //Apply standard attributes to the link element
    colorModeStyle.type = "text/css";
    colorModeStyle.id = "colorStyle"; //Ensure the link element has an id of colorStyle
    colorModeStyle.href = `assets/css/${option}.css`; //Set the linked CSS file as appropriate
    localStorage.removeItem("colorMode"); //Remove the colorMode kv pair from localStorage
    localStorage.setItem("colorMode", option); //Add the colorMode kv pair to local Storage with the selected theme name.  This will be reapplied when the page is reloaded
}

/* Load the appropriate theme per localStorage colorMode kv pair */
function loadColorMode() {
    if (localStorage.getItem("colorMode") == "light") {
        switchColorMode("Light Mode");
    } else {
        switchColorMode("Dark Mode");
    }
}

function logoResize() {
    if (document.getElementById("logoGrid").firstElementChild == null) { //If the logoGrid is removed during resize
        return; //Do not continue
    }

    if (document.getElementById("logoGrid").classList.contains("d-none") == false) {
        if (c4.logo.animState == false) {
            let gridCounts = dataGridDisplayGetCounts("logoGrid"); //Get the number of rows and columns for the logoGrid element
            if (gridCounts == false) { //If false, then we could not return the values, so return false
                console.log(`function logoResize failed.  Cascade failure originating with dataGridDisplayGetCounts("logoGrid").`);
                return false;
            }

            logoFontResize();

            setlogoGridContentRowMarginTop();

            let colCenter = getLogoGridColCenter(); //Get the center point of each header and column cell
            if (typeof colCenter != "object") { //If colCenter is not an object then we could not get the center points, so return false
                console.log(`function logoResize failed.  Unable to get center points.  Cascade failure originating with getLogoGridColCenter()`);
                return false;
            }

            for (let i = 0; i < gridCounts[0]; i++) {
                if (document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.left != "") {
                    colCenter.headerCenter[i].absoluteX = colCenter.headerCenter[i].absoluteX - parseFloat(document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.left);
                }
                document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.left = `${(colCenter.contentCenter[i].absoluteX - colCenter.headerCenter[i].absoluteX)}px`;

                if (document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.top != "") {
                    colCenter.headerCenter[i].absoluteY = colCenter.headerCenter[i].absoluteY - parseFloat(document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.top);
                }
                document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.top = `${(colCenter.contentCenter[i].absoluteY - colCenter.headerCenter[i].absoluteY)}px`;
            }
        }
    }
}

/* Font Resize */
function logoFontResize() {
    let minFontSizePx = parseFloat(getComputedStyle(document.getElementById("logoGridHcol-0").firstElementChild).getPropertyValue(`font-size`).trim()); //Min Supported Logo Font Size in px
    let minLogoContentSize = parseFloat(getComputedStyle(document.getElementById("logoGridCol0RowId0").firstElementChild.lastElementChild).getPropertyValue(`min-width`).trim()); //Min Logo Content Size in px
    let maxLogoContentSize = parseFloat(getComputedStyle(document.getElementById("logoGridCol0RowId0").firstElementChild.lastElementChild).getPropertyValue(`max-width`).trim()); //Max Logo Content Size in px
    let fontLogoScale = (minFontSizePx / minLogoContentSize) * 100; //Percentage difference betwen font and logo content
    let maxFontSizePx = (maxLogoContentSize / 100) * fontLogoScale; //Max Logo Font Size in px

    let gridCounts = dataGridDisplayGetCounts("logoGrid"); //Get the number of rows and columns for the logoGrid element
    if (gridCounts == false) { //If false, then we could not return the values, so return false
        console.log(`function logoResize failed.  Cascade failure originating with dataGridDisplayGetCounts("logoGrid").`);
        return false;
    }

    let contentWidth = getElementPos(document.getElementById(`logoGridCol0RowId0`).firstElementChild.lastElementChild).width;
    let checkWidth;
    for (let i = 1; i < gridCounts[0]; i++) {
        checkWidth = getElementPos(document.getElementById(`logoGridCol${i}RowId0`).firstElementChild.lastElementChild).width;
        if (checkWidth < contentWidth) {
            contentWidth = checkWidth; //Use the smallest contentWidth to ensure text fits all
        }
    }

    let fontSize = (contentWidth / 100) * fontLogoScale; //Calculate font size based on current content col width, and the fontLogoScale value
    if (fontSize > maxFontSizePx) {
        fontSize = maxFontSizePx; //Do not exceed max font size in px
    } else if (fontSize < minFontSizePx) {
        fontSize = minFontSizePx; //Do not exceed min font size in px
    }

    for (let i = 0; i < gridCounts[0]; i++) {
        document.getElementById(`logoGridHcol-${i}`).firstElementChild.firstElementChild.style.fontSize = `${fontSize}px`;
    }
}

/* Resize the main block */
/* This block is used to display the logo, rules and game board */
function mainBlockResize() {
    /* Remove any existing height or padding-bottom style properties from the main block container */
    document.getElementById("mainBlockContainer").style.removeProperty("height");
    document.getElementById("mainBlockContainer").style.removeProperty("padding-bottom");

    /* If the menu block container is not visible, then calculate and apply the correct height and padding-bottom styles to the main block */
    if (document.getElementById("menuBlockContainer").classList.contains("d-none") == true) {
        let mainBlockContainerHeight = calcBlockHeight();
        document.getElementById("mainBlockContainer").style.height = `${mainBlockContainerHeight}px`;
        let mainBlockContainerPadBottom = getElementPropertyVal("mainBlockContainer", "padding-top", "int");
        document.getElementById("mainBlockContainer").style.paddingBottom = `${mainBlockContainerPadBottom}px`;

        /* If the rules container is visible, then calculate and apply height and width properties for it and it's children to ensure we do not scroll the page */
        if (document.getElementById("rulesContainer").classList.contains("d-none") == false) {

            /* Remove any existing height style properties from the rules container and any appropriate children */
            document.getElementById("rulesContainer").style.removeProperty("height");
            document.getElementById("rulesMainContent").style.removeProperty("height");

            /* Get the total padding value of the mainBlock (parent of the rules container) */
            let mainBlockContainerPadTop = getElementPropertyVal("mainBlockContainer", "padding-top", "int");
            mainBlockContainerPadBottom = getElementPropertyVal("mainBlockContainer", "padding-bottom", "int");
            let mainBlockContainerPadTotal = mainBlockContainerPadTop + mainBlockContainerPadBottom;

            /* Set the rules container height to equal the height of the parent - padding */
            let rulesContainerHeight = mainBlockContainerHeight - mainBlockContainerPadTotal;
            document.getElementById("rulesContainer").style.height = `${rulesContainerHeight}px`;

            /* Set the height of the rules main container element */
            let rulesControlButtonsHeight = getElementPos(document.getElementById("rulesContainer").lastElementChild).height;
            let rulesMainContentHeight = rulesContainerHeight - rulesControlButtonsHeight;
            document.getElementById("rulesMainContent").style.height = `${rulesMainContentHeight}px`;

            return;
        }

        /* If the game board container is visible, then calculate and apply height and width properties for it and it's children to ensure we do not scroll the page */
        if (document.getElementById("gameBoardContainer").classList.contains("d-none") == false) {
            /* Remove any existing height, max-height, or max-width style properties from the game board container and appropriate children */
            document.getElementById("gameBoardContainer").style.removeProperty("height");
            document.getElementById("gameBoardContainer").style.removeProperty("max-width");
            document.getElementById("gameContainer").style.removeProperty("height");
            document.getElementById("feedbackContainer").style.removeProperty("height");
            document.getElementById("gBoardContentContainer").style.removeProperty("max-height");
            document.getElementById("gBoard").style.removeProperty("height");

            /* Get the total padding value of the mainBlock (parent of the game board container) */
            let mainBlockContainerPadTop = getElementPropertyVal("mainBlockContainer", "padding-top", "int");
            mainBlockContainerPadBottom = getElementPropertyVal("mainBlockContainer", "padding-bottom", "int");
            let mainBlockContainerPadTotal = mainBlockContainerPadTop + mainBlockContainerPadBottom;

            /* Set the game board container height to equal the height of the parent - padding */
            let gameBoardContainerHeight = mainBlockContainerHeight - mainBlockContainerPadTotal;
            document.getElementById("gameBoardContainer").style.height = `${gameBoardContainerHeight}px`;

            /* Set the height of the game container element */
            let playerInfoContainerHeight = getElementPos("playerInfoContainer").height; //Get the height of the player info container
            let gameContainerHeight = gameBoardContainerHeight - playerInfoContainerHeight; //The game container height = game board container height - player info container height
            document.getElementById("gameContainer").style.height = `${gameContainerHeight}px`;

            /* Set the height of the feedback container, message and control rows */
            let feedbackMessageHeight = getElementPos("feedbackMessage").height; //Get the height of the feedback message
            let feedbackControlRowHeight = getElementPos("feedbackControlRow").height; //Get the height of the control row
            let feedbackContainerHeight = feedbackMessageHeight + feedbackControlRowHeight; //the container height = message height + control row height, with a minimum of 87px.
            if (feedbackContainerHeight < 87) {
                feedbackContainerHeight = 87;
            }
            document.getElementById("feedbackContainer").style.height = `${feedbackContainerHeight}px`;

            /* Set the max height of the gboard content container */
            let gBoardContentContainerMaxHeight = gameContainerHeight - feedbackContainerHeight; //gboard content container max height = game container height - feedback container height
            document.getElementById("gBoardContentContainer").style.maxHeight = `${gBoardContentContainerMaxHeight}px`;

            /* Set the max width of the game board container */
            let gameBoardContainerMaxWidth = (gBoardContentContainerMaxHeight / 85.8) * 100;  //game board container max width =  116.55% of the game board container max height
            document.getElementById("gameBoardContainer").style.maxWidth = `${gameBoardContainerMaxWidth}px`;

            /* Set the height of the gboard to equal the height of the gboard content container */
            let gBoardContentContainerHeight = getElementPos("gBoardContentContainer").height;
            let gBoardHeight = gBoardContentContainerHeight;
            document.getElementById("gBoard").style.height = `${gBoardHeight}px`;

            return;
        }
    }
}

/* Resize the menuBlock */
/* This block contains the initial options pane, player settings pane, and turn time limit pane */
function menuBlockResize() {
    /* calculate the menu block height and set it */
    let menuBlockHeight = calcBlockHeight();
    document.getElementById("menuBlock").style.height = `${menuBlockHeight}px`;
}

/* Get Computed Property of element */
/* Requires: */
/*      elementId: id of the element whose property value we wish to get */
/*      propertyName: name of the property */
/*      resFormat (OPTIONAL): Result format. */
/*              default: as returned by window.getComputedStyle().getPropertyValue() */
/*              int: parseInt the result before returning */
/*              float: parseFloat the result before returning */
/* Returns: */
/*      result of window.getComputedStyle().getPropertyValue() */
/*      NB: Format of returned value depends on resFormat argument */
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
/* Requires: */
/*      element: either id (string) of the element whose positional/size data we wish to return */
/*               or object whose positional/size data we wish to return */
/* Returns object with the following properties: */
/*      x */
/*      y */
/*      width */
/*      height */
/*      top */
/*      right */
/*      bottom */
/*      left */
/*      center: */
/*          x */
/*          y */
/*          absoluteX */
/*          absoluteY */
/*      NB: top/right/bottom/left are adjusted to take into account scroll position by utilising window.page[X/Y]Offset */
/*          center.absoluteX and center.absoluteY are calculated based on adjusted top/left positions */
function getElementPos(element) {
    let elementPos;
    if (typeof element == "string") {
        elementPos = document.getElementById(element).getBoundingClientRect();
    } else if (typeof element == "object") {
        elementPos = element.getBoundingClientRect();
    }
    elementPos.top = elementPos.top + window.pageYOffset;
    elementPos.right = elementPos.right + window.pageXOffset;
    elementPos.bottom = elementPos.bottom + window.pageYOffset;
    elementPos.left = elementPos.left + window.pageXOffset;
    elementPos.center = {x:elementPos.width / 2, y:elementPos.height / 2, absoluteX:elementPos.left + (elementPos.width / 2), absoluteY:elementPos.top + (elementPos.height / 2)};
    return elementPos;
}

/* Calculate Desired Height of mainBlock or menuBlock */
/* If: */
/*      mainBlockContainer is Hidden, and menuBlockContainer is visible */
/* Or: */
/*      mainBlockContainer and menuBlockContainer are both visible */
/* Then: */
/*      Output is suitable for menuBlockContainer */
/* Else: */
/*      Output is suitable for mainBlockContainer */
function calcBlockHeight() {
    /* Browser Viewport Height */
    let wHeight = window.innerHeight;

    /* Min Supported Browser Height */
    let minWHeight = parseFloat(getComputedStyle(document.getElementsByTagName("body")[0]).getPropertyValue(`min-height`).trim());
    if (wHeight < minWHeight) {
        wHeight = minWHeight;
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
    /* Reduce Block Height by the difference to prevent vertical scroll, respecting minimum height */
    if (contentHeight > wHeight) {
        blockHeight = blockHeight - (contentHeight - wHeight);
    }

    return blockHeight;
}

/* Show/Hide/Toggle display of an element */
/* Requires: */
/*      action: toggle/show/hide */
/*      elementId: Id of the element we wish to target */
function elementDisplay(action, elementID) {
    switch (action) {
        case "toggle":
            document.getElementById(elementID).classList.toggle("d-none"); //toggle visibility
            break;
        case "show":
            document.getElementById(elementID).classList.remove("d-none"); //display the element
            break;
        case "hide":
            document.getElementById(elementID).classList.add("d-none"); //do not display the element
            break;
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