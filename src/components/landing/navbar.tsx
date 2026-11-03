"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { scrollToId, scrollToTop, setScrollLocked } from "@/lib/smooth-scroll";
import { NavItem } from "@/types/landing";

interface NavbarProps {
  appName: string;
  navItems: NavItem[];
}

export function Navbar({ appName, navItems }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setScrollLocked(isMenuOpen);
    if (isMenuOpen) firstLink.current?.focus();
    return () => setScrollLocked(false);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Marks the section currently in the middle of the screen.
  useEffect(() => {
    const sections = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
          else setActiveHref((current) => (current === `#${entry.target.id}` ? "" : current));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
    if (!href.startsWith("#")) return;
    event.preventDefault();
    // The menu releases the page lock on its next render, so the scroll waits for that.
    window.requestAnimationFrame(() => {
      if (scrollToId(href.slice(1))) window.history.replaceState(null, "", href);
    });
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    scrollToTop();
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <span data-scroll-progress className="scroll-progress" aria-hidden />
      <div className={cn("nav-shell mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 pl-3 pr-2 sm:h-16 sm:pl-4", isScrolled && "is-scrolled")}>
        <Link href="/" onClick={handleLogoClick} className="inline-flex shrink-0 items-center gap-2.5 rounded-xl" aria-label={`${appName} home`}>
          <Image src="/images/cd4-logo-nav.png" alt="" width={36} height={36} className="rounded-[0.625rem] object-contain" unoptimized />
          <span className="font-heading text-base font-bold tracking-tight text-white sm:text-lg">{appName}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleAnchorClick(event, item.href)}
              aria-current={activeHref === item.href ? "location" : undefined}
              className={cn("nav-link", activeHref === item.href && "is-active")}
            >
              {activeHref === item.href ? (
                <motion.span layoutId="nav-active" className="nav-active" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              ) : null}
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#download" onClick={(event) => handleAnchorClick(event, "#download")} className="nav-cta hidden sm:inline-flex">
            Get App
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            ref={toggle}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="nav-toggle lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={cn("nav-sheet lg:hidden", isMenuOpen && "is-open")} inert={!isMenuOpen}>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstLink : undefined}
              href={item.href}
              onClick={(event) => handleAnchorClick(event, item.href)}
              aria-current={activeHref === item.href ? "location" : undefined}
              className="nav-sheet-link"
              style={{ transitionDelay: isMenuOpen ? `${60 + index * 35}ms` : "0ms" }}
            >
              {item.label}
              <ArrowRight className="h-5 w-5 text-[#37D6E8]" />
            </a>
          ))}
        </nav>
        <a href="#download" onClick={(event) => handleAnchorClick(event, "#download")} className="btn-primary w-full">
          Get the app
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}
