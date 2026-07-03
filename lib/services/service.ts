/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : lib/services/service.ts
 * Purpose : Centralized read functions for public service data.
 * ============================================================
 */

import { db } from "@/lib/db";

export async function getAllActiveServices() {
  return db.service.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
  });
}

export async function getServiceBySlug(slug: string) {
  return db.service.findUnique({
    where: {
      slug,
    },
  });
}