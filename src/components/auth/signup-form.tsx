"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import {
  validateSignup,
  type SignupFieldErrors,
  type SignupFormValues,
} from "@/lib/auth/signup-validation";

import { registerUser } from "@/services/auth.service";

const initialValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
};

export function SignupForm() {
  const [values, setValues] = useState<SignupFormValues>(initialValues);

  const [errors, setErrors] = useState<SignupFieldErrors>({});

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function updateField(field: keyof SignupFormValues, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setServerError("");
    setSuccessMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setServerError("");
    setSuccessMessage("");

    const validationErrors = validateSignup(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerUser(values);

      setSuccessMessage(
        result.message || "Your account was created successfully.",
      );

      setValues(initialValues);
      setErrors({});
      setShowPassword(false);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleGoogleSignup() {
    // Implement this endpoint in your authentication backend.
    window.location.assign("/api/auth/google");
  }

  return (
    <section
      aria-labelledby="signup-title"
      className="signup-card w-full max-w-[645px] rounded-2xl border border-slate-200/80 bg-white/95 px-5 py-8 shadow-[0_16px_55px_rgba(15,23,42,0.045)] backdrop-blur-sm sm:px-8 sm:py-10 lg:px-10 lg:py-12"
    >
      {/* Heading */}
      <div className="text-center">
        <h2
          id="signup-title"
          className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl"
        >
          Create Your Account
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          Join Planly and start building a more productive you.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 space-y-5 sm:mt-10 sm:space-y-6"
      >
        {/* Full name */}
        <div>
          <label
            htmlFor="signup-name"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Full Name
          </label>

          <div
            className={`signup-input-wrapper ${
              errors.name ? "signup-input-error" : ""
            }`}
          >
            <UserRound
              size={20}
              className="shrink-0 text-slate-400"
              aria-hidden="true"
            />

            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "signup-name-error" : undefined}
              disabled={isSubmitting}
              className="signup-input"
            />
          </div>

          {errors.name && (
            <p
              id="signup-name-error"
              role="alert"
              className="mt-2 text-xs text-red-600"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Email Address
          </label>

          <div
            className={`signup-input-wrapper ${
              errors.email ? "signup-input-error" : ""
            }`}
          >
            <Mail
              size={20}
              className="shrink-0 text-slate-400"
              aria-hidden="true"
            />

            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Enter your email address"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              disabled={isSubmitting}
              className="signup-input"
            />
          </div>

          {errors.email && (
            <p
              id="signup-email-error"
              role="alert"
              className="mt-2 text-xs text-red-600"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Password
          </label>

          <div
            className={`signup-input-wrapper ${
              errors.password ? "signup-input-error" : ""
            }`}
          >
            <LockKeyhole
              size={20}
              className="shrink-0 text-slate-400"
              aria-hidden="true"
            />

            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              value={values.password}
              onChange={(event) => updateField("password", event.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "signup-password-error"
                  : "signup-password-hint"
              }
              disabled={isSubmitting}
              className="signup-input"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={isSubmitting}
              className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff size={20} aria-hidden="true" />
              ) : (
                <Eye size={20} aria-hidden="true" />
              )}
            </button>
          </div>

          {errors.password ? (
            <p
              id="signup-password-error"
              role="alert"
              className="mt-2 text-xs leading-5 text-red-600"
            >
              {errors.password}
            </p>
          ) : (
            <p
              id="signup-password-hint"
              className="mt-2 text-xs leading-5 text-slate-500"
            >
              Use at least 8 characters with a mix of letters, numbers, and
              symbols.
            </p>
          )}
        </div>

        {/* API error */}
        {serverError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {serverError}
          </div>
        )}

        {/* Registration success */}
        {successMessage && (
          <div
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {successMessage}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-600 px-5 py-4 text-base font-semibold text-white shadow-sm shadow-emerald-600/15 transition hover:from-emerald-700 hover:to-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-65"
        >
          <span>{isSubmitting ? "Creating Account..." : "Create Account"}</span>

          {!isSubmitting && <ArrowRight size={21} aria-hidden="true" />}

          {isSubmitting && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 py-1">
          <span className="h-px flex-1 bg-slate-200" />

          <span className="text-sm font-medium text-slate-400">OR</span>

          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Google signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-65"
        >
          <FcGoogle size={22} aria-hidden="true" />

          <span>Continue with Google</span>
        </button>

        {/* Mobile-friendly sign-in link */}
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-3 text-center text-sm text-slate-500">
          <span>Already have an account?</span>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-emerald-800"
          >
            Sign In
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </p>
      </form>
    </section>
  );
}
