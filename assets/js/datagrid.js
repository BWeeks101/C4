/* Requires Bootstrap 4.5.2+ */

/* DataGrid object constructor */
/* Requires: */
/*      header = array containing column headers (in string format)*/
/*      content = array containing arrays for each column of data */
/* Returns DataGrid object with the following Properties: */
/*      .headers = array containing column headers */
/*      .content = array containing arrays for each column of data.  All content arrays are padded with undefined values to ensure a consistent number of rows over all columns */
/*      .colCount = integer containing number of columns */
/*      .rowCount = integer containing number of rows */
/*      .objectType = "datagrid".  read-only property.  returns a lower case string value.  Used for verifying that a provided object is a DataGrid */
function DataGrid (headers, content) {

    /* Verify provided arguments */
    if (Array.isArray(headers) == false || Array.isArray(content) == false) {
        console.log("function DataGrid failed.  Invalid parameters supplied - array objects required for headers and content.");
        return false;
    }

    if (dataGridHeaderContentColCountMatch(headers.length, content.length) == false) {
        console.log("function DataGrid failed.  Number of supplied Headers does not equal the Number of Content columns.");
        return false;
    }

    if (dataGridHeadersAreStrings(headers) == false) {
        console.log("function DataGrid failed.  All supplied Headers must be Strings.");
        return false;
    }

    /* Initialise object properties */
    this.headers = headers;
    this.content = content;
    this.colCount = headers.length;
    let eachRowCount = [];
    let rowCount;

    for (i = 0; i < content.length; i++) {        
        if (i == 0) {
            eachRowCount.push(content[i].length);
            rowCount = eachRowCount[i];
        } else {
            eachRowCount.push(content[i].length);
        }
                
        if (rowCount < content[i].length) {
            rowCount = content[i].length;        
        }
    }

    for (i = 0; i < rowCount; i++) {
        if (eachRowCount[i] < rowCount) {
            for (ii = 0; ii < (rowCount - eachRowCount[i]); ii++) {
                content[i].push(undefined);
            }
        }
    }

    this.rowCount = rowCount;

    Object.defineProperty(this, "objectType", {
        value: "datagrid",
        writable: false
    });
};

/* DataGrid visual Output */
/* Requires: /*
/*      dataGrid: DataGrid Object */
/*      dataGridDisplayId: element id of the datagrid-container which will hold the DataGrid output */
/*      selectOption: OPTIONAL.  Default is ROW. */
/*                               Options are ROW, COL, OFF */
/* NOTE: dataGridDisplayId element MUST have the datagrid-container class */
/* Limitations: */
/*      Cols will only display properly if there are 12 or less columns of data */
/*      Only Vertical Scroll of the content row is supported */
function displayDataGrid(dataGrid, dataGridDisplayId, selectOption, ignoreUndefined) {

    /* Verify provided dataGrid, dataGridDisplayId arguments */
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function displayDataGrid failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    if (objectIsDataGrid(dataGrid) == false) {
        console.log(`function displayDataGrid failed.  Object (${dataGrid}) is not a dataGrid object.`)
        return false;
    }

    /* If selectOption argument provided, set the value to lower case */
    if (selectOption != undefined) {
        selectOption = selectOption.toLowerCase();
    }

    /* Initialise column and row count variables, apply to dataGridDisplayId element as classes */
    let colCount = dataGrid.colCount;
    let rowCount = dataGrid.rowCount;

    document.getElementById(dataGridDisplayId).classList.add("datagrid-colCount-" + colCount);
    document.getElementById(dataGridDisplayId).classList.add("datagrid-rowCount-" + rowCount);

    /* Initialise element id variables and create header and content container objects, with row child elements */
    let headerContainer = `${dataGridDisplayId}HeaderContainer`;
    let headerRow = `${dataGridDisplayId}HeaderRow`;
    let contentContainer = `${dataGridDisplayId}ContentContainer`;
    let contentRow = `${dataGridDisplayId}ContentRow`;
    document.getElementById(dataGridDisplayId).insertAdjacentHTML('beforeend',`<div class"datagrid-header-container" id="${headerContainer}"><div class="row flex-nowrap datagrid-header-row" id="${headerRow}"></div></div>`);
    document.getElementById(dataGridDisplayId).insertAdjacentHTML('beforeend',`<div class="datagrid-content-container" id="${contentContainer}"><div class="row flex-nowrap datagrid-content-row" id="${contentRow}"></div></div>`);

    /* Initialise the column class variable */
    /* This determines which bootstrap .col-n class will be applied to each column */
    let colClass = dataGridDisplayColClass(colCount);
    if (colClass == false) {
        console.log(`function displayDataGrid failed.  Cascade failure originating with dataGridDisplayColClass(${colCount}).`);
        return false;
    }
    
    /* Initialise string variables */
    /* These are utilised to build the innerHTML for the header and content row elements */
    let colStart = `<div class="${colClass}" id="${dataGridDisplayId}`;
    let hColTag = "Hcol-";
    let cColTag = "Ccol-";    
    let headerColMid = `"><h3>`;
    let headerColEnd = `</h3></div>`;
    let contentRowEnd = `"></div>`
    let contentColStart = `<div class="row flex-nowrap datagrid-content-row rowid-`;
    let contentColId = `" id="`
    let contentColMid = `"><div class="col datagrid-content-inner-col">`;
    let contentColEnd = `</div></div></div>`;
    let contentRowOverlayStart = `<div class="datagrid-click-overlay" `;
    let contentRowOverlaySelectRow = `onclick="dataGridDisplayClicked(this, 'row')" `;
    let contentRowOverlaySelectCol = `onclick="dataGridDisplayClicked(this, 'col')" `;
    let contentRowOverlaySelectType;
    let contentRowOverlayMid = `id="`;
    let contentRowOverlayEnd = `"></div><div class="datagrid-cell-value">`;
    
    let hColId;
    let cColId;
    let cRowId;
    let cOverlayId;
    
    let cHtml;

    switch (selectOption) {
        case "col": //select data by column
            contentRowOverlaySelectType = contentRowOverlaySelectCol;
            break;
        case "off": //no selection
            contentRowOverlaySelectType = "";
            break;
        default: //select data by row or Undefined
            contentRowOverlaySelectType = contentRowOverlaySelectRow;
            break;
    }
    
    /* Step through each header and content value from the dataGrid object, and insert appropriate HTML elements with the correct classes and attributes */
    for (i = 0; i < colCount; i++) {

        document.getElementById(headerRow).insertAdjacentHTML('beforeend', colStart + hColTag + i + headerColMid + dataGrid.headers[i] + headerColEnd);
        document.getElementById(contentRow).insertAdjacentHTML('beforeend', colStart + cColTag + i + contentRowEnd);
        
        hColId = `${dataGridDisplayId}${hColTag}${i}`;
        cColId = `${dataGridDisplayId}${cColTag}${i}`;        
        
        document.getElementById(hColId).classList.add("datagrid-header-col");
        document.getElementById(cColId).classList.add("datagrid-content-col");

        if (i == 0) {
            document.getElementById(hColId).classList.add("datagrid-header-col-first");
            document.getElementById(cColId).classList.add("datagrid-content-col-first");
        } else if (i == colCount-1) {
            document.getElementById(hColId).classList.add("datagrid-header-col-last");
            document.getElementById(cColId).classList.add("datagrid-content-col-last");
        }

        for (ii = 0; ii < rowCount; ii++) {
            cRowId = `${dataGridDisplayId}Col${i}RowId${ii}`;
            cOverlayId = `${dataGridDisplayId}OverlayCol${i}Row${ii}`
            cHtml = contentColStart + ii + contentColId + cRowId + contentColMid + contentRowOverlayStart + contentRowOverlaySelectType + contentRowOverlayMid + cOverlayId + contentRowOverlayEnd;
            if (dataGrid.content[i][ii] == undefined) {
                switch (ignoreUndefined) {
                    case false:
                        cHtml = cHtml + contentColEnd;
                        break;
                    case true:
                        cHtml = cHtml + dataGrid.content[i][ii] + contentColEnd;
                        break;
                    default:
                        if (typeof ignoreUndefined == "string") {
                            cHtml = cHtml + ignoreUndefined + contentColEnd;
                        } else {
                            cHtml = cHtml + "No Data" + contentColEnd;
                        }
                        break;
                }
            } else {
                cHtml = cHtml + dataGrid.content[i][ii] + contentColEnd;
            }
            document.getElementById(cColId).insertAdjacentHTML('beforeend', cHtml);

            if (ii == 0) {
                document.getElementById(cRowId).classList.add("datagrid-content-row-first");            
            } else if (ii == rowCount-1) {
                document.getElementById(cRowId).classList.add("datagrid-content-row-last");
            }            
        }
    }
}

/* Determines the bootstrap class applied to columns in a dataGrid display */
/* Requires a count of the columns in the dataGrid display object */
function dataGridDisplayColClass(colCount) {
    colCount = parseInt(colCount);

    /* if colCount is not a number, fail */
    if (isNaN(colCount) == true) {
        console.log(`Supplied Column Count (${colCount}) is not a valid integer`);
        return false;
    }

    /* colCounts divisible by 12 are given the appropriate bootstrap class. */
    /* colCounts not divisible by 12 are given the bootstrap .col class along with a .datagrid-col-custom-n class */
    /* .datagrid-col-custom-n classes: */
    /*      n = colCount */
    /*      column width (percentage) = ((12 / n)/12)*100 */
    switch (colCount) {
        case 1:
            colClass = "-12"; //.col-12 (100%)
            break;
        case 2:
            colClass = "-6"; //.col-6 (50%)
            break;
        case 3:
            colClass = "-4"; //.col-4 (33.33%)
            break;
        case 4:
            colClass = "-3"; //.col-3 (25%)
            break;
        case 5:
            colClass = " datagrid-col-custom-5"; //.col .datagrid-col-custom-5 (20%)
            break;
        case 6:
            colClass = "-2"; //.col-2 (16.66%)
            break;
        case 7:
            colClass = " datagrid-col-custom-7"; //.col .datagrid-col-custom-7 (14.28%)
            break;
        case 8:
            colClass = " datagrid-col-custom-8"; //.col .datagrid-col-custom-8 (12.5%)
            break;
        case 9:
            colClass = " datagrid-col-custom-9"; //.col .datagrid-col-custom-9 (11.11%)
            break;
        case 10:
            colClass = " datagrid-col-custom-10"; //.col .datagrid-col-custom-10 (10%)
            break;
        case 11:
            colClass = " datagrid-col-custom-11"; //.col .datagrid-col-custom-11 (9.09%)
            break;
        default:
            colClass = "-1"; //.col-1
            break;
    }

    return String(`col${colClass}`);
}

/* Display of vertical ScrollBars on Content will push Content Columns out of alignment with Header Columns (content cols will shift left) */
/* When ScrollBars are shown, add padding-right to the Header Container equivalent to the ScrollBar Width to maintain alignment */
/* Call this when the dataGrid is displayed, and on resize */
function dataGridAdjustForScrollBars(dataGridDisplayId) {
    let rPad = document.getElementById(`${dataGridDisplayId}ContentContainer`).offsetWidth - document.getElementById(`${dataGridDisplayId}ContentContainer`).clientWidth;
    if (rPad == 0 || rPad === "" ) {
        document.getElementById(`${dataGridDisplayId}HeaderContainer`).style.removeProperty("padding-right");
    } else {
        document.getElementById(`${dataGridDisplayId}HeaderContainer`).style.paddingRight = `${rPad}px`;
    }    
}

/* Replace default onclick function */
/* Call to replace the default onclick function on dataGrid-click-overlay elements */
function dataGridDisplaySetOnClick(dataGridDisplayId, newFunction) {
    /* If provided dataGridDisplayId element does not have the .dataGrid-container class, then fail */
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplaySetOnClick failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    /* Create a collection of dataGridDisplayId descendent elements with the .datagrid-click-overlay class */
    /* For each descendent, update the onclick attribute with the provided newFunction argument */
    let elementCollection = document.querySelectorAll(`#${dataGridDisplayId} .datagrid-click-overlay`);
    for (i = 0; i < elementCollection.length; i++) {
        elementCollection[i].setAttribute("onclick", newFunction);
    }    
}

/* Change default col width */
/* cols = [number] : value representing the bootstrap column width */
/*                   (provided decimal values will be rounded UP) */
/* cols = [auto] : column size determined automatically (uses dataGridDisplayColClass())*/
/* cols = [""] or [undefined] : .col class is used by default */
function dataGridDisplaySetCols(dataGridDisplayId, cols) {
    let colClass;
    let colCount;

    /* if cols argument is a number of any type, round it up to the nearest whole integer */
    if (isNaN(cols) == false && cols != "") {
        colClass = `col-${Math.ceil(cols)}`;
    } else if (cols == "auto") {
        /* if cols argument is "auto", use dataGridDisplayGetCounts() to return the colCount from the dataGridDisplayId element classList */
        colCount = dataGridDisplayGetCounts(dataGridDisplayId)[0]
        if (colCount == false) { //dataGridDisplayGetCounts() returned false, so fail.
            console.log(`function dataGridDisplaySetCols failed.  Cascade failure originating with dataGridDisplayGetCounts(${dataGridDisplayId}).`);
            return false;
        }
        /* Create an array of classes by splitting the string returned by dataGridDisplayColClass() */
        colClass = dataGridDisplayColClass(colCount).split(" ");
        if (colClass == false) { //dataGridDisplayColClass returned false, so fail.
            console.log(`function dataGridDisplaySetCols failed.  Cascade failure originating with dataGridDisplayColClass(${colCount}).split(" ").`);
            return false;
        }
    } else if (cols == undefined || cols == "") {
        /* If cols argument is undefined or empty, utilise the .col class */
        colClass = "col";
    } else {
        /* Otherwise the cols argument is invalid, so fail */
        console.log(`function dataGridDisplaySetCols failed.  Supplied cols (${cols}) is not a number.`);
        return false;
    }

    /* Verify that dataGridDisplayId element has the dataGrid-container class, and fail if not */
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplaySetCols failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    /* Create collection of all content columns and initialise vars */
    let elementCollection = document.querySelectorAll(`#${dataGridDisplayId}ContentRow .datagrid-content-col`);
    let bootstrapColClass;
    let datagridCustomClass;
    let removalList = [];
    for (i = 0; i < elementCollection.length; i++) { //Work through the collection
        for (ii = 0; ii < elementCollection[i].classList.length; ii++) { //Work through the classList of each element            
            if (elementCollection[i].classList.item(ii).slice(0, 3) == "col") {
                if (elementCollection[i].classList.item(ii).length == 3) {                    
                    removalList.push(`col`); //If class .col is found, add it to the removal list
                } else if (elementCollection[i].classList.item(ii).slice(0, 4) == "col-") {
                    bootstrapColClass = elementCollection[i].classList.item(ii).slice(4, elementCollection[i].classList.item(ii).length);                    
                    if (isNaN(bootstrapColClass) == true) {
                        console.log(`${elementCollection[i].id} class="${elementCollection[i].classList.item(ii)}" not a valid Bootstrap Col Class.  Ignoring.`);
                    } else {
                        removalList.push(`col-${bootstrapColClass}`); //If class .col-n is found, add it to the removal list
                    }
                } 
            } else if (elementCollection[i].classList.item(ii).slice(0, 20) == "datagrid-col-custom-") {     
                datagridCustomClass = elementCollection[i].classList.item(ii).slice(20, elementCollection[i].classList.item(ii).length);
                if (isNaN(datagridCustomClass) == true) {
                    console.log(`${elementCollection[i].id} class="${elementCollection[i].classList.item(ii)}" not a valid Datagrid Custom Col Class.  Ignoring.`);
                } else {
                    removalList.push(`datagrid-col-custom-${datagridCustomClass}`); //If class .datagrid-col-custom-n is found, add it to the removal list
                }
            }
        }

        /* Remove all classes in the removal list from this element */
        for (iii = 0; iii < removalList.length; iii++) {            
            elementCollection[i].classList.remove(removalList[iii]);
        }

        /* Clear the removal list */
        removalList = [];

        /* Process colClass as array if isArray true */
        if (Array.isArray(colClass) == true) {            
            for (iiii = 0; iiii < colClass.length; iiii++) {
                elementCollection[i].classList.add(colClass[iiii]); //Add all elements of the colClass array as classes to the current element
            }
        } else { /* Else process as string */
            elementCollection[i].classList.add(colClass); //Add string as class to the parent element
        }        
    }
}

/* Default dataGrid Display onclick function */
/* Highlight the selected dataGridDisplay row/col */
/* returns array:
/*      option: col or row (what we are selecting) */
/*      count: number of rows in selected column, or number of columns in selected row */
/*      selId: id of selected column or row (0 based) */
function dataGridDisplayClicked(object, option) {
    if (option != undefined) {
        option = option.toLowerCase(); //If option argument is provided, switch it to lower case
    }

    let dataGridDisplayId = object.closest(".datagrid-container").id; //Get the id of the closest ancestor element with a .datagrid-container class
    
    let gridCounts = dataGridDisplayGetCounts(dataGridDisplayId); //Get row & col counts from the parent datagrid-container    
    if (gridCounts == false) { //If we can't get the row & col counts, then fail
        console.log(`function dataGridDisplayClicked failed.  Cascade failure originating with dataGridDisplayGetCounts(${dataGridDisplayId}).`);
        return false;
    }

    let result = dataGridDisplayClearSelected(dataGridDisplayId, gridCounts[0], gridCounts[1]); //Clear any existing selected rows/cols
    if (result == false) { //If unable to clear the selection, then fail
        console.log(`function dataGridDisplayClicked failed.  Cascade failure originating with dataGridDisplayClearSelected(${dataGridDisplayId}, ${gridCounts[0]}, ${gridCounts[1]}).`);
        return false;
    }

    let selId;
    let gcId;

    switch (option) {
        case "row": //If the option argument is 'row' then get the id value of the selected row
            selId = object.id.slice(object.id.lastIndexOf("w")+1, object.id.length);
            gcId = 0;
            break;
        case "col": //If the option argument is 'col' then get the id value of the selected col
            selId = object.id.slice(object.id.lastIndexOf("l")+1, object.id.lastIndexOf("R"));
            gcId = 1;
            break;
    }    
    
    result = dataGridDisplaySetSelected(dataGridDisplayId, gridCounts[gcId], selId, option); //Set the selected row/col
    if (result == false) { //If unable to set the selection, then fail
        console.log(`function dataGridDisplayClicked failed.  Cascade failure originating with dataGridDisplaySetSelected(${dataGridDisplayId}, ${gridCounts[gcId]}, ${selId}, ${option}).`);
        return false;
    }
    return result;
}

/* Get the column and row counts from a dataGridDisplay element id */
/* returns array: */
/*      colCount (position 0) */
/*      rowCount (position 1) */
function dataGridDisplayGetCounts(dataGridDisplayId) {
    /* If provided dataGridDisplayId element does not have the .dataGrid-container class, then fail */
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplayGetCounts failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    let colCount;
    let rowCount;
    
    /* Iterate through the classList on the provided element, and return the integer from end of the datagrid-colCount-n and datagrid-rowCount-n classes */
    for (i = 0; i < document.getElementById(dataGridDisplayId).classList.length; i++) {
        if (document.getElementById(dataGridDisplayId).classList.item(i).slice(0, 18) == "datagrid-colCount-") {
            colCount = document.getElementById(dataGridDisplayId).classList.item(i).slice(18, document.getElementById(dataGridDisplayId).classList.item(i).length);
        } else if (document.getElementById(dataGridDisplayId).classList.item(i).slice(0, 18) == "datagrid-rowCount-") {
            rowCount = document.getElementById(dataGridDisplayId).classList.item(i).slice(18, document.getElementById(dataGridDisplayId).classList.item(i).length);
        }
    }

    if (colCount == undefined || rowCount == undefined) {
        if (colCount == undefined) { //No colCount returned
            console.log(`dataGridDisplayId (${dataGridDisplayId}) has no defined colCount.`);
        }

        if (rowCount == undefined) { //No rowCount returned
            console.log(`dataGridDisplayId (${dataGridDisplayId}) has no defined rowCount.`);
        }
        /* If we either the col/row counts are undefined, then we couldn't return them, so fail */
        console.log(`function dataGridDisplayGetCounts Failed.  dataGridDisplayId (${dataGridDisplayId}) missing class(es).`);
        return false;
    }
    return [colCount, rowCount];
}

/* Clear highlighted rows/cols on a dataGridDisplay */
/* If either colCount or rowCount are ommitted, they will be calculated */
function dataGridDisplayClearSelected(dataGridDisplayId, colCount, rowCount) {
    /* If provided dataGridDisplayId element does not have the .dataGrid-container class, then fail */
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplayClearSelected failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }
    
    let selectedId;
    
    /* if the colCount or rowCount arguments are undefined, then get the values by calling dataGridDisplayGetCounts() */
    if (colCount == undefined || rowCount == undefined) {        
        let gridCounts = dataGridDisplayGetCounts(dataGridDisplayId);
        if (gridCounts == false) { //If dataGridDisplayGetCounts() returns false, then fail
            console.log(`function dataGridDisplayClearSelected failed.  Cascade failure originating with dataGridDisplayGetCounts(${dataGridDisplayId}).`);
            return false;
        }

        if (colCount == undefined) {
            colCount = gridCounts[0];
        }

        if (rowCount == undefined) {
            rowCount = gridCounts[1];
        }
    }

    /* Iterate through each cell of the grid and remove the datagrid-row-selected/datagrid-col-selected classes from each element */
    for (i = 0; i < colCount; i++) {
        for (ii = 0; ii < rowCount; ii++) {
            selectedId = `${dataGridDisplayId}Col${i}RowId${ii}`;
            document.getElementById(selectedId).classList.remove("datagrid-row-selected");
            document.getElementById(selectedId).classList.remove("datagrid-col-selected");
        }
    }
    return true;
}

/* Highlight a row/col on a dataGridDisplay */
/* Requires: */
/*      dataGridDisplayId: element id of the datagrid-container which holds the DataGrid output */
/*      count: Number of rows/cols */
/*      selId: Numeric id of the selected col/row */
/*      option: row or col */
/* Returns array: */
/*      option: col or row (what we are selecting) */
/*      count: number of rows in selected column, or number of columns in selected row */
/*      selId: id of selected column or row (0 based) */
function dataGridDisplaySetSelected(dataGridDisplayId, count, selId, option) {
    /* If provided dataGridDisplayId element does not have the .dataGrid-container class, then fail */
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplaySetSelected failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    if (option != undefined) {
        option = option.toLowerCase(); //If option is not undefined, then set it to lower case.
    }

    let selectedId;
    
    /* Determine element id of each cell in the row/col, then add the relevant class (datagrid-row-selected/datagrid-col-selected) */
    for (i = 0; i < count; i++) {
        switch (option) {
            case "row":
                selectedId = `${dataGridDisplayId}Col${i}RowId${selId}`;
                break;
            case "col":
                selectedId = `${dataGridDisplayId}Col${selId}RowId${i}`;
                break;
        }
        document.getElementById(selectedId).classList.add(`datagrid-${option}-selected`);
    }

    /* option: col or row (what we are selecting) */
    /* count: number of rows in selected column, or number of columns in selected row */
    /* selId: id of selected column or row (0 based) */
    return [option, count, selId];
}

/* Remove a dataGridDisplay */
function dataGridDisplayRemove(dataGridDisplayId) {
    /* If provided dataGridDisplayId element does not have the .dataGrid-container class, then fail */
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplayRemove failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;        
    }

    let classNames = [];
    let classSlice;

    document.getElementById(dataGridDisplayId).innerHTML = "" //Clear the innerHTML of the dataGridDisplayId element, removing the grid from display

    /* Iterate through the classList of the dataGridDisplayId element, and add any instances of the datagrid-colCount-n/datagrid-rowCount-n classes to the local classNames array */
    for (i = 0; i < document.getElementById(dataGridDisplayId).classList.length; i++) {        
        classSlice = document.getElementById(dataGridDisplayId).classList.item(i).slice(0, 18)
        
        if (classSlice == "datagrid-colCount-" || classSlice == "datagrid-rowCount-") {            
            classNames.push(document.getElementById(dataGridDisplayId).classList.item(i))
        }
    }

    /* Iterate through the classNames array, removing each string from the dataGridDisplayId classList */
    for (i = 0; i < classNames.length; i++) {
        document.getElementById(dataGridDisplayId).classList.remove(classNames[i]);
    }
    return true;
}

/* Refresh a dataGridDisplay */
function dataGridDisplayRefresh(dataGrid, dataGridDisplayId) {
    let result = dataGridDisplayRemove(dataGridDisplayId);
    if (result == false) {
        console.log(`function dataGridDisplayRefresh failed.  Cascade failure originating with dataGridDisplayRemove(${dataGridDisplayId}).`);
        return false;
    }
    result = displayDataGrid(dataGrid, dataGridDisplayId);
    if (result == false) {
        console.log(`function dataGridDisplayRefresh failed.  Cascade failure originating with displayDataGrid(${dataGrid}, ${dataGridDisplayId}).`);
        return false;
    }
    return true;
}

/* Verify element is a datagrid-container */
function elementIsDataGridContainer(dataGridDisplayId) {
    let valid = document.getElementById(dataGridDisplayId);

    if (valid == null) {
        console.log(`Error.  Target element (${dataGridDisplayId}) does not exist.`);
        return false;
    }

    valid = document.getElementById(dataGridDisplayId).classList.contains("datagrid-container");
    
    if (valid == false) {
        console.log(`Error.  Target element (${dataGridDisplayId}) does not have the required datagrid-container class.`)
        return false;
    }
    return true;
}

/* Verify object is a DataGrid */
function objectIsDataGrid(object) {
    let valid = typeof object;

    if (valid != "object") {
        console.log(`Error.  dataGrid object expected.  Got ${typeof object} (${object})`);
        return false;
    }

    valid = object.objectType;

    if (valid != "datagrid") {
        console.log(`Error.  dataGrid object expected.  Object is not correct type.`);
        return false;
    }
    return true;
}

/* Verify header and content column count match */
function dataGridHeaderContentColCountMatch(hLen, cLen) {
    if (hLen != cLen) {
        if (hLen > cLen) {
            console.log(`Error.  Number of Headers (${hLen}) exceeds Number of Content Columns (${cLen}).  Columns cannot be empty.`);
            return false;
        } else if (hLen < cLen) {
            console.log(`Error.  Number of Content Columns (${cLen}) exceeds Number of Headers (${hLen}).  Columns must have a Header.`);
            return false;
        }
    }
    return true;
}

/* Verify header string content */
function dataGridHeadersAreStrings(headers) {
    for (i = 0; i < headers.length; i++) {
        if (typeof headers[i] != "string") {
            console.log(`Error.  Headers must contain string data.  Got ${typeof headers[i]} (${headers[i]}) in Column ${i}`);
            return false;
        }
    }
    return true;
}