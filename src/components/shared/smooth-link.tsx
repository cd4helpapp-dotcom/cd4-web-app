"use client";

import { AnchorHTMLAttributes, MouseEvent } from "react";
import { scrollToId } from "@/lib/smooth-scroll";

export function SmoothLink({ href = "#", onClick, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (href.startsWith("#") && scrollToId(href.slice(1))) {
      event.preventDefault();
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
