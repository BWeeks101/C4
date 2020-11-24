$(document).ready(dataGridOnLoad);

/* Call function to ensure proper formatting of innermost content columns */
function dataGridOnLoad() {
    dataGridDisplayContentColStyle();
}

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
        return;
    }

    if (dataGridHeaderContentColCountMatch(headers.length, content.length) == false) {
        return;
    }

    if (dataGridHeadersAreStrings(headers) == false) {
        return;
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
/* target: element id of the datagrid-container which will hold the DataGrid output */
/* NOTE: target MUST have the datagrid-container class */
function displayDataGrid(dataGrid, target) {

    if (elementIsDataGridContainer(target) == false) {
        return;
    }

    if (objectIsDataGrid(dataGrid) == false) {
        return;
    }

    let colCount = dataGrid.colCount;
    let rowCount = dataGrid.rowCount;

    document.getElementById(target).classList.add("datagrid-colCount-" + colCount);
    document.getElementById(target).classList.add("datagrid-rowCount-" + rowCount);

    let headerTarget = `${target}HeaderRow`;
    let contentTarget = `${target}ContentRow`;
    document.getElementById(target).insertAdjacentHTML('afterbegin',`<div class="row flex-nowrap datagrid-header-row" id="${headerTarget}"></div>`);
    document.getElementById(target).insertAdjacentHTML('beforeend',`<div class="row flex-nowrap datagrid-content-row" id="${contentTarget}"></div>`);

    let colStart = `<div class="col-4" id="${target}`;
    let hColTag = "Hcol-";
    let cColTag = "Ccol-";    
    let headerColMid = `"><h3>`;
    let headerColEnd = `</h3></div>`;
    let contentRowEnd = `"></div>`
    let contentColStart = `<div class="row flex-nowrap datagrid-content-row rowid-`;
    let contentColId = `" id="`
    let contentColMid = `"><div class="col datagrid-content-col">`;
    let contentColEnd = `</div></div>`;
    let contentRowOverlayStart = `<div class="datagrid-click-overlay" onclick="dataGridDisplayClicked(this)" id="`;
    let contentRowOverlayEnd = `"></div>`;
    
    let hColId;
    let cColId;
    let cRowId;
    let cOverlayId;
    
    for (i = 0; i < colCount; i++) {

        document.getElementById(headerTarget).insertAdjacentHTML('beforeend', colStart + hColTag + i + headerColMid + dataGrid.headers[i] + headerColEnd);
        document.getElementById(contentTarget).insertAdjacentHTML('beforeend', colStart + cColTag + i + contentRowEnd);
        
        hColId = `${target}${hColTag}${i}`;
        cColId = `${target}${cColTag}${i}`;        
        
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
            cRowId = `${target}Col${i}RowId${ii}`;
            cOverlayId = `${target}OverlayCol${i}Row${ii}`

            document.getElementById(cColId).insertAdjacentHTML('beforeend', contentColStart + ii + contentColId + cRowId + contentColMid + contentRowOverlayStart + cOverlayId + contentRowOverlayEnd + dataGrid.content[i][ii] + contentColEnd);

            if (ii == 0) {
                document.getElementById(cRowId).classList.add("datagrid-content-row-first");            
            } else if (ii == rowCount-1) {
                document.getElementById(cRowId).classList.add("datagrid-content-row-last");
            }            
        }
    }
}

/* Hardcode removal of margins and padding for .content-col */
/* Call this on load */
/* Prevents any margins or padding on the .content-col class */
/* This class is applied to the innermost column of a dataGridDisplay content row */
/* These columns should always be full width - any margin or padding will compromise the formatting */
function dataGridDisplayContentColStyle() {
    let style = `
        .datagrid-content-col {
            padding: 0 !important;
            margin: 0 !important;
        }`

    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css"
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
}

/* Highlight the selected dataGridDisplay row */
function dataGridDisplayClicked(object) {
    let rowId = object.id.slice(object.id.lastIndexOf("w")+1, object.id.length);
    let gridId = object.closest(".datagrid-container").id;
    
    let gridCounts = dataGridDisplayGetCounts(gridId);

    dataGridDisplayClearSelected(gridId, gridCounts[0], gridCounts[1]);    

    dataGridDisplaySetSelected(gridId, gridCounts[0], rowId);
}

/* Get the column and row counts from a dataGridDisplay element id */
/* returns an array with colCount (position 0) and rowCount (position 1) */
function dataGridDisplayGetCounts(dataGridDisplay) {
    if (elementIsDataGridContainer(dataGridDisplay) == false) {
        return;
    }

    let colCount;
    let rowCount;
    
    for (i = 0; i < document.getElementById(dataGridDisplay).classList.length; i++) {
        if (document.getElementById(dataGridDisplay).classList.item(i).slice(0, 18) == "datagrid-colCount-") {
            colCount = document.getElementById(dataGridDisplay).classList.item(i).slice(18, document.getElementById(dataGridDisplay).classList.item(i).length);
        } else if (document.getElementById(dataGridDisplay).classList.item(i).slice(0, 18) == "datagrid-rowCount-") {
            rowCount = document.getElementById(dataGridDisplay).classList.item(i).slice(18, document.getElementById(dataGridDisplay).classList.item(i).length);
        }
    }

    return [colCount, rowCount];
}

/* Clear highlighted rows on a dataGridDisplay */
/* If either colCount or rowCount are ommitted, they will be calculated */
function dataGridDisplayClearSelected(gridId, colCount, rowCount) {
    if (elementIsDataGridContainer(gridId) == false) {
        return;
    }
    
    let selectedId;
    
    if (colCount == undefined || rowCount == undefined) {
        let gridCounts = dataGridDisplayGetCounts(gridId);
        if (colCount == undefined) {
            colCount = gridCounts[0];
        }

        if (rowCount == undefined) {
            rowCount = gridCounts[1];
        }
    }

    for (i = 0; i < colCount; i++) {
        for (ii = 0; ii < rowCount; ii++) {
            selectedId = `${gridId}Col${i}RowId${ii}`;
            document.getElementById(selectedId).classList.remove("datagrid-row-selected");
        }
    }
}

/* Highlight a row on a dataGridDisplay */
function dataGridDisplaySetSelected(gridId, colCount, rowId) {
    if (elementIsDataGridContainer(gridId) == false) {
        return;
    }

    let selectedId;

    for (i = 0; i < colCount; i++) {
        selectedId = `${gridId}Col${i}RowId${rowId}`;
        document.getElementById(selectedId).classList.add("datagrid-row-selected");
    }
}

/* Remove a dataGridDisplay */
function dataGridDisplayRemove(target) {
    if (elementIsDataGridContainer(target) == false) {
        return;        
    }

    let classNames = [];
    let classSlice;

    document.getElementById(target).innerHTML = ""

    for (i = 0; i < document.getElementById(target).classList.length; i++) {        
        classSlice = document.getElementById(target).classList.item(i).slice(0, 18)
        
        if (classSlice == "datagrid-colCount-" || classSlice == "datagrid-rowCount-") {            
            classNames.push(document.getElementById(target).classList.item(i))
        }
    }

    for (i = 0; i < classNames.length; i++) {
        document.getElementById(target).classList.remove(classNames[i]);
    }
}

/* Refresh a dataGridDisplay */
function dataGridDisplayRefresh(dataGrid, target) {
    dataGridDisplayRemove(target);
    displayDataGrid(dataGrid, target)
}

/* Verify element is a datagrid-container */
function elementIsDataGridContainer(target) {
    let valid = document.getElementById(target);

    if (valid == null) {
        console.log(`Error.  Target element (${target}) does not exist.`);
        return false;
    }

    valid = document.getElementById(target).classList.contains("datagrid-container");
    
    if (valid == false) {
        console.log(`Error.  Target element (${target}) does not have the required datagrid-container class.`)
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