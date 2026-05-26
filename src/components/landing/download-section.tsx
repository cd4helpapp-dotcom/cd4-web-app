"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { DownloadLink } from "@/types/landing";

interface DownloadSectionProps {
  links: DownloadLink[];
}

type StoreMeta = {
  label: string;
  liveCta: string;
  pendingCta: string;
  icon: ReactNode;
  iconWrapClass: string;
};

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M3.8 2.4 13.7 12 3.8 21.6c-.2-.2-.3-.5-.3-.9V3.3c0-.4.1-.7.3-.9Z" fill="#00A0FF" />
      <path d="m16.8 15.1-2.9-2.8 2.9-2.8 2.8 1.6c.9.5.9 1.7 0 2.2l-2.8 1.8Z" fill="#FFCC00" />
      <path d="m13.9 12-2.2-2.1L4.7 3c.1-.1.4-.1.6 0l11.5 6.5L13.9 12Z" fill="#FF3D00" />
      <path d="M4.7 21 11.7 14l2.2-2.1 2.9 2.8-11.5 6.5c-.2.1-.5.1-.6-.2Z" fill="#34A853" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9Z" />
      <path d="M262.1 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3Z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <g fill="#3DDC84">
        <rect x="7" y="7.7" width="10" height="7.1" rx="2.8" />
        <rect x="8.2" y="14.3" width="2.1" height="5" rx="1" />
        <rect x="13.7" y="14.3" width="2.1" height="5" rx="1" />
        <rect x="5.2" y="9.4" width="1.9" height="5.2" rx="0.9" />
        <rect x="16.9" y="9.4" width="1.9" height="5.2" rx="0.9" />
      </g>
      <circle cx="10.3" cy="10.6" r="0.6" fill="#052E16" />
      <circle cx="13.7" cy="10.6" r="0.6" fill="#052E16" />
      <path d="m9 6.3-1-1.6M15 6.3l1-1.6" stroke="#3DDC84" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

const STORE_META: Record<DownloadLink["id"], StoreMeta> = {
  android_store: {
    label: "Google Play Store",
    liveCta: "Get it on Google Play",
    pendingCta: "Google Play listing in progress",
    icon: <GooglePlayIcon />,
    iconWrapClass: "bg-white text-slate-900"
  },
  ios_store: {
    label: "Apple App Store",
    liveCta: "Download on the App Store",
    pendingCta: "App Store listing in progress",
    icon: <AppleIcon />,
    iconWrapClass: "bg-white text-slate-900"
  },
  apk: {
    label: "Android APK",
    liveCta: "Download Android APK",
    pendingCta: "APK download will be enabled soon",
    icon: <AndroidIcon />,
    iconWrapClass: "bg-white text-slate-900"
  }
};

export function DownloadSection({ links }: DownloadSectionProps) {
  return (
    <section id="download" className="pt-12 pb-8 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_16%_14%,rgba(139,92,246,0.16),transparent_40%),radial-gradient(circle_at_88%_8%,rgba(16,185,129,0.11),transparent_36%),linear-gradient(180deg,#080a12_0%,#0b0f1a_100%)] px-6 py-10 sm:px-10">
          <SectionHeading
            kicker="Download CD4 AI"
            title="Start your CD4 health journey on your preferred device."
            description="Choose your platform and begin with an AI-based healthcare platform built for voice booking, AI doctor snapshot flow, and follow-up care in one app."
            className="[&_*]:text-white [&_p:last-child]:text-slate-300 [&_p:first-child]:text-emerald-300"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {links.map((link, index) => {
              const meta = STORE_META[link.id];
              const isFeatured = link.id === "android_store";

              return (
                <motion.a
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={link.comingSoon ? {} : { y: -6, scale: 1.02 }}
                  whileTap={link.comingSoon ? {} : { scale: 0.98 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  key={link.id}
                  href={link.comingSoon ? "#" : link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={link.comingSoon}
                  onClick={(event) => {
                    if (link.comingSoon) {
                      event.preventDefault();
                    }
                  }}
                  className={`group download-card premium-card rounded-2xl border p-5 transition-colors ${
                    isFeatured ? "download-card-featured" : ""
                  } ${
                    link.comingSoon
                      ? "cursor-not-allowed border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] opacity-90"
                      : "border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] hover:border-violet-300/35"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`download-icon-wrap inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-black/10 ${meta.iconWrapClass}`}
                    >
                      {meta.icon}
                    </div>
                    <span className="download-status-badge inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white/85">
                      {link.comingSoon ? "Coming Soon" : "Live"}
                    </span>
                  </div>

                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {meta.label}
                  </p>
                  <h3 className="mt-1 font-heading text-2xl text-white">{link.label}</h3>
                  <p className="mt-1 text-sm text-slate-300">{link.note}</p>

                  <div
                    className={`download-cta-row mt-5 flex items-center justify-between rounded-xl border px-3 py-2 ${
                      link.comingSoon
                        ? "border-white/15 bg-white/[0.08] text-slate-300"
                        : "border-violet-300/35 bg-violet-300/12 text-violet-100"
                    }`}
                  >
                    <span className="text-sm font-semibold">
                      {link.comingSoon ? meta.pendingCta : meta.liveCta}
                    </span>
                    <ArrowUpRight
                      className={`h-4 w-4 ${
                        link.comingSoon
                          ? ""
                          : "transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      }`}
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
