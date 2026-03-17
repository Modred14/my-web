"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function ErrorModal({
  isOpen,
  message,
  triggerId,
  onClose,
  autoClose = false,
  autoCloseDuration = 10000,
}) {
  useEffect(() => {
    if (!autoClose || !isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [triggerId, autoClose, autoCloseDuration, isOpen, onClose]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="error-title"
      aria-describedby="error-message"
      className=" z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md  backdrop-blur-xl  font-mono  rounded-xl px-3  animate-fadeIn">
        {/* Close Button */}
        <div className="flex gap-2 text-center justify-center">
       
          <p
            id="error-message"
            className="text-center  text-red-600 text-xs font-bold leading-relaxed"
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
