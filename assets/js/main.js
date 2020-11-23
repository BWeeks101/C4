/* Global 'state' variable */
let state;

let gridtestarray = [];
let firstcol = [];
let secondcol = [];
let thirdcol = [];

firstcol = ["Turn Time Limit", "25s", "10s", "5s"];
secondcol = ["Host", "AAAAA", "CCCCC", "BBBBB"];
thirdcol = ["Leaderboard Position", "3", "1", "2"];

gridtestarray = [firstcol, secondcol, thirdcol];

$(document).ready(mainOnLoad);

function mainOnLoad() {
    state = "default";
    sideNavOnLoad();
    setMenuHeight();
    elementDisplay("toggle","menuBlockContainer");

    createDataGrid(gridtestarray, "gameList");
}

function mainOnResize() {
    sideNavResize();
    menuBlockResize();
}

function menuBlockResize() {
    let menuHeight = calcMenuHeight();
    document.getElementById("menuBlock").style.height = menuHeight;
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
    
    /* Calculated Menu Height */
    let menuHeight = mainHeight - mainBlockImgHeight;

    /* Calculated Full Content Height */
    let contentHeight = headerHeight + mainBlockImgHeight + menuHeight + footerHeight;

    /* If Calculated Full Content Height is Greater than Browser Viewport */
    /* Reduce Menu Height by the difference to prevent vertial scroll */
    /* Will need revising for mobile views in portrait - probably add a minheight */
    if (contentHeight > wHeight) {
        menuHeight = menuHeight - (contentHeight - wHeight);
    }

    return `${menuHeight}px`;
}

function setMenuHeight() {
    document.getElementById("menuBlock").style.height = calcMenuHeight();    
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