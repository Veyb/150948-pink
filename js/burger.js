var burgerLink = document.querySelector(".main-header__toggle");

var burgerBtn = burgerLink.querySelector(".main-header__toggle-burger");
var mainNav = document.querySelector(".main-nav");
var mainHeader = document.querySelector(".main-header");

burgerLink.addEventListener("click", function(event) {
  burgerBtn.classList.toggle("main-header__toggle-burger--active");
  mainNav.classList.toggle("main-nav--active");
  mainHeader.classList.toggle("main-header--active");
});
