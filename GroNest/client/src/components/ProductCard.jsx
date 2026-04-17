import "./ProductCard.css";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart, cart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const categoryFallbackMap = {
    "daily-essentials":  "/assets/products/milk.jpg",
    "cooking-essentials":"/assets/products/tomatoes.jpg",
    "fresh-produce":     "/assets/products/mangoes.jpg",
    "snacks-munchies":   "/assets/products/pringles.jpg",
  };

  const resolveImage = () => {
    const value = (product.image || "").trim();
    const categoryFallback =
      categoryFallbackMap[product.category] || "/assets/products/fallback.svg";

    if (!value) return categoryFallback;
    if (value.includes("picsum.photos")) return categoryFallback;
    if (value.includes("source.unsplash.com")) return categoryFallback;
    if (value.startsWith("http") || value.startsWith("/")) return value;
    return `/assets/products/${value}`;
  };

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "/assets/products/fallback.svg";
  };

  // Match by name only — products from JSON don't have _id so undefined===undefined
  // would match every card to the first cart item (the bug causing all badges to show same number)
  const cartItem = cart.find((i) => i.name === product.name);
  const cartQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);

    // Remove any existing toast first
    document.querySelectorAll(".pc-toast").forEach(t => t.remove());

    // Toast with checkout button
    const toast = document.createElement("div");
    toast.className = "pc-toast";
    toast.innerHTML = `
      <div class="pc-toast-msg"><span>✓</span> ${product.name} added!</div>
      <button class="pc-toast-checkout" onclick="window.location.href='/cart'">
        Checkout →
      </button>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("pc-toast--show"));
    setTimeout(() => {
      toast.classList.remove("pc-toast--show");
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  };

  // Star rating (fixed 4 stars for demo)
  const rating = product.rating || 4;
  const stars = Array.from({ length: 5 }, (_, i) => i < rating ? "★" : "☆");

  return (
    <div className={`product-card ${added ? "product-card--added" : ""}`}>

      {/* Cart qty badge */}
      {cartQty > 0 && (
        <div className="product-cart-badge">{cartQty}</div>
      )}

      {/* Image area */}
      <div className="product-img-wrap">
        <img
          src={resolveImage()}
          alt={product.name}
          onError={handleImgError}
          loading="lazy"
        />
        <div className="product-img-overlay" />
      </div>

      {/* Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          {stars.map((s, i) => (
            <span key={i} className={s === "★" ? "star filled" : "star"}>{s}</span>
          ))}
        </div>

        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          <button
            className={`add-btn ${added ? "add-btn--done" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;
