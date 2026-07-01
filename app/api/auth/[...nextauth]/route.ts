/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/auth/[...nextauth]/route.ts
 * Purpose : Exposes the NextAuth API handlers used for sign-in,
 * sign-out, session management, and authentication callbacks.
 * ============================================================
 */

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;