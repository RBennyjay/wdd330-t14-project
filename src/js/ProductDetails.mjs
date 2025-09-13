// ProductDetails.mjs
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null; // store fetched product
  }

  async init() {
    try {
      // 1. Fetch product by Id
      this.product = await this.dataSource.findProductById(this.productId);

      if (!this.product) {
        document.querySelector("#product-detail").innerHTML =
          "<p>Product not found.</p>";
        return;
      }

      // 2. Render product details
      this.renderProductDetails();

      // 3. Wire up Add to Cart button
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));

    } catch (err) {
      console.error("Error loading product:", err);
      document.querySelector("#product-detail").innerHTML =
        "<p>Sorry, we couldn’t load this product.</p>";
    }
  }

  renderProductDetails() {
    const product = this.product;
    const container = document.querySelector("#product-detail");

    container.innerHTML = `
      <div class="product-card-detail">
        <img src="${product.Image}" alt="${product.Name}" />
        <h2 class="brand">${product.Brand?.Name || ""}</h2>
        <h1 class="name">${product.Name}</h1>
        <p class="price">$${product.FinalPrice?.toFixed(2) || "0.00"}</p>
        <p class="description">${product.DescriptionHtmlSimple}</p>
        <button id="addToCart">Add to Cart</button>
      </div>
    `;
  }

  addToCart() {
    let cart = getLocalStorage("so-cart") || [];

    // check if already in cart
    const existing = cart.find((item) => item.Id === this.product.Id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.product.quantity = 1;
      cart.push(this.product);
    }

    setLocalStorage("so-cart", cart);
    alert(`${this.product.Name} added to cart!`);
  }
}
