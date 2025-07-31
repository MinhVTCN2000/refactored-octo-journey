"use strict";
// --- EMAIL ---
const emailError = document.querySelector("#email-error");
const hideErrorEmail = (isHide) =>
  isHide
    ? emailError.classList.add("d-none")
    : emailError.classList.remove("d-none");
const emailInput = document.querySelector("#email-input");

const validateEmail = function () {
  const emailText = emailInput.value;
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailText.match(regex)) {
    document.querySelector("#email-validation").classList.add("d-none");
    document
      .querySelector("#personal-info .section-content")
      .classList.remove("d-none");

  } else {
    hideErrorEmail(0);
  }
};
document
  .querySelector("#email-validation .btn-submit")
  .addEventListener("click", validateEmail);

emailInput.addEventListener("change", function () {
  hideErrorEmail(1);
});
emailInput.addEventListener("keyup", function (e) {
  if (e.key !== "Enter") {
    hideErrorEmail(1);

  } else {
    validateEmail();
  }
});

let msnryEl = document.querySelector("#job-info .row");
let msnry;
let isActiveMsnry = false;
window.addEventListener("load", function () {
  msnry = new Masonry(msnryEl, { percentPosition: true });
  isActiveMsnry = true;
  if (window.innerWidth >= 992) {
    msnry.destroy();
    isActiveMsnry = false;
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth < 992) {
      if (!isActiveMsnry) {
        msnry = new Masonry(msnryEl, { percentPosition: true });
        isActiveMsnry = true;
      }
    } else if (isActiveMsnry) {
      msnry.destroy();
      isActiveMsnry = false;
    }
  });
});

// --- VIEW MORE / VIEW LESS BUTTON ---
const btnJobView = document.querySelectorAll("#job-info .section-button");
for (let i = 0; i < btnJobView.length; i++) {
  btnJobView[i].addEventListener("click", function () {
    const sectionDesEl = this.parentNode.querySelector(".section-content");
    sectionDesEl.classList.toggle("d-none");

    if (sectionDesEl.classList.contains("d-none")) {
      this.innerHTML = '<i class="fa-angle-down"></i> VIEW MORE';
      this.parentNode.parentNode.classList.remove("d-flex");

    } else {
      this.innerHTML = '<i class="fa-angle-down"></i> VIEW LESS';
      this.parentNode.parentNode.classList.add("d-flex");
    }
    if (window.innerWidth < 992) {
      try {
        msnry.layout();
      } catch { }
    }
  });
}







