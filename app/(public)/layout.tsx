/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/layout.tsx
 * Purpose : Public website layout with Header and Footer.
 * ============================================================
 */

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}