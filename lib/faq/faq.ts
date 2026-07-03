/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : lib/faq/faq.ts
 * Purpose : Reads FAQ entries from SiteSettings.
 * ============================================================
 */

import { db } from "@/lib/db";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export async function getFaqs() {
  const settings = await db.siteSettings.findMany({
    where: {
      key: {
        startsWith: "faq.",
      },
    },
    orderBy: {
      key: "asc",
    },
  });

  return settings
    .map((setting): FaqItem | null => {
      try {
        const parsed = JSON.parse(setting.value) as {
          question?: string;
          answer?: string;
        };

        if (!parsed.question || !parsed.answer) {
          return null;
        }

        return {
          id: setting.key,
          question: parsed.question,
          answer: parsed.answer,
        };
      } catch {
        return null;
      }
    })
    .filter((faq): faq is FaqItem => faq !== null);
}