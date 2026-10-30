import { testimonials } from "@/lib/site-date";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-main">
        <div className="text-center">
          <p className="section-badge">✨ Testimonials</p>

          <h2 className="section-heading mt-4">
            Loved by People Who{" "}
            <span className="text-emerald-600">Plan for a Better Tomorrow</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            See what our users say about how Planly has helped them stay
            organized and achieve their goals.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800"
                >
                  {testimonial.initials}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div
                className="mt-5 flex gap-1 text-amber-400"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 text-sm leading-6 text-slate-600">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
