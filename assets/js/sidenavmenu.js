function showDefault() {
    elementDisplayHide("rulesContainer");
    elementDisplayShow("imgContainer");
    elementDisplayShow("menuBlockContainer");
    closeNav();
    setTimeout(function() {
        sideNavHideAll();
        sideNavShowDefault();
    }, 600);    
}

function showRules() {
    elementDisplayHide("imgContainer");
    elementDisplayHide("menuBlockContainer");
    elementDisplayShow("rulesContainer");
    closeNav();
    setTimeout(function() {
        sideNavHideAll();
        sideNavLinkShow("sn-options");
        sideNavLinkShow("sn-leaderboard");
    }, 600);    
}

function sideNavLinkToggle(className) {
    let elementCollection = document.getElementsByClassName(className)
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplayToggle(elementCollection[i].id);
    }
}

function sideNavLinkShow(className) {
    let elementCollection = document.getElementsByClassName(className)
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplayShow(elementCollection[i].id);
    }
}

function sideNavLinkHide(className) {
    let elementCollection = document.getElementsByClassName(className)
    let i;
    for (i = 0; i < elementCollection.length; i++) {
        elementDisplayHide(elementCollection[i].id);
    }
}

function sideNavHideAll() {
    let elementCollection = document.getElementById("sideNav").children;
    let i;
    console.log(elementCollection);
    for (i = 1; i < elementCollection.length; i++) {
        console.log(elementCollection[i].id);
        elementDisplayHide(elementCollection[i].id);        
    }
}

function mainHideAll() {
    let elementCollection = document.getElementById("main").children;
    let i;
    for (i = 1; i < elementCollection.length; i++) {
        elementDisplayHide(elementCollection[i].id);        
    }
}

function sideNavShowDefault() {
    sideNavHideAll();
    let elementCollection = document.getElementsByClassName("default");
    let i;    
    for (i = 0; i < elementCollection.length; i++) {        
        elementDisplayShow(elementCollection[i].id);
    }
}