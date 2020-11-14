/*
* SideNav taken from W3 Schools Example and modified
* https://www.w3schools.com/howto/howto_js_sidenav.asp
*/

onLoad();

function onLoad() {
    closeNav();    
}

/* Return width and negative offset for sideNav */
function getNavWidth() {    
    let navWidth = calcNavWidth();
    
    if (navWidth < 310) {
        navWidth = 310;
    }

    let navOffset = (0 - navWidth);
    
    let navArray = [navWidth + "px", navOffset + "px"];
    
    return navArray;
}

/* Calculate width of sideNav */
function calcNavWidth() {
    let sWidth = screen.width;
    let percentage = 33;

    return (sWidth/100)*percentage;
}

/* Set the width of the side navigation to 250px */
function openNav() {
    let navArray = getNavWidth();
    let navWidth = navArray[0];
    let navOffset = navArray[1];
        
    document.getElementById("sideNav").style.left = "0px";
    document.getElementById("sideNavDocOverlay").style.zIndex = "999";
    document.getElementById("sideNavDocOverlay").style.backgroundColor = "rgba(0,0,0,0.7)";
    document.getElementById("sideNavDocOverlay").style.left = navWidth;    
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    let navOffset = getNavWidth()[1];

    console.log(navOffset);

    document.getElementById("sideNav").style.left = navOffset;
    document.getElementById("sideNavDocOverlay").style.zIndex = "-1000";
    document.getElementById("sideNavDocOverlay").style.backgroundColor = "rgba(0,0,0,0.0)";
    document.getElementById("sideNavDocOverlay").style.left = "0px"

}