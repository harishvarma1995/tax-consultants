/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/ui/Badge.tsx
 * Purpose : Reusable badge component for labels and statuses.
 * ============================================================
 */

import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "success" | "warning" | "danger" | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  info: "bg-primary/10 text-primary",
};

export function Badge({
  children,
  variant = "info",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}