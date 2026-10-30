import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export function SignupHeader() {
  return (
    <header className="flex min-h-[100px] items-center justify-between gap-4 py-5">
      <Link
        href="/"
        aria-label="Planly home"
        className="group flex items-center gap-3"
      >
        <Leaf
          size={39}
          strokeWidth={1.8}
          className="fill-emerald-500 text-emerald-600 transition-transform group-hover:-rotate-6"
          aria-hidden="true"
        />

        <div>
          <span className="block text-2xl font-extrabold tracking-tight text-slate-950">
            Planly
          </span>

          <span className="mt-1 block text-xs text-slate-500 sm:text-sm">
            Plan Today, Build Tomorrow.
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2 text-xs sm:gap-3 sm:text-sm">
        <span className="hidden text-slate-500 sm:inline">
          Already have an account?
        </span>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-emerald-800"
        >
          <span>Sign In</span>

          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
