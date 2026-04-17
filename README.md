# 🛒 GroNest — Fresh Grocery Store Online

> **GroNest** is a modern full-stack grocery e-commerce web application built with React and Node.js. Shop fresh groceries by category, manage your cart, place orders, and track deliveries — all in a clean, premium UI.

---

## 🌟 Features

### 🛍️ Shopping
- Browse groceries organised into **Daily Essentials, Cooking Essentials, Fresh Produce, Snacks & Munchies**
- Filter products by category with animated pill chips
- Add items to cart with a live **quantity badge** per product card
- Toast notification on add — with a **"Go to Cart →"** shortcut button

### 🔐 Authentication
- **Signup / Login** with email & password stored in local JSON
- Animated **rotating logo intro** plays on first login visit
- Same intro plays as an **outro on logout** (no loading flash)
- Session managed via `localStorage`

### 🛒 Cart
- Add, increase, decrease, and remove items
- Per-item **subtotal** + order summary with FREE delivery badge
- Gradient **Proceed to Checkout** button

### 📦 Orders
- Collapsible order cards with per-status colour badges  
  - 🍳 **Preparing** → 🚚 **Out for Delivery** → ✅ **Delivered**
- Auto-status update after 5 seconds (Preparing → Out for Delivery)
- Total spent summary

### ✅ Order Success
- Animated 🎉 icon with pulsing ring
- Order ID, expected delivery date, status pills
- Live **delivery tracker** (Confirmed → Packed → Out for Delivery → Delivered)
- Navigate to Home or My Orders

### 👤 Profile
- Auto-generated avatar with email initials
- Stats cards — total orders, total spent, cart items, member since
- Account details grid
- Quick-action cards (Orders / Products / Home)

### 🎨 UI / UX
- **Sticky gradient Navbar** — logo, centre nav links, cart badge, avatar dropdown
- **Home page** — dark hero with personalized greeting, stats bar, category cards, promo banner
- **Rotating intro animation** on app entry and logout
- **Page fade transitions** on every route change
- Animated background blobs on all major pages
- Fully **responsive** — mobile-friendly layouts

---

## 🗂️ Project Structure

```
GroNest/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── components/      # Navbar, ProductCard, SplashScreen, IntroLogo, PageTransition
│       ├── context/         # CartContext (global cart state)
│       ├── pages/           # Login, Signup, Home, Products, Cart, Checkout,
│       │                    #   OrderSuccess, Orders, Profile
│       ├── services/        # API service (fetchProducts)
│       ├── data/            # Local product data
│       └── App.jsx          # Routes + global intro overlay
│
└── server/                  # Node.js + Express backend
    ├── server.js            # API routes
    └── src/data/
        ├── users.json       # User accounts (local file store)
        └── products.json    # Product catalogue
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Start the Backend
```bash
cd GroNest/server
npm install
npm start
# Server runs on http://localhost:5000
```

### 2. Start the Frontend
```bash
cd GroNest/client
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET`  | `/api/products` | Fetch all products |
| `POST` | `/api/signup`   | Register a new user |
| `POST` | `/api/login`    | Login with email & password |
| `GET`  | `/api/test`     | Health check |

> **No database required.** Users are stored in `server/src/data/users.json` and products in `products.json`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| Styling | Vanilla CSS, Google Fonts (Inter) |
| Backend | Node.js, Express 5 |
| Data store | Local JSON files (no DB) |
| State | React Context API (CartContext) |

---

## 📱 Pages Overview

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Sign in with animated intro |
| `/signup` | Signup | Create a new account |
| `/home` | Home | Hero, stats bar, categories |
| `/products` | Products | All groceries with filters |
| `/cart` | Cart | Manage cart items |
| `/checkout` | Checkout | Place order |
| `/order-success` | Order Success | Confirmation + tracker |
| `/orders` | Orders | Order history |
| `/profile` | Profile | User info + quick actions |

---

## 🎬 Intro Animation

- On **first login** visit: rotating logo intro plays → reveals login form behind it
- On **logout**: same intro plays as an outro → navigates to login  
- Uses `sessionStorage` to ensure it only plays once per browser session
- Controlled via a global `gronest:intro` custom event

---

## 👨‍💻 Author

Built with ❤️ using React & Node.js.

---

## 📄 License

This project is for educational/personal use.
