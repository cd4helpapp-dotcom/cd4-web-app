"use client";

import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/shared/container";
import { NavItem } from "@/types/landing";

interface NavbarProps {
  appName: string;
  navItems: NavItem[];
}

export function Navbar({ appName, navItems }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileHiddenSections = new Set(["#why-cd4-ai", "#faq"]);
  const mobileNavItems = navItems.filter((item) => !mobileHiddenSections.has(item.href));

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      setIsMenuOpen(false);
      return;
    }

    event.preventDefault();
    setIsMenuOpen(false);

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionId = href.slice(1);
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    const headerOffset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: "smooth"
    });
    window.history.replaceState(null, "", href);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <motion.header 
      initial={false}
      animate={{
        backgroundColor: isScrolled ? "rgba(7,9,15,0.95)" : "rgba(7,9,15,0)",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        borderColor: isScrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
        paddingTop: isScrolled ? "0px" : "8px",
        paddingBottom: isScrolled ? "0px" : "8px",
      }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 border-b"
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="inline-flex items-center gap-3"
        >
          <Image
            src="/images/cd4-logo-nav.png"
            alt={`${appName} logo`}
            width={40}
            height={40}
            className="rounded-xl object-contain shadow-[0_8px_20px_-10px_rgba(0,0,0,0.8)]"
            unoptimized
          />
          <span className="font-heading text-lg font-semibold text-white">{appName}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleAnchorClick(event, item.href)}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#download"
          onClick={(event) => handleAnchorClick(event, "#download")}
          className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_10px_30px_rgba(139,92,246,0.35)] md:inline-flex"
        >
          Get App
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-100 transition hover:border-white/30 hover:text-white md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={`absolute left-0 right-0 top-full overflow-hidden border-t border-white/10 bg-[rgba(7,9,15,0.97)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.85)] transition-[max-height,opacity] duration-300 md:hidden ${
          isMenuOpen ? "max-h-[22rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <Container className="py-3">
          {mobileNavItems.map((item) => (
            <a
              key={`mobile-${item.href}`}
              href={item.href}
              onClick={(event) => handleAnchorClick(event, item.href)}
              className="block border-b border-white/10 px-1 py-3 text-base font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#download"
            onClick={(event) => handleAnchorClick(event, "#download")}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:shadow-[0_10px_30px_rgba(139,92,246,0.35)]"
          >
            Get App
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Container>
      </div>
    </motion.header>
  );
}
