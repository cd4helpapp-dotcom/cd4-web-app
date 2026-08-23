import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";

const officialEmail = "cd4help.app@gmail.com";

export const metadata: Metadata = {
  title: "Delete Account",
  description: "Request deletion of your CD4 AI account and associated data.",
  alternates: { canonical: "/delete-account" }
};

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-[rgba(7,9,15,0.92)]">
        <Container className="flex min-h-16 items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/images/cd4-logo-nav.png" alt="CD4 AI logo" width={40} height={40} className="rounded-xl object-contain" unoptimized />
            <span className="font-heading text-lg font-semibold text-white">CD4 AI</span>
          </Link>
          <Link href="/privacy-policy" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Privacy Policy
          </Link>
        </Container>
      </header>

      <Container className="py-14 sm:py-20">
        <article className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">
          <div className="flex items-center gap-3 text-cyan-200">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">CD4 AI privacy controls</span>
          </div>
          <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-white">Delete your account</h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
            To request permanent deletion of your CD4 AI account and associated data, email us from the email address linked to your account.
          </p>
          <a
            href={`mailto:${officialEmail}?subject=Account%20Deletion%20Request`}
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            <Mail className="h-4 w-4" /> Email deletion request
          </a>
          <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm leading-7 text-slate-400">
            <p><strong className="text-white">Email:</strong> {officialEmail}</p>
            <p><strong className="text-white">Subject:</strong> Account Deletion Request</p>
            <p>Please include the account email or phone number so we can verify the request. We will process eligible deletion requests within 30 days. Some information may be retained where required for legal, security, fraud-prevention, or healthcare documentation obligations.</p>
          </div>
        </article>
      </Container>
    </main>
  );
}
