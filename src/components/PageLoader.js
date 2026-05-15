"use client";

import { useEffect, useState } from "react";

export default function PageLoader({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setLoaded(true);

      // After content is revealed, scroll to hash if present
      const hash = window.location.hash;
      if (hash) {
        // Small timeout lets the DOM paint before we scroll
setTimeout(() => {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}, 600);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      {!loaded && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="w-15 h-15 border-4 border-black border-t-blue-600 rounded-full animate-spin" />
            <p className="text-white font-semibold">
              Loading<span className="loading-dots"></span>
            </p>
          </div>
        </div>
      )}
      {loaded && children}
    </>
  );
}