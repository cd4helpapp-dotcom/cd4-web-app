import type { Metadata } from "next";
import { ScrollToTopButton } from "@/components/shared/scroll-to-top-button";
import { TouchGlowProvider } from "@/components/shared/touch-glow-provider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cd4.co.in";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "CD4 AI",
      url: siteUrl,
      logo: `${siteUrl}/images/cd4-logo.png`
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "CD4 AI",
      url: siteUrl,
      publisher: {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "MobileApplication",
      name: "CD4 AI",
      operatingSystem: "Android, iOS",
      applicationCategory: "HealthApplication",
      description:
        "CD4 AI helps patients book doctor appointments by voice, share AI-ready symptom history, understand reports and prescriptions, and continue care in one app.",
      url: siteUrl,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR"
      },
      publisher: {
        "@id": `${siteUrl}/#organization`
      }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
  title: {
    default: "CD4 AI - Voice Doctor Booking & Health Report App",
    template: "%s | CD4 AI"
  },
  description:
    "Book doctor appointments by voice, share AI symptom history, understand prescriptions and reports, and manage your healthcare journey with CD4 AI.",
  keywords: [
    "CD4 AI",
    "CD4 health app",
    "voice doctor booking",
    "AI health app India",
    "doctor appointment app",
    "health report explanation",
    "prescription explanation app"
  ],
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [
      { url: "/images/cd4-tab-icon.png?v=20260520c", type: "image/png", sizes: "32x32" },
      { url: "/images/cd4-tab-icon.png?v=20260520c", type: "image/png", sizes: "128x128" }
    ],
    apple: [{ url: "/images/cd4-logo.png?v=20260520c", sizes: "1254x1254", type: "image/png" }],
    shortcut: ["/images/cd4-tab-icon.png?v=20260520c"]
  },
  openGraph: {
    title: "CD4 AI - Voice Doctor Booking & Health Report App",
    description:
      "Book appointments by voice, send AI-ready symptom history to doctors, and manage reports, prescriptions, and follow-ups in one healthcare app.",
    url: siteUrl,
    siteName: "CD4 AI",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/cd4-logo.png",
        width: 1254,
        height: 1254,
        alt: "CD4 AI logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CD4 AI - Voice Doctor Booking & Health Report App",
    description:
      "Voice doctor booking, AI symptom history, report understanding, and follow-up care in one app.",
    images: ["/images/cd4-logo.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <TouchGlowProvider />
        <ScrollToTopButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
