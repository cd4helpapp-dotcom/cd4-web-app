"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialItem } from "@/types/landing";

interface TestimonialSectionProps {
  items: TestimonialItem[];
}

const avatarStyles = [
  "from-violet-500 to-cyan-400",
  "from-cyan-500 to-emerald-400",
  "from-indigo-500 to-blue-400",
  "from-emerald-500 to-teal-400",
  "from-fuchsia-500 to-violet-400"
];

export function TestimonialSection({ items }: TestimonialSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    let index = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const clearResetTimer = () => {
      if (resetTimer) {
        clearTimeout(resetTimer);
        resetTimer = null;
      }
    };

    const jumpToStart = () => {
      const previousScrollBehavior = scroller.style.scrollBehavior;

      scroller.style.scrollBehavior = "auto";
      scroller.scrollLeft = 0;
      index = 0;

      window.requestAnimationFrame(() => {
        scroller.style.scrollBehavior = previousScrollBehavior;
      });
    };

    const moveToNext = () => {
      const cards = scroller.querySelectorAll<HTMLElement>(".testimonial-card");
      const realCardCount = items.length;

      if (!cards.length || realCardCount < 2) {
        return;
      }

      clearResetTimer();
      index += 1;

      const nextCard = cards[index];

      if (!nextCard) {
        jumpToStart();
        return;
      }

      scroller.scrollTo({
        left: nextCard.offsetLeft,
        behavior: "smooth"
      });

      if (index === realCardCount) {
        resetTimer = setTimeout(jumpToStart, 700);
      }
    };

    const intervalId = setInterval(moveToNext, 3000);

    window.addEventListener("resize", jumpToStart);

    return () => {
      clearInterval(intervalId);
      clearResetTimer();
      window.removeEventListener("resize", jumpToStart);
    };
  }, [items.length]);

  const renderCard = (item: TestimonialItem, index: number, keyPrefix: string) => (
    <article
      key={`${keyPrefix}-${item.name}-${index}`}
      className="testimonial-card premium-card min-w-[290px] max-w-[340px] shrink-0 rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.85)]"
    >
      <p className="text-sm tracking-[0.25em] text-amber-300">★★★★★</p>
      <p className="mt-4 text-sm leading-7 text-slate-200">{item.quote}</p>

      <div className="mt-5 flex items-center gap-3">
        <div
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${
            avatarStyles[index % avatarStyles.length]
          } text-sm font-semibold text-white`}
        >
          {item.initials}
        </div>
        <div>
          <p className="font-semibold text-white">{item.name}</p>
          <p className="text-xs text-slate-400">{item.role}</p>
        </div>
      </div>
    </article>
  );

  return (
    <section id="testimonials" className="py-12 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Voices"
          title="What people are saying."
          description="Real feedback from patients and doctors using CD4 AI in everyday care journeys."
        />

        <div ref={scrollerRef} className="testimonials-marquee mt-10">
          <div className="testimonials-track">
            <div className="testimonials-set">{items.map((item, index) => renderCard(item, index, "a"))}</div>
            <div className="testimonials-set" aria-hidden>
              {items.map((item, index) => renderCard(item, index, "b"))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
