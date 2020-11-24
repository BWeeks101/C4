/* This function will accept a multidimensional (ish - arrays within an array in JS) array when the backend functionality is implemented. */
/* For now, just put the functionality in place to build a datagrid and provide a dummy array */
/* HTML should consist of a datagrid-container with an appropriate id value for the target */

function createDataGrid(array, target) {
    let colCount = array.length;
    let rowCount = array[0].length-1;

    document.getElementById(target).classList.add("colCount-" + colCount);
    document.getElementById(target).classList.add("rowCount-" + rowCount);

    let headerTarget = `${target}HeaderRow`;
    let contentTarget = `${target}ContentRow`;
    document.getElementById(target).insertAdjacentHTML('afterbegin',`<div class="row flex-nowrap header-row" id="${headerTarget}"></div>`);
    document.getElementById(target).insertAdjacentHTML('beforeend',`<div class="row flex-nowrap content-row" id="${contentTarget}"></div>`);

    let colStart = `<div class="col-4" id="${target}`;
    let hColTag = "Hcol-";
    let cColTag = "Ccol-";    
    let headerColMid = `"><h3>`;
    let headerColEnd = `</h3></div>`;
    let contentRowEnd = `"></div>`
    let contentColStart = `<div class="row flex-nowrap content-row rowid-`;
    let contentColId = `" id="`
    let contentColMid = `"><div class="col content-col">`;
    let contentColEnd = `</div></div>`;
    let contentRowOverlayStart = `<div class="click-overlay" onclick="dataGridClicked(this)" id="`;
    let contentRowOverlayEnd = `"></div>`;
    
    let hColId;
    let cColId;
    let cRowId;
    let cOverlayId;

    let style = `
        .content-col {
            padding: 0;
            margin: 0;
        }`

    for (i = 0; i < colCount; i++) {

        document.getElementById(headerTarget).insertAdjacentHTML('beforeend', colStart + hColTag + i + headerColMid + array[i][0] + headerColEnd);
        document.getElementById(contentTarget).insertAdjacentHTML('beforeend', colStart + cColTag + i + contentRowEnd);
        
        hColId = `${target}${hColTag}${i}`;
        cColId = `${target}${cColTag}${i}`;        
        
        document.getElementById(hColId).classList.add("header-col");
        document.getElementById(cColId).classList.add("content-col");

        if (i == 0) {
            document.getElementById(hColId).classList.add("header-col-first");
            document.getElementById(cColId).classList.add("content-col-first");
        } else if (i == colCount-1) {
            document.getElementById(hColId).classList.add("header-col-last");
            document.getElementById(cColId).classList.add("content-col-last");
        }

        for (ii = 0; ii < rowCount; ii++) {
            cRowId = `${target}Col${i}RowId${ii}`;
            cOverlayId = `${target}OverlayCol${i}Row${ii}`
            
            document.getElementById(cColId).insertAdjacentHTML('beforeend', contentColStart + ii + contentColId + cRowId + contentColMid + contentRowOverlayStart + cOverlayId + contentRowOverlayEnd + array[i][ii+1] + contentColEnd);

            if (ii == 0) {
                document.getElementById(cRowId).classList.add("content-row-first");            
            } else if (ii == rowCount-1) {
                document.getElementById(cRowId).classList.add("content-row-last");
            }            
        }
    }

    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css"
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
}

function dataGridClicked(object) {
    let rowId = object.id.slice(object.id.lastIndexOf("w")+1, object.id.length);    
    let datagrid = object.closest(".datagrid-container");
    let gridId = datagrid.id;
    
    let gridCounts = dataGridGetCounts(datagrid);

    dataGridClearSelected(gridId, gridCounts[0], gridCounts[1]);    

    dataGridSetSelected(gridId, gridCounts[0], rowId);
}

function dataGridGetCounts(datagrid) {
    let colCount;
    let rowCount;

    for (i = 0; i < datagrid.classList.length; i++) {
        if (datagrid.classList.item(i).slice(0, 9) == "colCount-") {
            colCount = datagrid.classList.item(i).slice(9, datagrid.classList.item(i).length);
        } else if (datagrid.classList.item(i).slice(0, 9) == "rowCount-") {
            rowCount = datagrid.classList.item(i).slice(9, datagrid.classList.item(i).length);
        }
    }

    return [colCount, rowCount];
}

function dataGridClearSelected(gridId, colCount, rowCount) {
    let selectedId;

    for (i = 0; i < colCount; i++) {
        for (ii = 0; ii < rowCount; ii++) {
            selectedId = `${gridId}Col${i}RowId${ii}`;
            document.getElementById(selectedId).classList.remove("row-selected");
        }
    }
}

function dataGridSetSelected(gridId, colCount, rowId) {
    let selectedId;

    for (i = 0; i < colCount; i++) {
        selectedId = `${gridId}Col${i}RowId${rowId}`;
        document.getElementById(selectedId).classList.add("row-selected");
    }
}