/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/home/HeroSection.tsx
 * Purpose : Homepage hero section.
 * ============================================================
 */

import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { siteContent } from "@/content/site-content";

export function HeroSection() {
  return (
    <section className="grid min-h-[70vh] items-center gap-10 py-16 lg:grid-cols-2">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
          <ShieldCheck size={16} />
          Secure tax guidance for individuals and businesses
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-primary md:text-6xl">
          {siteContent.home.hero.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          {siteContent.home.hero.subheadline}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href={routes.contact} variant="secondary">
            {siteContent.home.hero.primaryCta}
            <ArrowRight className="ml-2" size={18} />
          </Button>

          <Button href={routes.services} variant="outline">
            {siteContent.home.hero.secondaryCta}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm font-medium text-accent">
          TAX CONSULTANTS SECURE PORTAL
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-primary">
          Expert support from consultation to filing.
        </h2>

        <div className="mt-6 space-y-4 text-sm text-muted-foreground">
          <p>✓ Income tax filing with document checklist</p>
          <p>✓ GST, TDS, NRI and business tax support</p>
          <p>✓ Secure client dashboard for documents and updates</p>
          <p>✓ Clear communication from start to finish</p>
        </div>
      </div>
    </section>
  );
}