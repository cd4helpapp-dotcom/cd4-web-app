import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  ClipboardCheck,
  FileCheck2,
  Hospital,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import { HospitalOnboardingSubmitForm } from "@/components/hospital-onboarding/hospital-onboarding-submit-form";
import { Container } from "@/components/shared/container";
import {
  appointmentModes,
  facilityOptions,
  goLiveTimelines,
  hospitalTypeOptions,
  specialityOptions
} from "@/content/hospital-onboarding";
import { cn } from "@/lib/cn";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cd4.co.in";

export const metadata: Metadata = {
  title: "Hospital Onboarding Form",
  description:
    "Public hospital onboarding form for hospitals, clinics, and diagnostic partners who want to join the CD4 AI healthcare platform.",
  alternates: {
    canonical: "/hospital-onboarding"
  },
  openGraph: {
    title: "Hospital Onboarding Form | CD4",
    description:
      "Submit hospital registration, contact, location, services, and verification details to join CD4.",
    url: `${siteUrl}/hospital-onboarding`,
    siteName: "CD4",
    locale: "en_IN",
    type: "website"
  }
};

const inputClass =
  "min-h-11 w-full rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/[0.075] focus:ring-4 focus:ring-cyan-300/10";

const quickPoints = [
  "Hospital identity",
  "Registration proof",
  "Authorized contact",
  "Services and OPD setup"
];

function PageHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(7,9,15,0.92)] backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src="/images/cd4-logo-nav.png"
            alt="CD4 AI logo"
            width={40}
            height={40}
            className="rounded-xl object-contain"
            unoptimized
          />
          <span className="font-heading text-lg font-semibold text-white">CD4 AI</span>
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
      </Container>
    </header>
  );
}

interface FormSectionProps {
  title: string;
  eyebrow: string;
  icon: typeof Hospital;
  children: ReactNode;
}

function FormSection({ title, eyebrow, icon: Icon, children }: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_60px_-46px_rgba(0,0,0,0.9)] sm:p-5">
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10">
          <Icon className="h-4.5 w-4.5 text-cyan-200" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-lg font-bold leading-tight text-white sm:text-xl">{title}</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

interface FieldShellProps {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

function FieldShell({ label, name, required, hint, className, children }: FieldShellProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={name} className="text-sm font-semibold text-slate-100">
        {label}
        {required ? <span className="text-cyan-300"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="text-xs leading-5 text-slate-500">{hint}</p> : null}
    </div>
  );
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  hint?: string;
}

function TextInput({ label, name, hint, className, required, ...props }: TextInputProps) {
  return (
    <FieldShell label={label} name={name} required={required} hint={hint}>
      <input
        id={name}
        name={name}
        required={required}
        className={cn(inputClass, className)}
        {...props}
      />
    </FieldShell>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  hint?: string;
}

function TextArea({ label, name, hint, className, required, ...props }: TextAreaProps) {
  return (
    <FieldShell label={label} name={name} required={required} hint={hint} className="md:col-span-2">
      <textarea
        id={name}
        name={name}
        required={required}
        className={cn(inputClass, "min-h-24 resize-y leading-6", className)}
        {...props}
      />
    </FieldShell>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: string[];
  hint?: string;
}

function SelectField({ label, name, options, hint, required, ...props }: SelectFieldProps) {
  return (
    <FieldShell label={label} name={name} required={required} hint={hint}>
      <select id={name} name={name} required={required} className={inputClass} {...props}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-950 text-white">
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

interface CheckboxGroupProps {
  legend: string;
  name: string;
  options: string[];
  required?: boolean;
}

function CheckboxGroup({ legend, name, options, required }: CheckboxGroupProps) {
  return (
    <fieldset className="md:col-span-2">
      <legend className="text-sm font-semibold text-slate-100">
        {legend}
        {required ? <span className="text-cyan-300"> *</span> : null}
      </legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-2.5 text-sm text-slate-200 transition hover:border-cyan-300/30"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 accent-cyan-400"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function FileField({
  label,
  name,
  required,
  hint
}: {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <FieldShell label={label} name={name} required={required} hint={hint}>
      <input
        id={name}
        name={name}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        required={required}
        className={cn(
          inputClass,
          "cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-300/15 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-cyan-100"
        )}
      />
    </FieldShell>
  );
}

function HospitalOnboardingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="hero-bg" aria-hidden>
        <div className="grid-lines" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <PageHeader />

      <Container className="relative z-10 py-8 sm:py-10 lg:py-12">
        <section className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                <Hospital className="h-3.5 w-3.5" />
                Hospital partner registration
              </span>
              <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.06] text-white sm:text-5xl">
                CD4 AI Hospital Partner Registration
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Submit your hospital, clinic, nursing home, or diagnostic center details for CD4
                verification, partner review, and onboarding coordination.
              </p>
            </div>

            <aside className="rounded-2xl border border-amber-300/18 bg-amber-300/[0.07] p-4">
              <div className="flex gap-3">
                <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
                <div>
                  <p className="text-sm font-semibold text-amber-50">Before submitting</p>
                  <p className="mt-1 text-sm leading-6 text-amber-50/85">
                    Upload only hospital verification documents. Do not upload patient records.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickPoints.map((point) => (
              <div key={point} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-sm font-semibold text-white">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-5xl">
          <HospitalOnboardingSubmitForm>
            <FormSection title="Hospital identity" eyebrow="Step 01" icon={Building2}>
              <TextInput
                label="Registered hospital / clinic name"
                name="registered_name"
                placeholder="Legal name on registration"
                required
              />
              <TextInput
                label="Public display name"
                name="display_name"
                placeholder="Name patients should see"
              />
              <SelectField
                label="Facility type"
                name="facility_type"
                options={hospitalTypeOptions}
                required
              />
              <TextInput
                label="Official website"
                name="website"
                type="url"
                placeholder="https://example.com"
              />
            </FormSection>

            <FormSection title="Registration proof" eyebrow="Step 02" icon={ShieldCheck}>
              <TextInput
                label="Registration number"
                name="registration_number"
                placeholder="Hospital / clinic registration number"
                required
              />
              <TextInput
                label="Registering authority"
                name="registering_authority"
                placeholder="State health authority, CEA, municipal body"
                required
              />
              <TextInput
                label="Registration expiry date"
                name="registration_expiry"
                type="date"
              />
              <FileField
                label="Registration certificate"
                name="registration_certificate"
                required
                hint="PDF, JPG, PNG, or WebP. Max 8 MB after backend deployment."
              />
              <FileField
                label="Additional verification document"
                name="additional_compliance_document"
                hint="Optional: NABH/NABL, fire NOC, biomedical waste, lab/pharmacy license."
              />
            </FormSection>

            <FormSection title="Location" eyebrow="Step 03" icon={MapPin}>
              <TextArea
                label="Full address"
                name="full_address"
                placeholder="Building, road, locality, landmark"
                required
              />
              <TextInput label="City" name="city" placeholder="Chandigarh" required />
              <TextInput label="State / UT" name="state" placeholder="Chandigarh" required />
              <TextInput
                label="PIN code"
                name="pin_code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                placeholder="160047"
                required
              />
              <TextInput
                label="Google Maps link"
                name="google_maps_link"
                type="url"
                placeholder="https://maps.google.com/..."
              />
            </FormSection>

            <FormSection title="Authorized contact" eyebrow="Step 04" icon={Phone}>
              <TextInput
                label="Contact person name"
                name="authorized_person_name"
                placeholder="Full name"
                required
              />
              <TextInput
                label="Designation"
                name="designation"
                placeholder="Owner, administrator, manager"
                required
              />
              <TextInput
                label="Mobile number"
                name="mobile_number"
                type="tel"
                placeholder="+91 98765 43210"
                required
              />
              <TextInput
                label="WhatsApp number"
                name="whatsapp_number"
                type="tel"
                placeholder="+91 98765 43210"
              />
              <TextInput
                label="Official email"
                name="official_email"
                type="email"
                placeholder="admin@hospital.com"
                required
              />
            </FormSection>

            <FormSection title="Services and OPD setup" eyebrow="Step 05" icon={Stethoscope}>
              <CheckboxGroup
                legend="Specialities / departments"
                name="specialities"
                options={specialityOptions}
                required
              />
              <CheckboxGroup legend="Facilities" name="facilities" options={facilityOptions} />
              <SelectField
                label="Appointment mode"
                name="appointment_mode"
                options={appointmentModes}
                required
              />
              <TextInput
                label="OPD timings"
                name="opd_timings"
                placeholder="Mon-Sat, 9 AM - 7 PM"
                required
              />
              <TextInput
                label="Doctors to onboard first"
                name="initial_doctor_count"
                type="number"
                min="1"
                placeholder="5"
              />
              <SelectField
                label="Expected go-live timeline"
                name="go_live_timeline"
                options={goLiveTimelines}
              />
              <TextArea
                label="Notes for CD4 team"
                name="additional_notes"
                placeholder="Slot rules, departments to start with, or any onboarding requirement."
              />
            </FormSection>

            <section className="rounded-2xl border border-cyan-300/18 bg-cyan-300/[0.055] p-4 sm:p-5">
              <div className="flex gap-3">
                <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                <div>
                  <h2 className="text-lg font-bold leading-tight text-white">Authorization</h2>
                  <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-slate-200">
                    <input
                      type="checkbox"
                      name="authorization_confirmed"
                      value="yes"
                      required
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 accent-cyan-400"
                    />
                    <span>
                      I confirm I am authorized to submit these hospital details and CD4 may contact
                      us for onboarding and verification.
                    </span>
                  </label>
                  <label className="mt-3 flex items-start gap-3 text-sm leading-6 text-slate-300">
                    <input
                      type="checkbox"
                      name="whatsapp_contact_consent"
                      value="yes"
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 accent-cyan-400"
                    />
                    <span>CD4 may contact us on WhatsApp for onboarding coordination.</span>
                  </label>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <p>CD4 will review the request and contact the authorized person for next steps.</p>
              </div>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_18px_44px_-26px_rgba(45,212,191,0.9)] transition hover:translate-y-[-1px]"
              >
                Submit request
                <Send className="h-4 w-4" />
              </button>
            </div>
          </HospitalOnboardingSubmitForm>
        </section>
      </Container>
    </main>
  );
}

export default HospitalOnboardingPage;
