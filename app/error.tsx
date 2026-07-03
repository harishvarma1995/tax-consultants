"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-danger">
            Unexpected Error
          </p>

          <h1 className="mt-4 text-5xl font-bold text-primary">
            Something went wrong
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            An unexpected error occurred. Please try again or contact our team
            for support.
          </p>

          <button
            className="mt-8 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            type="button"
            onClick={() => reset()}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}