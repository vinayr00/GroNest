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
      const users = JSON.parse(localStorage.getItem("gronest_users") || "[]");
      if (users.find(u => u.email === data.email)) {
        return alert("User already exists");
      }
      
      const newUser = { email: data.email, password: data.password, _id: Date.now().toString() };
      users.push(newUser);
      localStorage.setItem("gronest_users", JSON.stringify(users));

      // Log the user in immediately after successful signup
      localStorage.setItem("user", JSON.stringify({ email: newUser.email, _id: newUser._id }));
      showToast("Account Created Successfully 🎉");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Error creating account.");
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