/* This function will accept a multidimensional (ish - arrays within an array in JS) array when the backend functionality is implemented. */
/* For now, just put the functionality in place to build a datagrid and provide a dummy array */
/* HTML should consist of a datagrid-container with an appropriate id value for the target */

function createDataGrid(array, target) {
    let colCount = array.length;
    let rowCount = array[0].length-1;

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
    let contentColMid = `"><div class="col">`;
    let contentColEnd = `</div></div>`;
    let hColId;
    let cColId;
    let cRowId;

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
            document.getElementById(cColId).insertAdjacentHTML('beforeend', contentColStart + ii + contentColId + cRowId + contentColMid + array[i][ii+1] + contentColEnd);

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