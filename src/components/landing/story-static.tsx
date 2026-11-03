import Link from "next/link";
import { ArrowRight, Building2, CalendarCheck, FileSearch, Languages, MapPinned, Mic, Search, ShieldCheck, Star, Stethoscope } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { SmoothLink } from "@/components/shared/smooth-link";
import { TestimonialItem } from "@/types/landing";

export function VoiceSection() {
  return (
    <section id="voice" data-stage="voice" data-dark className="story-section relative flex min-h-[115svh] items-center py-24">
      <Container>
        <div className="visual-gap" aria-hidden />
        <div className="max-w-xl">
          <Heading
            kicker="Voice-first healthcare"
            title={
              <>
                Say it the way <em className="accent-serif">you would say it.</em>
              </>
            }
            description="Instead of filling long forms, speak naturally. CD4 listens, asks what it needs to know, and helps you reach a doctor."
          />
          <div className="mt-8 grid gap-3" data-reveal>
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#37D6E8]">
                  <Mic className="h-4 w-4" />
                  Listening
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c5d6e8]">
                  <Languages className="h-4 w-4" />
                  हिंदी · English
                </span>
              </div>
              <div className="voice-bars mt-4" aria-hidden>
                {Array.from({ length: 34 }, (_, index) => (
                  <span key={index} style={{ "--i": index } as React.CSSProperties} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="glass max-w-[85%] self-start rounded-2xl rounded-bl-md px-4 py-3 text-sm text-white" lang="hi">
                मुझे कल के लिए डॉक्टर से मिलना है।
              </p>
              <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#248BFF] px-4 py-3 text-sm font-medium text-[#071426]">
                Sure. Tell me what is bothering you, and I will help you find the right doctor.
              </p>
              <p className="text-xs text-[#9fb4cb]">Illustrative conversation</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function DoctorsSection() {
  return (
    <section id="doctors" data-stage="doctors" data-dark className="story-section relative flex min-h-[115svh] items-center py-24">
      <Container>
        <div className="visual-gap" aria-hidden />
        <div className="max-w-xl">
          <Heading
            kicker="Verified doctor discovery"
            title={
              <>
                The right doctor, <em className="accent-serif">with the full picture.</em>
              </>
            }
            description="Search in the app by what matters to you, then book a slot that is actually open."
          />
          <div className="glass mt-8 rounded-3xl p-4 sm:p-5" data-reveal>
            <div className="flex items-center gap-2 rounded-xl border border-white/12 bg-[#071426]/60 px-3 py-2.5 text-sm text-[#9fb4cb]">
              <Search className="h-4 w-4" />
              Find a doctor
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-white">
              <li className="filter-pill"><Stethoscope className="h-4 w-4 text-[#37D6E8]" />Specialization</li>
              <li className="filter-pill"><MapPinned className="h-4 w-4 text-[#37D6E8]" />Location</li>
              <li className="filter-pill"><Star className="h-4 w-4 text-[#37D6E8]" />Ratings</li>
              <li className="filter-pill"><CalendarCheck className="h-4 w-4 text-[#37D6E8]" />Availability</li>
            </ul>
            <div className="mt-4 grid gap-2" aria-hidden>
              {[0, 1].map((row) => (
                <div key={row} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <span className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-[#248BFF]/50 to-[#37D6E8]/30" />
                  <span className="grid flex-1 gap-1.5">
                    <span className="h-2.5 w-2/5 rounded-full bg-white/30" />
                    <span className="h-2 w-3/5 rounded-full bg-white/15" />
                  </span>
                  <span className="h-7 w-16 rounded-full bg-[#37D6E8]/25" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-[#9fb4cb]">Layout preview. Doctor profiles, ratings and open slots are shown live in the app.</p>
          </div>
          <div className="mt-6" data-reveal>
            <SmoothLink href="#download" className="btn-primary">
              Book through the app
              <ArrowRight className="h-4 w-4" />
            </SmoothLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

const PARTNER_POINTS = [
  { icon: Building2, title: "Hospital registration", body: "Register your hospital with its legal and contact details." },
  { icon: Stethoscope, title: "Clinics and nursing homes", body: "Smaller facilities can apply through the same form." },
  { icon: FileSearch, title: "Diagnostic partners", body: "Diagnostic centres can share their services and setup." },
  { icon: ShieldCheck, title: "Verification details", body: "Submit registration, authority, and document details for CD4 partner review." },
  { icon: MapPinned, title: "Location and services", body: "Share address, Google Maps link, departments, facilities, and OPD setup." },
  { icon: CalendarCheck, title: "Onboarding coordination", body: "CD4 team reviews the request and contacts the authorized hospital person." }
];

export function HospitalSection() {
  return (
    <section id="hospital-partners" data-stage="hospital" data-dark className="story-section relative py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <Heading
            kicker="Hospital partnerships"
            title="Bring Your Hospital Into the CD4 Care Network."
            description="Hospitals, clinics, nursing homes, and diagnostic partners can submit their registration details for CD4 verification and onboarding coordination."
          />
          <div data-reveal>
            <Link href="/hospital-onboarding" className="btn-primary mt-8">
              Register hospital
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {PARTNER_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <article key={point.title} className="glass rounded-2xl p-5" data-reveal>
                <Icon className="h-5 w-5 text-[#37D6E8]" />
                <h3 className="mt-3 font-heading text-base font-bold text-white">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#c5d6e8]">{point.body}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsSection({ items }: { items: TestimonialItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="testimonials" data-dark className="story-section relative py-20 sm:py-28">
      <Container>
        <Heading kicker="Voices" title="What people say about CD4." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.name} className="glass rounded-3xl p-6" data-reveal>
              <blockquote className="text-base leading-7 text-white">“{item.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-[#9fb4cb]">
                {item.name} · {item.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
