import { useState } from "react";
import "./Signup.css";
import { showToast } from "../utils/showToast";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();

      if (response.ok) {
        // Log the user in immediately after successful signup
        localStorage.setItem("user", JSON.stringify(result.user));
        showToast("Account Created Successfully 🎉");
        navigate("/");
      } else {
        alert(result.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Cannot connect to server for signup.");
    }
  };

  return (

    <div className="signup-container">

      <form className="signup-form" onSubmit={handleSubmit}>

        <h2>Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e)=>setData({...data,email:e.target.value})}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          onChange={(e)=>setData({...data,password:e.target.value})}
        />

        <label className="show-password">
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>

        <button>Create Account</button>

      </form>

    </div>

  );
}

export default Signup;