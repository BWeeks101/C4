/* Draw the logoGrid.  If this fails, display a static logo instead */
function displayLogo() {
    displayLogoGrid() //Create, display and animate the logoGrid
    result = drawLogoGrid();    
    if (result == false) {
        console.log(`Unable to Display logoGrid.  Displaying Static Logo.`);
        displayStaticLogo(); //Unable to display logoGrid, so show static logo instead
        return false;
    }
    return true;
}

/* Display a static logo instead of the logoGrid */
function displayStaticLogo() {
    elementDisplay("hide", "logoGrid");
    elementDisplay("show", "staticLogo");
}

/* Display the logoGrid instead of a static logo */
function displayLogoGrid() {
    elementDisplay("hide", "staticLogo");
    elementDisplay("show", "logoGrid");
}

/* Create the logo dataGridDisplay then begin the logo animation */
function drawLogoGrid() {
    result = displayDataGrid(c4.logoGrid, "logoGrid", "off", false);
    if (result == false) {
        console.log(`Function drawLogoGrid failed.  Cascade failure originating with displayDataGrid(${c4.logoGrid}, "logoGrid", "off", false).`);
        return false;
    }
    result = dataGridDisplaySetCols("logoGrid", "auto");
    if (result == false) {
        console.log(`Function drawLogoGrid failed.  Cascade failure originating with dataGridDisplaySetCols("logoGrid", "auto").`);
        return false;
    }
    animateLogo();
}

/* Refresh the logo dataGridDisplay */
function refreshLogoGrid() {
    dataGridDisplayRemove("logoGrid");
    drawLogoGrid();
}

/* Animate the logo */
/* After 1s, call the queue() function sequentially for each column in the logo dataGridDisplay */
function animateLogo() {
    gridCounts = dataGridDisplayGetCounts("logoGrid"); //Get the number of rows and columns for the logoGrid element
    if (gridCounts == false) { //If false, then we could not return the values, so return false
        console.log(`function animateLogo failed.  Cascade failure originating with dataGridDisplayGetCounts("logoGrid").`)
        return false;
    }
    setTimeout(function() { //Delay for 1s, then call the queue function sequentially for each column in the logo dataGridDisplay
        for (i = 0; i < gridCounts[0]; i++) {
            queue(i);
        }
    }, 1000);
}

/* Set a delay of (250 + (125 * i)) miliseconds, then call dropChar() for the relevant column */
/* This causes each letter to drop 125ms later than the previous letter in the logo, giving the staggered fall effect */
function queue(i) {
    let delay = 250 + (125 * i);
    setTimeout(function() {
        dropChar(i);
    }, delay);
}

/* Increase the TOP style value of the selected column until it sits within the circle below it (47 pixels below the starting point) */
/* At this point, set the zIndex style property to 2 to ensure it displays over the circle, then change the circle background color style property*/
/* If the column id is even, then the background is changed to the default p1TokenColor, otherwise it changes to the default p2TokenColor */
function dropChar(colId) {
    let pos = 0;
    let id = setInterval(frame, 5);
    function frame() {
        if (pos == 47) {
            clearInterval(id);
            document.getElementById(`logoGridHcol-${colId}`).firstElementChild.style.zIndex = "2";
            if (colId % 2 == 0) {
                document.getElementById(`logoGridCol${colId}RowId0`).firstElementChild.lastElementChild.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--p1TokenColor`).trim();
            } else {
                document.getElementById(`logoGridCol${colId}RowId0`).firstElementChild.lastElementChild.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--p2TokenColor`).trim();
            }
            return true;
        } else {
            pos++
            document.getElementById(`logoGridHcol-${colId}`).firstElementChild.style.top = pos + `px`;
        }
    }
}