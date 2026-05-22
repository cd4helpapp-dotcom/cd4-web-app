import { DownloadSection } from "@/components/landing/download-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { JourneySection } from "@/components/landing/journey-section";
import { NameStorySection } from "@/components/landing/name-story-section";
import { Navbar } from "@/components/landing/navbar";
import { RoleSection } from "@/components/landing/role-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { landingContent } from "@/content/landing";
import { resolveDownloadLinks } from "@/lib/site-links";

export default function HomePage() {
  const downloadLinks = resolveDownloadLinks(landingContent.downloads);

  return (
    <main>
      <Navbar appName={landingContent.appName} navItems={landingContent.nav} />
      <HeroSection
        appName={landingContent.appName}
        tagline={landingContent.tagline}
        description={landingContent.description}
        stats={landingContent.heroStats}
        highlights={landingContent.featureHighlights}
      />
      <div className="section-separator" aria-hidden />
      <NameStorySection />
      <div className="section-separator" aria-hidden />
      <FeatureGrid features={landingContent.features} />
      <div className="section-separator" aria-hidden />
      <JourneySection steps={landingContent.journey} />
      <div className="section-separator" aria-hidden />
      <RoleSection roles={landingContent.roles} />
      <div className="section-separator" aria-hidden />
      <TestimonialSection items={landingContent.testimonials} />
      <div className="section-separator" aria-hidden />
      <DownloadSection links={downloadLinks} />
      <div className="section-separator" aria-hidden />
      <FaqSection items={landingContent.faqs} />
      <Footer appName={landingContent.appName} />
    </main>
  );
}
