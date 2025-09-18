import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    let discount = 0;
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        discount = Math.round((product.FinalPrice / product.SuggestedRetailPrice - 1) * -100);
    }
    // Got some help from a Bing search for how to do an if statement in a string literal; a ternary operator came up as an option
    return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h2 class="card_brand">${product.Brand.Name}</h2>
            <h3 class="card_name">${product.Name}</h3>
            <p class="product-card_price">$${product.FinalPrice}<br>
            ${discount != 0 ? `Discounted ${discount}%!` : ""}</p>
        </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    renderList(list) {
        // Old code
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}