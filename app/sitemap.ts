/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/sitemap.ts
 * Purpose : XML sitemap for search engines.
 * ============================================================
 */

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const routes = [
    "",
    "/about",
    "/services",
    "/blog",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
    "/login",
    "/register",
    "/forgot-password",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}