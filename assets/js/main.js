/* Processed with JSLint */
/* Assume: in Development, a Browser */
/* Tolerate: for statement, long lines */

/* Processed with JSHint */
/* Default Settings */
/* Max Line Length: 250 characters */

/*jshint maxlen: 250 */

/*global appGlobals, checkSideNavState, dataGridDisplayGetCounts,
setlogoGridContentRowMarginTop, getLogoGridColCenter, sideNavResize,
sideNavOnLoad, displayDataGrid, displayLogo, loadPlayerSettings,
initC4Select, $ */

/* JSLint Warns about the use of 'new' on line 17, but this code is correctly creating a new instance of the appGlobals class */
/* JSHint Warns that the hideAll() function is unusued.  The function is called externally from this file */

/* Initialise global settings object */
let c4 = appGlobals();

/* Switch between light and dark themes */
/* Requires: */
/*      ihtml: "Dark Mode" or "Light Mode".  Usually provided as this.innerHTML from the clicked element*/
function switchColorMode(ihtml) {
    let option;
    switch (ihtml) {
    case "Dark Mode": //We are switching to Dark Mode, so change the text of the element to read "Light Mode" and set option = dark
        checkSideNavState(function () {
            document.getElementById("colorMode").innerHTML = "Light Mode";
        });
        option = "dark";
        break;
    case "Light Mode": //We are switching to Light Mode, so change the text of the element to read "Dark Mode" and set option = light
        checkSideNavState(function () {
            document.getElementById("colorMode").innerHTML = "Dark Mode";
        });
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
    if (localStorage.getItem("colorMode") === "light") {
        switchColorMode("Light Mode");
    } else {
        switchColorMode("Dark Mode");
    }
}

/* Get Computed Property of element */
/* Requires: */
/*      element: element id (string) or object whose property value we wish to get */
/*      propertyName: name of the property */
/*      resFormat (OPTIONAL): Result format. */
/*              default: trimmed, but otherwise as returned by window.getComputedStyle().getPropertyValue() */
/*              int: parseInt the result before returning */
/*              float: parseFloat the result before returning */
/* Returns: */
/*      result of window.getComputedStyle().getPropertyValue() */
/*      NB: Format of returned value depends on resFormat argument */
function getElementPropertyVal(element, propertyName, resFormat) {
    let propertyVal;
    if (typeof element === "string") {
        propertyVal = window.getComputedStyle(document.getElementById(element), null).getPropertyValue(propertyName);
    } else if (typeof element === "object") {
        propertyVal = window.getComputedStyle(element, null).getPropertyValue(propertyName);
    }
    let propertyNum;
    let propertyFloat;
    switch (resFormat) {
    case "int":
        propertyNum = parseInt(propertyVal);
        return propertyNum;
    case "float":
        propertyFloat = parseFloat(propertyVal);
        return propertyFloat;
    default:
        propertyVal = propertyVal.trim();
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
    if (typeof element === "string") {
        elementPos = document.getElementById(element).getBoundingClientRect();
    } else if (typeof element === "object") {
        elementPos = element.getBoundingClientRect();
    }
    elementPos.top = elementPos.top + window.pageYOffset;
    elementPos.right = elementPos.right + window.pageXOffset;
    elementPos.bottom = elementPos.bottom + window.pageYOffset;
    elementPos.left = elementPos.left + window.pageXOffset;
    elementPos.center = {x: elementPos.width / 2, y: elementPos.height / 2, absoluteX: elementPos.left + (elementPos.width / 2), absoluteY: elementPos.top + (elementPos.height / 2)};
    return elementPos;
}

/* Logo Font Resize */
function logoFontResize() {
    let minFontSizePx = getElementPropertyVal(document.getElementById("logoGridHcol-0").firstElementChild, "font-size", "float"); //Min Supported Logo Font Size in px
    let minLogoContentSize = getElementPropertyVal(document.getElementById("logoGridCol0RowId0").firstElementChild.lastElementChild, "min-width", "float"); //Min Logo Content Size in px
    let maxLogoContentSize = getElementPropertyVal(document.getElementById("logoGridCol0RowId0").firstElementChild.lastElementChild, "max-width", "float"); //Max Logo Content Size in px
    let fontLogoScale = (minFontSizePx / minLogoContentSize) * 100; //Percentage difference betwen font and logo content
    let maxFontSizePx = (maxLogoContentSize / 100) * fontLogoScale; //Max Logo Font Size in px

    let gridCounts = dataGridDisplayGetCounts("logoGrid"); //Get the number of rows and columns for the logoGrid element
    if (gridCounts === false) { //If false, then we could not return the values, so return false
        console.log(`function logoResize failed.  Cascade failure originating with dataGridDisplayGetCounts("logoGrid").`);
        return false;
    }

    let contentWidth = getElementPos(document.getElementById(`logoGridCol0RowId0`).firstElementChild.lastElementChild).width;
    let checkWidth;
    let i;
    for (i = 1; i < gridCounts[0]; i += 1) {
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

    for (i = 0; i < gridCounts[0]; i += 1) {
        document.getElementById(`logoGridHcol-${i}`).firstElementChild.firstElementChild.style.fontSize = `${fontSize}px`;
    }
}

/* Player Info Font Resize */
function playerInfoFontResize(playerInfoContainerHeight) {
    let minFontSizePx = getElementPropertyVal(document.getElementById("playerInfoContainer").firstElementChild, "font-size", "float"); //Min Supported Player Info Font Size in px
    let playerInfoMinWidth = getElementPropertyVal(document.getElementById("playerInfoContainer").firstElementChild, "min-width", "float"); //Min width of a Player Info Col-4 element in px
    let playerInfoFontScale = (minFontSizePx / playerInfoMinWidth) * 100;

    let playerInfoContainerPadTop = getElementPropertyVal("playerInfoContainer", "padding-top", "float"); //Player Info container padding-top
    let playerInfoContainerPadBottom = getElementPropertyVal("playerInfoContainer", "padding-bottom", "float"); //Player Info container padding-bottom
    let playerInfoContainerPadTotal = playerInfoContainerPadTop + playerInfoContainerPadBottom;

    let playerInfoInnerHeight = playerInfoContainerHeight - playerInfoContainerPadTotal; //Player Info height minus padding

    let playerInfoFontSize = getElementPropertyVal(document.getElementById("player1Info").firstElementChild, "font-size", "float"); //Player Info H3 current font-size in px
    let playerInfoLineHeight = getElementPropertyVal(document.getElementById("player1Info").firstElementChild, "line-height", "float"); //Player Info H3 line-height in px
    playerInfoLineHeight = playerInfoLineHeight / playerInfoFontSize; //Convert Player Info H3 line-height pixel value to multiplier

    let maxFontSizePx = playerInfoInnerHeight / playerInfoLineHeight; //Calculate max font size based on the height of the player info container
    if (maxFontSizePx < minFontSizePx) {
        maxFontSizePx = minFontSizePx; //Do not exceed min font size in px
    }

    let playerInfoWidth = getElementPos("player1Info").width; //Player Info Col-4 width

    let fontSize = (playerInfoWidth / 100) * playerInfoFontScale; //Calculate font size based on the current width of the Player Info Col-4 elements, and the playerInfoFontScale value
    if (fontSize > maxFontSizePx) {
        fontSize = maxFontSizePx; //Do not exceed max font size in px
    } else if (fontSize < minFontSizePx) {
        fontSize = minFontSizePx; //Do not exceed min font size in px
    }

    /* Set font size for each Player Info H3 element */
    document.getElementById("player1Info").firstElementChild.style.fontSize = `${fontSize}px`;
    document.getElementById("turnTimeLimit").firstElementChild.style.fontSize = `${fontSize}px`;
    document.getElementById("player2Info").firstElementChild.style.fontSize = `${fontSize}px`;
}

/* Feedback Message Font Resize */
function feedbackMessageFontResize(feedbackContainerHeight) {
    let minFontSizePx = getElementPropertyVal("feedbackMessage", "font-size", "float"); //Min Supported Feedback Message Font Size in px
    let feedbackMessageMinWidth = getElementPropertyVal("feedbackMessage", "min-width", "float"); //Width of the Feedback Message element in px
    let feedbackMessageFontScale = (minFontSizePx / feedbackMessageMinWidth) * 100;

    let feedbackMessagePadTop = getElementPropertyVal("feedbackMessage", "padding-top", "float"); //Feedback Message container padding-top
    let feedbackMessagePadBottom = getElementPropertyVal("feedbackMessage", "padding-bottom", "float"); //Feedback Message container padding-bottom
    let feedbackMessagePadTotal = feedbackMessagePadTop + feedbackMessagePadBottom;

    let feedbackMessageMinHeight = getElementPropertyVal("feedbackMessage", "min-height", "float"); //Feedback Message container min-height
    let feedbackContainerMinHeight = getElementPropertyVal("feedbackContainer", "min-height", "float"); //Feedback container min-height
    let feedbackMessageHeightPercentage = (feedbackMessageMinHeight / feedbackContainerMinHeight) * 100; //Calculate Feedback Message height percentage

    let feedbackMessageHeight = (feedbackContainerHeight / 100) * feedbackMessageHeightPercentage; //Calculate Feedback Message Height

    let feedbackMessageHeightAsPercentageOfWidth = (feedbackMessageMinHeight / feedbackMessageMinWidth) * 100; //Express Feedback Message Min Height as percentage of Feedback Message Min Width
    let feedbackMessageWidth = getElementPos("feedbackMessage").width; //Current Feedback Message width
    let feedbackMessageHeightVsWidth = (feedbackMessageWidth / 100) * feedbackMessageHeightAsPercentageOfWidth; //Calculate Feedback Message Height as percentage of Current Width
    if (feedbackMessageHeight > feedbackMessageHeightVsWidth) {
        feedbackMessageHeight = feedbackMessageHeightVsWidth; //Prevent extraneous vertical spacing on thin displays by capping height based on width
    }

    let feedbackMessageMaxHeight = getElementPropertyVal("feedbackMessage", "max-height", "float"); //Feedback Message container max-height
    if (feedbackMessageHeight > feedbackMessageMaxHeight) {
        feedbackMessageHeight = feedbackMessageMaxHeight; //Do not exceed max-height
    } else if (feedbackMessageHeight < feedbackMessageMinHeight) {
        feedbackMessageHeight = feedbackMessageMinHeight; //Do not exceed min-height
    }

    let feedbackMessageInnerHeight = feedbackMessageHeight - feedbackMessagePadTotal; //Feedback Message height minus padding

    let feedbackMessageFontSize = getElementPropertyVal(document.getElementById("feedbackMessage").firstElementChild, "font-size", "float"); //Feedback Message H2 current font-size in px
    let feedbackMessageLineHeight = getElementPropertyVal(document.getElementById("feedbackMessage").firstElementChild, "line-height", "float"); //Feedback Message H2 line-height in px
    feedbackMessageLineHeight = feedbackMessageLineHeight / feedbackMessageFontSize; //Convert Feedback Message H2 line-height pixel value to multiplier

    let maxFontSizePx = feedbackMessageInnerHeight / feedbackMessageLineHeight; //Calculate max font size based on the height of the Feedback Message container
    if (maxFontSizePx < minFontSizePx) {
        maxFontSizePx = minFontSizePx; //Do not exceed min font size in px
    }

    let fontSize = (feedbackMessageWidth / 100) * feedbackMessageFontScale; //Calculate font size based on the current width of the feedback message, and the fontFeedbackMessageScale value
    if (fontSize > maxFontSizePx) {
        fontSize = maxFontSizePx; //Do not exceed max font size in px
    } else if (fontSize < minFontSizePx) {
        fontSize = minFontSizePx; //Do Not exceed min font size in px
    }

    /* Calculate height for each Feedback Control Button element */
    let feedbackButtonLineHeight = getElementPropertyVal("pauseButton", "line-height", "float");
    let feedbackButtonPadTop = getElementPropertyVal("pauseButton", "padding-top", "float");
    let feedbackButtonPadBottom = getElementPropertyVal("pauseButton", "padding-bottom", "float");
    let feedbackButtonPadTotal = feedbackButtonPadTop + feedbackButtonPadBottom;
    let feedbackButtonBorderTop = getElementPropertyVal("pauseButton", "border-top-width", "float");
    let feedbackButtonBorderBottom = getElementPropertyVal("pauseButton", "border-bottom-width", "float");
    let feedbackButtonBorderTotal = feedbackButtonBorderTop + feedbackButtonBorderBottom;
    let feedbackButtonHeight = feedbackButtonLineHeight + feedbackButtonPadTotal + feedbackButtonBorderTotal;

    /* Calculate top-margin of startDelay element */
    let startDelayMarginTop = (feedbackButtonHeight - feedbackMessageHeight);

    /* Set height for Feedback Message element */
    document.getElementById("feedbackMessage").style.height = `${feedbackMessageHeight}px`;

    /* Set font size for each Feedback Message H2 element */
    document.getElementById("feedbackMessage").firstElementChild.style.fontSize = `${fontSize}px`;
    document.getElementById("startDelay").firstElementChild.style.fontSize = `${fontSize}px`;

    /* Set font size for each Feedback Control Button element */
    document.getElementById("refreshGameButton").style.fontSize = `${fontSize}px`;
    document.getElementById("quitGameButton").style.fontSize = `${fontSize}px`;
    document.getElementById("pauseButton").style.fontSize = `${fontSize}px`;
    document.getElementById("resumeButton").style.fontSize = `${fontSize}px`;

    /* Set height for each Feedback Control Button element */
    document.getElementById("refreshGameButton").style.height = `${feedbackButtonHeight}px`;
    document.getElementById("quitGameButton").style.height = `${feedbackButtonHeight}px`;
    document.getElementById("pauseButton").style.height = `${feedbackButtonHeight}px`;
    document.getElementById("resumeButton").style.height = `${feedbackButtonHeight}px`;

    /* Set height and margin-top for startDelay element */
    document.getElementById("startDelay").style.height = `${feedbackMessageHeight}px`;
    document.getElementById("startDelay").style.marginTop = `${startDelayMarginTop}px`;
}

function logoResize() {
    if (document.getElementById("logoGrid").firstElementChild === null) { //If the logoGrid is removed during resize
        return; //Do not continue
    }

    if (document.getElementById("logoGrid").classList.contains("d-none") === false) {
        if (c4.logo.animState === false) {
            let gridCounts = dataGridDisplayGetCounts("logoGrid"); //Get the number of rows and columns for the logoGrid element
            if (gridCounts === false) { //If false, then we could not return the values, so return false
                console.log(`function logoResize failed.  Cascade failure originating with dataGridDisplayGetCounts("logoGrid").`);
                return false;
            }

            logoFontResize();

            setlogoGridContentRowMarginTop(gridCounts[0]);

            let colCenter = getLogoGridColCenter(); //Get the center point of each header and column cell
            if (typeof colCenter !== "object") { //If colCenter is not an object then we could not get the center points, so return false
                console.log(`function logoResize failed.  Unable to get center points.  Cascade failure originating with getLogoGridColCenter()`);
                return false;
            }

            let i;
            for (i = 0; i < gridCounts[0]; i += 1) {
                if (document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.left !== "") {
                    colCenter.headerCenter[i].absoluteX = colCenter.headerCenter[i].absoluteX - parseFloat(document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.left);
                }
                document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.left = `${(colCenter.contentCenter[i].absoluteX - colCenter.headerCenter[i].absoluteX)}px`;

                if (document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.top !== "") {
                    colCenter.headerCenter[i].absoluteY = colCenter.headerCenter[i].absoluteY - parseFloat(document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.top);
                }
                document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.top = `${(colCenter.contentCenter[i].absoluteY - colCenter.headerCenter[i].absoluteY)}px`;
            }
        }
    }
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
    let minWHeight = getElementPropertyVal(document.getElementsByTagName("body")[0], "min-height", "float");
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
    if (mainBlockContainerHidden === false) {
        mainBlockContainerHeight = getElementPos("mainBlockContainer").height;
    }

    /* Is menuBlockContainer Hidden */
    let menuBlockContainerHidden = document.getElementById("menuBlockContainer").classList.contains("d-none");

    /* Calculated Block Height and Full Content Height */
    let blockHeight;
    let contentHeight;

    if (mainBlockContainerHidden === true && menuBlockContainerHidden === false) {
        blockHeight = mainHeight - 10;
        contentHeight = headerHeight + blockHeight + footerHeight + 10;
    } else if (mainBlockContainerHidden === false && menuBlockContainerHidden === false) {
        blockHeight = mainHeight - mainBlockContainerHeight - 10;
        contentHeight = headerHeight + mainBlockContainerHeight + blockHeight + footerHeight + 10;
    } else if (mainBlockContainerHidden === false && menuBlockContainerHidden === true) {
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

/* Resize the main block */
/* This block is used to display the logo, rules and game board */
function mainBlockResize() {
    /* Remove any existing height or padding-bottom style properties from the main block container */
    document.getElementById("mainBlockContainer").style.removeProperty("height");
    document.getElementById("mainBlockContainer").style.removeProperty("padding-bottom");

    /* If the menu block container is not visible, then calculate and apply the correct height and padding-bottom styles to the main block */
    if (document.getElementById("menuBlockContainer").classList.contains("d-none") === true) {
        let mainBlockContainerHeight = calcBlockHeight();
        document.getElementById("mainBlockContainer").style.height = `${mainBlockContainerHeight}px`;

        /* Get the main block padding-top, ensure padding-bottom matches, and get the total main block padding value */
        let mainBlockContainerPadTop = getElementPropertyVal("mainBlockContainer", "padding-top", "int");
        let mainBlockContainerPadBottom = mainBlockContainerPadTop;
        document.getElementById("mainBlockContainer").style.paddingBottom = `${mainBlockContainerPadBottom}px`;
        let mainBlockContainerPadTotal = mainBlockContainerPadTop + mainBlockContainerPadBottom;

        /* If the rules container is visible, then calculate and apply height and width properties for it and it's children to ensure we do not scroll the page */
        if (document.getElementById("rulesContainer").classList.contains("d-none") === false) {

            /* Remove any existing height style properties from the rules container and any appropriate children */
            document.getElementById("rulesContainer").style.removeProperty("height");
            document.getElementById("rulesMainContent").style.removeProperty("height");

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
        if (document.getElementById("gameBoardContainer").classList.contains("d-none") === false) {
            /* Remove any existing height, max-height, or max-width style properties from the game board container and appropriate children */
            document.getElementById("gameBoardContainer").style.removeProperty("height");
            document.getElementById("gameBoardContainer").style.removeProperty("max-width");
            document.getElementById("playerInfoContainer").style.removeProperty("margin-top");
            document.getElementById("gameContainer").style.removeProperty("height");
            document.getElementById("feedbackContainer").style.removeProperty("height");
            document.getElementById("gBoardContentContainer").style.removeProperty("max-height");
            document.getElementById("gBoard").style.removeProperty("height");

            let gameBoardContainerMinHeight = getElementPropertyVal("gameBoardContainer", "min-height", "float"); //Min height of the Game Board container in px

            /* Set the game board container height to equal the height of the parent - padding */
            let gameBoardContainerHeight = mainBlockContainerHeight - mainBlockContainerPadTotal;
            document.getElementById("gameBoardContainer").style.height = `${gameBoardContainerHeight}px`;

            /* Set the height of the player info container */
            let playerInfoContainerMinHeight = getElementPropertyVal("playerInfoContainer", "min-height", "float"); //Min height of the Player Info container in px
            let playerInfoContainerHeightPercentage = (playerInfoContainerMinHeight / gameBoardContainerMinHeight) * 100;

            let playerInfoContainerMaxHeight = getElementPropertyVal("playerInfoContainer", "max-height", "float"); //Max height of the Player Info container in px
            let playerInfoContainerHeight = (gameBoardContainerHeight / 100) * playerInfoContainerHeightPercentage;

            if (playerInfoContainerHeight > playerInfoContainerMaxHeight) {
                playerInfoContainerHeight = playerInfoContainerMaxHeight;
            } else if (playerInfoContainerHeight < playerInfoContainerMinHeight) {
                playerInfoContainerHeight = playerInfoContainerMinHeight;
            }

            playerInfoFontResize(playerInfoContainerHeight);

            /* Set the height of the feedback container */
            let feedbackContainerMinHeight = getElementPropertyVal("feedbackContainer", "min-height", "float"); //Min height of the Feedback container in px
            let feedbackContainerHeightPercentage = (feedbackContainerMinHeight / gameBoardContainerMinHeight) * 100;

            let feedbackContainerMaxHeight = getElementPropertyVal("feedbackContainer", "max-height", "float"); //Max height of the Feedback container in px
            let feedbackContainerHeight = (gameBoardContainerHeight / 100) * feedbackContainerHeightPercentage;

            if (feedbackContainerHeight > feedbackContainerMaxHeight) {
                feedbackContainerHeight = feedbackContainerMaxHeight;
            } else if (feedbackContainerHeight < feedbackContainerMinHeight) {
                feedbackContainerHeight = feedbackContainerMinHeight;
            }

            feedbackMessageFontResize(feedbackContainerHeight);

            /* Set the height of the game container element */
            let gameContainerHeight = gameBoardContainerHeight - (playerInfoContainerHeight + feedbackContainerHeight);
            document.getElementById("gameContainer").style.height = `${gameContainerHeight}px`;

            /* Set the max height of the gboard content container */
            let gBoardContentContainerMaxHeight = gameContainerHeight; //gboard content container max height = game container height - feedback container height
            document.getElementById("gBoardContentContainer").style.maxHeight = `${gBoardContentContainerMaxHeight}px`;

            /* Calculate the max width of the game board container */
            let gameBoardContainerMaxWidth = (gBoardContentContainerMaxHeight / 85.8) * 100;  //game board container max width =  116.55% of the game board container max height

            /* Get the default max width of the game board container per index.css */
            /* Utilise the value for the rules container as this will never change, so we will always get the default value */
            /* (rulesContainer and gameBoardContainer share width and max-width style rules) */
            let gameBoardContainerMaxWidthPerStyle = getElementPropertyVal("rulesContainer", "max-width", "float");
            if (gameBoardContainerMaxWidth > gameBoardContainerMaxWidthPerStyle) {
                gameBoardContainerMaxWidth = gameBoardContainerMaxWidthPerStyle; //Do not exceed the max-width value set in index.css
            }

            /* Set the max width of the game board container */
            document.getElementById("gameBoardContainer").style.maxWidth = `${gameBoardContainerMaxWidth}px`;

            /* Set the height of the gboard to equal the height of the gboard content container */
            let gBoardContentContainerHeight = getElementPos("gBoardContentContainer").height;
            let gBoardHeight = gBoardContentContainerHeight;
            document.getElementById("gBoard").style.height = `${gBoardHeight}px`;

            let playerInfoContainerMarginTop = (gameBoardContainerHeight - (playerInfoContainerHeight + feedbackContainerHeight + gBoardHeight)) / 2; //Center the game elements vertically
            document.getElementById("playerInfoContainer").style.marginTop = `${playerInfoContainerMarginTop}px`;

            gameContainerHeight = gBoardHeight; //Reduce the height of the game container element to fit the height of the game board and feedback container elements
            document.getElementById("gameContainer").style.height = `${gameContainerHeight}px`;

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
    if (valid === null) { //If not, return false
        console.log(`Error.  Target element (${elementId}) does not exist.`);
        return false;
    }

    /* Build a collection of all child elements for the provided element Id */
    let elementCollection = document.getElementById(elementId).children;

    /* Iterate through the collection, hiding all elements */
    let i;
    for (i = 0; i < elementCollection.length; i += 1) {
        if (elementId !== "sideNav" || (elementId === "sideNav" && i >= 3)) { //If elementId = sideNav, skip the first three elements (do not hide the close button, color mode link or its divider)
            elementDisplay("hide", elementCollection[i].id);
        }
    }

    /* If elementId = mainBlockContainer then also hide the menuBlockContainer element and children */
    if (elementId === "mainBlockContainer") {
        elementDisplay("hide", "menuBlockContainer");
        hideAll("menuContentContainer");
    }
}

/* on Resize */
function mainOnResize() {
    sideNavResize(); //Resize the sideNav
    mainBlockResize(); //Resize the main block
    logoResize(); //Resize the logo
    menuBlockResize(); //Resize the menu block
}

/* on Load */
function mainOnLoad() {
    c4.uiState = "default"; //Set the default state
    loadColorMode(); //Apply the appropriate theme (light or dark(default))
    sideNavOnLoad(); //Initialise the sideNav
    displayDataGrid(c4.logo.smGrid, "smLogoGrid", "off", false);
    displayLogo(); //draw the logo
    elementDisplay("toggle", "menuBlockContainer"); //Show the menu block
    loadPlayerSettings(); //Initialise player settings
    initC4Select();
    mainOnResize(); //Call the onResize function to ensure our content fits within a single page
}

/* When the document is ready, call the onLoad function */
$(document).ready(mainOnLoad);