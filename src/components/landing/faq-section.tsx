import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqItem } from "@/types/landing";

interface FaqSectionProps {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section id="faq" className="pt-8 pb-16 sm:py-20">
      <Container>
        <SectionHeading kicker="FAQ" title="Answers to common patient questions." />

        <div className="mt-10 space-y-3">
          {items.map((item, index) => (
            <details
              key={item.question}
              className="group premium-card reveal-up rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-4"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <summary className="cursor-pointer list-none font-heading text-xl text-white">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
