/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(auth)/login/page.tsx
 * Purpose : Renders the login form for clients and administrators.
 *
 * This page signs users in with NextAuth credentials and sends
 * them to the correct dashboard after successful authentication.
 * ============================================================
 */

"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");

    const verifiedParam = searchParams.get("verified");

    if (verifiedParam === "true") {
      setError("Email verified successfully. You can now log in.");
      return;
    }

    if (errorParam === "EmailNotVerified") {
      setError("Please verify your email before logging in.");
      return;
    }

    if (errorParam === "CredentialsSignin") {
      setError("Invalid email or password.");
      return;
    }

    if (errorParam) {
      setError("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      rememberMe,
      redirect: false,
    });

    if (result?.error) {
      setError(
        result.error === "EmailNotVerified"
          ? "Please verify your email before logging in."
          : "Invalid email or password."
      );
      setLoading(false);
      return;
    }

    router.push("/client/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-semibold">
          Account Login
        </h1>

        <p className="mb-6 text-center text-sm text-gray-600">
          Sign in to access your secure tax portal.
        </p>

        {error ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
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

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="password"
            >
              Password
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
             type="button"
             onClick={() => setShowPassword((previous) => !previous)}
             className="mt-2 text-sm font-medium text-slate-700 hover:underline"
>
             {showPassword ? "Hide" : "Show"} Password
            </button>

          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                checked={rememberMe}
                className="h-4 w-4"
                type="checkbox"
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Remember me
            </label>

            <Link
              className="font-medium text-slate-900 underline"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          <button
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            className="font-medium text-slate-900 underline"
            href="/register"
          >
            Register here
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}