/* Dummy Data for Join Game List */
let gameListheaders = ["Turn Time Limit", "Host", "Leaderboard Position"];
let gameListfirstcol = ["25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s"];
let gameListsecondcol = ["AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD"];
let gameListthirdcol = ["3", "1", "2", "4", "5","3", "1", "2", "4", "5","3", "1", "2", "4", "5","3", "1", "2", "4", "5","3", "1", "2", "4", "5","3", "1", "2", "4", "5"];
let gameListgridtestarray = [gameListfirstcol, gameListsecondcol, gameListthirdcol];

let gameListDG = new DataGrid(gameListheaders, gameListgridtestarray);
/* End Dummy Data for Join Game List */

/* Dummy Data for Leaderboard */
let lBoardHeaders = ["Pos.","User","W-L-D-P"];
let lBoardfirstcol = ["1","2","3","4","5","6","7","8","9","10","1","2","3","4","5","6","7","8","9","10","1","2","3","4","5","6","7","8","9","10","1","2","3","4","5","6","7","8","9","10","1","2","3","4","5","6","7","8","9","10"];
let lBoardsecondcol = ["AAAAA","BBBBB","CCCCC","DDDDD","EEEEE","FFFFF","GGGGG","HHHHH","IIIII","JJJJJ"];
let lBoardthirdcol = ["10-0-0-10","9-0-1-10","8-0-2-10","7-0-3-10","6-0-4-10","5-1-4-10","4-2-4-10","3-3-4-10","2-4-4-10","0-6-4-10"];
let lBoardgridtestarray = [lBoardfirstcol, lBoardsecondcol, lBoardthirdcol];

let lBoardDG = new DataGrid(lBoardHeaders, lBoardgridtestarray);
/* End Dummy Data for Leaderboard */

let c4 = new appGlobals();

$(document).ready(mainOnLoad);

function mainOnLoad() {
    c4.state = "default";
    sideNavOnLoad();    
    elementDisplay("toggle","menuBlockContainer");
    mainOnResize();
}

function mainOnResize() {
    sideNavResize();
    mainBlockResize();
    menuBlockResize();
}

function toggleColorMode() {
    let mode = document.getElementById("colorMode").innerHTML;
    switch (mode) {
        case "Dark Mode":
            document.getElementById("colorMode").innerHTML = "Light Mode";
            switchColorMode("dark");
            closeNav();
            break;
        case "Light Mode":
            document.getElementById("colorMode").innerHTML = "Dark Mode";
            switchColorMode("light");
            closeNav();
            break;
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

        if (document.getElementById("leaderboardContainer").classList.contains("d-none") == false) {

            document.getElementById("leaderboardContainer").style.removeProperty("height");
            document.getElementById("lBoard").style.removeProperty("height");
            document.getElementById("lBoardContentContainer").style.removeProperty("height");

            if (getElementPos("leaderboardMainContent").height < mainBlockContainerHeight - (mainBlockContainerPadBottom * 2)) {
                dataGridAdjustForScrollBars("lBoard");
                return;
            }

            mainBlockContainerPadTop = getElementPropertyVal("mainBlockContainer", "padding-top", "int");
            mainBlockContainerPadBottom = getElementPropertyVal("mainBlockContainer", "padding-bottom", "int");
            mainBlockContainerPadTotal = mainBlockContainerPadTop + mainBlockContainerPadBottom;
            
            leaderboardContainerHeight = mainBlockContainerHeight - (mainBlockContainerPadTotal);
            document.getElementById("leaderboardContainer").style.height = `${leaderboardContainerHeight}px`;

            leaderboardMainContentPadTop = getElementPropertyVal("leaderboardMainContent", "padding-top", "int");
            leaderboardMainContentPadBottom = getElementPropertyVal("leaderboardMainContent", "padding-bottom", "int");            
            leaderboardMainContentPadTotal = leaderboardMainContentPadTop + leaderboardMainContentPadBottom;

            lBoardTitleHeight = getElementPos("leaderboardTitle").height;
            lBoardHeight = leaderboardContainerHeight - (lBoardTitleHeight + leaderboardMainContentPadTotal);
            document.getElementById("lBoard").style.height = `${lBoardHeight}px`;            
            
            lBoardHeaderRowHeight = getElementPos("lBoardHeaderRow").height;
            lBoardContentContainerHeight = lBoardHeight - lBoardHeaderRowHeight;            
            document.getElementById("lBoardContentContainer").style.height = `${lBoardContentContainerHeight}px`;

            dataGridAdjustForScrollBars("lBoard");
        } else if (document.getElementById("gameBoardContainer").classList.contains("d-none") == false) {

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
            if (feedbackContainerHeight < 76) {
                feedbackContainerHeight = 76;
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

    if (document.getElementById("menuJoinGame").classList.contains("d-none") == false) {
        
        document.getElementById("menuJoinGame").style.removeProperty("height")
        document.getElementById("menuJoinControlContainer").style.removeProperty("height")
        document.getElementById("gameList").style.removeProperty("height")
        document.getElementById("gameListContentContainer").style.removeProperty("height")
        
        if (getElementPos("menuJoinGame").height < menuBlockHeight) {
            dataGridAdjustForScrollBars("gameList");
            return;
        }

        document.getElementById("menuJoinGame").style.height = `${menuBlockHeight}px`;
        
        menuJoinGameTitleHeight = getElementPos("menuJoinGameTitle").height

        menuJoinGamePadTop = getElementPropertyVal("menuJoinGame", "padding-top", "int");        
        menuJoinGamePadBottom = getElementPropertyVal("menuJoinGame", "padding-bottom", "int");
        menuJoinGamePadTotal = menuJoinGamePadTop + menuJoinGamePadBottom;

        menuJoinControlContainerHeight = menuBlockHeight - (menuJoinGameTitleHeight + menuJoinGamePadTotal);
        document.getElementById("menuJoinControlContainer").style.height = `${menuJoinControlContainerHeight}px`;
        
        menuJoinControlRowHeight = getElementPos("menuJoinControlRow").height;
        gameListHeight = menuJoinControlContainerHeight - menuJoinControlRowHeight;
        document.getElementById("gameList").style.height = `${gameListHeight}px`;

        gameListPadTop = getElementPropertyVal("gameList", "padding-top", "int");
        gameListPadBottom = getElementPropertyVal("gameList", "padding-bottom", "int");
        gameListPadTotal = gameListPadTop + gameListPadBottom;

        gameListHeaderRowHeight = getElementPos("gameListHeaderRow").height;
        gameListContentContainerHeight = gameListHeight - (gameListHeaderRowHeight + gameListPadTotal);
        document.getElementById("gameListContentContainer").style.height = `${gameListContentContainerHeight}px`;

        dataGridAdjustForScrollBars("gameList");
    }
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
    if (wHeight < 760) {
        wHeight = 760;
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