import { benefits } from "@/lib/site-date";

export function BenefitsStrip() {
  return (
    <section
      aria-label="Planly benefits"
      className="border-y border-slate-100 bg-white"
    >
      <div className="container-main grid grid-cols-1 divide-y divide-slate-100 py-5 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-slate-100">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <article
              key={benefit.title}
              className="flex items-center gap-4 px-4 py-4 lg:px-5"
            >
              <span
                className={`icon-box icon-${benefit.color} h-12 w-12 shrink-0 rounded-xl`}
              >
                <Icon size={23} aria-hidden="true" />
              </span>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {benefit.title}
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {benefit.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
