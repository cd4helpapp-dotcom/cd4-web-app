import { Brain, HeartPulse, Link2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export function NameStorySection() {
  return (
    <section id="why-cd4-ai" className="py-16 sm:py-20">
      <Container className="grid items-start gap-8 lg:grid-cols-[1fr_0.95fr]">
        <SectionHeading
          kicker="Why CD4 AI"
          title="Inspired by biological intelligence. Built for coordinated care."
          description="In the human body, CD4 cells help coordinate immune response like a smart command center. We chose the name CD4 AI because our product does the same in healthcare by syncing patients, doctors, and AI context into one connected flow."
        />

        <article className="premium-card relative overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_58px_-34px_rgba(0,0,0,0.9)]">
          <div className="bg-noise" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Name Origin
            </p>
            <h3 className="mt-3 font-heading text-2xl text-white">Why we chose CD4 AI</h3>

            <ul className="mt-5 space-y-3">
              <li className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10">
                  <Brain className="h-4 w-4 text-cyan-200" />
                </span>
                <p className="text-sm leading-6 text-slate-200">
                  CD4 in biology represents coordination and response readiness.
                </p>
              </li>
              <li className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-300/35 bg-emerald-300/10">
                  <HeartPulse className="h-4 w-4 text-emerald-200" />
                </span>
                <p className="text-sm leading-6 text-slate-200">
                  AI brings clarity from voice symptoms, history, and reports before consultation.
                </p>
              </li>
              <li className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-300/35 bg-violet-300/10">
                  <Link2 className="h-4 w-4 text-violet-200" />
                </span>
                <p className="text-sm leading-6 text-slate-200">
                  CD4 AI connects patient voice, doctor context, and follow-up continuity in one care journey.
                </p>
              </li>
            </ul>
          </div>
        </article>
      </Container>
    </section>
  );
}
