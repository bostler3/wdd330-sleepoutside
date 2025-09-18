import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import CartList from "./ShoppingCart.mjs";

loadHeaderFooter();

const dataSource = getLocalStorage("so-cart");
const element = document.querySelector(".product-list");
const cartList = new CartList(dataSource, element);
cartList.init();
