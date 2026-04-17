import "./OrderSuccess.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  { icon: "✅", label: "Order Confirmed", desc: "We've received your order" },
  { icon: "📦", label: "Packed",          desc: "Your items are being packed" },
  { icon: "🚚", label: "Out for Delivery", desc: "On the way to your door" },
  { icon: "🏠", label: "Delivered",        desc: "Enjoy your groceries!" },
];

function OrderSuccess() {
  const navigate = useNavigate();

  // Stable values — use ref so they don't regenerate on re-render
  const orderIdRef   = useRef("GRN" + Math.floor(10000 + Math.random() * 90000));
  const deliveryDate = useRef(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toDateString();
  }).current;

  // Animate current step to 0 (Order Confirmed) with a small delay
  const [currentStep, setCurrentStep] = useState(-1);
  useEffect(() => {
    const t = setTimeout(() => setCurrentStep(0), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="os-page">
      {/* Blobs */}
      <div className="os-blob ob1" />
      <div className="os-blob ob2" />

      <div className="os-card">

        {/* Success icon */}
        <div className="os-icon-wrap">
          <span className="os-icon">🎉</span>
          <div className="os-icon-ring" />
        </div>

        <h1 className="os-title">Order Placed!</h1>
        <p className="os-sub">Your groceries will arrive soon.</p>

        {/* Info pills */}
        <div className="os-info-row">
          <div className="os-info-pill">
            <span>🆔</span>
            <div>
              <p className="pill-label">Order ID</p>
              <p className="pill-value">{orderIdRef.current}</p>
            </div>
          </div>
          <div className="os-info-pill">
            <span>🚚</span>
            <div>
              <p className="pill-label">Expected By</p>
              <p className="pill-value">{deliveryDate()}</p>
            </div>
          </div>
          <div className="os-info-pill">
            <span>📦</span>
            <div>
              <p className="pill-label">Status</p>
              <p className="pill-value os-green">Confirmed</p>
            </div>
          </div>
        </div>

        {/* Delivery tracker */}
        <div className="os-tracker">
          {STEPS.map((step, i) => (
            <div key={i} className={`os-step ${i <= currentStep ? "os-step--active" : ""} ${i === currentStep ? "os-step--current" : ""}`}>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className={`os-connector ${i < currentStep ? "os-connector--done" : ""}`} />
              )}
              <div className="os-step-dot">
                <span>{step.icon}</span>
              </div>
              <div className="os-step-text">
                <p className="step-label">{step.label}</p>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="os-actions">
          <button className="os-btn-primary" onClick={() => navigate("/home")}>
            🏠 Back to Home
          </button>
          <button className="os-btn-secondary" onClick={() => navigate("/orders")}>
            📋 View Orders
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;