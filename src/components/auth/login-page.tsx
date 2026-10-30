import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthBrand } from "@/components/auth/auth-brand";
import { LoginIntro } from "@/components/auth/login-intro";
import { LoginForm } from "@/components/auth/login-form";
import { AuthBackground } from "@/components/auth/auth-background";

export function LoginPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      {/* Decorative background */}
      <AuthBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <header className="flex min-h-[104px] items-center justify-between gap-4 py-5">
          <AuthBrand />

          <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500 sm:gap-3 sm:text-sm">
            <span className="hidden sm:inline">Don’t have an account?</span>

            <Link
              href="/signup"
              className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
            >
              Sign Up
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 items-center gap-8 pb-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 lg:pb-16 xl:gap-16">
          {/* Left side */}
          <div className="order-2 lg:order-1">
            <LoginIntro />
          </div>

          {/* Right side */}
          <div className="order-1 flex min-w-0 items-center justify-center pt-4 lg:order-2 lg:pt-0">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
