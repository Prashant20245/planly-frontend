import { features } from "@/lib/site-date";

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-main">
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-badge">✨ Features</p>

            <h2 className="section-heading mt-3 max-w-xl">
              Everything You Need to
              <br />
              <span className="text-emerald-600">Stay on Track</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-500 md:text-right">
            Planly provides powerful yet simple tools to help you plan, manage,
            and achieve your goals efficiently.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="feature-card group">
                <span
                  className={`icon-box icon-${feature.color} h-12 w-12 rounded-xl transition-transform group-hover:-translate-y-1`}
                >
                  <Icon size={23} aria-hidden="true" />
                </span>

                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
