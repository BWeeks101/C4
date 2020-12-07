/* DataGrid object constructor */
/* Expects: */
/* header = array containing column headers */
/* content = array containing arrays for each column of data */
/* Returns DataGrid object with the following Properties: */
/* .headers = array containing column headers */
/* .content = array containing arrays for each column of data.  All content arrays are padded with undefined values to ensure a consistent number of rows over all columns */
/* .colCount = integer containing number of columns */
/* .rowCount = integer containing number of rows */
/* .objectType = "datagrid".  read-only property.  returns a lower case string value.  Used for verifying that a provided object is a DataGrid */
function DataGrid (headers, content) {

    if (objectIsObject(headers, "Headers") == false || objectIsObject(content, "Content") == false) {
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
/* dataGrid: DataGrid Object */
/* dataGridDisplayId: element id of the datagrid-container which will hold the DataGrid output */
/* selectOption: OPTIONAL.  Default is ROW. */
/*                          Options are ROW, COL, OFF */
/* NOTE: dataGridDisplayId MUST have the datagrid-container class */
function displayDataGrid(dataGrid, dataGridDisplayId, selectOption, ignoreUndefined) {

    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function displayDataGrid failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    if (objectIsDataGrid(dataGrid) == false) {
        console.log(`function displayDataGrid failed.  Object (${dataGrid}) is not a dataGrid object.`)
        return false;
    }

    if (selectOption != undefined) {
        selectOption = selectOption.toLowerCase();
    }

    let colCount = dataGrid.colCount;
    let rowCount = dataGrid.rowCount;

    document.getElementById(dataGridDisplayId).classList.add("datagrid-colCount-" + colCount);
    document.getElementById(dataGridDisplayId).classList.add("datagrid-rowCount-" + rowCount);

    let headerContainer = `${dataGridDisplayId}HeaderContainer`;
    let headerRow = `${dataGridDisplayId}HeaderRow`;
    let contentContainer = `${dataGridDisplayId}ContentContainer`;
    let contentRow = `${dataGridDisplayId}ContentRow`;
    document.getElementById(dataGridDisplayId).insertAdjacentHTML('beforeend',`<div class"datagrid-header-container" id="${headerContainer}"><div class="row flex-nowrap datagrid-header-row" id="${headerRow}"></div></div>`);
    document.getElementById(dataGridDisplayId).insertAdjacentHTML('beforeend',`<div class="datagrid-content-container" id="${contentContainer}"><div class="row flex-nowrap datagrid-content-row" id="${contentRow}"></div></div>`);

    if (colCount < 12) {
        bootstrapColWidth = Math.ceil(12 / colCount);
    } else {
        bootstrapColWidth = 1;
    }

    let colStart = `<div class="col-${bootstrapColWidth}" id="${dataGridDisplayId}`;
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
        case "col":
            contentRowOverlaySelectType = contentRowOverlaySelectCol;
            break;
        case "off":
            contentRowOverlaySelectType = "";
            break;
        default: //row or Undefined
            contentRowOverlaySelectType = contentRowOverlaySelectRow;
            break;
    }
    
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

/* Display of vertical ScrollBars on Content will push Content Columns out of alignment with Header Columns */
/* When ScrollBars are shown, add padding-right to the Header Container equivalent to the ScrollBar Width */
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
function dataGridDisplaySetOnClick(dataGridDisplayId, newFunction) {
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplaySetOnClick failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    let elementCollection = document.querySelectorAll(`#${dataGridDisplayId} .datagrid-click-overlay`);
    for (i = 0; i < elementCollection.length; i++) {
        elementCollection[i].setAttribute("onclick", newFunction);
    }    
}

/* Change default col width */
/* cols = number value representing the bootstrap column width */
/* if cols == "" or undefined, then the col class is used by default */
function dataGridDisplaySetCols(dataGridDisplayId, cols) {
    if (isNaN(cols) == false && cols != "") {
        cols = `col-${Math.ceil(cols)}`;
    } else if (cols == undefined || cols == "") {
        cols = "col";
    } else {
        console.log(`function dataGridDisplaySetCols failed.  Supplied cols (${cols}) is not a number.`);
        return false;
    }

    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplaySetCols failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    let elementCollection = document.querySelectorAll(`#${dataGridDisplayId}ContentRow .datagrid-content-col`);
    let bootstrapColClass;
    for (i = 0; i < elementCollection.length; i++) {
        for (ii = 0; ii < elementCollection[i].classList.length; ii++) {
            if (elementCollection[i].classList.item(ii).slice(0, 3) == "col") {
                if (elementCollection[i].classList.item(ii).length == 3) {
                    elementCollection[i].classList.remove("col");
                } else if (elementCollection[i].classList.item(ii).slice(0, 4) == "col-") {
                    bootstrapColClass = elementCollection[i].classList.item(ii).slice(4, elementCollection[i].classList.item(ii).length);                    
                    if (isNaN(bootstrapColClass) == true) {
                        console.log(`${elementCollection[i].id} class="${elementCollection[i].classList.item(ii)}" not a valid Bootstrap Col Class.  Ignoring.`);
                    } else {
                        elementCollection[i].classList.remove(`col-${bootstrapColClass}`);
                    }
                }
            }
        }
        elementCollection[i].classList.add(cols);
    }
}

/* Default dataGrid Display onclick function */
/* Highlight the selected dataGridDisplay row/col */
/* returns array:
/* option: col or row (what we are selecting) */
/* count: number of rows in selected column, or number of columns in selected row */
/* selId: id of selected column or row (0 based) */
function dataGridDisplayClicked(object, option) {
    if (option != undefined) {
        option = option.toLowerCase();
    }

    let dataGridDisplayId = object.closest(".datagrid-container").id;
    
    let gridCounts = dataGridDisplayGetCounts(dataGridDisplayId);
    
    if (gridCounts == false) {
        console.log(`function dataGridDisplayClicked failed.  Cascade failure originating with dataGridDisplayGetCounts(${dataGridDisplayId}).`);
        return false;
    }

    let result = dataGridDisplayClearSelected(dataGridDisplayId, gridCounts[0], gridCounts[1]);
    if (result == false) {
        console.log(`function dataGridDisplayClicked failed.  Cascade failure originating with dataGridDisplayClearSelected(${dataGridDisplayId}, ${gridCounts[0]}, ${gridCounts[1]}).`);
        return false;
    }

    let selId;
    let gcId;

    switch (option) {
        case "row":
            selId = object.id.slice(object.id.lastIndexOf("w")+1, object.id.length);
            gcId = 0;
            break;
        case "col":
            selId = object.id.slice(object.id.lastIndexOf("l")+1, object.id.lastIndexOf("R"));
            gcId = 1;
            break;
    }    
    
    result = dataGridDisplaySetSelected(dataGridDisplayId, gridCounts[gcId], selId, option);
    if (result == false) {
        console.log(`function dataGridDisplayClicked failed.  Cascade failure originating with dataGridDisplaySetSelected(${dataGridDisplayId}, ${gridCounts[gcId]}, ${selId}, ${option}).`);
        return false;
    }
    return result;
}

/* Get the column and row counts from a dataGridDisplay element id */
/* returns an array with colCount (position 0) and rowCount (position 1) */
function dataGridDisplayGetCounts(dataGridDisplayId) {
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplayGetCounts failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    let colCount;
    let rowCount;
    
    for (i = 0; i < document.getElementById(dataGridDisplayId).classList.length; i++) {
        if (document.getElementById(dataGridDisplayId).classList.item(i).slice(0, 18) == "datagrid-colCount-") {
            colCount = document.getElementById(dataGridDisplayId).classList.item(i).slice(18, document.getElementById(dataGridDisplayId).classList.item(i).length);
        } else if (document.getElementById(dataGridDisplayId).classList.item(i).slice(0, 18) == "datagrid-rowCount-") {
            rowCount = document.getElementById(dataGridDisplayId).classList.item(i).slice(18, document.getElementById(dataGridDisplayId).classList.item(i).length);
        }
    }

    if (colCount == undefined || rowCount == undefined) {
        if (colCount == undefined) {
            console.log(`dataGridDisplayId (${dataGridDisplayId}) has no defined colCount.`);
        }

        if (rowCount == undefined) {
            console.log(`dataGridDisplayId (${dataGridDisplayId}) has no defined rowCount.`);
        }

        console.log(`function dataGridDisplayGetCounts Failed.  dataGridDisplayId (${dataGridDisplayId}) missing class(es).`);
        return false;
    }
    return [colCount, rowCount];
}

/* Clear highlighted rows/cols on a dataGridDisplay */
/* If either colCount or rowCount are ommitted, they will be calculated */
function dataGridDisplayClearSelected(dataGridDisplayId, colCount, rowCount) {
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplayClearSelected failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }
    
    let selectedId;
    
    if (colCount == undefined || rowCount == undefined) {
        let gridCounts = dataGridDisplayGetCounts(dataGridDisplayId);

        if (gridCounts == false) {
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
function dataGridDisplaySetSelected(dataGridDisplayId, count, selId, option) {
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplaySetSelected failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;
    }

    if (option != undefined) {
        option = option.toLowerCase();
    }

    let selectedId;

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
    if (elementIsDataGridContainer(dataGridDisplayId) == false) {
        console.log(`function dataGridDisplayRemove failed.  Target element (${dataGridDisplayId}) is not a .dataGrid-container.`)
        return false;        
    }

    let classNames = [];
    let classSlice;

    document.getElementById(dataGridDisplayId).innerHTML = ""

    for (i = 0; i < document.getElementById(dataGridDisplayId).classList.length; i++) {        
        classSlice = document.getElementById(dataGridDisplayId).classList.item(i).slice(0, 18)
        
        if (classSlice == "datagrid-colCount-" || classSlice == "datagrid-rowCount-") {            
            classNames.push(document.getElementById(dataGridDisplayId).classList.item(i))
        }
    }

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

/* Verify object is an Object */
function objectIsObject(object, description) {
    if (object == undefined || typeof object != "object") {
        if (description == undefined) {
            description = "A";
        } else {
            description = description + " a";
        }
        console.log(`Error. ${description}rray object expected.  Got ${object} (${typeof object})`);
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