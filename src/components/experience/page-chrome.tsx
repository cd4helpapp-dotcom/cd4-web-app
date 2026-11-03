"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageLoader() {
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finish = () => overlay.current?.classList.add("is-done");
    const started = performance.now();
    const check = window.setInterval(() => {
      const ready = document.documentElement.classList.contains("scene-ready") || document.documentElement.classList.contains("scene-off");
      if (performance.now() - started > 7000 || (ready && performance.now() - started > 450)) {
        window.clearInterval(check);
        finish();
      }
    }, 80);
    return () => window.clearInterval(check);
  }, []);

  return (
    <div ref={overlay} className="page-loader" aria-hidden>
      <span className="page-loader-line" />
    </div>
  );
}

// A soft ring that follows the mouse. The normal cursor stays, so nothing about pointing changes.
export function CursorRing() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const element = ring.current;
    if (!fine || reduced || !element) return;
    const moveX = gsap.quickTo(element, "x", { duration: 0.32, ease: "power3" });
    const moveY = gsap.quickTo(element, "y", { duration: 0.32, ease: "power3" });
    const onMove = (event: PointerEvent) => {
      element.style.opacity = "1";
      moveX(event.clientX);
      moveY(event.clientY);
      const interactive = event.target instanceof Element && event.target.closest("a, button, summary, [data-tilt]");
      element.classList.toggle("is-active", Boolean(interactive));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ring} className="cursor-ring" aria-hidden />;
}
