import { useState } from "react";
import "./Signup.css";
import { showToast } from "../utils/showToast";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(localStorage.getItem("gronest_users") || "[]");
      if (users.find(u => u.email === data.email)) {
        return alert("User already exists");
      }
      
      const ObjectName = data.name || data.email.split("@")[0];
      const newUser = { name: ObjectName, email: data.email, password: data.password, _id: Date.now().toString() };
      users.push(newUser);
      localStorage.setItem("gronest_users", JSON.stringify(users));

      // Log the user in immediately after successful signup
      localStorage.setItem("user", JSON.stringify({ name: ObjectName, email: newUser.email, _id: newUser._id }));
      showToast("Account Created Successfully 🎉");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Error creating account.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        {/* RIGHT SIDE (Image) */}
        <div className="signup-image">
          <h1>GroNest</h1>
          <p>Join the nest and get fresh groceries delivered instantly to your door.</p>
        </div>

        {/* LEFT SIDE (Form) */}
        <div className="signup-box">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <input
                type="text"
                placeholder=" "
                required
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder=" "
                required
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                required
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <label>Password</label>
              <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <button type="submit">Sign Up</button>

            <p>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>
                Login
              </span>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Signup;