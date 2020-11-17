/*
* SideNav taken from W3 Schools Example and modified
* https://www.w3schools.com/howto/howto_js_sidenav.asp
*/

function sideNavOnLoad() {
    let navOffset = getNavWidth()[1];
    document.getElementById("sideNav").style.left = navOffset;
    document.getElementById("sideNavDocOverlay").style.transition = "left 0.5s ease 0s, background-color 0.5s ease 0s";
}

/* Set width and negative offset for sideNav on screen resize*/
function sideNavResize() {
    let navArray = getNavWidth();
    let navWidth = navArray[0];
    let navOffset = navArray[1];

    if (document.getElementById("sideNav").classList.contains("d-none")) {
        document.getElementById("sideNav").style.width = navWidth;
        document.getElementById("sideNav").style.left = navOffset;
    } else {
        document.getElementById("sideNav").style.width = navWidth;
        document.getElementById("sideNavDocOverlay").style.left = navWidth;
    }
}

/* Return width and negative offset for sideNav */
function getNavWidth() {    
    let navWidth = calcNavWidth();
    
    if (navWidth < 310) {
        navWidth = "310px";
    } else {
        navWidth = `${navWidth}px`;
    }

    let navOffset = `-${navWidth}`
    
    let navArray = [navWidth, navOffset];
    
    return navArray;
}

/* Calculate width of sideNav */
function calcNavWidth() {
    let cWidth = window.innerWidth;
    let percentage = 33;

    return (cWidth/100)*percentage;
}

/* Toggle sidenav visibility */
function sideNavDisplayToggle() {
    elementDisplayToggle("sideNav");
    elementDisplayToggle("sideNavDocOverlay");
}

/* Toggle sideNavDocOverlay disabled status */
function sideNavDocOverlayClickDisabled() {
    if (document.getElementById("sideNavDocOverlay").hasAttribute("onClick")) {
        document.getElementById("sideNavDocOverlay").removeAttribute("onClick");
    } else {
        document.getElementById("sideNavDocOverlay").setAttribute("onClick", "closeNav()");
    }    
}

/* Toggle sideNavDocOverlay left transition duration */
function sideNavDocOverlayLTD() {
    if (document.getElementById("sideNavDocOverlay").style.transition == "left 0.5s ease 0s, background-color 0.5s ease 0s") {
        document.getElementById("sideNavDocOverlay").style.transition = "left 0s ease 0s, background-color 0.5s ease 0s";
    } else {
        document.getElementById("sideNavDocOverlay").style.transition = "left 0.5s ease 0s, background-color 0.5s ease 0s";
    }
}

/* Set the width of the side navigation to 250px */
function openNav() {
    sideNavDisplayToggle();
    document.getElementById("navBarToggler").disabled = true;
    setTimeout(function() {
        showNav();
        setTimeout(function() {
            sideNavDocOverlayLTD();
            sideNavDocOverlayClickDisabled();
        }, 600);
    }, 50);
}

function showNav() {
    let navWidth = getNavWidth()[0];

    document.getElementById("sideNav").style.left = "0px";
    document.getElementById("sideNavDocOverlay").style.zIndex = "999";
    document.getElementById("sideNavDocOverlay").style.backgroundColor = "rgba(0,0,0,0.7)";
    document.getElementById("sideNavDocOverlay").style.left = navWidth;
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    sideNavDocOverlayLTD();
    sideNavDocOverlayClickDisabled();
    setTimeout(function() {
        hideNav();    
        setTimeout(function() {
            sideNavDisplayToggle();
            document.getElementById("navBarToggler").disabled = false;
        }, 600);
    }, 50);    
}

function hideNav() {
    let navOffset = getNavWidth()[1];

    document.getElementById("sideNav").style.left = navOffset;
    document.getElementById("sideNavDocOverlay").style.zIndex = "-1000";
    document.getElementById("sideNavDocOverlay").style.backgroundColor = "rgba(0,0,0,0.0)";
    document.getElementById("sideNavDocOverlay").style.left = "0px"
}