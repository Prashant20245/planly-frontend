import Link from "next/link";
import { ArrowRight, Check, CirclePlay, Leaf } from "lucide-react";

import { DashboardPreview } from "./dashboard-preview";
import { siteConfig } from "@/lib/site-date";

export function HeroSection() {
  return (
    <section id="home" className="hero-background relative overflow-hidden">
      <div className="container-main relative z-10 grid items-center gap-12 py-14 lg:min-h-[620px] lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 lg:py-20">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-2 text-xs font-medium text-emerald-800">
            <Leaf size={14} aria-hidden="true" />
            {siteConfig.tagline}
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[58px]">
            Turn Your Plans
            <br />
            <span className="text-emerald-600">Into Progress</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
            {siteConfig.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Get Started Free
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-700"
            >
              <CirclePlay size={18} aria-hidden="true" />
              How It Works
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check
                size={14}
                className="text-emerald-600"
                aria-hidden="true"
              />
              No credit card required
            </span>

            <span className="flex items-center gap-1.5">
              <Check
                size={14}
                className="text-emerald-600"
                aria-hidden="true"
              />
              Free plan available
            </span>

            <span className="flex items-center gap-1.5">
              <Check
                size={14}
                className="text-emerald-600"
                aria-hidden="true"
              />
              Works across devices
            </span>
          </div>
        </div>

        <div className="relative min-w-0">
          <div
            className="absolute -inset-5 rounded-[32px] bg-emerald-200/20 blur-2xl"
            aria-hidden="true"
          />

          <DashboardPreview />
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-teal-100/30 blur-3xl"
        aria-hidden="true"
      />
    </section>
  );
}
