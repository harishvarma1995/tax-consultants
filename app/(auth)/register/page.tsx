/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(auth)/register/page.tsx
 * Purpose : Renders the client registration form.
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ClientType = "INDIVIDUAL" | "BUSINESS";

type FormMessage = {
  type: "success" | "error";
  text: string;
};

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

export default function RegisterPage() {
  const [clientType, setClientType] = useState<ClientType>("INDIVIDUAL");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [representativeRole, setRepresentativeRole] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage | null>(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const finalEmail =
      clientType === "BUSINESS" ? businessEmail : email;

    const finalPhone =
      clientType === "BUSINESS" ? businessPhone : phone;

    const finalFullName =
      clientType === "BUSINESS" ? representativeName : fullName;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientType,
          fullName: finalFullName,
          email: finalEmail,
          phone: finalPhone,
          businessName,
          businessPhone,
          businessEmail,
          businessAddress,
          representativeName,
          representativeRole,
          password,
          confirmPassword,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Registration failed.");
      }

      setMessage({
        type: "success",
        text:
          data.message ??
          "Registration successful. Please check your email.",
      });

      setRegisteredEmail(finalEmail);
      setRegistrationComplete(true);

      setFullName("");
      setEmail("");
      setPhone("");
      setBusinessName("");
      setBusinessPhone("");
      setBusinessEmail("");
      setBusinessAddress("");
      setRepresentativeName("");
      setRepresentativeRole("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-12">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-semibold">
          Create Client Account
        </h1>

        <p className="mb-6 text-center text-sm text-gray-600">
          Register as an individual or business client to access your secure tax portal.
        </p>

        {message && !registrationComplete ? (
          <div
            className={`mb-4 rounded-md border p-3 text-sm ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        ) : null}

        {registrationComplete ? (
          <div className="rounded-md border border-green-200 bg-green-50 p-5 text-center">
            <h2 className="text-xl font-semibold text-green-800">
              Registration Successful!
            </h2>

            <p className="mt-3 text-sm text-green-700">
              We sent a verification email to:
            </p>

            <p className="mt-2 break-all font-medium text-green-900">
              {registeredEmail}
            </p>

            <p className="mt-3 text-sm text-green-700">
              Please verify your email before logging in.
            </p>

            <Link
              className="mt-5 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              href="/login"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Registering As
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  className={`rounded-md border p-3 text-left text-sm ${
                    clientType === "INDIVIDUAL"
                      ? "border-slate-900 bg-slate-50"
                      : "border-gray-200"
                  }`}
                  type="button"
                  onClick={() => setClientType("INDIVIDUAL")}
                >
                  <span className="font-medium">Individual</span>
                  <span className="block text-gray-600">
                    Personal tax filing and consultation
                  </span>
                </button>

                <button
                  className={`rounded-md border p-3 text-left text-sm ${
                    clientType === "BUSINESS"
                      ? "border-slate-900 bg-slate-50"
                      : "border-gray-200"
                  }`}
                  type="button"
                  onClick={() => setClientType("BUSINESS")}
                >
                  <span className="font-medium">Business</span>
                  <span className="block text-gray-600">
                    GST, business tax, audit, and compliance
                  </span>
                </button>
              </div>
            </div>

            {clientType === "INDIVIDUAL" ? (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    id="fullName"
                    required
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    id="email"
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    id="phone"
                    required
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="businessName">
                    Business Name
                  </label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    id="businessName"
                    required
                    type="text"
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="businessEmail">
                    Business Email
                  </label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    id="businessEmail"
                    required
                    type="email"
                    value={businessEmail}
                    onChange={(event) => setBusinessEmail(event.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="businessPhone">
                    Business Phone
                  </label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    id="businessPhone"
                    required
                    type="tel"
                    value={businessPhone}
                    onChange={(event) => setBusinessPhone(event.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="businessAddress">
                    Business Address
                  </label>
                  <textarea
                    className="min-h-24 w-full rounded-md border px-3 py-2 text-sm"
                    id="businessAddress"
                    required
                    value={businessAddress}
                    onChange={(event) => setBusinessAddress(event.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="representativeName">
                    Representative Name
                  </label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    id="representativeName"
                    required
                    type="text"
                    value={representativeName}
                    onChange={(event) => setRepresentativeName(event.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="representativeRole">
                    Representative Role
                  </label>
                  <input
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    id="representativeRole"
                    required
                    type="text"
                    placeholder="Director, Partner, Proprietor, Accountant"
                    value={representativeRole}
                    onChange={(event) => setRepresentativeRole(event.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                id="password"
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
              <label className="mb-1 block text-sm font-medium" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                id="confirmPassword"
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
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>
        )}

        {!registrationComplete ? (
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link className="font-medium text-slate-900 underline" href="/login">
              Login here
            </Link>
          </p>
        ) : null}
      </section>
    </main>
  );
}