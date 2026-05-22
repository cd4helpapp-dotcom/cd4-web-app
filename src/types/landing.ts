export type Tone = "emerald" | "sky" | "amber";

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  tone: Tone;
}

export interface JourneyStep {
  title: string;
  description: string;
}

export interface RoleHighlight {
  role: string;
  title: string;
  points: string[];
}

export interface DownloadLink {
  id: "android_store" | "ios_store" | "apk";
  label: string;
  note: string;
  href: string;
  comingSoon: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface LandingContent {
  appName: string;
  tagline: string;
  description: string;
  nav: NavItem[];
  heroStats: HeroStat[];
  featureHighlights: string[];
  features: FeatureItem[];
  journey: JourneyStep[];
  roles: RoleHighlight[];
  testimonials: TestimonialItem[];
  downloads: DownloadLink[];
  faqs: FaqItem[];
}
