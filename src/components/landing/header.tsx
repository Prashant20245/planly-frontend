import Link from "next/link";
import { ArrowRight, Leaf, Menu, Sun } from "lucide-react";
import { navigation, siteConfig } from "@/lib/site-date";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/90 backdrop-blur-xl">
      <div className="container-main flex h-[72px] items-center justify-between gap-5">
        <Link
          href="/"
          aria-label="Planly home"
          className="flex shrink-0 items-center gap-2"
        >
          <Leaf
            className="h-7 w-7 fill-emerald-500 text-emerald-600"
            aria-hidden="true"
          />

          <span className="text-2xl font-extrabold tracking-tight text-slate-950">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-700 ${
                index === 0 ? "text-emerald-700" : "text-slate-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            aria-label="Theme toggle coming soon"
            title="Theme toggle"
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <Sun size={19} aria-hidden="true" />
          </button>

          <Link
            href="/login"
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-700"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Get Started
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <details className="relative sm:hidden">
          <summary
            aria-label="Open navigation menu"
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 text-slate-700"
          >
            <Menu size={22} aria-hidden="true" />
          </summary>

          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-12 flex w-60 flex-col gap-1 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {item.label}
              </Link>
            ))}

            <hr className="my-2 border-slate-100" />

            <Link
              href="/login"
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-emerald-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Get Started
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
