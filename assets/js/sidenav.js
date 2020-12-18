/*
* SideNav taken from W3 Schools Example and modified
* https://www.w3schools.com/howto/howto_js_sidenav.asp
*/

/* Initialise the sideNav */
function sideNavOnLoad() {
    /* calculate the offset value for the sideNav and apply it */
    let navOffset = getNavWidth()[1];
    document.getElementById("sideNav").style.left = navOffset;
    document.getElementById("sideNavDocOverlay").style.transition = "left 0.5s ease 0s, background-color 0.5s ease 0s";
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
    if (document.getElementById("sideNavDocOverlay").style.transition == "left 0.5s ease 0s, background-color 0.5s ease 0s") { 
        document.getElementById("sideNavDocOverlay").style.transition = "left 0s ease 0s, background-color 0.5s ease 0s"; //when sideNav is open
    } else {
        document.getElementById("sideNavDocOverlay").style.transition = "left 0.5s ease 0s, background-color 0.5s ease 0s"; //when sideNav is closed (initial value)
    }
}

/* Open the sideNav */
function openNav() {
    /* If the sideNav is already open/opening, do nothing */
    if (c4.sideNavState == "open" || c4.sideNavState == "opening") {
        console.log(`sideNav already ${c4.sideNavState}.`);
        return;
    }
    
    /* Set the sideNavState to opening, display the sideNav and the sideNavDocOverlay elements, disable the navBarToggler element */
    c4.sideNavState = "opening";
    sideNavDisplayToggle();
    document.getElementById("navBarToggler").disabled = true;

    /* Delay for 50ms, then call ShowNav() */
    setTimeout(function() {
        showNav();
        /* Delay for 600ms and toggle the sideNavDocOverlay left transition duration and onclick attribute values, then set the sideNavState to open */
        setTimeout(function() {
            sideNavDocOverlayLeftTransitionDuration();
            sideNavDocOverlayClickDisabled();
            c4.sideNavState = "open";
        }, 600);
    }, 50);
}

/* Calculate the sideNav width, then show the sideNav and sideNavDocOverlay elements */
function showNav() {
    let navWidth = getNavWidth()[0]; //Get the sideNav Width
    document.getElementById("sideNav").style.left = "0px"; //Set the sideNav left style property to 0 - this will transition the sideNav from it's offset position onto the screen
    document.getElementById("sideNavDocOverlay").style.zIndex = "999"; //Side the sideNavDocOverlay zIndex to 999.  This will ensure that it appears over all content except the sideNav
    document.getElementById("sideNavDocOverlay").style.backgroundColor = "rgba(0,0,0,0.7)"; //Set the sideNavDocOverlay backgroundColor style property to 70% translucent black (from 100% default)
    document.getElementById("sideNavDocOverlay").style.left = navWidth; //Set the sideNavDocOverlay left style property to match the navWidth.  This will transition the overlay from the left in line with the sideNav transition
}

/* Close the sideNav */
function closeNav() {
    /* If the sideNav is already closing/closed, do nothing */
    if (c4.sideNavState == "closed" || c4.sideNavState == "closing") {
        console.log(`sideNav already ${c4.sideNavState}.`);
        return;
    }
    /* Set the sideNav state to closing, and toggle the sideNavDocOverlay left transition duration and onclick attribute values */
    c4.sideNavState = "closing";
    sideNavDocOverlayLeftTransitionDuration();
    sideNavDocOverlayClickDisabled();
    /* Delay for 50ms, then call hideNav() */
    setTimeout(function() {
        hideNav();
        /* Delay for 600ms then hide the sideNav element, enable the navBarToggler, and set the sideNavState to closed */
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