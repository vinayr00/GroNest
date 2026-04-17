import { useEffect, useState } from "react";
import "./SplashScreen.css";

function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit

  useEffect(() => {
    // Phase timeline: enter (0.8s) → hold (1.2s) → exit (0.8s)
    const holdTimer = setTimeout(() => setPhase("hold"), 800);
    const exitTimer = setTimeout(() => setPhase("exit"), 2000);
    const doneTimer = setTimeout(() => onDone(), 2800);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash-overlay splash-${phase}`}>
      {/* Animated background blobs */}
      <div className="splash-blob blob-1" />
      <div className="splash-blob blob-2" />
      <div className="splash-blob blob-3" />

      {/* Leaf particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`splash-leaf leaf-${i + 1}`}>🌿</div>
      ))}

      {/* Core content */}
      <div className="splash-content">
        <div className="splash-cart-wrap">
          <span className="splash-cart">🛒</span>
          <div className="splash-ripple" />
          <div className="splash-ripple ripple-2" />
        </div>
        <h1 className="splash-title">
          <span className="letter-g">G</span>
          <span className="letter-r">r</span>
          <span className="letter-o">o</span>
          <span className="letter-n">N</span>
          <span className="letter-e">e</span>
          <span className="letter-s">s</span>
          <span className="letter-t2">t</span>
        </h1>
        <p className="splash-tagline">Fresh groceries at your doorstep</p>
        <div className="splash-loader">
          <div className="splash-loader-bar" />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
