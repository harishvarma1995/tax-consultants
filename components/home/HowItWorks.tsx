/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/home/HowItWorks.tsx
 * Purpose : Homepage process section.
 * ============================================================
 */

import { Card } from "@/components/ui/Card";
import { siteContent } from "@/content/site-content";

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="text-center">
        <p className="font-semibold uppercase tracking-widest text-accent">
          Simple Process
        </p>

        <h2 className="mt-3 text-4xl font-bold text-primary">
          How it works
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Our streamlined workflow keeps your tax journey simple,
          transparent, and secure from start to finish.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {siteContent.home.howItWorks.map((step, index) => (
          <Card key={step.title}>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
              {index + 1}
            </div>

            <h3 className="text-xl font-semibold text-primary">
              {step.title}
            </h3>

            <p className="mt-3 text-muted-foreground">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}