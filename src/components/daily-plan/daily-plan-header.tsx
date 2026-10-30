"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import { formatDate, toDateKey } from "@/lib/daily-plan/utils";

type DailyPlanHeaderProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onAddTask: () => void;
};

export function DailyPlanHeader({
  selectedDate,
  onDateChange,
  onAddTask,
}: DailyPlanHeaderProps) {
  function changeDate(days: number) {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + days);
    onDateChange(nextDate);
  }

  return (
    <section className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Daily Plan
        </h1>

        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          Focus on today. Progress towards a better you.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <label className="relative flex h-11 min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
          <CalendarDays
            aria-hidden="true"
            className="size-[18px] shrink-0 text-slate-700"
          />

          <span className="sr-only">Select plan date</span>

          <input
            type="date"
            value={toDateKey(selectedDate)}
            onChange={(event) => {
              if (!event.target.value) return;

              const [year, month, day] = event.target.value
                .split("-")
                .map(Number);

              onDateChange(new Date(year, month - 1, day));
            }}
            className="min-w-0 w-[155px] cursor-pointer bg-transparent text-sm text-slate-800 outline-none"
          />

          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-slate-500"
          />
        </label>

        <button
          type="button"
          onClick={() => changeDate(-1)}
          aria-label="Previous day"
          className="flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-emerald-600"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>

        <button
          type="button"
          onClick={() => onDateChange(new Date())}
          className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-emerald-600"
        >
          Today
        </button>

        <button
          type="button"
          onClick={() => changeDate(1)}
          aria-label="Next day"
          className="flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-emerald-600"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>

        <button
          type="button"
          onClick={onAddTask}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          <Plus aria-hidden="true" className="size-5" />
          Add Task
        </button>
      </div>
    </section>
  );
}
