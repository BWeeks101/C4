function gameClicked(object) {
    //Only Fire on Single Click!
    if (event.detail == 1) {
        done = selectCol(object);
    }
}

function selectCol(object) {
    let result = dataGridDisplayClicked(object, "col");

    for (i = result[1]; i > 0; i--) {        
        if (document.getElementById(`gBoardCol${result[2]}RowId${i-1}`).firstChild.lastChild.classList.contains("gbP1") == false) {
            document.getElementById(`gBoardCol${result[2]}RowId${i-1}`).firstChild.lastChild.classList.add("gbP1");
            break;
        }
    }
    
    return true;
}