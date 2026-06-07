import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Home, Mail } from "lucide-react";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Hospital Onboarding Submitted",
  description: "Thank you for submitting the CD4 hospital onboarding form.",
  robots: {
    index: false,
    follow: false
  }
};

export default function HospitalOnboardingThankYouPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="hero-bg" aria-hidden>
        <div className="grid-lines" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <Container className="relative z-10 flex min-h-screen items-center py-10">
        <section className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.055] p-6 text-center shadow-[0_34px_120px_-70px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8">
          <Link href="/" className="mx-auto inline-flex items-center gap-3">
            <Image
              src="/images/cd4-logo-nav.png"
              alt="CD4 AI logo"
              width={46}
              height={46}
              className="rounded-xl object-contain"
              unoptimized
            />
            <span className="font-heading text-xl font-semibold text-white">CD4 AI</span>
          </Link>

          <span className="mx-auto mt-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/10">
            <CheckCircle2 className="h-8 w-8 text-emerald-200" />
          </span>

          <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-white">
            Hospital onboarding request received
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300">
            Thank you for sharing the hospital details. The CD4 team will review the registration,
            services, contact, and verification information before reaching out for the next steps.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              href="/hospital-onboarding"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Submit another hospital
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 text-sm font-bold text-slate-950"
            >
              <Home className="h-4 w-4" />
              Back to CD4 home
            </Link>
          </div>

          <p className="mt-6 inline-flex items-center justify-center gap-2 text-xs leading-5 text-slate-500">
            <Mail className="h-3.5 w-3.5" />
            Keep your documents ready for verification.
          </p>
        </section>
      </Container>
    </main>
  );
}
