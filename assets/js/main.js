$(document).ready(mainOnLoad);

function mainOnLoad() {
    menuWidth = calcMenuWidth();
    document.getElementById("menuBlockRow").style.width = menuWidth;
    let footerTop = getElementPos("footer").top;
    let mainBlockBottom = getElementPos("mainBlock").bottom;    
    console.log("footerTop: " + footerTop + "  mainBlockBottom: " + mainBlockBottom);
    console.log(document.getElementById("menuBlockRow").style.Height = footerTop - mainBlockBottom + "px");
    document.getElementById("menuBlockRow").style.height = footerTop - mainBlockBottom + "px";

    let test = getElementPos("header")
    test = getElementPos("mainBlock")
    test = getElementPos("menuBlockRow")
    test = getElementPos("footer")
}

/* Get position and size of element */
function getElementPos(elementId) {
    let elementPos = document.getElementById(elementId).getBoundingClientRect();
    elementPos.top = elementPos.top + window.pageYOffset;
    elementPos.right = elementPos.right + window.pageXOffset;
    elementPos.bottom = elementPos.bottom + window.pageYOffset;
    elementPos.left = elementPos.left + window.pageXOffset;
    console.log(elementPos);
    return elementPos;
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