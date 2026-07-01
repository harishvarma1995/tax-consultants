/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(auth)/forgot-password/page.tsx
 * Purpose : Allows users to request a secure password reset link.
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = (await response.json()) as { message?: string };

    setMessage(data.message ?? "If the email exists, a reset link has been sent.");
    setLoading(false);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-semibold">
          Forgot Password
        </h1>

        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your email address and we will send a secure reset link.
        </p>

        {message ? (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {message}
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              id="email"
              name="email"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
            type="submit"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link className="font-medium text-slate-900 underline" href="/login">
            Back to Login
          </Link>
        </p>
      </section>
    </main>
  );
}