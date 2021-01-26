/* Processed with JSLint */
/* Assume: in Development, a Browser */
/* Tolerate: for statement, long lines */

/* Processed with JSHint */
/* Default Settings */
/* Max Line Length: 250 characters */

/*jshint maxlen: 250 */

/*global c4, elementDisplay, getElementPropertyVal */

/* JSHint warns that sideNavOnLoad, sideNavResize, openNav, checkSideNavState are unusued.  These functions are all called externally from this file */

/*
* SideNav taken from W3 Schools Example and modified
* https://www.w3schools.com/howto/howto_js_sidenav.asp
*/

/* Calculate width of sideNav */
/* Width = 1/3rd of the browser window content area */
function calcNavWidth() {
    let cWidth = window.innerWidth;
    let percentage = 33;

    return (cWidth / 100) * percentage;
}

/* Return width and negative offset for sideNav */
function getNavWidth() {
    let navWidth = calcNavWidth(); //Calculate the width, with a minimum value of 310px
    let navMinWidth = getElementPropertyVal("sideNav", "min-width", "float");
    if (navWidth < navMinWidth) {
        navWidth = `${navMinWidth}px`;
    } else {
        navWidth = `${navWidth}px`;
    }

    let navOffset = `-${navWidth}`; //Offset = negative width

    let navArray = [navWidth, navOffset];
    return navArray; //Return array of width, offset values
}

/* Initialise the sideNav */
function sideNavOnLoad() {
    /* calculate the offset value for the sideNav and apply it */
    let navOffset = getNavWidth()[1];
    document.getElementById("sideNav").style.left = navOffset;
    document.getElementById("sideNavDocOverlay").style.transition = "left 0.5s ease 0s, background-color 0.5s ease 0s";
}

/* Get the sideNav state. */
/* States can be: Opening/Open/Closing/Closed depending on the transition state/display property of the sideNav element */
/* Return open by default, or closed if the state is closed or closing. */
function sideNavState() {
    if (c4.sideNavState === "closed" || c4.sideNavState === "closing") {
        return "closed";
    } else {
        return "open";
    }
}

/* Set width and negative offset for sideNav on screen resize*/
function sideNavResize() {
    let navArray = getNavWidth(); //Get sideNav width and offset values
    let navWidth = navArray[0];
    let navOffset = navArray[1];

    if (sideNavState() === "closed") { //If the sideNav is closed, apply the calculated width and offset
        document.getElementById("sideNav").style.width = navWidth;
        document.getElementById("sideNav").style.left = navOffset;
    } else { //Otherwise, apply the width value to the sideNav element width and sideNavDocOverlay element left properties
        document.getElementById("sideNav").style.width = navWidth;
        document.getElementById("sideNavDocOverlay").style.left = navWidth;
    }
}

/* Toggle sidenav visibility */
function sideNavDisplayToggle() {
    elementDisplay("toggle", "sideNav");
    elementDisplay("toggle", "sideNavDocOverlay");
}

/* Toggle sideNavDocOverlay disabled status */
/* Called when opening/closing sideNav to prevent click through during transition, potentially disrupting the position of sideNav elements */
/* sideNavDocOverlay onClick functionality is restored once the sideNav has finished opening */
function sideNavDocOverlayClickDisabled() {
    if (document.getElementById("sideNavDocOverlay").hasAttribute("onClick")) {
        document.getElementById("sideNavDocOverlay").removeAttribute("onClick");
    } else {
        document.getElementById("sideNavDocOverlay").setAttribute("onClick", "closeNav()");
    }
}

/* Toggle sideNavDocOverlay left transition duration */
function sideNavDocOverlayLeftTransitionDuration() {
    if (document.getElementById("sideNavDocOverlay").style.transition === "left 0.5s ease 0s, background-color 0.5s ease 0s") {
        document.getElementById("sideNavDocOverlay").style.transition = "left 0s ease 0s, background-color 0.5s ease 0s"; //when sideNav is open
    } else {
        document.getElementById("sideNavDocOverlay").style.transition = "left 0.5s ease 0s, background-color 0.5s ease 0s"; //when sideNav is closed (initial value)
    }
}

/* Calculate the sideNav width, then show the sideNav and sideNavDocOverlay elements with transition */
function showNav() {
    let navWidth = getNavWidth()[0]; //Get the sideNav Width
    document.getElementById("sideNav").style.left = "0px"; //Set the sideNav left style property to 0 - this will transition the sideNav from it's offset position onto the window
    document.getElementById("sideNavDocOverlay").style.zIndex = "999"; //Set the sideNavDocOverlay zIndex to 999.  This will ensure that it appears over all content except the sideNav
    document.getElementById("sideNavDocOverlay").style.backgroundColor = "rgba(0,0,0,0.7)"; //Set the sideNavDocOverlay backgroundColor style property to 70% translucent black (from 100% default)
    document.getElementById("sideNavDocOverlay").style.left = navWidth; //Set the sideNavDocOverlay left style property to match the navWidth.  This will transition the overlay from the left in line with the sideNav transition
}

/* Calculate the sideNav width, then hide the sideNav and sideNavDocOverlay elements with transition */
function hideNav() {
    let navOffset = getNavWidth()[1]; //Get the sideNav Width
    document.getElementById("sideNav").style.left = navOffset; //Set the sideNav left style property to negative width - this will transition the sideNav fully off of the left side of the window
    document.getElementById("sideNavDocOverlay").style.zIndex = "-1000"; //Set the sideNavDocOverlay zIndex to -1000, ensuring that it drops behind all other content
    document.getElementById("sideNavDocOverlay").style.backgroundColor = "rgba(0,0,0,0.0)"; //Set the sideNavDocOverlay backgroundColor style property to the default of 100% translucent
    document.getElementById("sideNavDocOverlay").style.left = "0px"; //Set the sideNavDocOverlay left style property to 0.  This will transition the overlay across the window in line with the sideNav transition
}

/* Open the sideNav */
function openNav() {
    /* If the sideNav is already open/opening, do nothing */
    if (c4.sideNavState === "open" || c4.sideNavState === "opening") {
        console.log(`sideNav already ${c4.sideNavState}.`);
        return;
    }

    /* Set the sideNavState to opening, display the sideNav and the sideNavDocOverlay elements, disable the navBarToggler element */
    c4.sideNavState = "opening";
    sideNavDisplayToggle();
    document.getElementById("navBarToggler").disabled = true;

    /* Delay for 50ms, then call ShowNav() */
    setTimeout(function () {
        showNav();
        /* Delay for 600ms and toggle the sideNavDocOverlay left transition duration and onclick attribute values, then set the sideNavState to open */
        setTimeout(function () {
            sideNavDocOverlayLeftTransitionDuration();
            sideNavDocOverlayClickDisabled();
            c4.sideNavState = "open";
        }, 600);
    }, 50);
}

/* Close the sideNav */
function closeNav() {
    /* If the sideNav is already closing/closed, do nothing */
    if (c4.sideNavState === "closed" || c4.sideNavState === "closing") {
        console.log(`sideNav already ${c4.sideNavState}.`);
        return;
    }
    /* Set the sideNav state to closing, and toggle the sideNavDocOverlay left transition duration and onclick attribute values */
    c4.sideNavState = "closing";
    sideNavDocOverlayLeftTransitionDuration();
    sideNavDocOverlayClickDisabled();
    /* Delay for 50ms, then call hideNav() */
    setTimeout(function () {
        hideNav();
        /* Delay for 600ms then hide the sideNav element, enable the navBarToggler, and set the sideNavState to closed */
        setTimeout(function () {
            sideNavDisplayToggle();
            document.getElementById("navBarToggler").disabled = false;
            c4.sideNavState = "closed";
        }, 600);
    }, 50);
}

/* Check the state of the sideNav.  If open, then close it before executing the provided function */
/* Requires: */
/*      func: callback function to be executed */
/* Syntax: */
/*      checkSideNavState(function(){function_here()}); */
function checkSideNavState(func) {
    if (sideNavState() === "open") {
        closeNav();
        setTimeout(function () {
            func();
        }, 650);
    } else {
        func();
    }
}