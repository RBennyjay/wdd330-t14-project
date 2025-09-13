import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const category = getParam("category") || "tents"; // default to tents if no category given

if (!productId) {
  console.error("No product ID found in URL.");
  // Optionally redirect back to index if no product is specified
  window.location.href = "index.html";
} else {
  const dataSource = new ProductData(category);
  const product = new ProductDetails(productId, dataSource);

  // Add error handling around initialization
  try {
    console.log(`Loading product: ${productId} from category: ${category}`);
    product.init();
  } catch (error) {
    console.error("Error initializing product details:", error);
    // Optionally display a user-friendly error
    const container = document.querySelector(".product-details");
    if (container) {
      container.innerHTML =
        "<p>Sorry, we couldn't load the product details. Please try again later.</p>";
    }
  }
}

