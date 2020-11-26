/* Global 'state' variable */
let state;

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

$(document).ready(mainOnLoad);

function mainOnLoad() {
    state = "default";
    sideNavOnLoad();
    setMenuHeight();
    elementDisplay("toggle","menuBlockContainer");
}

function mainOnResize() {
    sideNavResize();
    mainBlockResize();
    menuBlockResize();
}

function mainBlockResize() {
    document.getElementById("mainBlockContainer").style.removeProperty("height");
    document.getElementById("mainBlockContainer").style.removeProperty("padding-bottom");
    if (document.getElementById("menuBlockContainer").classList.contains("d-none") == true) {
        mainBlockContainerHeight = calcMainBHeight();
        document.getElementById("mainBlockContainer").style.height = `${mainBlockContainerHeight}px`;
        document.getElementById("mainBlockContainer").style.paddingBottom = "10px";

        if (document.getElementById("leaderboardContainer").classList.contains("d-none") == false) {
            leaderboardContainerHeight = mainBlockContainerHeight - 20;
            document.getElementById("leaderboardContainer").style.height = `${leaderboardContainerHeight}px`;

            lBoardTitleHeight = getElementPos("leaderboardTitle").height;
            lBoardHeight = leaderboardContainerHeight - lBoardTitleHeight;
            document.getElementById("lBoard").style.height = `${lBoardHeight}px`;

            lBoardHeaderRowHeight = getElementPos("lBoardHeaderRow").height;
            lBoardContentContainerHeight = lBoardHeight - lBoardHeaderRowHeight;
            document.getElementById("lBoardContentContainer").style.height = `${lBoardContentContainerHeight}px`;

            dataGridAdjustForScrollBars("lBoard");
        }
    }    
}

function menuBlockResize() {
    menuBlockHeight = calcMenuHeight();
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

        menuJoinGamePadTop = window.getComputedStyle(document.getElementById("menuJoinGame"), null).getPropertyValue('padding-top');
        menuJoinGamePadTop = Number(menuJoinGamePadTop.slice(0, menuJoinGamePadTop.length-2));

        menuJoinGamePadBottom = window.getComputedStyle(document.getElementById("menuJoinGame"), null).getPropertyValue('padding-bottom');
        menuJoinGamePadBottom = Number(menuJoinGamePadBottom.slice(0, menuJoinGamePadBottom.length-2));

        menuJoinControlContainerHeight = menuBlockHeight - (menuJoinGameTitleHeight + menuJoinGamePadTop + menuJoinGamePadBottom);
        document.getElementById("menuJoinControlContainer").style.height = `${menuJoinControlContainerHeight}px`;
        
        menuJoinControlRowHeight = getElementPos("menuJoinControlRow").height;
        gameListHeight = menuJoinControlContainerHeight - menuJoinControlRowHeight;
        document.getElementById("gameList").style.height = `${gameListHeight}px`;

        gameListPadTop = window.getComputedStyle(document.getElementById("gameList"), null).getPropertyValue('padding-top')
        gameListPadTop = Number(gameListPadTop.slice(0, gameListPadTop.length-2));

        gameListPadBottom = window.getComputedStyle(document.getElementById("gameList"), null).getPropertyValue('padding-bottom')
        gameListPadBottom = Number(gameListPadBottom.slice(0, gameListPadBottom.length-2));

        gameListHeaderRowHeight = getElementPos("gameListHeaderRow").height;
        gameListContentContainerHeight = gameListHeight - (gameListHeaderRowHeight + gameListPadTop + gameListPadBottom);
        document.getElementById("gameListContentContainer").style.height = `${gameListContentContainerHeight}px`;

        dataGridAdjustForScrollBars("gameList");
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

function setMenuHeight() {
    document.getElementById("menuBlock").style.height = `${calcMenuHeight()}px`;
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