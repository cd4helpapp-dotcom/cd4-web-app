import { LandingContent } from "@/types/landing";

export const landingContent: LandingContent = {
  appName: "CD4 AI",
  tagline: "Speak once. Be understood faster. Heal with confidence.",
  description:
    "CD4 AI lets patients book appointments by voice, sends AI-structured symptom history to doctors, and keeps the full care flow smooth from first concern to follow-up.",
  nav: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#journey" },
    { label: "Why CD4 AI", href: "#why-cd4-ai" },
    { label: "Voices", href: "#testimonials" },
    { label: "Download", href: "#download" },
    { label: "FAQ", href: "#faq" }
  ],
  heroStats: [
    { value: "Voice-First", label: "Book appointments naturally in Hindi or English" },
    {
      value: "AI Snapshot",
      label: "Doctor receives structured symptom history before consultation"
    },
    {
      value: "Smooth Flow",
      label: "Booking, reports, prescriptions, and follow-up in one app journey"
    }
  ],
  featureHighlights: [
    "Book doctor appointments directly through voice commands",
    "AI converts symptom conversation into doctor-ready history snapshot",
    "Doctors get clearer context before the consultation starts",
    "Join a healthcare-first social community for trusted patient support"
  ],
  features: [
    {
      title: "Voice Appointment Booking",
      description:
        "Patients can speak naturally to book a consultation quickly, without filling long forms or navigating complex screens.",
      tone: "sky"
    },
    {
      title: "AI History Snapshot for Doctors",
      description:
        "Before the appointment, CD4 AI prepares a clean symptom timeline and summary so doctors start with better context.",
      tone: "amber"
    },
    {
      title: "Verified Doctor Discovery",
      description:
        "Find trusted doctors using specialization, city, profile strength, ratings, and real-time slot availability.",
      tone: "emerald"
    },
    {
      title: "Prescription & Report Intelligence",
      description:
        "Upload reports and prescriptions (image or PDF) and get simple explanations with practical next-step guidance.",
      tone: "amber"
    },
    {
      title: "Recovery Follow-up Support",
      description:
        "Continue treatment journey through secure chat, updates, reminders, and continuity after every doctor visit.",
      tone: "emerald"
    },
    {
      title: "Healthcare Community Social Feed",
      description:
        "Engage in a health-focused social community where patients share experiences, learn from experts, and stay motivated together.",
      tone: "sky"
    }
  ],
  journey: [
    {
      title: "Speak your concern",
      description:
        "Start with voice in your preferred language and share symptoms naturally without typing everything manually."
    },
    {
      title: "Generate AI history snapshot",
      description:
        "CD4 AI structures your symptom history and key details into a doctor-ready summary before booking."
    },
    {
      title: "Book appointment by voice",
      description:
        "Confirm slot quickly with a simple voice-first booking flow and send context to the doctor instantly."
    },
    {
      title: "Consult and continue care",
      description:
        "Complete consultation, understand prescriptions and reports, and stay connected for follow-up care."
    }
  ],
  roles: [
    {
      role: "For Patients",
      title: "Premium health flow that feels effortless",
      points: [
        "Book appointments directly with voice",
        "No long forms, no confusing booking steps",
        "Smooth journey from first concern to follow-up"
      ]
    },
    {
      role: "With Doctors",
      title: "Consultations start with context, not guesswork",
      points: [
        "AI history snapshot is shared before the call",
        "Doctors see symptom flow and report context instantly",
        "More focused conversations and faster decisions"
      ]
    },
    {
      role: "For Family Care",
      title: "One trusted place for complete care records",
      points: [
        "Store prescriptions, reports, and booking history",
        "Track recovery progress across consultations",
        "Share updates confidently during treatment"
      ]
    }
  ],
  testimonials: [
    {
      quote:
        "I spoke once in the app and my doctor already understood my case before the call started. The experience felt effortless.",
      name: "Ananya Mehta",
      role: "Patient, Bengaluru",
      initials: "AM"
    },
    {
      quote:
        "The AI snapshot saves consultation time and helps me focus on treatment decisions instead of repeating basic history questions.",
      name: "Dr. Ravi Shankar",
      role: "General Physician, Mumbai",
      initials: "DR"
    },
    {
      quote:
        "My prescription and reports were explained in simple language, so I finally knew exactly what to do next.",
      name: "Suresh Kumar",
      role: "Patient, Lucknow",
      initials: "SK"
    },
    {
      quote:
        "I can book quickly, get follow-up in one place, and stay consistent with treatment. It feels built for real patients.",
      name: "Priya Nair",
      role: "Patient, Kochi",
      initials: "PN"
    },
    {
      quote:
        "The community feed adds real value. Patients share recovery journeys, and doctors can guide with practical health awareness.",
      name: "Dr. Kavitha Iyer",
      role: "Dermatologist, Chennai",
      initials: "DK"
    }
  ],
  downloads: [
    {
      id: "android_store",
      label: "Google Play",
      note: "Android package: com.cd4.app",
      href: "https://play.google.com/store/apps/details?id=com.cd4.app",
      comingSoon: true
    },
    {
      id: "ios_store",
      label: "App Store",
      note: "iOS app listing",
      href: "https://apps.apple.com/app/id0000000000",
      comingSoon: true
    },
    {
      id: "apk",
      label: "Direct APK",
      note: "Android manual install",
      href: "https://cdn.example.com/cd4-latest.apk",
      comingSoon: true
    }
  ],
  faqs: [
    {
      question: "Is CD4 AI a replacement for doctor diagnosis?",
      answer:
        "No. CD4 AI supports decision-making and care continuity, but final diagnosis and treatment decisions remain with licensed medical professionals."
    },
    {
      question: "Can users upload both prescriptions and lab reports?",
      answer:
        "Yes. The app supports PDF and image uploads and generates different insight blocks for prescriptions and lab-style reports."
    },
    {
      question: "Is CD4 AI useful for chronic care follow-up?",
      answer:
        "Yes. CD4 AI is helpful for ongoing journeys like diabetes, thyroid, or BP management where report tracking and follow-up communication matter."
    },
    {
      question: "Can I use CD4 AI in Hindi?",
      answer:
        "Yes. CD4 AI supports both Hindi and English so patients can communicate in the language they are most comfortable with."
    }
  ]
};
