"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, ChevronDown, ClipboardList, FileSearch, Mic, ShieldCheck, Stethoscope, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { FaqItem } from "@/types/landing";

const CAPABILITIES = [
  { title: "Voice Appointment Booking", body: "Patients can naturally book appointments using Hindi or English voice commands.", icon: Mic, visual: "wave" },
  { title: "AI History Snapshot", body: "Transform symptom conversations into structured doctor-ready health history.", icon: ClipboardList, visual: "rows" },
  { title: "Verified Doctor Discovery", body: "Discover doctors through specialization, location, ratings and availability.", icon: Stethoscope, visual: "orbit" },
  { title: "Prescription & Report Intelligence", body: "Upload medical reports and prescriptions and understand their contents through AI-assisted explanations.", icon: FileSearch, visual: "sheet" },
  { title: "Recovery Follow-up Support", body: "Manage follow-ups, secure conversations, updates and reminders.", icon: CalendarCheck, visual: "steps" },
  { title: "Healthcare Community", body: "Connect patients through a health-focused social community and awareness platform.", icon: Users, visual: "people" }
];

const JUMP = { y: 130, scale: 0.82, rotate: 5, autoAlpha: 0, duration: 0.95, ease: "back.out(2.1)" };

function CapabilityVisual({ kind }: { kind: string }) {
  const count = kind === "wave" ? 22 : kind === "rows" || kind === "steps" ? 4 : kind === "people" ? 5 : 3;
  return (
    <div className={`cap-visual cap-${kind}`} aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} style={{ "--i": index } as CSSProperties} />
      ))}
    </div>
  );
}

/** On desktop the cards travel sideways while the page is held still. On touch screens they stack. */
export function CapabilitiesSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = section.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = element.querySelector<HTMLElement>(".cap-track");
      if (!track) return;
      element.classList.add("cap-live");
      const travel = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 64),
        ease: "none",
        scrollTrigger: { trigger: element, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true }
      });
      gsap.utils.toArray<HTMLElement>(element.querySelectorAll(".cap-slot")).forEach((slot, index) => {
        const alreadyOnScreen = slot.getBoundingClientRect().left < window.innerWidth * 0.95;
        gsap.from(slot, {
          ...JUMP,
          delay: alreadyOnScreen ? index * 0.1 : 0,
          scrollTrigger: alreadyOnScreen
            ? { trigger: element, start: "top 55%", toggleActions: "play none none reverse" }
            : { trigger: slot, containerAnimation: travel, start: "left 96%", toggleActions: "play none none reverse" }
        });
      });
      gsap.fromTo(
        element.querySelector(".cap-progress-fill"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: element, start: "top top", end: "bottom bottom", scrub: 0.4 } }
      );
      ScrollTrigger.refresh();
      return () => element.classList.remove("cap-live");
    });
    media.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(element.querySelectorAll(".cap-slot")).forEach((slot) => {
        gsap.from(slot, { ...JUMP, scrollTrigger: { trigger: slot, start: "top 90%", toggleActions: "play none none reverse" } });
      });
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={section} id="features" data-stage="features" data-dark className="story-section relative">
      <div className="cap-pin py-20 sm:py-24">
        <Container>
          <Heading kicker="Core capabilities" title="Six ways CD4 makes care easier to follow." />
        </Container>
        <div className="cap-track mt-10 sm:mt-12">
          {CAPABILITIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="cap-slot">
              <motion.article
                className="cap-card"
                data-tilt
                whileHover={{ y: -20, rotateX: 5, rotateY: -5, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 13 }}
              >
                <CapabilityVisual kind={item.visual} />
                <div className="flex items-center justify-between">
                  <span className="cap-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="cap-index" aria-hidden>0{index + 1}</span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#c5d6e8]">{item.body}</p>
              </motion.article>
              </div>
            );
          })}
        </div>
        <div className="cap-progress" aria-hidden>
          <span className="cap-progress-fill" />
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { number: "01", title: "Speak Your Concern", body: "Start with voice in your preferred language and share symptoms naturally without typing everything manually.", visual: "wave" },
  { number: "02", title: "Generate AI Health Snapshot", body: "CD4 structures your symptom history and key details into a doctor-ready summary before booking.", visual: "rows" },
  { number: "03", title: "Connect With Your Doctor", body: "Confirm a slot and share your context with the doctor, so the visit starts with what matters.", visual: "orbit" },
  { number: "04", title: "Continue Your Care Journey", body: "Understand prescriptions and reports after the visit, and stay connected for follow-up care.", visual: "steps" }
];

/** Four steps on one held screen, each arriving its own way while the 3D scene acts it out beside it. */
export function HowSection() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = section.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      element.classList.add("how-live");
      const steps = gsap.utils.toArray<HTMLElement>(element.querySelectorAll(".how-step"));
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => setActive(Math.min(Math.floor(self.progress * 4), 3))
        }
      });
      timeline.to(steps[0], { autoAlpha: 0, y: -70, duration: 0.5 }, 0.75);
      timeline.fromTo(steps[1], { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" }, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 0.6 }, 0.95);
      timeline.to(steps[1], { autoAlpha: 0, x: -90, duration: 0.5 }, 1.85);
      timeline.fromTo(steps[2], { autoAlpha: 0, scale: 0.8, filter: "blur(14px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.6 }, 2.05);
      timeline.to(steps[2], { autoAlpha: 0, scale: 1.14, duration: 0.5 }, 2.95);
      timeline.fromTo(steps[3], { autoAlpha: 0, rotateX: -60, y: 70 }, { autoAlpha: 1, rotateX: 0, y: 0, duration: 0.6 }, 3.15);
      timeline.to({}, { duration: 0.5 }, 3.75);
      timeline.fromTo(element.querySelector(".how-rail-fill"), { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 4.25 }, 0);
      ScrollTrigger.refresh();
      return () => element.classList.remove("how-live");
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={section} id="journey" data-stage="howA howB howC howD" data-dark className="story-section relative">
      <div className="how-pin py-20 sm:py-24">
        <Container className="how-layout">
          <div className="how-copy">
            <Heading kicker="How CD4 works" title="Four steps, from a concern to continued care." />
            <div className="how-body mt-10">
              <div className="how-rail" aria-hidden>
                <span className="how-rail-fill" />
              </div>
              <ol className="how-stack">
                {STEPS.map((step, index) => (
                  <li key={step.number} className="how-step">
                    <span className={`step-number ${active === index ? "is-active" : ""}`} aria-hidden>
                      {step.number}
                    </span>
                    <h3 className="mt-2 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">{step.title}</h3>
                    <p className="mt-3 max-w-md text-base leading-7 text-[#c5d6e8]">{step.body}</p>
                    <div className="how-mobile-visual">
                      <CapabilityVisual kind={step.visual} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

const ROLES = [
  { label: "For Patients", number: "01", variant: "role-patients", title: "Effortless voice-based healthcare access.", points: ["Book appointments directly with voice", "No long forms, no confusing booking steps", "Smooth journey from first concern to follow-up"] },
  { label: "For Doctors", number: "02", variant: "role-doctors", title: "Better patient context before appointments.", points: ["AI history snapshot is shared before the call", "Doctors see symptom flow and report context", "More focused conversations with patients"] },
  { label: "For Families", number: "03", variant: "role-families", title: "Organized healthcare records and continuity.", points: ["Store prescriptions, reports, and booking history", "Track recovery progress across care visits", "Share updates confidently during treatment"] }
];

export function RolesSection() {
  return (
    <section id="roles" data-stage="roles" data-dark className="story-section relative py-20 sm:py-28">
      <Container>
        <div className="grid gap-4 lg:grid-cols-3">
          {ROLES.map((role, index) => (
            <motion.article
              key={role.label}
              className={`role-card ${role.variant}`}
              initial={{ opacity: 0, y: 50, rotate: index === 1 ? 0 : index === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.08 }}
            >
              <span className="role-number" aria-hidden>{role.number}</span>
              <p className="role-label">{role.label}</p>
              <h2 className="display-3 mt-3">{role.title}</h2>
              <ul className="role-points mt-6 grid gap-2.5 text-sm leading-6">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <ShieldCheck className="mt-1 h-4 w-4 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" data-stage="faq" data-dark className="story-section relative py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <Heading kicker="FAQ" title="Answers to common questions." />
        <div className="grid gap-3">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    {item.question}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="shrink-0">
                      <ChevronDown className="h-5 w-5 text-[#37D6E8]" />
                    </motion.span>
                  </button>
                </h3>
                {/* Answers stay in the page when closed, so search engines can still read them. */}
                <motion.div
                  id={`faq-panel-${index}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                  inert={!isOpen}
                >
                  <p className="pt-3 text-sm leading-7 text-[#c5d6e8] sm:text-base">{item.answer}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
