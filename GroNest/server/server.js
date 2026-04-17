const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "src", "data", "users.json");
if (!fs.existsSync(usersFilePath)) {
  if (!fs.existsSync(path.join(__dirname, "src", "data"))) {
    fs.mkdirSync(path.join(__dirname, "src", "data"), { recursive: true });
  }
  fs.writeFileSync(usersFilePath, JSON.stringify([]));
}

const app = express();

app.use(cors());
app.use(express.json());

// Serve products from local JSON
app.get("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "src", "data", "products.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read local products.json", err);
      return res.status(500).json({ error: "No products available" });
    }
    try {
      const json = JSON.parse(data);
      return res.json(json);
    } catch (e) {
      console.error("Invalid local products.json", e);
      return res.status(500).json({ error: "Invalid products data" });
    }
  });
});



app.post("/api/signup", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    
    const usersData = fs.readFileSync(usersFilePath, "utf8");
    const users = JSON.parse(usersData);

    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newUser = { _id: Date.now().toString(), email, password };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    
    res.status(201).json({ message: "User registered successfully", user: { email: newUser.email, _id: newUser._id } });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const usersData = fs.readFileSync(usersFilePath, "utf8");
    const users = JSON.parse(usersData);

    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { email: user.email, _id: user._id } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DB completely disconnected as requested

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected successfully 🎉" });
});

// Catch-all route to serve React app for any unhandled paths (supports React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));