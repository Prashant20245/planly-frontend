import { Hand } from "lucide-react";

type DashboardGreetingProps = {
  name: string;
};

export function DashboardGreeting({ name }: DashboardGreetingProps) {
  return (
    <section className="relative isolate flex min-h-32 items-center overflow-hidden rounded-2xl px-4 py-5 sm:min-h-36 sm:px-6 lg:px-5">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-r from-white via-white/95 to-emerald-50"
      />

      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] bg-gradient-to-l from-emerald-100/30 via-emerald-50/20 to-transparent lg:block"
      />

      <div className="max-w-xl">
        <p className="text-sm font-medium text-slate-600 sm:text-base">
          Good afternoon,
        </p>

        <div className="mt-0.5 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {name}
          </h1>

          <Hand
            aria-label="Waving hand"
            className="size-8 rotate-[-15deg] text-amber-500 sm:size-9"
          />
        </div>

        <p className="mt-1 text-sm text-slate-600">
          “Consistent progress leads to extraordinary results.”
        </p>
      </div>

      <div className="ml-auto hidden max-w-64 text-right lg:block">
        <p className="text-sm leading-6 text-slate-700">
          “A well planned day
          <br />
          turns into a successful life.”
        </p>
        <span className="mt-1 block text-slate-500">—</span>
      </div>
    </section>
  );
}
