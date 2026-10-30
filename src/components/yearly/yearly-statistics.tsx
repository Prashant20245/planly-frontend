import type { YearlyStat } from "@/types/yearly-types";

interface YearlyStatisticsProps {
  stats: YearlyStat[];
}

const colorClasses = {
  green: {
    icon: "bg-emerald-50 text-emerald-600",
    progress: "bg-emerald-500",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600",
    progress: "bg-blue-500",
  },
  orange: {
    icon: "bg-orange-50 text-orange-500",
    progress: "bg-amber-500",
  },
  red: {
    icon: "bg-red-50 text-red-500",
    progress: "bg-red-500",
  },
};

export function YearlyStatistics({ stats }: YearlyStatisticsProps) {
  return (
    <section
      aria-label="Yearly statistics"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colors = colorClasses[stat.color];

        return (
          <article
            key={stat.id}
            className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.icon}`}
              >
                <Icon size={25} strokeWidth={2.3} />
              </div>

              <div className="min-w-0">
                <p className="text-xl font-bold leading-tight text-[#101b46]">
                  {stat.value}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {stat.title}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="truncate text-xs text-slate-500">
                  {stat.description}
                </span>

                <span className="text-xs font-medium text-[#101b46]">
                  {stat.progress}%
                </span>
              </div>

              <div
                className="h-2 overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
                aria-label={stat.title}
                aria-valuenow={stat.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full transition-all ${colors.progress}`}
                  style={{
                    width: `${stat.progress}%`,
                  }}
                />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
