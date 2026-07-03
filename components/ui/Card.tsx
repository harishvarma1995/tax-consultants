/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/ui/Card.tsx
 * Purpose : Reusable card component with optional hover effect.
 * ============================================================
 */

import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hover?: boolean;
};

export function Card({
  children,
  hover = true,
  className = "",
  ...props
}: CardProps) {
  const hoverClasses = hover
    ? "transition hover:-translate-y-1 hover:shadow-md"
    : "";

  return (
    <div
      className={`rounded-lg border border-border bg-card p-6 shadow-sm ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}