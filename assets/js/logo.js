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
    result = displayDataGrid(c4.logo.grid, "logoGrid", "off", false); //Create the dataGrid display
    if (result == false) { //If false, then we could not create the display, so return false
        console.log(`Function drawLogoGrid failed.  Cascade failure originating with displayDataGrid(${c4.logo.grid}, "logoGrid", "off", false).`);
        return false;
    }
        
    gridCounts = dataGridDisplayGetCounts("logoGrid"); //Get the number of rows and columns for the logoGrid element
    if (gridCounts == false) { //If false, then we could not return the values, so return false
        console.log(`function drawLogoGrid failed.  Cascade failure originating with dataGridDisplayGetCounts("logoGrid").`)
        return false;
    }

    let logoGridContentRowMarginTop = 0;
    let checkMarginTop = 0;

    /* Set Content Row margin-top to maintain distance from header divider */
    for (i = 0; i < gridCounts[0]; i++) {        
        checkMarginTop = getElementPos(document.getElementById(`logoGridHcol-${i}`).firstElementChild).height //Get the height of the current header column
        if (checkMarginTop > logoGridContentRowMarginTop) { //Compare the height of the current column to the stored margintop value, and if larger, update the stored value
            logoGridContentRowMarginTop = checkMarginTop;
        }     
    }
    document.getElementById("logoGridContentRow").style.marginTop = `${logoGridContentRowMarginTop}px` //Set the height of the content row margin-top to equal the height of the largest header column
    
    let colCenter = getLogoGridColCenter(); //Get the center point of each header and column cell
    if (typeof colCenter != "object") { //If colCenter is not an object then we could not get the center points, so return false
        console.log(`function drawLogoGrid failed.  Unable to get center points.  Cascade failure originating with getLogoGridColCenter()`);
        return false;
    }    
    
    /* Ensure Header and Content cells are horizontally aligned before beginning animation */
    for (i = 0; i < gridCounts[0]; i++) {        
        document.getElementById(`logoGridHcol-${i}`).firstElementChild.style.left = `${colCenter.contentCenter[i].absoluteX - colCenter.headerCenter[i].absoluteX}px`;
    }

    /* Begin animation */
    animateLogo(gridCounts[0], colCenter);
}

/* Refresh the logo dataGridDisplay */
function refreshLogoGrid() {
    dataGridDisplayRemove("logoGrid");
    drawLogoGrid();
}

/* Get Center Point of each logoGrid Cell */
/* Requires: */
/*      ColId (OPTIONAL): Integer.  Id of the column we wish to get the positions for */
/* Returns an object with the following properties: */
/*      headerCenter: Array containing objects which hold the center and absolute center coords for each header cell */
/*      contentCenter: Array containing objects which hold the center and absolute center coords for each content cell */
function getLogoGridColCenter(colId) {
    gridCounts = dataGridDisplayGetCounts("logoGrid"); //Get the number of rows and columns for the logoGrid element
    if (gridCounts == false) { //If false, then we could not return the values, so return false
        console.log(`function animateLogo failed.  Cascade failure originating with dataGridDisplayGetCounts("logoGrid").`)
        return false;
    }

    /* Initialise result arrays */
    let headerCoords = [];
    let contentCoords = [];
    
    /* If the ColId argument is specified, is an integer, and is a valid column Id then get positions for this column ONLY */
    if (colId != undefined && Number.isInteger(colId) == true && colId < gridCounts[0]) {
        headerCoords[0] = getElementPos(document.getElementById(`logoGridHcol-${colId}`).firstElementChild.firstElementChild).center;
        contentCoords[0] = getElementPos(document.getElementById(`logoGridCol${colId}RowId0`).firstElementChild.lastElementChild).center;
    } else {
        /* Otherwise call getElementPos() for each header and content column, and add the returned object.center properties to the relevant array. */
        for (i = 0; i < gridCounts[0]; i++) {
            headerCoords[i] = getElementPos(document.getElementById(`logoGridHcol-${i}`).firstElementChild.firstElementChild).center;
            contentCoords[i] = getElementPos(document.getElementById(`logoGridCol${i}RowId0`).firstElementChild.lastElementChild).center;
        }
    }

    return {headerCenter:headerCoords, contentCenter:contentCoords};
}

/* Animate the logo */
/* After 2s, call the queue() function sequentially for each column in the logo dataGridDisplay */
/* Requires: */
/*      colCount: Integer.  Number of columns in header */
/*      colCenter: Object.  Center coordinates of header and content columns */
function animateLogo(colCount, colCenter) {
    setTimeout(function() { //Delay for 2s, then call the queue function sequentially for each column in the logo dataGridDisplay
        let numFrames;
        let percentComplete;
        let delay;    
        for (i = 0; i < colCount; i++) {
            
            /* Calculate the stop point for the animation.  This is the number of pixels between the vertical centers of the current header and content */
            targetPoint = colCenter.contentCenter[i].absoluteY - colCenter.headerCenter[i].absoluteY;
            
            /* Calculate the delay that the queue will utilise between each animation start call. */
            numFrames = Math.ceil(targetPoint); //Number of Frames (1px movement per frame)            
            percentComplete = ((numFrames / 100) * 50) * 5; //50% of the frames, * 5 gives 50% of the animation length (1 frame / 5ms)
            delay = percentComplete * i //Multiply percentComplete by the id of the current column to create a staggered drop effect
            
            queue(i, targetPoint, delay); //Queue up the animation start call
        }
    }, 2000);
}

/* Wait for the provided delay time, then start the drop animation for the specified column */
/* Requires: */
/*      i: Integer.  Id of header column to animate */
/*      targetPoint: Number of pixels to adjust header content by */
/*      delay: Number of miliseconds to delay starting the animation */
function queue(i, targetPoint, delay) {
    setTimeout(function() {
        dropChar(i, targetPoint);
    }, delay);
}

/*
* Basic Animation Function Structure Obtained from W3 Schools How To and Modified
* https://www.w3schools.com/howto/howto_js_animate.asp
*/

/* Increase the TOP style value of the selected column until it meets the targetPoint */
/* If the column id is even, then the content background is changed to the default p1TokenColor, otherwise it changes to the default p2TokenColor */
/* Requires: */
/*      colId: Integer.  Id of the column header we are going to animate */
/*      targetPoint: Number of pixels to adjust the header content by */
function dropChar(colId, targetPoint) {
    let pos = 0; //Initialise position variable
    let id = setInterval(frame, 5); //Call frame() once every 5ms
    function frame() {
        if (pos == targetPoint) { //If we have hit the targetPoint
            clearInterval(id); //Stop animating
            if (colId % 2 == 0) { //If the column Id is even, apply the --p1TokenColor style value to the background of the content column
                document.getElementById(`logoGridCol${colId}RowId0`).firstElementChild.lastElementChild.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--p1TokenColor`).trim();
            } else { //Otherwise the column Id is odd, so apply the --p2TokenColor style instead
                document.getElementById(`logoGridCol${colId}RowId0`).firstElementChild.lastElementChild.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--p2TokenColor`).trim();
            }
            return true;
        } else if (pos == parseInt(Math.floor(targetPoint))) { //If we haven't hit the targetPoint, but are less than 1px away
            pos = targetPoint;
            document.getElementById(`logoGridHcol-${colId}`).firstElementChild.style.top = pos + `px`; //Set the position to targetPoint (prevents 1px adjustment as normal, overshooting the target and creating an infinite anim)
        } else { //Otherwise, adjust the position by 1px and continue
            pos++
            document.getElementById(`logoGridHcol-${colId}`).firstElementChild.style.top = pos + `px`;
        }
    }
}