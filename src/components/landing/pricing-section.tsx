import Link from "next/link";
import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/site-date";

export function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-slate-50/50">
      <div className="container-main">
        <div className="text-center">
          <p className="section-badge">✨ Pricing</p>

          <h2 className="section-heading mt-4">Simple, Transparent Pricing</h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Choose a plan that fits your needs. Start for free and upgrade
            anytime.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl items-stretch gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;

            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 ${
                  plan.highlighted
                    ? "border-emerald-400 shadow-lg shadow-emerald-900/5"
                    : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 right-5 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold text-white">
                    Most Popular
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span className="icon-box icon-green h-11 w-11 rounded-xl">
                    <Icon size={22} aria-hidden="true" />
                  </span>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {plan.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-950">
                    {plan.price}
                  </span>

                  <span className="text-sm text-slate-500">{plan.period}</span>
                </div>

                <ul className="mt-7 flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <Check
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Prices are illustrative. Confirm your actual pricing, billing period,
          taxes, and plan limits before launch.
        </p>
      </div>
    </section>
  );
}
