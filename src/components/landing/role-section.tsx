import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RoleHighlight } from "@/types/landing";

interface RoleSectionProps {
  roles: RoleHighlight[];
}

export function RoleSection({ roles }: RoleSectionProps) {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Why Patients Trust CD4 AI"
          title="Built to make every health decision faster, clearer, and safer."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {roles.map((role, index) => (
            <article
              key={role.role}
              className="premium-card reveal-up rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.85)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                {role.role}
              </p>
              <h3 className="mt-3 font-heading text-xl text-white">{role.title}</h3>

              <ul className="mt-4 space-y-2">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
