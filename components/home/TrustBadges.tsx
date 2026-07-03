/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/home/TrustBadges.tsx
 * Purpose : Homepage trust badge section.
 * ============================================================
 */

import { Award, LockKeyhole, Users, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { siteContent } from "@/content/site-content";

const icons = [Award, Users, LockKeyhole, UserCheck];

export function TrustBadges() {
  return (
    <section className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {siteContent.home.trustBadges.map((badge, index) => {
        const Icon = icons[index];

        return (
          <Card className="p-5" key={badge}>
            <Icon className="mb-4 text-accent" size={28} />
            <p className="font-semibold text-primary">{badge}</p>
          </Card>
        );
      })}
    </section>
  );
}