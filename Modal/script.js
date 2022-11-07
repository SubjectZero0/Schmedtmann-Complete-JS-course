"use strict";

const modal = document.querySelector(".modal");
const showModal = document.querySelectorAll(".show-modal");
const closeModal = document.querySelector(".close-modal");
const hiddenClass = document.querySelector(".hidden");
const overlay = document.querySelector(".overlay");
const showModalFun = function () {
  //helper function to remove hidden class from modal and overlay
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModalFun = function () {
  // helper function to add hidden class to modal and overlay
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
/*
create on click event for the three "show modal" buttons.
*/
showModal.forEach((element) => {
  element.addEventListener("click", showModalFun);
});
/*
create events on click outside modal, on esc, and on
click of X, to close modal
*/
closeModal.addEventListener("click", closeModalFun);
overlay.addEventListener("click", closeModalFun);

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModalFun();
  }
});
