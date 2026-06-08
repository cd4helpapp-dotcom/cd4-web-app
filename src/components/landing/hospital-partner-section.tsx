import Link from "next/link";
import { ArrowRight, Building2, CalendarCheck, MapPinned, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";

const partnerPoints = [
  {
    icon: ShieldCheck,
    title: "Verification details",
    description: "Submit registration, authority, and document details for CD4 partner review."
  },
  {
    icon: MapPinned,
    title: "Location and services",
    description: "Share address, Google Maps link, departments, facilities, and OPD setup."
  },
  {
    icon: CalendarCheck,
    title: "Onboarding coordination",
    description: "CD4 team reviews the request and contacts the authorized hospital person."
  }
];

export function HospitalPartnerSection() {
  return (
    <section id="hospital-partners" className="py-12 sm:py-20">
      <Container>
        <div className="grid gap-8 rounded-3xl border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(8,15,28,0.94),rgba(13,21,38,0.9))] px-6 py-8 shadow-[0_24px_80px_-50px_rgba(34,211,238,0.45)] sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
              <Building2 className="h-3.5 w-3.5" />
              Hospital partners
            </div>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-white sm:text-4xl">
              Bring your hospital onto the CD4 care network.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Hospitals, clinics, nursing homes, and diagnostic partners can submit their
              registration details for CD4 verification and onboarding coordination.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/hospital-onboarding"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_16px_35px_-20px_rgba(34,211,238,0.8)] transition hover:bg-cyan-200"
              >
                Register hospital
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hospital-onboarding"
                className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/45 hover:bg-white/[0.04]"
              >
                Partner verification form
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {partnerPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.title}
                  className="rounded-2xl border border-white/12 bg-white/[0.045] p-4"
                >
                  <div className="flex gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/24 bg-cyan-300/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg text-white">{point.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{point.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
