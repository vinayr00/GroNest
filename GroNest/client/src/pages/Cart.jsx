import "./Cart.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categoryFallbackMap = {
    "daily-essentials":   "/assets/products/milk.jpg",
    "cooking-essentials": "/assets/products/tomatoes.jpg",
    "fresh-produce":      "/assets/products/mangoes.jpg",
    "snacks-munchies":    "/assets/products/pringles.jpg",
  };

  const resolveImage = (item) => {
    const value = (item.image || "").trim();
    const fallback = categoryFallbackMap[item.category] || "/assets/products/fallback.svg";
    if (!value) return fallback;
    if (value.includes("picsum.photos") || value.includes("source.unsplash.com")) return fallback;
    if (value.startsWith("http") || value.startsWith("/")) return value;
    return `/assets/products/${value}`;
  };

  return (
    <div className="cart-page">

      {/* Blobs */}
      <div className="cart-bg">
        <div className="cb cb1" /><div className="cb cb2" />
      </div>

      <div className="cart-wrapper">

        {/* Header */}
        <div className="cart-header">
          <div>
            <h1 className="cart-title">Your Cart</h1>
            <p className="cart-sub">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
          </div>
          {cart.length > 0 && (
            <div className="cart-total-pill">
              🧾 Total: <strong>₹{total}</strong>
            </div>
          )}
        </div>

        {/* Empty state */}
        {cart.length === 0 && (
          <div className="cart-empty">
            <span className="empty-icon">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add some fresh groceries to get started!</p>
            <button className="shop-now-btn" onClick={() => navigate("/products")}>
              🛍️ Go Shopping
            </button>
          </div>
        )}

        {/* Cart items */}
        {cart.length > 0 && (
          <div className="cart-list">
            {cart.map((item, i) => (
              <div
                key={item.name}
                className="cart-item"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Image */}
                <div className="cart-img-wrap">
                  <img
                    src={resolveImage(item)}
                    alt={item.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = "/assets/products/fallback.svg"; }}
                  />
                </div>

                {/* Details */}
                <div className="cart-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">₹{item.price} × {item.quantity}</p>
                  <p className="cart-item-subtotal">Subtotal: <strong>₹{item.price * item.quantity}</strong></p>
                </div>

                {/* Controls */}
                <div className="cart-controls">
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => decreaseQty(item.name)}>−</button>
                    <span className="qty-num">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => increaseQty(item.name)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.name)}>
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer summary + checkout */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Items ({totalItems})</span>
                <span>₹{total}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-tag">FREE</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;