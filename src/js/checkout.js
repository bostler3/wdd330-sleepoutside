import { loadHeaderFooter } from "./utils.mjs";
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
  order.checkout();
});
