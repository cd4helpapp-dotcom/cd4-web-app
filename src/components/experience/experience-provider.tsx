"use client";

import { Component, ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Pose, StageId, pickTier, poseTable, sceneStore, supportsWebGL } from "@/lib/scene-store";
import { setScroller } from "@/lib/smooth-scroll";

const loadScene = () => import("./scene/scene-root");

if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  void loadScene();
}

const SceneRoot = dynamic(loadScene, { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onFail: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Wraps each word in a span. The text itself is unchanged, so it reads the same to search engines and screen readers.
function splitIntoWords(heading: HTMLElement) {
  if (!heading.dataset.split) {
    heading.dataset.split = "true";
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      (node.textContent ?? "").split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.append(part);
          return;
        }
        const word = document.createElement("span");
        word.className = "split-word";
        word.textContent = part;
        fragment.append(word);
      });
      node.replaceWith(fragment);
    });
  }
  return Array.from(heading.querySelectorAll<HTMLElement>(".split-word"));
}

const PINNED_PARENTS = ".cap-pin, .how-pin, .lg\\:sticky";

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

// Runs the page's motion: smooth scrolling, the scroll-to-pose mapping, section reveals and the shared 3D canvas.
export function ExperienceProvider() {
  const [mode, setMode] = useState<"pending" | "scene" | "static">("pending");
  const [running, setRunning] = useState(true);
  const failed = useRef(false);

  const markStatic = () => {
    failed.current = true;
    document.documentElement.classList.remove("scene-ready");
    document.documentElement.classList.add("scene-off");
    setMode("static");
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sceneStore.tier = pickTier();
    sceneStore.isMobile = window.innerWidth < 1024;

    const cleanups: (() => void)[] = [];
    const context = gsap.context(() => {
      const stages = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
      let anchors: { pose: Pose; at: number; top: number }[] = [];

      const applyScroll = () => {
        if (anchors.length === 0) return;
        const y = window.scrollY;
        sceneStore.progress = y / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        let from = anchors[0];
        let to = anchors[0];
        for (const anchor of anchors) {
          if (anchor.at <= y) from = anchor;
          if (anchor.at >= y) {
            to = anchor;
            break;
          }
          to = anchor;
        }
        const span = to.at - from.at;
        const blend = span > 0 ? smooth(Math.min(Math.max((y - from.at) / span, 0), 1)) : 0;
        sceneStore.scrollShift = y - (blend > 0 ? to.top : from.top);
        (Object.keys(from.pose) as (keyof Pose)[]).forEach((key) => {
          sceneStore.target[key] = from.pose[key] + (to.pose[key] - from.pose[key]) * blend;
        });
      };

      const measure = () => {
        sceneStore.isMobile = window.innerWidth < 1024;
        const table = sceneStore.isMobile ? poseTable.mobile : poseTable.desktop;
        const height = window.innerHeight;
        // The layout was composed at 16:10. Narrower desktop windows pull the 3D inward so it stays clear of the text.
        sceneStore.xScale = sceneStore.isMobile ? 1 : Math.min(window.innerWidth / height / 1.6, 1);
        anchors = stages.flatMap((element) => {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const names = (element.dataset.stage ?? "").split(" ") as StageId[];
          const poses = names.map((name) => ({ ...table[name], orbX: table[name].orbX * sceneStore.xScale }));
          if (names[0] === "hero") return [{ pose: poses[0], at: 0, top: 0 }];
          const arrive = top - height * 0.38;
          if (rect.height <= height) return [{ pose: poses[0], at: arrive, top }];
          // A section taller than the screen holds each of its poses in turn, with a short blend between them.
          const range = rect.height - height;
          return poses.flatMap((pose, index) => {
            const share = range / poses.length;
            const start = index === 0 ? arrive : top + share * index + share * 0.25;
            return [{ pose, at: start, top }, { pose, at: top + share * (index + 1), top }];
          });
        });
        anchors.sort((a, b) => a.at - b.at);
        applyScroll();
      };

      ScrollTrigger.create({ start: 0, end: "max", onUpdate: applyScroll, onRefresh: measure });
      measure();
      Object.assign(sceneStore.current, sceneStore.target);

      if (!reduced) {
        // The hero plays its entrance again whenever you come back to it.
        const heroSection = document.getElementById("top");
        const heroParts = gsap.utils.toArray<HTMLElement>("#top .kicker, #top .word-rise, #top p.hero-rise, #top div.hero-rise, #top dl.hero-rise");
        const clearEntrance = window.setTimeout(() => heroSection?.classList.add("hero-played"), 1700);
        ScrollTrigger.create({
          trigger: "#top",
          start: "top top",
          end: "65% top",
          onEnterBack: () => {
            heroSection?.classList.add("hero-played");
            gsap.fromTo(heroParts, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.07, overwrite: true });
          }
        });
        cleanups.push(() => window.clearTimeout(clearEntrance));

        // The hero text lifts away as the story begins.
        gsap.to("[data-hero-copy]", {
          y: -90,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: "#top", start: "top top", end: "65% top", scrub: true }
        });

        // Section headings light up word by word as they scroll in.
        gsap.utils.toArray<HTMLElement>(".display-2").forEach((heading) => {
          const words = splitIntoWords(heading);
          gsap.fromTo(
            words,
            { opacity: 0.16 },
            { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: heading, start: "top 88%", end: "top 52%", scrub: true } }
          );
        });

        // Small visuals drift at their own speed for depth.
        gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 34 },
            { y: -34, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });

        gsap.to("[data-scroll-progress]", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

        // Content animates in both directions. Each element has its own reversible tween, so it stays right however fast or far the page jumps.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
          // Inside a held screen the element stays in view for the whole section, so it only leaves when the section does.
          const section = item.closest(PINNED_PARENTS) ? item.closest("section") : null;
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                endTrigger: section ?? item,
                end: "bottom 6%",
                toggleActions: "play reverse play reverse"
              }
            }
          );
        });
      }
    });

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
      setScroller(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const canPoint = !reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const floating = canPoint
      ? gsap.utils.toArray<HTMLElement>("[data-depth]").map((element) => ({
          depth: Number(element.dataset.depth),
          x: gsap.quickTo(element, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(element, "y", { duration: 0.9, ease: "power3" })
        }))
      : [];

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      sceneStore.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      sceneStore.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
      floating.forEach(({ depth, x, y }) => {
        x(sceneStore.pointer.x * depth);
        y(-sceneStore.pointer.y * depth);
      });
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // Bright sections are opaque and hide the canvas, so nothing needs drawing while only they are on screen.
    const showing = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) showing.add(entry.target);
        else showing.delete(entry.target);
      });
      setRunning(showing.size > 0);
    });
    document.querySelectorAll("[data-dark]").forEach((element) => observer.observe(element));

    const refresh = () => ScrollTrigger.refresh();
    window.requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    if (reduced || !supportsWebGL()) {
      markStatic();
    } else {
      const start = () => {
        if (!failed.current) setMode("scene");
      };
      if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 250 });
      else setTimeout(start, 200);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setScroller(null);
      cleanups.forEach((run) => run());
      context.revert();
      document.documentElement.classList.remove("scene-ready", "scene-off");
    };
  }, []);

  if (mode !== "scene") return null;

  return (
    <div className="scene-layer" aria-hidden>
      <SceneBoundary onFail={markStatic}>
        <SceneRoot
          running={running}
          onReady={() => document.documentElement.classList.add("scene-ready")}
          onFail={markStatic}
        />
      </SceneBoundary>
    </div>
  );
}
