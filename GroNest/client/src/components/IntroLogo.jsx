import { useEffect, useState } from "react";
import "./IntroLogo.css";

/**
 * A clean rotating logo overlay.
 * phase: "in"  → logo spins onto screen  (0 – 1200ms)
 *        "out" → logo spins off screen   (1200 – 1800ms)
 *        calls onDone() at 1800ms
 */
function IntroLogo({ onDone }) {
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const outTimer  = setTimeout(() => setPhase("out"), 900);
    const doneTimer = setTimeout(() => onDone(),        1500);
    return () => { clearTimeout(outTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div className={`intro-overlay intro-${phase}`}>

      {/* Spinning logo card */}
      <div className="intro-coin-wrap">
        <div className="intro-coin">
          <span className="intro-cart">🛒</span>
        </div>
        <div className="intro-ring intro-ring-1" />
        <div className="intro-ring intro-ring-2" />
      </div>

      <div className="intro-text-wrap">
        <h1 className="intro-brand">
          <span>Gro</span><span className="intro-accent">Nest</span>
        </h1>
        <p className="intro-tag">Fresh groceries at your doorstep</p>
      </div>

    </div>
  );
}

export default IntroLogo;
