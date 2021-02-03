/*
* Custom Select Control taken from W3 Schools Example
* Minor modifications.
* Main code block and document click event listener wrapped in initC4Select() function.
* Class names prefixed with c4-
* Variable and function declarations moved out of loops
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
    let selectItemsCollection = document.getElementsByClassName("c4-select-items");
    let selectItemsCollectionLength = selectItemsCollection.length;    
    let i;
    let elementIndexArray = [];
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

/* Initialise Custom Select Control */
function initC4Select() {
    /*look for any elements with the class "c4-select":*/
    let x = document.getElementsByClassName("c4-select");
    let l = x.length;
    let i;
    let selElmnt;
    let ll;
    let a;
    let b;
    let j;
    let c;
    let s;
    let sl;
    let h;
    let y;
    let yl;
    let k;

    function updateSelectBox() {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i += 1) {
            if (s.options[i].innerHTML === this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("c4-same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k += 1) {
                    y[k].removeAttribute("class");
                }
                this.setAttribute("class", "c4-same-as-selected");
                break;
            }
        }
        h.click();
    }

    function toggleSelectBox() {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        event.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("c4-select-hide");
        this.classList.toggle("c4-select-arrow-active");
    }

    for (i = 0; i < l; i += 1) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "c4-select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "c4-select-items c4-select-hide");
        for (j = 0; j < ll; j += 1) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", updateSelectBox);
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", toggleSelectBox);
    }

    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
}