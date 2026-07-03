/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/ui/Spinner.tsx
 * Purpose : Reusable loading spinner.
 * ============================================================
 */

type SpinnerProps = {
  label?: string;
};

export function Spinner({ label = "Loading" }: SpinnerProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" />
      <span>{label}</span>
    </div>
  );
}