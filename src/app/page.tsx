import { MotionConfig } from "@/components/experience/motion-config";
import { CursorRing, PageLoader } from "@/components/experience/page-chrome";
import { ExperienceProvider } from "@/components/experience/experience-provider";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { AppSection, EcosystemSection, FinalCta } from "@/components/landing/story-bottom";
import { CapabilitiesSection, FaqSection, HowSection, RolesSection } from "@/components/landing/story-motion";
import { DoctorsSection, HospitalSection, TestimonialsSection, VoiceSection } from "@/components/landing/story-static";
import { DemoSection } from "@/components/landing/story-demo";
import { HeroSection, ReportsSection, SnapshotSection, WhySection } from "@/components/landing/story-top";
import { landingContent } from "@/content/landing";
import { resolveDownloadLinks } from "@/lib/site-links";

export default function HomePage() {
  const downloadLinks = resolveDownloadLinks(landingContent.downloads);
  const approvedTestimonials = landingContent.testimonials.filter((item) => item.approved);
  const navItems = approvedTestimonials.length
    ? [...landingContent.nav.slice(0, 5), { label: "Voices", href: "#testimonials" }, ...landingContent.nav.slice(5)]
    : landingContent.nav;

  return (
    <>
      <PageLoader />
      <ExperienceProvider />
      <CursorRing />
      <Navbar appName={landingContent.appName} navItems={navItems} />
      <MotionConfig>
      <main className="relative z-10">
        <HeroSection stats={landingContent.heroStats} />
        <WhySection />
        <CapabilitiesSection />
        <VoiceSection />
        <SnapshotSection />
        <DemoSection />
        <DoctorsSection />
        <ReportsSection />
        <EcosystemSection />
        <HowSection />
        <RolesSection />
        <HospitalSection />
        <TestimonialsSection items={approvedTestimonials} />
        <AppSection links={downloadLinks} />
        <FaqSection items={landingContent.faqs} />
        <FinalCta />
      </main>
      </MotionConfig>
      <Footer appName={landingContent.appName} />
    </>
  );
}
