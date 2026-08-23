import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cd4.co.in";
const officialEmail = "cd4help.app@gmail.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the CD4 AI healthcare platform.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | CD4",
    description: "Learn how CD4 collects, uses, and protects personal and health information.",
    url: `${siteUrl}/privacy-policy`,
    siteName: "CD4",
    locale: "en_IN",
    type: "website"
  }
};

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/10 pt-8">
      <h2 className="font-heading text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-[rgba(7,9,15,0.92)]">
        <Container className="flex min-h-16 items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/images/cd4-logo-nav.png" alt="CD4 AI logo" width={40} height={40} className="rounded-xl object-contain" unoptimized />
            <span className="font-heading text-lg font-semibold text-white">CD4 AI</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </Container>
      </header>

      <Container className="py-14 sm:py-20">
        <article className="mx-auto max-w-4xl">
          <div className="mb-10 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.06] p-6 sm:p-8">
            <div className="flex items-center gap-3 text-cyan-200">
              <ShieldCheck className="h-6 w-6" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">Your privacy matters</span>
            </div>
            <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">Privacy Policy for CD4</h1>
            <p className="mt-4 text-sm text-slate-400">Last Updated: August 23, 2026 · Effective Date: August 23, 2026</p>
            <p className="mt-6 text-base leading-8 text-slate-200">
              Welcome to CD4 (“we”, “our”, or “us”). We are committed to protecting your privacy and the security of your personal and health-related information. This policy explains how CD4 collects, uses, processes, and safeguards information when you use the CD4 mobile application and associated services (the “Service”). By using CD4, you agree to the collection and use of information as described here.
            </p>
          </div>

          <div className="space-y-8">
            <PolicySection title="1. Information We Collect">
              <p>We collect only the information necessary to provide telemedicine, doctor consultations, AI-assisted health triage, and appointment booking services.</p>
              <ul className="list-disc space-y-2 pl-5">
                <li><strong className="text-white">Personal information:</strong> name, email address, phone number, age, gender, profile photo, authentication tokens, and session identifiers.</li>
                <li><strong className="text-white">Health and medical data:</strong> symptoms, health queries, medical history, reports, lab results, prescriptions, and consultation notes that you upload or receive.</li>
                <li><strong className="text-white">Audio, voice, and media:</strong> voice input, audio/video call streams, camera feed during consultations, and images used for medical documents.</li>
                <li><strong className="text-white">Location:</strong> approximate or precise location used solely to find nearby verified doctors, clinics, and hospitals.</li>
                <li><strong className="text-white">Transactions:</strong> transaction IDs and payment status processed through authorized gateways such as Razorpay. We do not store card numbers or bank credentials on our servers.</li>
              </ul>
            </PolicySection>

            <PolicySection title="2. How We Use Your Information">
              <p>We use information to facilitate teleconsultations, provide preliminary AI health guidance and triage, manage appointments and reminders, organize prescriptions and records, send relevant alerts, prevent fraud, maintain data integrity, and comply with applicable legal and healthcare requirements.</p>
            </PolicySection>

            <PolicySection title="3. Permissions We Request and Why">
              <ul className="list-disc space-y-2 pl-5">
                <li><strong className="text-white">Microphone:</strong> speaking with the AI Voice Assistant and participating in voice/video consultations.</li>
                <li><strong className="text-white">Camera:</strong> live video consultations and scanning or uploading medical records.</li>
                <li><strong className="text-white">Location:</strong> showing nearby doctors, clinics, and regional health services.</li>
                <li><strong className="text-white">Notifications:</strong> incoming call alerts and appointment reminders.</li>
                <li><strong className="text-white">Calendar:</strong> saving confirmed consultations to your device calendar.</li>
                <li><strong className="text-white">Photos and document picker:</strong> selecting lab reports, prescriptions, or profile photos.</li>
              </ul>
            </PolicySection>

            <PolicySection title="4. Third-Party Service Providers">
              <p>Trusted providers help us operate the Service, including Supabase for cloud infrastructure and authentication, Agora/WebRTC for encrypted calls, OpenAI/Realtime API for AI processing, Razorpay for payments, and Firebase/Google Sign-In for authentication and notifications.</p>
              <p>We do not sell, rent, or trade personal or health data to advertisers or third-party brokers.</p>
            </PolicySection>

            <PolicySection title="5. Data Security and Storage">
              <p>Data transmitted between your device and our servers is protected with industry-standard TLS/SSL (HTTPS/WSS) encryption. Health records and sensitive personal data are stored in secure databases with strict role-based access controls. Audio from AI voice sessions and speech recognition is processed in real time and is not used for behavioral advertising.</p>
            </PolicySection>

            <PolicySection title="6. Data Retention and Account Deletion">
              <p>We retain account and health data while your account is active or as needed for healthcare documentation and legal obligations.</p>
              <p>You may permanently delete your account and associated health data from <strong className="text-white">Settings → Help &amp; Support → Delete Account</strong>, or submit a request through our <Link className="text-cyan-200 hover:text-white" href="/delete-account">web account deletion page</Link>. You can also email <a className="text-cyan-200 hover:text-white" href={`mailto:${officialEmail}`}>{officialEmail}</a> with the subject “Account Deletion Request”. Account data, chat history, uploaded documents, and personal details will be permanently purged within 30 days.</p>
            </PolicySection>

            <PolicySection title="7. Medical and Emergency Disclaimer">
              <p><strong className="text-amber-200">Important:</strong> CD4 is a healthcare technology platform connecting users with licensed doctors and providing AI-assisted health information.</p>
              <p>The AI Voice Assistant and report summaries are informational and support triage only; they do not constitute medical advice, diagnosis, or treatment. In an emergency, immediately contact local emergency services (such as 112, 102, or 108 in India) or visit the nearest emergency room.</p>
            </PolicySection>

            <PolicySection title="8. Children’s Privacy">
              <p>CD4 is not intended for unsupervised use by children under 18. Minors may use the Service only under the supervision and consent of a parent or legal guardian.</p>
            </PolicySection>

            <PolicySection title="9. Changes to This Privacy Policy">
              <p>We may update this policy from time to time. Changes will be posted on this page with an updated “Last Updated” date. Continued use of the Service after changes means you accept the updated policy.</p>
            </PolicySection>

            <PolicySection title="10. Contact Us and Grievance Officer">
              <p>For questions, concerns, or requests about this policy or your data, contact us:</p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p><strong className="text-white">Email:</strong> <a className="text-cyan-200 hover:text-white" href={`mailto:${officialEmail}`}>{officialEmail}</a></p>
                <p><strong className="text-white">App Developer:</strong> CD4 AI</p>
                <p><strong className="text-white">Service Address:</strong> Sector 46-B, Chandigarh, India</p>
                <p className="mt-3 inline-flex items-center gap-2 text-cyan-200"><Mail className="h-4 w-4" /> Official support and privacy contact</p>
              </div>
            </PolicySection>
          </div>
        </article>
      </Container>
    </main>
  );
}
