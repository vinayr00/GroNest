import "./Orders.css";
import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState(
    () => JSON.parse(localStorage.getItem("orders")) || []
  );
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const updated = orders.map((order) =>
        order.status === "Preparing"
          ? { ...order, status: "Out for Delivery" }
          : order
      );
      localStorage.setItem("orders", JSON.stringify(updated));
      setOrders(updated);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const totalSpent = orders.reduce((s, o) => s + (o.total || 0), 0);

  const statusConfig = {
    "Preparing":        { icon: "🍳", color: "#e67e22", bg: "#fff3e0", label: "Preparing" },
    "Out for Delivery": { icon: "🚚", color: "#27ae60", bg: "#e8f5e9", label: "Out for Delivery" },
    "Delivered":        { icon: "✅", color: "#2980b9", bg: "#e3f2fd", label: "Delivered" },
  };

  return (
    <div className="orders-page">

      {/* Blobs */}
      <div className="orders-bg">
        <div className="ob ob1" /><div className="ob ob2" />
      </div>

      <div className="orders-wrapper">

        {/* Header */}
        <div className="orders-header">
          <div>
            <h1 className="orders-title">Your Orders</h1>
            <p className="orders-sub">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
          </div>
          <div className="orders-summary-pill">
            💰 Total spent: <strong>₹{totalSpent}</strong>
          </div>
        </div>

        {/* Empty state */}
        {orders.length === 0 && (
          <div className="orders-empty">
            <span className="empty-icon">📭</span>
            <h3>No orders yet</h3>
            <p>Start shopping and your orders will appear here.</p>
          </div>
        )}

        {/* Order cards */}
        <div className="orders-list">
          {orders.map((order, i) => {
            const cfg = statusConfig[order.status] || statusConfig["Preparing"];
            const isOpen = expandedId === order.id;
            const orderTotal = order.total || order.items?.reduce((s, it) => s + it.price * it.quantity, 0) || 0;

            return (
              <div
                key={order.id}
                className={`order-card ${isOpen ? "order-card--open" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Card top bar */}
                <div
                  className="order-card-header"
                  onClick={() => setExpandedId(isOpen ? null : order.id)}
                >
                  <div className="order-meta">
                    <span className="order-id">#{String(order.id).slice(-8)}</span>
                    <span className="order-date">📅 {order.date}</span>
                  </div>

                  <div className="order-right">
                    <span
                      className="order-status-badge"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {cfg.icon} {cfg.label}
                    </span>
                    {orderTotal > 0 && (
                      <span className="order-total">₹{orderTotal}</span>
                    )}
                    <span className={`order-chevron ${isOpen ? "open" : ""}`}>›</span>
                  </div>
                </div>

                {/* Expandable items */}
                {isOpen && (
                  <div className="order-items-wrap">
                    <div className="order-items-header">
                      <span>Item</span><span>Qty</span><span>Price</span>
                    </div>
                    {order.items.map((item, j) => (
                      <div key={j} className="order-item-row">
                        <span className="item-name">🛒 {item.name}</span>
                        <span className="item-qty">× {item.quantity}</span>
                        <span className="item-price">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="order-items-total">
                      <span>Total</span>
                      <span>₹{orderTotal}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Orders;