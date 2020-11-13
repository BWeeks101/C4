/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("mySidenavol").style.zIndex = "999";
  document.getElementById("mySidenavol").style.backgroundColor = "rgba(0,0,0,0.5)";

}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenavol").style.zIndex = "-1000";
  document.getElementById("mySidenavol").style.backgroundColor = "rgba(0,0,0,0.0)";
}