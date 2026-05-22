import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cd4.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
  title: {
    default: "CD4 AI | Voice Health App",
    template: "%s | CD4 AI"
  },
  description:
    "CD4 AI landing page for AI triage, doctor discovery, health report intelligence, and cross-role healthcare workflows.",
  icons: {
    icon: [
      { url: "/images/cd4-tab-icon.png?v=20260520c", type: "image/png", sizes: "32x32" },
      { url: "/images/cd4-tab-icon.png?v=20260520c", type: "image/png", sizes: "128x128" }
    ],
    apple: [{ url: "/images/cd4-logo.png?v=20260520c", sizes: "1254x1254", type: "image/png" }],
    shortcut: ["/images/cd4-tab-icon.png?v=20260520c"]
  },
  openGraph: {
    title: "CD4 AI | AI-First Healthcare Landing",
    description:
      "Discover how CD4 AI combines AI triage, doctor booking, report understanding, and follow-up workflows in one mobile ecosystem.",
    url: siteUrl,
    siteName: "CD4 AI",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CD4 AI | AI-First Healthcare Landing",
    description:
      "AI triage + doctor booking + report intelligence in one healthcare experience."
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
