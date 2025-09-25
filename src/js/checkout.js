import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const element = document.querySelector(".order-sum");
const checkoutProcess = new CheckoutProcess("so-cart", element);
checkoutProcess.init();

const zipCodeElement = document.querySelector("#zip");
zipCodeElement.addEventListener("input", () => {
  checkoutProcess.calculateOrderTotal();
});
