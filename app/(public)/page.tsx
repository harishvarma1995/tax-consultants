/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/page.tsx
 * Purpose : Public home page.
 * ============================================================
 */

import { BlogPreview } from "@/components/home/BlogPreview";
import { ContactStrip } from "@/components/home/ContactStrip";
import { CtaBanner } from "@/components/home/CtaBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustBadges } from "@/components/home/TrustBadges";
import { PageContainer } from "@/components/layout/PageContainer";

export default function HomePage() {
  return (
    <PageContainer>
      <HeroSection />
      <TrustBadges />
      <ServicesOverview />
      <HowItWorks />
      <Testimonials />
      <BlogPreview />
      <CtaBanner />
      <ContactStrip />
    </PageContainer>
  );
}