"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BellRing, CalendarCheck, FileText, Pill, Stethoscope, User, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { SmoothLink } from "@/components/shared/smooth-link";
import { sceneStore } from "@/lib/scene-store";
import { DownloadLink } from "@/types/landing";

const NETWORK = [
  { label: "Patients", icon: User, body: "Everything starts with what you share, in your own words." },
  { label: "Doctors", icon: Stethoscope, body: "They see organized context before the visit, and they make the decisions." },
  { label: "Appointments", icon: CalendarCheck, body: "Find a slot and book it in the same journey." },
  { label: "Medical reports", icon: FileText, body: "Stored in one place and explained in simple language." },
  { label: "Prescriptions", icon: Pill, body: "Written instructions you can come back to after the visit." },
  { label: "Follow-up reminders", icon: BellRing, body: "Updates and reminders that keep care moving after the visit." },
  { label: "Community", icon: Users, body: "A health-focused space for awareness and shared experience." }
];

export function EcosystemSection() {
  const [active, setActive] = useState(0);

  const select = (index: number) => {
    setActive(index);
    sceneStore.networkFocus = index;
  };

  return (
    <section id="care-ecosystem" data-stage="ecosystem" data-dark className="story-section relative flex min-h-[130svh] flex-col justify-between gap-10 py-24">
      <Container>
        <Heading
          align="center"
          kicker="Continuous care"
          title={
            <>
              Care that continues <em className="accent-serif">after the booking.</em>
            </>
          }
          description="CD4 connects the people and records in your care, so each step starts with what came before."
        />
      </Container>
      <div className="visual-gap" aria-hidden />
      <Container>
        <div className="mx-auto max-w-4xl" data-reveal onMouseLeave={() => (sceneStore.networkFocus = -1)}>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Parts of the care ecosystem">
            {NETWORK.map((node, index) => {
              const Icon = node.icon;
              return (
                <button
                  key={node.label}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => select(index)}
                  onMouseEnter={() => select(index)}
                  onFocus={() => select(index)}
                  className={`chip ${active === index ? "is-active" : ""}`}
                >
                  <Icon className="h-4 w-4 text-[#37D6E8]" />
                  {node.label}
                </button>
              );
            })}
          </div>
          <div className="glass mx-auto mt-4 max-w-xl overflow-hidden rounded-2xl px-5 py-4 text-center" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={NETWORK[active].label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="text-sm leading-6 text-[#dbe8f5]"
              >
                {NETWORK[active].body}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StoreCard({ link }: { link: DownloadLink }) {
  const inner = (
    <>
      <span className="min-w-0">
        <span className="block font-heading text-base font-bold text-white">{link.label}</span>
        <span className="mt-0.5 block text-xs leading-5 text-[#9fb4cb]">{link.note}</span>
      </span>
      {link.comingSoon ? (
        <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-[#c5d6e8]">Coming Soon</span>
      ) : (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#37D6E8] px-3 py-1 text-xs font-bold text-[#071426]">
          Live
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      )}
    </>
  );

  // A store that is not live has nowhere to go, so it is plain text and not a dead link.
  if (link.comingSoon) return <div className="store-row">{inner}</div>;

  return (
    <motion.a href={link.href} target="_blank" rel="noreferrer" className="store-row store-row-live" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
      {inner}
    </motion.a>
  );
}

export function AppSection({ links }: { links: DownloadLink[] }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = section.current;
    if (!element) return;
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        sceneStore.phoneProgress = self.progress;
      }
    });
    return () => trigger.kill();
  }, []);

  return (
    <section ref={section} id="download" data-stage="app" data-dark className="story-section relative flex min-h-[125svh] items-center py-24">
      <Container>
        <div className="visual-gap" aria-hidden />
        <div className="max-w-lg">
          <Heading
            kicker="The CD4 AI app"
            title={
              <>
                Your care journey, <em className="accent-serif">in your pocket.</em>
              </>
            }
            description="Talk to CD4 AI, check your reports, find a department and reach your doctor, all from one app."
          />
          <div className="css-phone mt-8" aria-hidden>
            <Image src="/images/app/home.webp" alt="" width={390} height={844} unoptimized />
          </div>
          <div className="mt-8 grid gap-3" data-reveal>
            {links.map((link) => (
              <StoreCard key={link.id} link={link} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="get-started" data-stage="cta" data-dark className="story-section relative flex min-h-svh items-center pb-[24svh] pt-24 text-center">
      <Container>
        <div className="mx-auto max-w-3xl" data-reveal>
          <h2 className="display-1 text-white">
            Your Health Journey. <em className="accent-serif">Better Connected.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#c5d6e8] sm:text-lg sm:leading-8">
            Experience a smarter, more connected way to manage your healthcare journey.
          </p>
          <SmoothLink href="#download" className="btn-primary mt-8">
            Get Started With CD4 AI
            <ArrowRight className="h-4 w-4" />
          </SmoothLink>
        </div>
      </Container>
    </section>
  );
}
