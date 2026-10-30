"use client";

import { useMemo, useState } from "react";

import { ChevronRight } from "lucide-react";

import type { YearlyTask } from "@/types/yearly-types";

interface YearlyActivityHeatmapProps {
  year: number;
  tasks: YearlyTask[];
  onSelectDate?: (date: string) => void;
}

interface DayActivity {
  date: Date;
  dateKey: string;
  activity: number;
  isCurrentMonth: boolean;
}

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const activityColors = [
  "bg-slate-200",
  "bg-emerald-200",
  "bg-emerald-300",
  "bg-emerald-500",
  "bg-emerald-700",
];

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getActivityLevel(activity: number): number {
  if (activity <= 0) return 0;
  if (activity <= 1) return 1;
  if (activity <= 2) return 2;
  if (activity <= 4) return 3;

  return 4;
}

function getMonthDays(
  year: number,
  month: number,
  activityByDate: Map<string, number>,
): DayActivity[] {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const leadingDays = firstDay.getDay();

  // Always render six rows so all months have consistent card heights.
  const totalCells = 42;

  return Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(year, month, index - leadingDays + 1);

    const dateKey = getDateKey(date);

    return {
      date,
      dateKey,
      activity: activityByDate.get(dateKey) ?? 0,
      isCurrentMonth:
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() <= daysInMonth,
    };
  });
}

export function YearlyActivityHeatmap({
  year,
  tasks,
  onSelectDate,
}: YearlyActivityHeatmapProps) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const activityByDate = useMemo(() => {
    const result = new Map<string, number>();

    for (const task of tasks) {
      if (task.status !== "completed") {
        continue;
      }

      const taskYear = Number(task.date.slice(0, 4));

      if (taskYear !== year) {
        continue;
      }

      result.set(task.date, (result.get(task.date) ?? 0) + 1);
    }

    return result;
  }, [tasks, year]);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, month) => ({
        month,
        label: new Date(year, month, 1).toLocaleDateString("en-US", {
          month: "short",
        }),
        days: getMonthDays(year, month, activityByDate),
      })),
    [year, activityByDate],
  );

  const visibleMonths =
    selectedMonth === null
      ? months
      : months.filter((month) => month.month === selectedMonth);

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm shadow-slate-100/50 sm:p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-bold text-[#101b46]">
            Year at a Glance
          </h2>

          <select
            aria-label="Filter activity by month"
            value={selectedMonth ?? "all"}
            onChange={(event) => {
              const value = event.target.value;

              setSelectedMonth(value === "all" ? null : Number(value));
            }}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 outline-none focus:border-emerald-500 xl:hidden"
          >
            <option value="all">All months</option>

            {months.map((month) => (
              <option key={month.month} value={month.month}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 sm:gap-4">
          <span className="font-medium">No activity</span>

          {[
            {
              label: "Low",
              color: "bg-emerald-200",
            },
            {
              label: "Moderate",
              color: "bg-emerald-400",
            },
            {
              label: "High",
              color: "bg-emerald-700",
            },
          ].map((level) => (
            <span key={level.label} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-full ${level.color}`} />

              {level.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 2xl:grid-cols-4">
        {visibleMonths.map((month) => (
          <button
            key={month.month}
            type="button"
            onClick={() =>
              onSelectDate?.(
                `${year}-${String(month.month + 1).padStart(2, "0")}-01`,
              )
            }
            className="min-w-0 rounded-lg border border-slate-100 p-2 text-left transition hover:border-emerald-200 hover:bg-emerald-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-[#101b46]">
                {month.label}
              </span>

              <ChevronRight size={14} className="text-slate-300" />
            </div>

            <div className="grid grid-cols-7 gap-x-1 gap-y-1.5">
              {weekdays.map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className="text-center text-[9px] text-slate-400"
                >
                  {day}
                </span>
              ))}

              {month.days.map((day) => {
                const level = getActivityLevel(day.activity);

                return (
                  <span
                    key={day.dateKey}
                    title={
                      day.isCurrentMonth
                        ? `${day.dateKey}: ${day.activity} completed tasks`
                        : undefined
                    }
                    onClick={(event) => {
                      event.stopPropagation();

                      if (day.isCurrentMonth && onSelectDate) {
                        onSelectDate(day.dateKey);
                      }
                    }}
                    className={`mx-auto h-2 w-2 rounded-full transition sm:h-2 sm:w-2 ${
                      !day.isCurrentMonth ? "invisible" : activityColors[level]
                    } ${
                      day.isCurrentMonth
                        ? "cursor-pointer hover:ring-2 hover:ring-emerald-300"
                        : ""
                    }`}
                  />
                );
              })}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-400">
        <span>Activity is based on completed tasks.</span>

        <button
          type="button"
          onClick={() => setSelectedMonth(null)}
          className="text-emerald-700 hover:text-emerald-800"
        >
          Show full year
        </button>
      </div>
    </section>
  );
}
