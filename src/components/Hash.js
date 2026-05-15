// components/HashScrollHandler.jsx
"use client";
import { useEffect } from "react";

export default function HashScrollHandler() {
  useEffect(() => {
    const scrollToHash = (hash) => {
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Handle initial load
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 300);
    }

    // Handle all anchor clicks — including same-hash repeat clicks
    const handleClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;

      e.preventDefault();
      scrollToHash(href);

      // Update URL without triggering browser scroll
      history.pushState(null, "", href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}