import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import type { DashboardStat } from "@/lib/dashboard/types";

type StatCardProps = {
  stat: DashboardStat;
};

const variantStyles = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
  },
  green: {
    icon: "bg-emerald-50 text-emerald-600",
  },
  purple: {
    icon: "bg-violet-50 text-violet-600",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600",
  },
  red: {
    icon: "bg-red-50 text-red-600",
  },
} as const;

export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon;
  const styles = variantStyles[stat.variant];

  const TrendIcon =
    stat.trend?.direction === "down"
      ? ArrowDownRight
      : stat.trend?.direction === "neutral"
        ? Minus
        : ArrowUpRight;

  return (
    <article className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl sm:size-14 ${styles.icon}`}
        >
          <Icon aria-hidden="true" className="size-6 sm:size-7" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-600">
            {stat.title}
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-[28px]">
            {stat.value}
          </p>

          {stat.trend ? (
            <div className="mt-1 flex flex-wrap items-center gap-1 text-xs">
              <span
                className={
                  stat.trend.direction === "down"
                    ? "inline-flex items-center font-semibold text-red-600"
                    : stat.trend.direction === "neutral"
                      ? "inline-flex items-center font-semibold text-slate-500"
                      : "inline-flex items-center font-semibold text-emerald-600"
                }
              >
                <TrendIcon aria-hidden="true" className="size-4" />
                {stat.trend.value}
              </span>

              <span className="text-slate-500">{stat.trend.description}</span>
            </div>
          ) : stat.caption ? (
            <p
              className={`mt-1 text-xs ${
                stat.variant === "red" ? "text-red-600" : "text-slate-500"
              }`}
            >
              {stat.caption}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
