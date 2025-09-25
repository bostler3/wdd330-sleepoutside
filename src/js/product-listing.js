import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);
const headingElement = document.querySelector("#heading");
headingElement.textContent = `Top Products: ${getCategoryLabel()}`;

productList.init();

function getCategoryLabel() {
  if (category === "tents") {
    return "Tents";
  } else if (category === "backpacks") {
    return "Backpacks";
  } else if (category === "sleeping-bags") {
    return "Sleeping Bags";
  } else if (category === "hammocks") {
    return "Hammocks";
  } else {
    return "";
  }
}
