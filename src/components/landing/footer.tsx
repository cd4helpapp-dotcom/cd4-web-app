import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, Instagram, MapPin, QrCode, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";

interface FooterProps {
  appName: string;
}

export function Footer({ appName }: FooterProps) {
  const year = new Date().getFullYear();
  const instagramUrl = "https://www.instagram.com/cd4.ai/";
  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#journey" },
    { label: "Why CD4", href: "#why-cd4-ai" },
    { label: "Download", href: "#download" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <footer className="border-t border-white/10 bg-[radial-gradient(circle_at_18%_0%,rgba(6,182,212,0.12),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(139,92,246,0.1),transparent_30%),rgba(5,8,15,0.92)] py-8 sm:py-10">
      <Container>
        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/cd4-logo-nav.png"
                alt="CD4 AI logo"
                width={42}
                height={42}
                className="rounded-xl object-contain"
                unoptimized
              />
              <span className="font-heading text-xl font-semibold text-white">{appName}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              CD4 is an India-wide AI-based healthcare platform for voice booking, AI symptom context, report understanding, and follow-up care.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <address className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 not-italic">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10">
                    <MapPin className="h-4 w-4 text-cyan-200" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                      Office Address
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">Sector 46-B</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">Chandigarh, India</p>
                  </div>
                </div>
              </address>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-300/10">
                    <Building2 className="h-4 w-4 text-emerald-200" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      Service Area
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">Serving across India</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Built for patient care, doctor context, and follow-up records nationwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open CD4 AI Instagram profile"
            className="footer-instagram-card premium-card block overflow-hidden rounded-3xl border border-cyan-300/18 bg-[linear-gradient(160deg,rgba(255,255,255,0.075),rgba(255,255,255,0.026))] p-5 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.9)] transition hover:border-cyan-300/40 sm:p-6 lg:max-w-xl lg:justify-self-end"
          >
            <div className="relative z-10 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
              <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-pink-300/25 bg-pink-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-pink-100 sm:col-span-2 sm:mx-0">
                <Instagram className="h-3.5 w-3.5 text-pink-300" />
                Instagram community
              </span>

              <span className="mx-auto block rounded-3xl bg-white p-3 shadow-[0_18px_46px_-28px_rgba(0,0,0,0.85)] ring-1 ring-cyan-100/70 sm:mx-0">
                <Image
                  src="/cd4qr-clean.png"
                  alt="CD4 AI Instagram QR code"
                  width={184}
                  height={197}
                  className="h-auto w-44 rounded-2xl object-contain sm:w-48"
                  unoptimized
                />
              </span>

              <span className="min-w-0 text-center sm:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                  <QrCode className="h-3.5 w-3.5" />
                  Scan or tap
                </span>
                <span className="mt-4 flex items-center justify-center gap-2 font-heading text-3xl leading-none text-white sm:justify-start">
                  <Instagram className="h-5 w-5 text-pink-300" />
                  @CD4.AI
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-300">
                  Follow CD4 AI updates, product news, and patient-first health awareness.
                </span>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_16px_34px_-24px_rgba(255,255,255,0.9)]">
                  Open Instagram
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
            </div>
          </a>
        </div>

        <div className="mt-8 grid gap-7 border-t border-white/10 pt-7 md:grid-cols-[0.8fr_1fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Explore
            </p>
            <nav className="mt-3 grid gap-2 text-sm text-slate-400">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Care Promise
            </p>
            <ul className="mt-3 grid gap-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span>Doctor-led decisions</span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span>AI-assisted context before the doctor visit</span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span>Continuous care records for follow-up</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Responsible Care
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              CD4 organizes symptoms, reports, prescriptions, and follow-up context. It supports
              care decisions, while licensed doctors remain responsible for diagnosis and treatment.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {appName}. All rights reserved.</p>
          <p>Sector 46-B, Chandigarh</p>
        </div>
      </Container>
    </footer>
  );
}
