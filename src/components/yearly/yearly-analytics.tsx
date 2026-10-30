"use client";

import { useState } from "react";

import type { MonthlyProgress, TimeAllocation } from "@/types/yearly-types";

import { DonutChart } from "./yearly-sidebar";

interface YearlyAnalyticsProps {
  progress: MonthlyProgress[];
  allocation: TimeAllocation[];
  totalFocusHours: number;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function YearlyAnalytics({
  progress,
  allocation,
  totalFocusHours,
}: YearlyAnalyticsProps) {
  return (
    <section className="grid grid-cols-1 gap-3 xl:grid-cols-[1.7fr_1fr]">
      <MonthlyProgressCard progress={progress} />

      <YearlyAllocationChart
        allocation={allocation}
        totalFocusHours={totalFocusHours}
      />
    </section>
  );
}

function MonthlyProgressCard({ progress }: { progress: MonthlyProgress[] }) {
  const [metric, setMetric] = useState<"tasks" | "focus">("tasks");

  const maxValue = Math.max(
    100,
    ...progress.map((item) => Math.max(item.planned, item.completed)),
  );

  return (
    <article className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-[#101b46]">Monthly Progress</h2>

        <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
            Tasks Completed
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" />
            Tasks Planned
          </span>

          <select
            value={metric}
            onChange={(event) =>
              setMetric(event.target.value as "tasks" | "focus")
            }
            aria-label="Select progress metric"
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 outline-none focus:border-emerald-500"
          >
            <option value="tasks">Tasks</option>
            <option value="focus">Focus Time</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <div className="flex h-36 flex-col justify-between pb-5 text-right text-[10px] text-slate-500">
          {[100, 80, 60, 40, 20, 0].map((value) => (
            <span key={value}>{metric === "tasks" ? value : `${value}h`}</span>
          ))}
        </div>

        <div className="relative flex h-36 min-w-0 flex-1 items-end justify-between gap-1 border-b border-l border-slate-200 px-1 sm:gap-2 sm:px-2">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-5">
            {[0, 1, 2, 3, 4].map((line) => (
              <div key={line} className="border-t border-slate-100" />
            ))}
          </div>

          {progress.map((item) => {
            const completed = metric === "tasks" ? item.completed : 0;

            const planned = metric === "tasks" ? item.planned : 0;

            return (
              <div
                key={item.month}
                className="relative z-10 flex h-full min-w-0 flex-1 flex-col items-center justify-end"
              >
                <div className="flex h-full w-full items-end justify-center gap-0.5 sm:gap-1">
                  <div
                    className="w-1/2 max-w-4 rounded-t bg-slate-200"
                    style={{
                      height: `${(planned / maxValue) * 80}%`,
                    }}
                    title={`Planned: ${planned}`}
                  />

                  <div
                    className="w-1/2 max-w-4 rounded-t bg-emerald-500/80"
                    style={{
                      height: `${(completed / maxValue) * 80}%`,
                    }}
                    title={`Completed: ${completed}`}
                  />
                </div>

                <span className="mt-2 text-[9px] text-slate-500 sm:text-[10px]">
                  {monthNames[item.month]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {metric === "focus" && (
        <p className="mt-3 text-xs text-slate-500">
          Connect monthly focus-time data to enable this metric.
        </p>
      )}
    </article>
  );
}

function YearlyAllocationChart({
  allocation,
  totalFocusHours,
}: {
  allocation: TimeAllocation[];
  totalFocusHours: number;
}) {
  return (
    <article className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <h2 className="text-sm font-bold text-[#101b46]">
        Time Allocation (Yearly)
      </h2>

      <div className="mt-4">
        <DonutChart
          segments={allocation.map((item) => ({
            label: item.label,
            value: item.percentage,
            color: item.color,
          }))}
          centerValue={`${totalFocusHours}h`}
          centerLabel="Total"
          formatValue={(value) => `${value}%`}
        />
      </div>
    </article>
  );
}
