import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Fire rotating logo intro on first visit this session only
  useEffect(() => {
    // Skip if: already shown this session OR an intro is already playing (e.g. from logout)
    if (sessionStorage.getItem("gronest_intro_shown") || window.__gronest_intro_playing) return;
    sessionStorage.setItem("gronest_intro_shown", "true");
    window.__gronest_intro_playing = true;
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("gronest:intro"));
    }, 50);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem("gronest_users") || "[]");
      const user = users.find(u => u.email === data.email && u.password === data.password);
      
      if (user) {
        localStorage.setItem("user", JSON.stringify({ name: user.name || user.email.split("@")[0], email: user.email, _id: user._id }));
        navigate("/home");
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error logging in.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-image">
          <h1>GroNest</h1>
          <p>Fresh groceries delivered to your door</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-box">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <input
                type="email"
                placeholder=" "
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
              <label>Password</label>
              <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <button type="submit">Login</button>

            <p>
              Don't have an account?{" "}
              <span
                style={{ color: "#27ae60", cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;