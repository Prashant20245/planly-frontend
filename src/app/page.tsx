import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsStrip } from "@/components/landing/benefits-strip";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />

        <BenefitsStrip />

        <FeaturesSection />

        <HowItWorksSection />

        <TestimonialsSection />

        <PricingSection />

        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
