import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import CartList from "./ShoppingCart.mjs";

loadHeaderFooter();

const dataSource = getLocalStorage("so-cart");
const element = document.querySelector(".product-list");
const cartList = new CartList(dataSource, element);
cartList.init();

const totalElement = document.querySelector(".cart-total");
const hideElement = document.querySelector(".hide");

if (dataSource.length != 0) {
  hideElement.style.display = "block";
  totalElement.textContent = `Total: $${getTotal()}`;
}

function getTotal() {
  let total = 0;
  dataSource.forEach((item) => {
    total += item.FinalPrice;
  });
  return total.toFixed(2);
}
