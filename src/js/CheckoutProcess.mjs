import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSubtotal();
    }

    calculateItemSubtotal() {
        const subTotalElement = document.querySelector("#order-sum");
        this.list.forEach((item) => {
            this.itemTotal += item.FinalPrice;
        });
        subTotalElement.textContent = `Subtotal (${this.list.length} items): $${this.itemTotal}`;
    }
    
    calculateOrderTotal() {
        const taxRate = 0.06;
        const shippingCostFirstItem = 10;
        const shippingCostAdditionalItem = 2;
        this.tax = this.itemTotal * taxRate;
        if (this.list.length != 0) {
            this.shipping = shippingCostFirstItem + ((this.list.length - 1) * shippingCostAdditionalItem);
        }
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const orderDetailsElement = document.querySelector("#order-details");
        orderDetailsElement.innerHTML = `Sales tax: $${this.tax.toFixed(2)}<br>
        Shipping: $${this.shipping.toFixed(2)}<br>
        Total: $${this.orderTotal.toFixed(2) }</p>`
    }
}