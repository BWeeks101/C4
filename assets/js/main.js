/* Global 'state' variable */
let state;

/* Dummy Data for Join Game List */
let gridtestarray = [];
let firstcol = [];
let secondcol = [];
let thirdcol = [];
let headers = [];

headers = ["Turn Time Limit", "Host", "Leaderboard Position"];
firstcol = ["25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s","25s", "10s", "5s"];
secondcol = ["AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD","AAAAA", "CCCCC", "BBBBB", "DDDDD"];
thirdcol = ["3", "1", "2", "4", "5","3", "1", "2", "4", "5","3", "1", "2", "4", "5","3", "1", "2", "4", "5","3", "1", "2", "4", "5","3", "1", "2", "4", "5"];
fourthcol = []

gridtestarray = [firstcol, secondcol, thirdcol];

let gameListDG = new DataGrid(headers, gridtestarray);
/* End Dummy Data for Join Game List */

$(document).ready(mainOnLoad);

function mainOnLoad() {
    state = "default";
    sideNavOnLoad();
    setMenuHeight();
    elementDisplay("toggle","menuBlockContainer");
}

function mainOnResize() {
    sideNavResize();
    menuBlockResize();
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
            return;
        }

        document.getElementById("menuJoinGame").style.height = `${menuBlockHeight}px`;
        
        jgtHeight = getElementPos("menuJoinGameTitle").height

        mjgTopPad = window.getComputedStyle(document.getElementById("menuJoinGame"), null).getPropertyValue('padding-top');
        mjgTopPad = Number(mjgTopPad.slice(0, mjgTopPad.length-2));

        mjgBottomPad = window.getComputedStyle(document.getElementById("menuJoinGame"), null).getPropertyValue('padding-bottom');
        mjgBottomPad = Number(mjgBottomPad.slice(0, mjgBottomPad.length-2));

        jccHeight = menuBlockHeight - (jgtHeight + mjgTopPad + mjgBottomPad);
        document.getElementById("menuJoinControlContainer").style.height = `${jccHeight}px`;
        
        jcrHeight = getElementPos("menuJoinControlRow").height;
        glHeight = jccHeight - jcrHeight;
        document.getElementById("gameList").style.height = `${glHeight}px`;

        glTopPad = window.getComputedStyle(document.getElementById("gameList"), null).getPropertyValue('padding-top')
        glTopPad = Number(glTopPad.slice(0, glTopPad.length-2));

        glBottomPad = window.getComputedStyle(document.getElementById("gameList"), null).getPropertyValue('padding-bottom')
        glBottomPad = Number(glBottomPad.slice(0, glBottomPad.length-2));

        glhHeight = getElementPos("gameListHeaderRow").height;
        glccHeight = glHeight - (glhHeight + glTopPad + glBottomPad);
        document.getElementById("gameListContentContainer").style.height = `${glccHeight}px`;
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