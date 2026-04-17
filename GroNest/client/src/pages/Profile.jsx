import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Profile() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const cartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const [activeUser, setActiveUser] = useState(user);

  // Generate avatar initials from name or email
  const initials = activeUser.name
    ? activeUser.name.slice(0, 2).toUpperCase()
    : activeUser.email
      ? activeUser.email.slice(0, 2).toUpperCase()
      : "GN";

  // Derive username from name or email
  const username = activeUser.name || (activeUser.email ? activeUser.email.split("@")[0] : "Guest");

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit
      setIsEditing(false);
    } else {
      // Start edit
      setEditForm({
        name: activeUser.name || "",
        email: activeUser.email || ""
      });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!editForm.name || !editForm.email) return alert("Fields cannot be empty.");

    const updatedUser = { ...activeUser, name: editForm.name, email: editForm.email };
    
    // Update active session
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setActiveUser(updatedUser);

    // Update main users list so future logins work
    const allUsers = JSON.parse(localStorage.getItem("gronest_users") || "[]");
    const updatedUsers = allUsers.map(u => u._id === activeUser._id ? { ...u, ...updatedUser } : u);
    localStorage.setItem("gronest_users", JSON.stringify(updatedUsers));

    setIsEditing(false);
  };

  const stats = [
    { icon: "📦", label: "Total Orders", value: orders.length },
    { icon: "💰", label: "Total Spent", value: `₹${totalSpent}` },
    { icon: "🛒", label: "Cart Items", value: cartItems },
    { icon: "⭐", label: "Member Since", value: "2026" },
  ];

  const quickActions = [
    { icon: "📋", label: "My Orders", desc: "Track & view your orders", path: "/orders", color: "#27ae60" },
    { icon: "🛒", label: "Go Shopping", desc: "Browse fresh groceries", path: "/products", color: "#3a7bd5" },
    { icon: "🏠", label: "Home", desc: "Back to homepage", path: "/home", color: "#e67e22" },
  ];

  return (
    <div className="profile-page">

      {/* Animated background */}
      <div className="profile-bg">
        <div className="profile-blob pb1" />
        <div className="profile-blob pb2" />
        <div className="profile-blob pb3" />
      </div>

      <div className="profile-wrapper">

        {/* ── Hero Card ── */}
        <div className="profile-hero-card">
          <div className="profile-banner" />

          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{initials}</div>
            <div className="avatar-ring" />
          </div>

          <div className="profile-info">
            <h2 className="profile-name">
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                  autoFocus
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', padding: '4px 8px', borderRadius: '4px', outline: 'none' }}
                />
              ) : (
                `@${username}`
              )}
            </h2>
            <p className="profile-email">
              {isEditing ? (
                <input 
                  type="email" 
                  value={editForm.email} 
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', padding: '4px 8px', borderRadius: '4px', outline: 'none', marginLeft: '5px' }}
                />
              ) : (
                `📧 ${activeUser.email}`
              )}
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <span className="profile-badge">✅ Active Member</span>
              {isEditing ? (
                <>
                  <button onClick={handleSave} style={{ background: '#fff', color: '#27ae60', border: 'none', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
                  <button onClick={handleEditToggle} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer' }}>Cancel</button>
                </>
              ) : (
                <button onClick={handleEditToggle} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer' }}>✏️ Edit</button>
              )}
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="profile-stats">
          {stats.map((s, i) => (
            <div className="stat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Account Details ── */}
        <div className="profile-section">
          <h3 className="section-heading">👤 Account Details</h3>
          <div className="details-grid">
            <div className="detail-row">
              <span className="detail-key">Email</span>
              <span className="detail-val">{activeUser.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Full Name</span>
              <span className="detail-val">{activeUser.name || username}</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Member Since</span>
              <span className="detail-val">2026</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Account Status</span>
              <span className="detail-val status-active">🟢 Active</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Orders Placed</span>
              <span className="detail-val">{orders.length}</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Total Spent</span>
              <span className="detail-val">₹{totalSpent}</span>
            </div>
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="profile-section">
          <h3 className="section-heading">⚡ Quick Actions</h3>
          <div className="quick-actions">
            {quickActions.map((a, i) => (
              <button
                key={i}
                className="action-card"
                onClick={() => navigate(a.path)}
                style={{ "--accent": a.color }}
              >
                <span className="action-icon">{a.icon}</span>
                <div className="action-text">
                  <strong>{a.label}</strong>
                  <small>{a.desc}</small>
                </div>
                <span className="action-arrow">→</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;