import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SmoothLink } from "@/components/shared/smooth-link";

interface FooterProps {
  appName: string;
}

const EXPLORE = [
  { label: "Why CD4", href: "#why-cd4-ai" },
  { label: "Features", href: "#features" },
  { label: "Try Demo", href: "#try-demo" },
  { label: "How It Works", href: "#journey" },
  { label: "Download", href: "#download" },
  { label: "FAQ", href: "#faq" }
];

const PROMISES = ["Doctor-led decisions", "AI-assisted context before the doctor visit", "Continuous care records for follow-up"];

const INSTAGRAM_URL = "https://www.instagram.com/cd4.ai/";
const EMAIL = "cd4help.app@gmail.com";

export function Footer({ appName }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer data-stage="end" className="site-footer relative z-10 overflow-hidden bg-[#071426] pb-6 pt-12 sm:pt-14">
      <Container className="relative">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.7fr_0.75fr_1.05fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/images/cd4-logo-nav.png" alt="" width={44} height={44} className="rounded-xl object-contain" unoptimized />
              <span className="font-heading text-xl font-bold tracking-tight text-white">{appName}</span>
            </Link>
            <p className="mt-5 font-accent text-3xl italic leading-tight text-[#37D6E8]">Healthcare That Understands You.</p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#9fb4cb]">
              CD4 is an India-wide AI-based healthcare platform for voice booking, AI symptom context, report understanding, and follow-up care.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-[#c5d6e8]">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#37D6E8]" />
                  {promise}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Explore">
            <h2 className="footer-title">Explore</h2>
            <ul className="mt-4 grid gap-2.5">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <SmoothLink href={link.href} className="footer-link">
                    {link.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid content-start gap-7">
            <nav aria-label="Partners">
              <h2 className="footer-title">Partners</h2>
              <ul className="mt-4 grid gap-2.5">
                <li>
                  <Link href="/hospital-onboarding" className="footer-link">
                    Hospital Onboarding
                  </Link>
                </li>
                <li>
                  <SmoothLink href="#hospital-partners" className="footer-link">
                    Hospital Partnerships
                  </SmoothLink>
                </li>
              </ul>
            </nav>
            <nav aria-label="Legal">
              <h2 className="footer-title">Legal</h2>
              <ul className="mt-4 grid gap-2.5">
                <li>
                  <Link href="/privacy-policy" className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/delete-account" className="footer-link">
                    Delete Account
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h2 className="footer-title">Contact</h2>
            <a href={`mailto:${EMAIL}`} className="footer-link mt-4 inline-flex items-center gap-2 break-all">
              <Mail className="h-4 w-4 shrink-0 text-[#37D6E8]" />
              {EMAIL}
            </a>
            <address className="mt-4 flex gap-2 text-sm not-italic leading-6 text-[#c5d6e8]">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#37D6E8]" />
              <span>
                <span className="font-semibold text-white">Office Address</span>
                <br />
                Sector 46-B, Chandigarh, India
              </span>
            </address>
            <p className="mt-4 text-sm leading-6 text-[#c5d6e8]">
              <span className="font-semibold text-white">Service Area</span>
              <br />
              Serving across India
            </p>

            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Open CD4 AI Instagram profile" className="footer-instagram">
              <span className="shrink-0 rounded-xl bg-white p-1.5">
                <Image src="/cd4qr-clean.png" alt="CD4 AI Instagram QR code" width={72} height={77} className="h-[4.5rem] w-auto rounded-lg" unoptimized />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-heading text-base font-bold text-white">
                  <Instagram className="h-4 w-4 text-[#37D6E8]" />
                  @CD4.AI
                </span>
                <span className="mt-1 block text-xs leading-5 text-[#9fb4cb]">Updates, product news and health awareness.</span>
                <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-[#37D6E8]">
                  Open Instagram
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </span>
            </a>
          </div>
        </div>

        <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-6 text-[#9fb4cb]">
          <span className="font-semibold text-white">Responsible care.</span> CD4 organizes symptoms, reports, prescriptions, and follow-up context. It supports care decisions, while licensed doctors remain responsible for diagnosis and treatment.
        </p>

        <div className="mt-6 flex flex-col gap-1 border-t border-white/10 pt-4 text-xs text-[#7f95ad] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {appName}. All rights reserved.
          </p>
          <p>Sector 46-B, Chandigarh</p>
        </div>
      </Container>
    </footer>
  );
}
