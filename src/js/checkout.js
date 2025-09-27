import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const element = document.querySelector(".order-sum");
const order = new CheckoutProcess("so-cart", element);
order.init();

const zipCodeElement = document.querySelector("#zip");
zipCodeElement.addEventListener("input", () => {
  order.calculateOrderTotal();
});

const submitButtonElement = document.querySelector("#checkout-submit");
submitButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.forms["checkout-form"];
  const formCheck = form.checkValidity();
  form.reportValidity();
  const itemToRemove = document.querySelectorAll(".error-alert"); // Got help from the Internet for how to remove a class
  if (itemToRemove) {
    itemToRemove.forEach((item) => {
      item.remove();
    });
  }
  checkCardSecCode();
  checkCardExp();
  checkCC();
  checkZip();
  checkState();
  checkCity();
  checkStreetAddress();
  checkLastName();
  checkFirstName();
  if (formCheck) {
    order.checkout();
    window.location.href = "../checkout/success.html";
    localStorage.removeItem("so-cart");
  }
});

function checkFirstName() {
  const firstName = document.querySelector("#fname").value.trim();
  if (firstName === "") {
    alertMessage("First name field cannot be blank");
  }
}

function checkLastName() {
  const lastName = document.querySelector("#lname").value.trim();
  if (lastName === "") {
    alertMessage("Last name field cannot be blank");
  }
}

function checkStreetAddress() {
  const streetAddress = document.querySelector("#street").value.trim();
  if (streetAddress === "") {
    alertMessage("Street address field cannot be blank");
  }
}

function checkCity() {
  const city = document.querySelector("#city").value.trim();
  if (city === "") {
    alertMessage("City field cannot be blank");
  }
}

function checkState() {
  const state = document.querySelector("#state").value.trim();
  if (state === "") {
    alertMessage("State field cannot be blank");
  }
}

function checkZip() {
  const zip = document.querySelector("#zip").value.trim();
  const zipRegex = new RegExp(/^\d{5}/);
  if (zip === "") {
    alertMessage("Zip field cannot be blank");
  } else if (!zipRegex.test(zip)) {
    alertMessage("Zip field must be five numbers");
  }
}

function checkCC() {
  const creditCard = document.querySelector("#cardNumber").value.trim();
  const ccRegex = new RegExp(/^\d{16}/);
  if (creditCard === "") {
    alertMessage("Credit card field cannot be blank");
  } else if (!ccRegex.test(creditCard)) {
    alertMessage("Credit card field must be 16 numbers");
  }
}

function checkCardExp() {
  const cardExp = document.querySelector("#expiration").value.trim();
  const expRegex = new RegExp(/^(0[1-9]|1[0-2])\/\d{2}$/);
  if (cardExp === "") {
    alertMessage("Credit card expiration field cannot be blank");
  } else if (!expRegex.test(cardExp)) {
    alertMessage("Credit card expiration must be MM/YY format");
  }
}

function checkCardSecCode() {
  const cardSecCode = document.querySelector("#code").value.trim();
  if (cardSecCode === "") {
    alertMessage("Credit card security code field cannot be blank");
  }
}
