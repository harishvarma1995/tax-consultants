/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/layout/PageContainer.tsx
 * Purpose : Shared page container used by every public page.
 *
 * This component keeps page widths, spacing, and responsive
 * layout consistent across the website.
 * ============================================================
 */

import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
      {children}
    </main>
  );
}