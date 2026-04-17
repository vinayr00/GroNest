import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useContext(CartContext);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowProfile(false);
    window.dispatchEvent(
      new CustomEvent("gronest:intro", { detail: { navigateTo: "/login" } })
    );
  };

  // Avatar initials
  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : (user?.email ? user.email.slice(0, 2).toUpperCase() : "GN");

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

      {/* Logo */}
      <div className="nav-logo" onClick={() => navigate("/home")}>
        <span className="nav-logo-icon">🛒</span>
        <span className="nav-logo-text">Gro<span className="nav-logo-accent">Nest</span></span>
      </div>

      {/* Center links */}
      <div className="nav-center">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/orders" className="nav-link">Orders</Link>
      </div>

      {/* Right actions */}
      <div className="nav-right">

        {/* Cart */}
        <Link to="/cart" className="nav-cart">
          <span className="nav-cart-icon">🛒</span>
          <span className="nav-cart-label">Cart</span>
          {totalItems > 0 && (
            <span key={totalItems} className="nav-cart-badge animate-cart">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Profile */}
        {user ? (
          <div className="nav-profile-wrap" ref={dropdownRef}>
            <button
              className="nav-avatar"
              onClick={() => setShowProfile(!showProfile)}
              title={user.email}
            >
              {initials}
            </button>

            {showProfile && (
              <div className="nav-dropdown">
                <div className="dropdown-header">
                  <span className="dropdown-avatar">{initials}</span>
                  <div>
                    <p className="dropdown-name">{user.name || user.email.split("@")[0]}</p>
                    <p className="dropdown-email">{user.email}</p>
                  </div>
                </div>

                <div className="dropdown-divider" />

                <Link to="/profile" className="dropdown-item" onClick={() => setShowProfile(false)}>
                  👤 Profile
                </Link>
                <Link to="/orders" className="dropdown-item" onClick={() => setShowProfile(false)}>
                  📦 My Orders
                </Link>
                <Link to="/cart" className="dropdown-item" onClick={() => setShowProfile(false)}>
                  🛒 Cart {totalItems > 0 && <span className="dropdown-badge">{totalItems}</span>}
                </Link>

                <div className="dropdown-divider" />

                <button className="dropdown-logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;