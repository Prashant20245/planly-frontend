"use client";
import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsStrip } from "@/components/landing/benefits-strip";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { requireAuth } from "@/lib/requireAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    async function checkAuthentication() {
      try {
        const authenticatedUser = await requireAuth();
        if (authenticatedUser) {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkAuthentication();
  }, [router]);
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
