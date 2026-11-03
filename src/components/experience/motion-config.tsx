"use client";

import { ReactNode } from "react";
import { MotionConfig as FramerMotionConfig } from "framer-motion";

/** Framer Motion follows the visitor's reduced-motion setting everywhere on the page. */
export function MotionConfig({ children }: { children: ReactNode }) {
  return <FramerMotionConfig reducedMotion="user">{children}</FramerMotionConfig>;
}
