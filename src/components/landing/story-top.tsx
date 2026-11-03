"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, BrainCircuit, FileText, HeartPulse, Mic, Stethoscope } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { SmoothLink } from "@/components/shared/smooth-link";
import { sceneStore } from "@/lib/scene-store";
import { HeroStat } from "@/types/landing";

const HERO_CHIPS = [
  { id: "voice", icon: Mic, title: "Patient voice", sub: "Hindi or English" },
  { id: "ai", icon: BrainCircuit, title: "AI intelligence", sub: "Organizes your story" },
  { id: "doctor", icon: Stethoscope, title: "Doctor connection", sub: "Context before the visit" },
  { id: "records", icon: FileText, title: "Health records", sub: "Reports and prescriptions" }
];

export function HeroSection({ stats }: { stats: HeroStat[] }) {
  return (
    <section id="top" data-stage="hero" data-dark className="story-section relative flex min-h-svh flex-col justify-end overflow-hidden pb-20 pt-[44svh] lg:justify-center lg:pb-16 lg:pt-28">
      <div className="hero-chips" aria-hidden>
        {HERO_CHIPS.map((chip) => {
          const Icon = chip.icon;
          return (
            <span key={chip.id} data-chip={chip.id} className="hero-chip">
              <Icon className="h-3.5 w-3.5 shrink-0 text-[#37D6E8]" />
              <span>
                <span className="block font-heading font-bold text-white">{chip.title}</span>
                <span className="hero-chip-sub">{chip.sub}</span>
              </span>
            </span>
          );
        })}
      </div>
      <Container className="relative">
        <div className="max-w-xl xl:max-w-2xl" data-hero-copy>
          <p className="kicker hero-rise">CD4 AI · India-wide AI healthcare</p>
          <h1 className="display-1 mt-5 text-white">
            <span className="word-rise" style={{ animationDelay: "60ms" }}>Healthcare</span>{" "}
            <span className="word-rise" style={{ animationDelay: "130ms" }}>That</span>{" "}
            <em className="accent-serif">
              <span className="word-rise" style={{ animationDelay: "230ms" }}>Understands</span>{" "}
              <span className="word-rise" style={{ animationDelay: "310ms" }}>You.</span>
            </em>
          </h1>
          <p className="hero-rise mt-6 max-w-lg text-base leading-7 text-[#c5d6e8] sm:text-lg sm:leading-8" style={{ animationDelay: "380ms" }}>
            Speak naturally. Let AI organize your health story. Connect with the right doctor and continue your care journey.
          </p>
          <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "460ms" }}>
            <SmoothLink href="#download" className="btn-primary">
              Download CD4 AI
              <ArrowRight className="h-4 w-4" />
            </SmoothLink>
            <SmoothLink href="#why-cd4-ai" className="btn-ghost">
              Explore the Experience
            </SmoothLink>
          </div>
          <dl className="hero-rise mt-9 hidden max-w-xl gap-5 border-t border-white/12 pt-6 sm:grid sm:grid-cols-3" style={{ animationDelay: "540ms" }}>
            {stats.map((stat) => (
              <div key={stat.value}>
                <dt className="font-heading text-sm font-bold text-white">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-5 text-[#9fb4cb]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
      <SmoothLink href="#why-cd4-ai" className="scroll-cue" aria-label="Scroll to the next section">
        <ArrowDown className="h-4 w-4" />
      </SmoothLink>
    </section>
  );
}

const CELL_FOCUS = [
  {
    label: "Patient voice",
    icon: Mic,
    tone: "text-[#37D6E8]",
    body: "A CD4 cell starts by picking up a signal. On CD4, that signal is you, describing how you feel in your own words."
  },
  {
    label: "AI context",
    icon: BrainCircuit,
    tone: "text-[#6db4ff]",
    body: "AI brings clarity from voice symptoms, history, and reports before the doctor visit."
  },
  {
    label: "Doctor care",
    icon: Stethoscope,
    tone: "text-white",
    body: "CD4 cells coordinate the response, they do not act alone. Here too, licensed doctors stay responsible for diagnosis and treatment."
  }
];

export function WhySection() {
  const [active, setActive] = useState(0);
  const Active = CELL_FOCUS[active];

  const select = (index: number) => {
    setActive(index);
    sceneStore.cellFocus = index;
  };

  return (
    <section id="why-cd4-ai" data-stage="why" data-dark className="story-section relative flex min-h-[110svh] items-center py-24">
      <Container>
        <div className="visual-gap" aria-hidden />
        <div className="max-w-xl">
          <Heading
            kicker="Why CD4"
            title={
              <>
                Inspired by Biological Intelligence. <em className="accent-serif">Built for Connected Care.</em>
              </>
            }
            description="In the human body, CD4 cells help coordinate immune response like a smart command center. We chose the name because this platform syncs patients, doctors, and AI context into one connected care flow."
          />
          <div className="mt-8" data-reveal onMouseLeave={() => (sceneStore.cellFocus = -1)}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Parts of the connected care flow">
              {CELL_FOCUS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-pressed={active === index}
                    onClick={() => select(index)}
                    onMouseEnter={() => select(index)}
                    onFocus={() => select(index)}
                    className={`chip ${active === index ? "is-active" : ""}`}
                  >
                    <Icon className={`h-4 w-4 ${item.tone}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="glass mt-4 min-h-[6.5rem] overflow-hidden rounded-2xl p-5" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={Active.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="text-sm leading-7 text-[#dbe8f5]"
                >
                  {Active.body}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const SNAPSHOT_CARDS = [
  { title: "Symptoms", body: "Fever and body ache", tag: "From the conversation" },
  { title: "Symptom timeline", body: "Started two days ago, worse at night", tag: "Put in order" },
  { title: "Medical history", body: "Only what the patient shares or uploads", tag: "Kept together" },
  { title: "Relevant observations", body: "Details the patient mentioned, for the doctor to review", tag: "Not a diagnosis" },
  { title: "Doctor-ready summary", body: "One clear page before the appointment", tag: "For the doctor" }
];

export function SnapshotSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = section.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      timeline.to(element.querySelectorAll(".snapshot-bubble"), { autoAlpha: 0.25, y: -14, stagger: 0.04, duration: 0.25 }, 0.1);
      timeline.from(element.querySelectorAll(".snapshot-card"), { autoAlpha: 0, x: 60, rotateY: -16, stagger: 0.12, duration: 0.28, ease: "power2.out" }, 0.14);
      timeline.to({}, { duration: 0.2 });
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={section} id="ai-snapshot" data-stage="snapshotA snapshotB" data-dark className="story-section relative lg:h-[260svh]">
      <div className="flex min-h-svh items-center py-20 lg:sticky lg:top-0 lg:h-svh">
        <Container className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <div className="visual-gap" aria-hidden />
            <Heading
              kicker="AI health snapshot"
              title={
                <>
                  From a conversation to <em className="accent-serif">clear context.</em>
                </>
              }
              description="What you say is organized into a summary your doctor can read before the visit. AI organizes information and supports doctors. It does not diagnose patients."
            />
            <div className="mt-6 grid max-w-md gap-2">
              <p className="snapshot-bubble glass rounded-2xl rounded-bl-md px-4 py-3 text-sm text-white" lang="hi">
                Mujhe do din se bukhar aur badan dard hai.
              </p>
              <p className="snapshot-bubble glass rounded-2xl rounded-bl-md px-4 py-3 text-sm text-white">It gets worse at night.</p>
              <p className="snapshot-bubble text-xs text-[#9fb4cb]">Illustrative example</p>
            </div>
          </div>
          <div className="holo-stage">
            <div className="holo-panel" data-depth="16">
              <div className="holo-head" aria-hidden>
                <span className="flex items-center gap-2 font-heading text-xs font-bold text-white">
                  <span className="demo-live-dot" />
                  CD4 AI · Health snapshot
                </span>
                <svg viewBox="0 0 160 28" className="holo-wave" fill="none">
                  <path d="M0 16 C10 16 12 6 20 6 S30 24 40 24 S52 10 60 10 S70 20 80 20 S92 4 100 4 S112 22 120 22 S132 12 140 12 S152 16 160 16" />
                </svg>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
            {SNAPSHOT_CARDS.map((card, index) => (
              <article key={card.title} className={`snapshot-card glass rounded-2xl p-5 ${index === 4 ? "snapshot-card-final sm:col-span-2" : ""}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-sm font-bold text-white">{card.title}</h3>
                  <span className="text-[11px] font-semibold text-[#37D6E8]">{card.tag}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#c5d6e8]">{card.body}</p>
              </article>
            ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

const REPORT_CARDS = [
  { title: "Report summary", body: "What the document covers, in plain words." },
  { title: "Prescription information", body: "Medicines and instructions as they are written." },
  { title: "Important observations", body: "Details on the page worth asking your doctor about." },
  { title: "Simple explanations", body: "What medical terms on the page mean." },
  { title: "Next-step guidance", body: "Practical pointers to discuss with your doctor." }
];

export function ReportsSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = section.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      timeline.from(element.querySelector(".doc-sheet"), { rotateY: 28, rotateX: 10, y: 30, duration: 0.3, ease: "none" }, 0);
      timeline.fromTo(element.querySelector(".doc-scan"), { top: "4%" }, { top: "94%", duration: 0.4, ease: "none" }, 0.05);
      timeline.from(element.querySelectorAll(".report-card"), { autoAlpha: 0, x: -70, scale: 0.92, stagger: 0.1, duration: 0.22, ease: "power2.out" }, 0.28);
      timeline.to({}, { duration: 0.14 });
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={section} id="reports" data-stage="reports" data-dark className="story-section relative lg:h-[230svh]">
      <div className="flex min-h-svh items-center pb-8 pt-24 lg:sticky lg:top-0 lg:h-svh">
        <Container>
          <Heading
            kicker="Report & prescription intelligence"
            title="Medical paperwork, explained simply."
            description="Upload a PDF or a photo. CD4 explains what is written, and checks its explanation against the page before showing it. It supports your doctor's advice and does not replace it."
            className="max-w-3xl"
          />
          <div className="mt-9 grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex justify-center [perspective:1100px]" data-drift>
              <div className="doc-sheet" aria-hidden>
                <span className="doc-scan" />
                <div className="flex items-center justify-between">
                  <span className="doc-badge">PDF</span>
                  <span className="doc-badge doc-badge-alt">JPG</span>
                </div>
                {[92, 70, 84, 48, 78, 60, 88, 40, 66, 82, 54, 74, 44].map((width, index) => (
                  <span key={index} className={`doc-line ${index % 4 === 0 ? "doc-line-strong" : ""}`} style={{ width: `${width}%` }} />
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2" data-depth="12">
              {REPORT_CARDS.map((card, index) => (
                <article key={card.title} className={`report-card ${index === 4 ? "sm:col-span-2" : ""}`}>
                  <h3 className="font-heading text-base font-bold text-white">{card.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#c5d6e8]">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-[#c5d6e8]">
            <HeartPulse className="h-4 w-4 shrink-0 text-[#37D6E8]" />
            In an emergency, call 112 and do not wait for an explanation in the app.
          </p>
        </Container>
      </div>
    </section>
  );
}
