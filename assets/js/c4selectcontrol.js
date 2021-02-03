/*
* Custom Select Control taken from W3 Schools Example
* Minor modifications.
* Main code block wrapped in initC4Select() function.
* Class names prefixed with c4-
* Variable and function declarations moved out of loops
* Single letter variables altered to be more descriptive
* var replaced with let
* https://www.w3schools.com/howto/howto_custom_select.asp
*/

/* Processed with JSLint */
/* Assume: in development, a browser */
/* Tolerate: for statement, long lines, this */

/* Processed with JSHint */
/* Default Settings */
/* Max Line Length: 250 characters */

/*jshint maxlen: 250 */

/* JSHint warns that initC4Select is unused.  This is called externally from this file. */

function closeAllSelect(element) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    let selectSelectedCollection = document.getElementsByClassName("c4-select-selected");
    let selectSelectedCollectionLength = selectSelectedCollection.length;
    let elementIndexArray = [];
    let selectItemsCollection = document.getElementsByClassName("c4-select-items");
    let selectItemsCollectionLength = selectItemsCollection.length;

    let i;
    for (i = 0; i < selectSelectedCollectionLength; i += 1) {
        if (element === selectSelectedCollection[i]) {
            elementIndexArray.push(i);
        } else {
            selectSelectedCollection[i].classList.remove("c4-select-arrow-active");
        }
    }
    for (i = 0; i < selectItemsCollectionLength; i += 1) {
        if (elementIndexArray.indexOf(i)) {
            selectItemsCollection[i].classList.add("c4-select-hide");
        }
    }
}

function updateSelectBox() {
    /*when an item is clicked, update the original select box,
    and the selected item:*/
    let selectTagCollection = this.parentNode.parentNode.getElementsByTagName("select")[0];
    let selectTagCollectionLength = selectTagCollection.length;
    let selectSelectedElement = this.parentNode.previousSibling;
    let sameAsSelectedCollection;
    let sameAsSelectedCollectionLength;

    let i;
    let ii;
    for (i = 0; i < selectTagCollectionLength; i += 1) {
        if (selectTagCollection.options[i].innerHTML === this.innerHTML) {
            selectTagCollection.selectedIndex = i;
            selectSelectedElement.innerHTML = this.innerHTML;
            sameAsSelectedCollection = this.parentNode.getElementsByClassName("c4-same-as-selected");
            sameAsSelectedCollectionLength = sameAsSelectedCollection.length;
            for (ii = 0; ii < sameAsSelectedCollectionLength; ii += 1) {
                sameAsSelectedCollection[ii].removeAttribute("class");
            }
            this.setAttribute("class", "c4-same-as-selected");
            break;
        }
    }
    selectSelectedElement.click();
}

function toggleSelectBox() {
    /*when the select box is clicked, close any other select boxes,
    and open/close the current select box:*/
    event.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("c4-select-hide");
    this.classList.toggle("c4-select-arrow-active");
}

/* Initialise Custom Select Control */
function initC4Select() {
    /*look for any elements with the class "c4-select":*/
    let selectCollection = document.getElementsByClassName("c4-select");
    let selectCollectionLength = selectCollection.length;
    let selectedElement;
    let selectedElementLength;
    let selectedItem;
    let optionListContainer;
    let optionListItem;

    let i;
    let ii;
    for (i = 0; i < selectCollectionLength; i += 1) {
        selectedElement = selectCollection[i].getElementsByTagName("select")[0];
        selectedElementLength = selectedElement.length;
        /*for each element, create a new DIV that will act as the selected item:*/
        selectedItem = document.createElement("DIV");
        selectedItem.setAttribute("class", "c4-select-selected");
        selectedItem.innerHTML = selectedElement.options[selectedElement.selectedIndex].innerHTML;
        selectCollection[i].appendChild(selectedItem);
        /*for each element, create a new DIV that will contain the option list:*/
        optionListContainer = document.createElement("DIV");
        optionListContainer.setAttribute("class", "c4-select-items c4-select-hide");
        for (ii = 0; ii < selectedElementLength; ii += 1) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            optionListItem = document.createElement("DIV");
            optionListItem.innerHTML = selectedElement.options[ii].innerHTML;
            optionListItem.addEventListener("click", updateSelectBox);
            optionListContainer.appendChild(optionListItem);
        }
        selectCollection[i].appendChild(optionListContainer);
        selectedItem.addEventListener("click", toggleSelectBox);
    }

    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
}