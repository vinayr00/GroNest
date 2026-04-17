import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.email ? user.email.split("@")[0] : "there";

  const featuredGroups = [
    { title: "Daily Essentials", image: "/assets/categories/daily_essentials.jpg", key: "daily-essentials", emoji: "🥛", desc: "Milk, bread, rice & more" },
    { title: "Cooking Essentials", image: "/assets/categories/cooking_essentials.jpg", key: "cooking-essentials", emoji: "🍳", desc: "Oils, spices & staples" },
    { title: "Fresh Produce", image: "/assets/categories/fresh_produce.jpg", key: "fresh-produce", emoji: "🥦", desc: "Fruits & vegetables" },
    { title: "Snacks & Munchies", image: "/assets/categories/snacks_custom.jpg", key: "snacks-munchies", emoji: "🍿", desc: "Chips, biscuits & more" },
  ];

  const stats = [
    { icon: "🚚", value: "30 min", label: "Delivery" },
    { icon: "🌿", value: "100%", label: "Fresh" },
    { icon: "🏷️", value: "Best", label: "Prices" },
    { icon: "🔒", value: "Safe", label: "Payments" },
  ];

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-blob hb1" />
          <div className="hero-blob hb2" />
        </div>
        <div className="hero-content">
          <p className="hero-greeting">👋 Hello, {username}!</p>
          <h1 className="hero-title">
            Fresh Groceries,<br />
            <span className="hero-accent">Delivered Fast</span>
          </h1>
          <p className="hero-sub">Shop from hundreds of fresh items. Quick delivery right to your door.</p>
          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => navigate("/products")}>
              🛍️ Shop Now
            </button>
            {cartCount > 0 && (
              <button className="hero-btn-secondary" onClick={() => navigate("/cart")}>
                🛒 View Cart ({cartCount})
              </button>
            )}
          </div>
        </div>
        <div className="hero-visual">🛒</div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-icon">{s.icon}</span>
            <div>
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── CATEGORIES ── */}
      <section className="shop-need-section">
        <div className="section-header">
          <h2 className="section-title">Shop by Need</h2>
          <button className="section-link" onClick={() => navigate("/products")}>
            View All →
          </button>
        </div>

        <div className="categories">
          {featuredGroups.map((group, i) => (
            <button
              key={group.key}
              className="category-card"
              onClick={() => navigate(`/products?category=${group.key}`)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="cat-img-wrap">
                <img src={group.image} alt={group.title} onError={(e) => { e.target.style.display = "none"; }} />
                <span className="cat-emoji">{group.emoji}</span>
              </div>
              <div className="cat-info">
                <h3>{group.title}</h3>
                <p>{group.desc}</p>
              </div>
              <span className="cat-arrow">›</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── BANNER ── */}
      <section className="promo-banner" onClick={() => navigate("/products")}>
        <div className="promo-text">
          <h3>🌿 Fresh deals every day</h3>
          <p>Browse all products and save big on your weekly groceries.</p>
        </div>
        <button className="promo-btn">Shop Now →</button>
      </section>

    </div>
  );
}

export default Home;