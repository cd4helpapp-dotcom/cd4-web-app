import type { Metadata } from "next";
import { ScrollToTopButton } from "@/components/shared/scroll-to-top-button";
import { TouchGlowProvider } from "@/components/shared/touch-glow-provider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cd4.co.in";
const siteName = "CD4";
const appName = "CD4 AI";
const chandigarhCoordinates = {
  latitude: 30.7333,
  longitude: 76.7794
};
const siteDescription =
  "CD4 is an India-wide AI-based healthcare platform for voice doctor booking, AI symptom history, report understanding, prescriptions, and follow-up care in one connected health app.";
const faqItems = [
  {
    question: "What is CD4?",
    answer:
      "CD4 is an AI-based healthcare platform that helps patients book doctor appointments by voice, share symptom history with doctors, understand reports and prescriptions, and manage follow-up care."
  },
  {
    question: "Where is CD4 based?",
    answer:
      "CD4 has its office base in Sector 46-B, Chandigarh, India, and serves users across India through its AI-based healthcare platform."
  },
  {
    question: "Is CD4 available across India?",
    answer:
      "Yes. CD4 is built as an India-wide AI-based healthcare platform for patients and care journeys across India."
  },
  {
    question: "Is CD4 an AI-based healthcare platform?",
    answer:
      "Yes. CD4 uses AI to organize patient symptoms, health records, reports, and prescriptions so doctors and patients have clearer context during the care journey."
  }
];
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      alternateName: [appName, "CD4 health app", "CD4 healthcare platform"],
      description: siteDescription,
      url: siteUrl,
      logo: `${siteUrl}/images/cd4-logo.png`,
      sameAs: ["https://www.instagram.com/cd4.ai/"],
      foundingLocation: {
        "@type": "Place",
        name: "Chandigarh",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chandigarh",
          addressRegion: "Chandigarh",
          addressCountry: "IN"
        }
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sector 46-B",
        addressLocality: "Chandigarh",
        addressRegion: "Chandigarh",
        addressCountry: "IN"
      },
      areaServed: {
        "@type": "Country",
        name: "India"
      },
      knowsAbout: [
        "AI-based healthcare platform",
        "voice doctor booking",
        "AI symptom history",
        "health report understanding",
        "prescription explanation",
        "follow-up care"
      ]
    },
    {
      "@type": "Place",
      "@id": `${siteUrl}/#location`,
      name: "CD4 Chandigarh Office",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sector 46-B",
        addressLocality: "Chandigarh",
        addressRegion: "Chandigarh",
        addressCountry: "IN"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: chandigarhCoordinates.latitude,
        longitude: chandigarhCoordinates.longitude
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      alternateName: appName,
      description: siteDescription,
      url: siteUrl,
      publisher: {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#ai-healthcare-platform`,
      name: "CD4 AI-Based Healthcare Platform",
      serviceType: "AI-based healthcare platform",
      category: "Healthcare technology",
      provider: {
        "@id": `${siteUrl}/#organization`
      },
      areaServed: {
        "@type": "Country",
        name: "India"
      },
      audience: {
        "@type": "Audience",
        geographicArea: {
          "@type": "Country",
          name: "India"
        }
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: siteUrl
      },
      description: siteDescription
    },
    {
      "@type": "MobileApplication",
      name: appName,
      alternateName: siteName,
      operatingSystem: "Android, iOS",
      applicationCategory: "HealthApplication",
      description: siteDescription,
      url: siteUrl,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR"
      },
      publisher: {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "CD4",
          item: siteUrl
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: appName,
  creator: siteName,
  publisher: siteName,
  category: "AI-based healthcare platform",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  title: {
    default: "CD4 - AI-Based Healthcare Platform | CD4 AI Health App",
    template: "%s | CD4"
  },
  description: siteDescription,
  keywords: [
    "CD4",
    "CD4 AI",
    "CD4 app",
    "CD4 health app",
    "CD4 healthcare platform",
    "AI-based healthcare platform",
    "AI based healthcare platform",
    "voice doctor booking",
    "AI health app India",
    "doctor appointment app",
    "AI symptom history",
    "health report explanation",
    "prescription explanation app",
    "healthcare app India",
    "AI healthcare platform India",
    "doctor appointment app India",
    "Chandigarh healthcare app"
  ],
  alternates: {
    canonical: "/"
  },
  other: {
    "geo.region": "IN-CH",
    "geo.placename": "Chandigarh",
    "geo.position": `${chandigarhCoordinates.latitude};${chandigarhCoordinates.longitude}`,
    ICBM: `${chandigarhCoordinates.latitude}, ${chandigarhCoordinates.longitude}`,
    "DC.title": "CD4 - India-Wide AI-Based Healthcare Platform",
    coverage: "India",
    "service.area": "India",
    "business:contact_data:locality": "Chandigarh",
    "business:contact_data:region": "Chandigarh",
    "business:contact_data:country_name": "India"
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
    title: "CD4 - AI-Based Healthcare Platform",
    description: siteDescription,
    url: siteUrl,
    siteName: "CD4",
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
    title: "CD4 - AI-Based Healthcare Platform",
    description: siteDescription,
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
