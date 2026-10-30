"use client";

import { useState, type FormEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  validateLogin,
  type LoginFieldErrors,
  type LoginFormValues,
} from "@/lib/auth/login-validation";

import { loginUser } from "@/services/auth.service";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: true,
};

export function LoginForm() {
  const router = useRouter();

  const [values, setValues] = useState<LoginFormValues>(initialValues);

  const [errors, setErrors] = useState<LoginFieldErrors>({});

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [serverError, setServerError] = useState("");

  function updateField<K extends keyof LoginFormValues>(
    field: K,
    value: LoginFormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (field === "email" || field === "password") {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }

    setServerError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setServerError("");

    const validationErrors = validateLogin(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await loginUser(values);

      // Accept only a relative path to prevent open redirects.
      const redirectTo =
        result.redirectTo &&
        result.redirectTo.startsWith("/") &&
        !result.redirectTo.startsWith("//") &&
        !result.redirectTo.includes("\\")
          ? result.redirectTo
          : "/dashboard";

      router.replace(redirectTo);
      router.refresh();
    } catch {
      // Avoid exposing internal backend errors or account details.
      setServerError(
        "Unable to sign in with those credentials. Please check your details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputWrapperClass =
    "flex min-h-[54px] items-center gap-3 rounded-xl border bg-white px-4 transition-colors";

  const inputBaseClass =
    "h-[50px] w-full min-w-0 border-0 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400";

  function inputWrapperState(hasError: boolean) {
    return hasError
      ? "border-red-500 focus-within:ring-4 focus-within:ring-red-500/10"
      : "border-slate-200 hover:border-slate-300 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10";
  }

  return (
    <section
      aria-labelledby="login-form-title"
      className="w-full rounded-2xl border border-slate-200/80 bg-white/95 px-5 py-8 shadow-[0_16px_55px_rgba(15,23,42,0.045)] backdrop-blur-sm sm:px-8 sm:py-10 lg:px-10 lg:py-12"
    >
      {/* Heading */}
      <div className="text-center">
        <h2
          id="login-form-title"
          className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl"
        >
          Sign In to Planly
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          Welcome back! Please sign in to continue.
        </p>
      </div>

      {/* Social login */}
      <div className="mt-7">
        <SocialLoginButtons disabled={isSubmitting} />
      </div>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-slate-200" />

        <span className="text-sm font-medium text-slate-500">OR</span>

        <span className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        className="space-y-6"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Email address
          </label>

          <div
            className={`${inputWrapperClass} ${inputWrapperState(Boolean(errors.email))}`}
          >
            <Mail
              size={20}
              className="shrink-0 text-slate-400"
              aria-hidden="true"
            />

            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              disabled={isSubmitting}
              className={inputBaseClass}
            />
          </div>

          {errors.email && (
            <p
              id="login-email-error"
              role="alert"
              className="mt-2 text-xs text-red-600"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="login-password"
              className="block text-sm font-semibold text-slate-900"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Forgot password?
            </Link>
          </div>

          <div
            className={`${inputWrapperClass} ${inputWrapperState(Boolean(errors.password))}`}
          >
            <LockKeyhole
              size={20}
              className="shrink-0 text-slate-400"
              aria-hidden="true"
            />

            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={values.password}
              onChange={(event) => updateField("password", event.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
              disabled={isSubmitting}
              className={inputBaseClass}
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              disabled={isSubmitting}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff size={20} aria-hidden="true" />
              ) : (
                <Eye size={20} aria-hidden="true" />
              )}
            </button>
          </div>

          {errors.password && (
            <p
              id="login-password-error"
              role="alert"
              className="mt-2 text-xs text-red-600"
            >
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex w-fit cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="rememberMe"
              checked={values.rememberMe}
              onChange={(event) =>
                updateField("rememberMe", event.target.checked)
              }
              disabled={isSubmitting}
              className="peer sr-only"
            />

            <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition-colors peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-600">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="size-4"
                aria-hidden="true"
              >
                <path
                  d="m4 10 4 4 8-8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="text-sm text-slate-900">Keep me signed in</span>
          </label>

          <p className="text-xs leading-5 text-slate-500 sm:text-right sm:text-sm">
            Sign in to access your plans and progress.
          </p>
        </div>

        {/* Server error */}
        {serverError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {serverError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-600 px-5 py-4 text-base font-semibold text-white shadow-sm shadow-emerald-600/15 transition hover:from-emerald-700 hover:to-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-65"
        >
          <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>

          {isSubmitting ? (
            <span
              aria-hidden="true"
              className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          ) : (
            <ArrowRight size={21} aria-hidden="true" />
          )}
        </button>
      </form>

      {/* Security information */}
      <div className="mt-7 flex items-start gap-4 rounded-xl bg-emerald-50/90 p-4 sm:p-5">
        <ShieldCheck
          size={34}
          className="mt-0.5 shrink-0 text-emerald-600"
          aria-hidden="true"
        />

        <div>
          <h3 className="text-sm font-bold text-emerald-950">
            Secure &amp; Private
          </h3>

          <p className="mt-1 text-xs leading-5 text-emerald-900/80 sm:text-sm">
            Your account security matters. Planly protects your information
            using appropriate security measures.
          </p>
        </div>
      </div>

      {/* Sign-up link */}
      <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-slate-500">
        <span>Don’t have an account?</span>

        <Link
          href="/signup"
          className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Sign Up
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </p>
    </section>
  );
}
