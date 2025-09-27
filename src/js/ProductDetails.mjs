import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productID, dataSource) {
        this.productID = productID;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productID);
        this.renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage; if null, set to empty array
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        alertMessage("Product added to cart!");
    }
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}
    
function productDetailsTemplate(product) {
    let discount = 0;
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        discount = Math.round((product.FinalPrice / product.SuggestedRetailPrice - 1) * -100);
    }
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const img = document.querySelector("#productImage");
    img.src = product.Images.PrimaryLarge;
    img.alt = product.NameWithoutBrand;
    document.querySelector("#productPrice").textContent = `$${product.FinalPrice}${discount != 0 ? ` - Discounted ${discount}%!` : ""}`;
    document.querySelector("#productColor").innerHTML = product.Colors[0].ColorName;
    document.querySelector("#productDesc").innerHTML = product.DescriptionHtmlSimple;
    
    document.querySelector("#addToCart").dataset.id = product.Id;
}
