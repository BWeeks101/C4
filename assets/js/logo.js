function drawLogoGrid() {
    displayDataGrid(c4.logoGrid, "logoGrid", "off", false);
    dataGridDisplaySetCols("logoGrid", "auto");
    animateLogo();
}

function refreshLogoGrid() {
    dataGridDisplayRemove("logoGrid");
    drawLogoGrid();
}

function animateLogo() {
    setTimeout(function() {
        for (i = 0; i < 8; i++) {
            queue(i);
        }
    }, 1000);
}

function queue(i) {
    let delay = 250 + (125 * i);
    setTimeout(function() {
        dropChar(i);
    }, delay);
}

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