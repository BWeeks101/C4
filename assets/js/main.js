$(document).ready(mainOnLoad);

function mainOnLoad() {
    let menuWidth = calcMenuWidth();
    let menuHeight = calcMenuHeight();
    document.getElementById("menuBlock").style.width = menuWidth;
    document.getElementById("menuBlock").style.height = menuHeight;
    

    let test = getElementPos("header")
    test = getElementPos("mainBlock")
    test = getElementPos("menuBlock")
    test = getElementPos("footer")
}


/* Get position and size of element */
function getElementPos(elementId) {
    let elementPos = document.getElementById(elementId).getBoundingClientRect();
    elementPos.top = elementPos.top + window.pageYOffset;
    elementPos.right = elementPos.right + window.pageXOffset;
    elementPos.bottom = elementPos.bottom + window.pageYOffset;
    elementPos.left = elementPos.left + window.pageXOffset;
    console.log(window.pageYOffset);
    console.log(elementPos);
    return elementPos;
}

/* Calculate desired height of menuBlock */
function calcMenuHeight() {
    let cHeight = window.innerHeight;
    let headerHeight = 66;
    let mainBlockImgHeight = getElementPos("mainBlockContainer").height;
    let footerHeight = 50;

    let menuHeight = cHeight - (headerHeight + mainBlockImgHeight + footerHeight);

    return `${menuHeight}px`;
}

/* Calculate desired width of menuBlock */
function calcMenuWidth() {
    let cWidth = window.innerWidth;
    let percentage = 90;
    let menuWidth = (cWidth/100)*percentage;

    if (menuWidth < 324) {
        menuWidth = "324px";
    } else {
        menuWidth = `${menuWidth}px`;
    }    

    return menuWidth;
}