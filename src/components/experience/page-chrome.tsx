"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cd4SplashLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="10 10 265 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cd4WhiteFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f0f6ff" />
          <stop offset="100%" stopColor="#d4e6fc" />
        </linearGradient>
        <linearGradient id="cd4Extrude" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#1e6ae6" />
          <stop offset="100%" stopColor="#0a3c94" />
        </linearGradient>
        <linearGradient id="cd4Cyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#37d6e8" />
          <stop offset="100%" stopColor="#0bd4e6" />
        </linearGradient>
        <filter id="cd4Glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 3D Extrusion Bevel Shadow Layer */}
      <g fill="url(#cd4Extrude)" transform="translate(3, 4.5)" fillRule="evenodd">
        <path d="M 102.2 27.0 L 99.7 24.8 L 97.0 22.7 L 94.2 20.9 L 91.3 19.2 L 88.3 17.7 L 85.2 16.4 L 82.0 15.3 L 78.8 14.4 L 75.5 13.8 L 72.2 13.3 L 68.9 13.0 L 65.5 13.0 L 62.2 13.2 L 58.8 13.6 L 55.5 14.2 L 52.3 15.0 L 49.1 16.1 L 46.0 17.3 L 42.9 18.7 L 40.0 20.4 L 37.2 22.2 L 34.5 24.2 L 31.9 26.3 L 29.5 28.7 L 27.2 31.1 L 25.1 33.7 L 23.2 36.5 L 21.5 39.3 L 19.9 42.3 L 18.5 45.4 L 17.4 48.5 L 16.4 51.7 L 15.7 55.0 L 15.1 58.3 L 14.8 61.6 L 14.7 65.0 L 14.8 68.4 L 15.1 71.7 L 15.7 75.0 L 16.4 78.3 L 17.4 81.5 L 18.5 84.6 L 19.9 87.7 L 21.5 90.7 L 23.2 93.5 L 25.1 96.3 L 27.2 98.9 L 29.5 101.3 L 31.9 103.7 L 34.5 105.8 L 37.2 107.8 L 40.0 109.6 L 42.9 111.3 L 46.0 112.7 L 49.1 113.9 L 52.3 115.0 L 55.5 115.8 L 58.8 116.4 L 62.2 116.8 L 65.5 117.0 L 68.9 117.0 L 72.2 116.7 L 75.5 116.2 L 78.8 115.6 L 82.0 114.7 L 85.2 113.6 L 88.3 112.3 L 91.3 110.8 L 94.2 109.1 L 97.0 107.3 L 99.7 105.2 L 102.2 103.0 L 88.5 88.4 L 87.0 89.8 L 85.3 91.0 L 83.6 92.2 L 81.8 93.2 L 80.0 94.1 L 78.1 94.9 L 76.1 95.6 L 74.1 96.1 L 72.1 96.5 L 70.1 96.8 L 68.0 97.0 L 66.0 97.0 L 63.9 96.9 L 61.9 96.6 L 59.8 96.3 L 57.8 95.7 L 55.9 95.1 L 53.9 94.3 L 52.1 93.5 L 50.3 92.5 L 48.5 91.3 L 46.9 90.1 L 45.3 88.8 L 43.8 87.4 L 42.4 85.8 L 41.1 84.2 L 39.9 82.5 L 38.9 80.8 L 37.9 79.0 L 37.1 77.1 L 36.3 75.1 L 35.8 73.2 L 35.3 71.2 L 35.0 69.1 L 34.8 67.1 L 34.7 65.0 L 34.8 62.9 L 35.0 60.9 L 35.3 58.8 L 35.8 56.8 L 36.3 54.9 L 37.1 52.9 L 37.9 51.0 L 38.9 49.2 L 39.9 47.5 L 41.1 45.8 L 42.4 44.2 L 43.8 42.6 L 45.3 41.2 L 46.9 39.9 L 48.5 38.7 L 50.3 37.5 L 52.1 36.5 L 53.9 35.7 L 55.9 34.9 L 57.8 34.3 L 59.8 33.7 L 61.9 33.4 L 63.9 33.1 L 66.0 33.0 L 68.0 33.0 L 70.1 33.2 L 72.1 33.5 L 74.1 33.9 L 76.1 34.4 L 78.1 35.1 L 80.0 35.9 L 81.8 36.8 L 83.6 37.8 L 85.3 39.0 L 87.0 40.2 L 88.5 41.6 L 102.2 27.0 Z" />
        <path d="M 109.3 115.0 L 109.3 15.0 L 142.3 15.0 L 144.5 15.0 L 146.7 15.2 L 148.8 15.4 L 151.0 15.8 L 153.1 16.2 L 155.2 16.7 L 157.3 17.3 L 159.4 18.0 L 161.4 18.8 L 163.4 19.7 L 165.4 20.6 L 167.3 21.7 L 169.2 22.8 L 171.0 24.0 L 172.7 25.3 L 174.4 26.7 L 176.1 28.1 L 177.7 29.6 L 179.2 31.2 L 180.6 32.9 L 182.0 34.6 L 183.3 36.3 L 184.5 38.1 L 185.6 40.0 L 186.7 41.9 L 187.6 43.9 L 188.5 45.9 L 189.3 47.9 L 190.0 50.0 L 190.6 52.1 L 191.1 54.2 L 191.5 56.3 L 191.9 58.5 L 192.1 60.6 L 192.3 62.8 L 192.3 65.0 L 192.3 67.2 L 192.1 69.4 L 191.9 71.5 L 191.5 73.7 L 191.1 75.8 L 190.6 77.9 L 190.0 80.0 L 189.3 82.1 L 188.5 84.1 L 187.6 86.1 L 186.7 88.1 L 185.6 90.0 L 184.5 91.9 L 183.3 93.7 L 182.0 95.4 L 180.6 97.1 L 179.2 98.8 L 177.7 100.4 L 176.1 101.9 L 174.4 103.3 L 172.7 104.7 L 171.0 106.0 L 169.2 107.2 L 167.3 108.3 L 165.4 109.4 L 163.4 110.3 L 161.4 111.2 L 159.4 112.0 L 157.3 112.7 L 155.2 113.3 L 153.1 113.8 L 151.0 114.2 L 148.8 114.6 L 146.7 114.8 L 144.5 115.0 L 142.3 115.0 L 109.3 115.0 Z M 127.3 95.0 L 142.3 95.0 L 143.6 95.0 L 144.9 94.9 L 146.2 94.7 L 147.5 94.5 L 148.8 94.3 L 150.1 94.0 L 151.3 93.6 L 152.6 93.2 L 153.8 92.7 L 155.0 92.2 L 156.2 91.6 L 157.3 91.0 L 158.4 90.3 L 159.5 89.6 L 160.6 88.8 L 161.6 88.0 L 162.6 87.1 L 163.5 86.2 L 164.4 85.3 L 165.3 84.3 L 166.1 83.3 L 166.9 82.2 L 167.6 81.1 L 168.3 80.0 L 168.9 78.9 L 169.5 77.7 L 170.0 76.5 L 170.5 75.3 L 170.9 74.0 L 171.3 72.8 L 171.6 71.5 L 171.8 70.2 L 172.0 68.9 L 172.2 67.6 L 172.3 66.3 L 172.3 65.0 L 172.3 63.7 L 172.2 62.4 L 172.0 61.1 L 171.8 59.8 L 171.6 58.5 L 171.3 57.2 L 170.9 56.0 L 170.5 54.7 L 170.0 53.5 L 169.5 52.3 L 168.9 51.1 L 168.3 50.0 L 167.6 48.9 L 166.9 47.8 L 166.1 46.7 L 165.3 45.7 L 164.4 44.7 L 163.5 43.8 L 162.6 42.9 L 161.6 42.0 L 160.6 41.2 L 159.5 40.4 L 158.4 39.7 L 157.3 39.0 L 156.2 38.4 L 155.0 37.8 L 153.8 37.3 L 152.6 36.8 L 151.3 36.4 L 150.1 36.0 L 148.8 35.7 L 147.5 35.5 L 146.2 35.3 L 144.9 35.1 L 143.6 35.0 L 142.3 35.0 L 127.3 35.0 L 127.3 95.0 Z" />
        <path d="M 237.6 115.0 L 258.4 115.0 L 258.4 97.3 L 269.7 97.3 L 269.7 74.6 L 258.4 74.6 L 258.4 15.0 L 237.6 15.0 L 194.2 74.6 L 194.2 97.3 L 237.6 97.3 Z M 237.6 74.6 L 213.2 74.6 L 237.6 48.0 Z" />
      </g>

      {/* Front 3D Letter Faces */}
      <g fill="url(#cd4WhiteFace)" fillRule="evenodd">
        <path d="M 102.2 27.0 L 99.7 24.8 L 97.0 22.7 L 94.2 20.9 L 91.3 19.2 L 88.3 17.7 L 85.2 16.4 L 82.0 15.3 L 78.8 14.4 L 75.5 13.8 L 72.2 13.3 L 68.9 13.0 L 65.5 13.0 L 62.2 13.2 L 58.8 13.6 L 55.5 14.2 L 52.3 15.0 L 49.1 16.1 L 46.0 17.3 L 42.9 18.7 L 40.0 20.4 L 37.2 22.2 L 34.5 24.2 L 31.9 26.3 L 29.5 28.7 L 27.2 31.1 L 25.1 33.7 L 23.2 36.5 L 21.5 39.3 L 19.9 42.3 L 18.5 45.4 L 17.4 48.5 L 16.4 51.7 L 15.7 55.0 L 15.1 58.3 L 14.8 61.6 L 14.7 65.0 L 14.8 68.4 L 15.1 71.7 L 15.7 75.0 L 16.4 78.3 L 17.4 81.5 L 18.5 84.6 L 19.9 87.7 L 21.5 90.7 L 23.2 93.5 L 25.1 96.3 L 27.2 98.9 L 29.5 101.3 L 31.9 103.7 L 34.5 105.8 L 37.2 107.8 L 40.0 109.6 L 42.9 111.3 L 46.0 112.7 L 49.1 113.9 L 52.3 115.0 L 55.5 115.8 L 58.8 116.4 L 62.2 116.8 L 65.5 117.0 L 68.9 117.0 L 72.2 116.7 L 75.5 116.2 L 78.8 115.6 L 82.0 114.7 L 85.2 113.6 L 88.3 112.3 L 91.3 110.8 L 94.2 109.1 L 97.0 107.3 L 99.7 105.2 L 102.2 103.0 L 88.5 88.4 L 87.0 89.8 L 85.3 91.0 L 83.6 92.2 L 81.8 93.2 L 80.0 94.1 L 78.1 94.9 L 76.1 95.6 L 74.1 96.1 L 72.1 96.5 L 70.1 96.8 L 68.0 97.0 L 66.0 97.0 L 63.9 96.9 L 61.9 96.6 L 59.8 96.3 L 57.8 95.7 L 55.9 95.1 L 53.9 94.3 L 52.1 93.5 L 50.3 92.5 L 48.5 91.3 L 46.9 90.1 L 45.3 88.8 L 43.8 87.4 L 42.4 85.8 L 41.1 84.2 L 39.9 82.5 L 38.9 80.8 L 37.9 79.0 L 37.1 77.1 L 36.3 75.1 L 35.8 73.2 L 35.3 71.2 L 35.0 69.1 L 34.8 67.1 L 34.7 65.0 L 34.8 62.9 L 35.0 60.9 L 35.3 58.8 L 35.8 56.8 L 36.3 54.9 L 37.1 52.9 L 37.9 51.0 L 38.9 49.2 L 39.9 47.5 L 41.1 45.8 L 42.4 44.2 L 43.8 42.6 L 45.3 41.2 L 46.9 39.9 L 48.5 38.7 L 50.3 37.5 L 52.1 36.5 L 53.9 35.7 L 55.9 34.9 L 57.8 34.3 L 59.8 33.7 L 61.9 33.4 L 63.9 33.1 L 66.0 33.0 L 68.0 33.0 L 70.1 33.2 L 72.1 33.5 L 74.1 33.9 L 76.1 34.4 L 78.1 35.1 L 80.0 35.9 L 81.8 36.8 L 83.6 37.8 L 85.3 39.0 L 87.0 40.2 L 88.5 41.6 L 102.2 27.0 Z" />
        <path d="M 109.3 115.0 L 109.3 15.0 L 142.3 15.0 L 144.5 15.0 L 146.7 15.2 L 148.8 15.4 L 151.0 15.8 L 153.1 16.2 L 155.2 16.7 L 157.3 17.3 L 159.4 18.0 L 161.4 18.8 L 163.4 19.7 L 165.4 20.6 L 167.3 21.7 L 169.2 22.8 L 171.0 24.0 L 172.7 25.3 L 174.4 26.7 L 176.1 28.1 L 177.7 29.6 L 179.2 31.2 L 180.6 32.9 L 182.0 34.6 L 183.3 36.3 L 184.5 38.1 L 185.6 40.0 L 186.7 41.9 L 187.6 43.9 L 188.5 45.9 L 189.3 47.9 L 190.0 50.0 L 190.6 52.1 L 191.1 54.2 L 191.5 56.3 L 191.9 58.5 L 192.1 60.6 L 192.3 62.8 L 192.3 65.0 L 192.3 67.2 L 192.1 69.4 L 191.9 71.5 L 191.5 73.7 L 191.1 75.8 L 190.6 77.9 L 190.0 80.0 L 189.3 82.1 L 188.5 84.1 L 187.6 86.1 L 186.7 88.1 L 185.6 90.0 L 184.5 91.9 L 183.3 93.7 L 182.0 95.4 L 180.6 97.1 L 179.2 98.8 L 177.7 100.4 L 176.1 101.9 L 174.4 103.3 L 172.7 104.7 L 171.0 106.0 L 169.2 107.2 L 167.3 108.3 L 165.4 109.4 L 163.4 110.3 L 161.4 111.2 L 159.4 112.0 L 157.3 112.7 L 155.2 113.3 L 153.1 113.8 L 151.0 114.2 L 148.8 114.6 L 146.7 114.8 L 144.5 115.0 L 142.3 115.0 L 109.3 115.0 Z M 127.3 95.0 L 142.3 95.0 L 143.6 95.0 L 144.9 94.9 L 146.2 94.7 L 147.5 94.5 L 148.8 94.3 L 150.1 94.0 L 151.3 93.6 L 152.6 93.2 L 153.8 92.7 L 155.0 92.2 L 156.2 91.6 L 157.3 91.0 L 158.4 90.3 L 159.5 89.6 L 160.6 88.8 L 161.6 88.0 L 162.6 87.1 L 163.5 86.2 L 164.4 85.3 L 165.3 84.3 L 166.1 83.3 L 166.9 82.2 L 167.6 81.1 L 168.3 80.0 L 168.9 78.9 L 169.5 77.7 L 170.0 76.5 L 170.5 75.3 L 170.9 74.0 L 171.3 72.8 L 171.6 71.5 L 171.8 70.2 L 172.0 68.9 L 172.2 67.6 L 172.3 66.3 L 172.3 65.0 L 172.3 63.7 L 172.2 62.4 L 172.0 61.1 L 171.8 59.8 L 171.6 58.5 L 171.3 57.2 L 170.9 56.0 L 170.5 54.7 L 170.0 53.5 L 169.5 52.3 L 168.9 51.1 L 168.3 50.0 L 167.6 48.9 L 166.9 47.8 L 166.1 46.7 L 165.3 45.7 L 164.4 44.7 L 163.5 43.8 L 162.6 42.9 L 161.6 42.0 L 160.6 41.2 L 159.5 40.4 L 158.4 39.7 L 157.3 39.0 L 156.2 38.4 L 155.0 37.8 L 153.8 37.3 L 152.6 36.8 L 151.3 36.4 L 150.1 36.0 L 148.8 35.7 L 147.5 35.5 L 146.2 35.3 L 144.9 35.1 L 143.6 35.0 L 142.3 35.0 L 127.3 35.0 L 127.3 95.0 Z" />
        <path d="M 237.6 115.0 L 258.4 115.0 L 258.4 97.3 L 269.7 97.3 L 269.7 74.6 L 258.4 74.6 L 258.4 15.0 L 237.6 15.0 L 194.2 74.6 L 194.2 97.3 L 237.6 97.3 Z M 237.6 74.6 L 213.2 74.6 L 237.6 48.0 Z" />
      </g>

      {/* Cyan Medical Plus Symbol inside D */}
      <path
        d="M 109.4 92.4 L 127.4 92.4 L 127.4 73.4 L 146.4 73.4 L 146.4 55.4 L 127.4 55.4 L 127.4 36.4 L 109.4 36.4 L 109.4 55.4 L 90.4 55.4 L 90.4 73.4 L 109.4 73.4 Z"
        fill="url(#cd4Cyan)"
        filter="url(#cd4Glow)"
      />

      {/* Heartbeat ECG Line across 4 */}
      <path
        d="M 190.5 90.5 L 209.0 90.5 L 213.5 79.0 L 216.0 90.5 L 220.0 110.0 L 228.2 64.0 L 235.8 98.0 L 241.4 90.5 L 269.7 90.5"
        stroke="#0c4099"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 190.5 90.5 L 209.0 90.5 L 213.5 79.0 L 216.0 90.5 L 220.0 110.0 L 228.2 64.0 L 235.8 98.0 L 241.4 90.5 L 269.7 90.5"
        stroke="#12e3f5"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cd4Glow)"
      />
    </svg>
  );
}

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
      <div className="page-loader-brand">
        <div className="page-loader-3d-wrap">
          <div className="page-loader-aura" />
          <Cd4SplashLogo className="page-loader-3d-svg" />
        </div>
        <span className="page-loader-title">CD4 AI</span>
      </div>
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
