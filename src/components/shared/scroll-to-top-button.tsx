"use client";

import { useEffect, useState } from "react";
import { SquareArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 520;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateVisibility = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > SHOW_AFTER_PX);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[70] inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-[linear-gradient(160deg,rgba(6,182,212,0.18),rgba(139,92,246,0.18)),rgba(7,13,24,0.86)] text-cyan-100 shadow-[0_18px_48px_-24px_rgba(6,182,212,0.8)] backdrop-blur-xl transition duration-300 hover:border-cyan-200/45 hover:bg-[linear-gradient(160deg,rgba(6,182,212,0.24),rgba(139,92,246,0.24)),rgba(9,20,36,0.95)] hover:text-white active:scale-95 sm:right-6 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <SquareArrowUp className="h-6 w-6" />
    </button>
  );
}
