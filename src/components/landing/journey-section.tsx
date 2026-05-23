import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { JourneyStep } from "@/types/landing";

interface JourneySectionProps {
  steps: JourneyStep[];
}

export function JourneySection({ steps }: JourneySectionProps) {
  return (
    <section id="journey" className="py-12 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Care Journey"
          title="From voice booking to doctor-ready consultation in four steps."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="premium-card reveal-up rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 font-heading text-sm text-cyan-200">
                {index + 1}
              </div>
              <h3 className="mt-4 font-heading text-xl text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
