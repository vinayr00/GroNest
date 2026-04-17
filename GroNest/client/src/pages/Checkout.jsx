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
    <div className="checkout-container">

      <div className="checkout-box">

        <h2>Checkout</h2>

        <form onSubmit={handleSubmit}>

          <input placeholder="Full Name" required />

          <input placeholder="Delivery Address" required />

          <input placeholder="Phone Number" required />

          <select required>
            <option value="">Select Payment Method</option>
            <option>Cash on Delivery</option>
            <option>UPI</option>
          </select>

          <button className="place-order-btn">
            Place Order
          </button>

        </form>

      </div>

    </div>
  );
}

export default Checkout;