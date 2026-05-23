import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";

interface FooterProps {
  appName: string;
}

export function Footer({ appName }: FooterProps) {
  const year = new Date().getFullYear();
  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#journey" },
    { label: "Why CD4 AI", href: "#why-cd4-ai" },
    { label: "Download", href: "#download" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <footer className="border-t border-white/10 bg-[rgba(5,8,15,0.72)] py-8 sm:py-10">
      <Container>
        <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
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
              Voice booking, AI symptom context, report understanding, and follow-up care in one connected health flow.
            </p>
          </div>

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
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>Doctor-led decisions</li>
              <li>AI-assisted context</li>
              <li>Continuous care records</li>
            </ul>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {appName}. All rights reserved.</p>
          <p>AI guidance supports care, but doctors make final medical decisions.</p>
        </div>
      </Container>
    </footer>
  );
}
