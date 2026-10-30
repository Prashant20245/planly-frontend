import Link from "next/link";
import { ArrowRight, Check, Leaf } from "lucide-react";

export function FinalCta() {
  return (
    <section className="bg-white px-4 pb-12">
      <div className="cta-background container-main overflow-hidden rounded-3xl border border-emerald-100 px-5 py-14 text-center sm:px-10 sm:py-16">
        <p className="section-badge">
          <Leaf size={13} aria-hidden="true" />
          Ready to Get Started?
        </p>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Start Planning, Start Progressing
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
          Join people who are building a better tomorrow with Planly.
        </p>

        <Link
          href="/signup"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          Get Started Free
          <ArrowRight size={17} aria-hidden="true" />
        </Link>

        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <Check size={14} className="text-emerald-600" aria-hidden="true" />
            No credit card required
          </span>

          <span className="flex items-center gap-1.5">
            <Check size={14} className="text-emerald-600" aria-hidden="true" />
            Free plan available
          </span>

          <span className="flex items-center gap-1.5">
            <Check size={14} className="text-emerald-600" aria-hidden="true" />
            Works across devices
          </span>
        </div>
      </div>
    </section>
  );
}
