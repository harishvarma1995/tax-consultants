/**
 * COMPONENT: Session Provider
 * Purpose: A client-side wrapper that allows the rest of the application
 * to access authentication session data via the NextAuth context.
 */
"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}