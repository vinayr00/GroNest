import "./Checkout.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart, setCart } = useContext(CartContext);

  if (!user) {
    navigate("/");
    return null;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      status: "Preparing",
      date: new Date().toLocaleDateString()
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    setCart([]);
    navigate("/order-success");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* LEFT SIDE: FORM */}
        <div className="checkout-form-section">
          <h2>Delivery Details 🚚</h2>
          
          <form id="checkout-form" onSubmit={handleSubmit}>
            
            <div className="checkout-input-group">
              <input type="text" placeholder=" " defaultValue={user.name || ""} required />
              <label>Full Name</label>
            </div>

            <div className="checkout-input-group">
              <input type="text" placeholder=" " required />
              <label>Street Address / Apartment Number</label>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="checkout-input-group" style={{ flex: 1 }}>
                <input type="text" placeholder=" " required />
                <label>City</label>
              </div>
              <div className="checkout-input-group" style={{ flex: 1 }}>
                <input type="text" placeholder=" " required />
                <label>Pincode</label>
              </div>
            </div>

            <div className="checkout-input-group">
              <input type="tel" placeholder=" " required />
              <label>Phone Number</label>
            </div>

            <div className="checkout-input-group">
              <select required>
                <option value="" disabled selected hidden></option>
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI / Credit Card</option>
              </select>
              <label>Payment Method</label>
            </div>

          </form>
        </div>


        {/* RIGHT SIDE: SUMMARY */}
        <div className="checkout-summary-section">
          <h3>Order Summary</h3>
          
          <div className="summary-items">
            {cart.map((item, idx) => (
              <div className="summary-item" key={idx}>
                <div className="summary-item-info">
                  <img src={item.image} alt={item.name} className="summary-item-img" />
                  <div>
                    <div className="summary-item-name">{item.name}</div>
                    <div className="summary-item-qty">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="summary-item-price">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="summary-divider" />
          
          <div className="summary-item" style={{ background: 'transparent', padding: '0', marginBottom: 5 }}>
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="summary-item" style={{ background: 'transparent', padding: '0', margin: 0 }}>
            <span>Delivery Fee</span>
            <span>Free</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="place-order-btn" type="submit" form="checkout-form">
            Confirm & Pay ₹{total}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;