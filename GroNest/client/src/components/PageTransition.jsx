import { useEffect, useRef } from "react";
import "./PageTransition.css";

/**
 * Wraps any page with a 3-D rotating door reveal.
 * The `location.key` passed as `pageKey` triggers re-animation on route change.
 */
function PageTransition({ children, pageKey }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Remove + re-add class to re-trigger animation on each navigation
    el.classList.remove("pt-animate");
    void el.offsetWidth; // reflow
    el.classList.add("pt-animate");
  }, [pageKey]);

  return (
    <div ref={ref} className="page-transition pt-animate">
      {children}
    </div>
  );
}

export default PageTransition;
