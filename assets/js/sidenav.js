/*
* SideNav taken from W3 Schools Example and modified
* https://www.w3schools.com/howto/howto_js_sidenav.asp
*/

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("sideNav").style.width = "250px";
  document.getElementById("sideNavDocOverlay").style.zIndex = "999";
  document.getElementById("sideNavDocOverlay").style.backgroundColor = "rgba(0,0,0,0.7)";
  document.getElementById("sideNavDocOverlay").style.left = "250px"

}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("sideNav").style.width = "0";
  document.getElementById("sideNavDocOverlay").style.zIndex = "-1000";
  document.getElementById("sideNavDocOverlay").style.backgroundColor = "rgba(0,0,0,0.0)";
  document.getElementById("sideNavDocOverlay").style.left = "0px"
}