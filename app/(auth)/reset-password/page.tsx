/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(auth)/reset-password/page.tsx
 * Purpose : Allows users to set a new password using a reset token.
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return "Weak";
  if (score <= 3) return "Medium";
  return "Strong";
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
        confirmPassword,
      }),
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setMessage(data.message ?? "Password reset failed.");
      setLoading(false);
      return;
    }

    setComplete(true);
    setMessage(data.message ?? "Password updated successfully.");
    setLoading(false);
  }

  if (!token) {
    return (
      <section className="rounded-lg border bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Invalid Reset Link</h1>
        <p className="mt-3 text-sm text-gray-600">
          This password reset link is missing or invalid.
        </p>
        <Link
          className="mt-5 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          href="/forgot-password"
        >
          Request New Link
        </Link>
      </section>
    );
  }

  if (complete) {
    return (
      <section className="rounded-lg border border-green-200 bg-green-50 p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-green-800">
          Password Updated
        </h1>
        <p className="mt-3 text-sm text-green-700">{message}</p>
        <Link
          className="mt-5 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          href="/login"
        >
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-center text-2xl font-semibold">
        Reset Password
      </h1>

      <p className="mb-6 text-center text-sm text-gray-600">
        Enter and confirm your new password.
      </p>

      {message ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {message}
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="password">
            New Password
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            id="password"
            name="password"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            className="mt-2 text-sm font-medium text-slate-700 hover:underline"
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>

          {password ? (
            <p className="mt-1 text-xs text-gray-600">
              Strength: {passwordStrength}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            id="confirmPassword"
            name="confirmPassword"
            required
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <button
            className="mt-2 text-sm font-medium text-slate-700 hover:underline"
            type="button"
            onClick={() => setShowConfirmPassword((previous) => !previous)}
          >
            {showConfirmPassword ? "Hide" : "Show"} Confirm Password
          </button>
        </div>

        <button
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
          type="submit"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}