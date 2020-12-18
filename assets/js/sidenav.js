/*
* SideNav taken from W3 Schools Example and modified
* https://www.w3schools.com/howto/howto_js_sidenav.asp
*/

/* Initialise the sideNav */
function sideNavOnLoad() {
    /* calculate the offset value for the sideNav and apply it */
    let navOffset = getNavWidth()[1];
    document.getElementById("sideNav").style.left = navOffset;
}

/* Set width and negative offset for sideNav on screen resize*/
function sideNavResize() {
    let navArray = getNavWidth(); //Get sideNav width and offset values
    let navWidth = navArray[0];
    let navOffset = navArray[1];

    if (sideNavState() == "closed") { //If the sideNav is closed, apply the calculated width and offset
        document.getElementById("sideNav").style.width = navWidth;
        document.getElementById("sideNav").style.left = navOffset;
    } else { //Otherwise, apply the width value to the sideNav element width and sideNavDocOverlay element left properties
        document.getElementById("sideNav").style.width = navWidth;
        document.getElementById("sideNavDocOverlay").style.left = navWidth;
    }
}

/* Get the sideNav state. */
/* States can be: Opening/Open/Closing/Closed depending on the transition state/display property of the sideNav element */
/* Return open by default, or closed if the state is closed or closing. */
function sideNavState() {
    if (c4.sideNavState == "closed" || c4.sideNavState == "closing") {
        return "closed";
    } else {
        return "open"
    }
}

/* Return width and negative offset for sideNav */
function getNavWidth() {    
    let navWidth = calcNavWidth(); //Calculate the width, with a minimum value of 310px    
    if (navWidth < 310) {
        navWidth = "310px";
    } else {
        navWidth = `${navWidth}px`;
    }

    let navOffset = `-${navWidth}` //Offset = negative width
    
    let navArray = [navWidth, navOffset];    
    return navArray; //Return array of width, offset values
}

/* Calculate width of sideNav */
/* Width = 1/3rd of the browser window content area */
function calcNavWidth() {
    let cWidth = window.innerWidth;
    let percentage = 33;

    return (cWidth/100)*percentage;
}

/* Toggle sidenav visibility */
function sideNavDisplayToggle() {
    elementDisplay("toggle", "sideNav");
    elementDisplay("toggle", "sideNavDocOverlay");
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
    if (c4.sideNavState == "open" || c4.sideNavState == "opening") {
        console.log(`sideNav already ${c4.sideNavState}.`);
        return;
    }
    c4.sideNavState = "opening";
    sideNavDisplayToggle();
    document.getElementById("navBarToggler").disabled = true;
    setTimeout(function() {
        showNav();
        setTimeout(function() {
            sideNavDocOverlayLTD();
            sideNavDocOverlayClickDisabled();
            c4.sideNavState = "open";
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
    if (c4.sideNavState == "closed" || c4.sideNavState == "closing") {
        console.log(`sideNav already ${c4.sideNavState}.`);
        return;
    }
    c4.sideNavState = "closing";
    sideNavDocOverlayLTD();
    sideNavDocOverlayClickDisabled();
    setTimeout(function() {
        hideNav();    
        setTimeout(function() {
            sideNavDisplayToggle();
            document.getElementById("navBarToggler").disabled = false;
            c4.sideNavState = "closed";
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