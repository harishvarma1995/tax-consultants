/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/robots.ts
 * Purpose : Search engine crawling rules.
 * ============================================================
 */

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}