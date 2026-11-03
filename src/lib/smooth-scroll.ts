import type Lenis from "lenis";

let scroller: Lenis | null = null;

export function setScroller(instance: Lenis | null) {
  scroller = instance;
}

const HEADER_OFFSET = 88;
const PINNED_SECTIONS = ".cap-live, .how-live";

/** Stops the page behind an open menu from scrolling. */
export function setScrollLocked(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (locked) scroller?.stop();
  else scroller?.start();
}

export function scrollToTop() {
  if (scroller) scroller.scrollTo(0);
  else window.scrollTo({ top: 0 });
}

/** Scrolls to a section and moves keyboard focus there, as following a normal link would. */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  const offset = target.matches(PINNED_SECTIONS) ? 0 : HEADER_OFFSET;
  if (scroller) {
    scroller.scrollTo(target, { offset: -offset });
  } else {
    window.scrollTo({ top: Math.max(target.getBoundingClientRect().top + window.scrollY - offset, 0) });
  }
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  return true;
}
