"use client";

import { FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface HospitalOnboardingSubmitFormProps {
  children: ReactNode;
}

type SubmitState =
  | { type: "idle"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const getFunctionEndpoint = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  if (!supabaseUrl) return "";
  return `${supabaseUrl.replace(/\/+$/, "")}/functions/v1/submit-hospital-onboarding`;
};

export function HospitalOnboardingSubmitForm({ children }: HospitalOnboardingSubmitFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: ""
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const endpoint = getFunctionEndpoint();
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    if (!endpoint || !anonKey) {
      setSubmitState({
        type: "error",
        message: "Supabase configuration is missing. Please check web app environment variables."
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.delete("form-name");

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`
        },
        body: formData
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.success) {
        const message =
          typeof payload?.message === "string"
            ? payload.message.replace(/_/g, " ")
            : "Unable to submit hospital onboarding request.";
        throw new Error(message);
      }

      form.reset();
      setSubmitState({
        type: "success",
        message: "Hospital onboarding request submitted to CD4 Supabase."
      });
      router.push("/hospital-onboarding/thank-you");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the hospital onboarding request.";
      setSubmitState({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      name="hospital-onboarding"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
      className="grid gap-5"
    >
      <input type="hidden" name="form-name" value="hospital-onboarding" />
      <p className="hidden">
        <label>
          Do not fill this out
          <input name="bot-field" />
        </label>
      </p>

      <fieldset disabled={isSubmitting} className="grid gap-5 border-0 p-0 disabled:opacity-70">
        {children}
      </fieldset>

      {submitState.message ? (
        <div
          role={submitState.type === "error" ? "alert" : "status"}
          className={`mt-5 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6 ${
            submitState.type === "error"
              ? "border-rose-300/25 bg-rose-300/10 text-rose-100"
              : "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
          }`}
        >
          {submitState.type === "error" ? (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>{submitState.message}</span>
        </div>
      ) : null}
    </form>
  );
}
