/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/ui/Input.tsx
 * Purpose : Reusable form input with label, helper text, and error state.
 * ============================================================
 */

import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

export function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div>
      <label className="mb-1 block text-sm font-medium" htmlFor={inputId}>
        {label}
      </label>

      <input
        id={inputId}
        className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-danger focus:ring-danger/20"
            : "border-border focus:ring-accent/30"
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="mt-1 text-xs text-danger">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}