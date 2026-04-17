import { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import IntroLogo from "./components/IntroLogo";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // IntroLogo global state
  const [showIntro, setShowIntro] = useState(false);
  const introNavTarget = useRef(null); // path to navigate to after intro

  // Listen for the global "gronest:intro" event fired by Login or Navbar logout
  useEffect(() => {
    const handler = (e) => {
      introNavTarget.current = e.detail?.navigateTo || null;
      window.__gronest_intro_playing = true;
      setShowIntro(true);
    };
    window.addEventListener("gronest:intro", handler);
    return () => window.removeEventListener("gronest:intro", handler);
  }, []);

  const handleIntroDone = useCallback(() => {
    window.__gronest_intro_playing = false;
    setShowIntro(false);
    if (introNavTarget.current) {
      // Mark intro as shown BEFORE navigating so Login.jsx won't fire another one
      sessionStorage.setItem("gronest_intro_shown", "true");
      navigate(introNavTarget.current);
      introNavTarget.current = null;
    }
  }, [navigate]);


  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      <div id="toast" />

      {/* Global rotating logo intro — shown on first login visit and on logout */}
      {showIntro && <IntroLogo onDone={handleIntroDone} />}

      {!hideNavbar && <Navbar />}

      <PageTransition pageKey={location.key}>
        <Routes location={location}>
          <Route path="/"              element={user ? <Home /> : <Login />} />
          <Route path="/login"         element={<Login />} />
          <Route path="/signup"        element={<Signup />} />
          <Route path="/home"          element={<Home />} />
          <Route path="/products"      element={<Products />} />
          <Route path="/cart"          element={<Cart />} />
          <Route path="/checkout"      element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders"        element={<Orders />} />
          <Route path="/profile"       element={<Profile />} />
        </Routes>
      </PageTransition>
    </>
  );
}

export default App;