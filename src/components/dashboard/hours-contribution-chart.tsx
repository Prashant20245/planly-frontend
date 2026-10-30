"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ContributionData } from "@/lib/dashboard/types";

type HoursContributionChartProps = {
  data: ContributionData[];
};

export function HoursContributionChart({ data }: HoursContributionChartProps) {
  return (
    <section
      aria-labelledby="hours-contribution-title"
      className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="hours-contribution-title"
          className="text-base font-semibold text-slate-950"
        >
          Hours Contribution
        </h2>

        <div
          aria-label="Chart legend"
          className="flex flex-wrap items-center gap-3 text-xs text-slate-500"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-blue-400" />
            Daily
          </span>

          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-emerald-500" />
            Weekly
          </span>

          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-violet-500" />
            Monthly
          </span>
        </div>
      </div>

      <div className="mt-5 h-52 w-full sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 8,
              right: 4,
              left: -18,
              bottom: 0,
            }}
            barCategoryGap="22%"
            barGap={3}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E9EDF3"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#475569",
                fontSize: 12,
              }}
              dy={8}
            />

            <YAxis
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 11,
              }}
            />

            <Tooltip
              cursor={{ fill: "#F8FAFC" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 16px rgb(15 23 42 / 8%)",
              }}
              formatter={(value) => [`${value}h`, "Hours"]}
            />

            <Bar
              dataKey="daily"
              name="Daily"
              fill="#60A5FA"
              radius={[4, 4, 0, 0]}
              maxBarSize={13}
            />

            <Bar
              dataKey="weekly"
              name="Weekly"
              fill="#4DBB8B"
              radius={[4, 4, 0, 0]}
              maxBarSize={13}
            />

            <Bar
              dataKey="monthly"
              name="Monthly"
              fill="#A78BFA"
              radius={[4, 4, 0, 0]}
              maxBarSize={13}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
