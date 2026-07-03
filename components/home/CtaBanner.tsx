/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/home/CtaBanner.tsx
 * Purpose : Homepage call-to-action banner.
 * ============================================================
 */

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { siteContent } from "@/content/site-content";

export function CtaBanner() {
  return (
    <section className="py-20">
      <div className="rounded-2xl bg-primary px-8 py-14 text-center text-primary-foreground">
        <h2 className="text-4xl font-bold">
          {siteContent.home.cta.title}
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg opacity-90">
          {siteContent.home.cta.description}
        </p>

        <div className="mt-8">
          <Button href={routes.contact} variant="secondary">
            {siteContent.home.cta.button}
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}