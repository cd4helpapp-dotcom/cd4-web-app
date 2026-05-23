"use client";

import { useEffect } from "react";

const TOUCH_GLOW_CLASS = "is-touch-glowing";
const TOUCH_GLOW_SELECTOR = ".premium-card";

export function TouchGlowProvider() {
  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    let activeCard: HTMLElement | null = null;

    const clearActiveCard = () => {
      activeCard?.classList.remove(TOUCH_GLOW_CLASS);
      activeCard = null;
    };

    const addGlow = (event: PointerEvent) => {
      if (!touchQuery.matches || event.pointerType === "mouse") {
        return;
      }

      if (!(event.target instanceof Element)) {
        return;
      }

      const card = event.target.closest<HTMLElement>(TOUCH_GLOW_SELECTOR);

      if (!card) {
        clearActiveCard();
        return;
      }

      if (activeCard === card) {
        return;
      }

      clearActiveCard();
      card.classList.add(TOUCH_GLOW_CLASS);
      activeCard = card;
    };

    document.addEventListener("pointerdown", addGlow, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", addGlow);
      clearActiveCard();
    };
  }, []);

  return null;
}
