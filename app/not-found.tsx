/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/not-found.tsx
 * Purpose : Custom 404 page.
 * ============================================================
 */

import Link from "next/link";
import { routes } from "@/config/routes";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        404 Error
      </p>

      <h1 className="mt-4 text-5xl font-bold text-primary">
        Page Not Found
      </h1>

      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        The page you are looking for may have been moved, deleted, or never
        existed.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          href={routes.home}
        >
          Back to Home
        </Link>

        <Link
          className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-primary"
          href={routes.contact}
        >
          Contact Support
        </Link>
      </div>
    </main>
  );
}