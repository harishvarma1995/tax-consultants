/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : lib/tokens.ts
 * Purpose : Creates and verifies secure one-time tokens.
 * ============================================================
 */

import crypto from "crypto";

export function createRawToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function createTokenExpiry(hours: number) {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}