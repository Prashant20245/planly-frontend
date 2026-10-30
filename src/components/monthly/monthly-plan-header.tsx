"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

interface MonthlyPlanHeaderProps {
  monthLabel: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddTask: () => void;
}

export function MonthlyPlanHeader({
  monthLabel,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onAddTask,
}: MonthlyPlanHeaderProps) {
  return (
    <section className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#101b46]">
          Monthly Plan
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Break your goals into actions. Stay consistent, achieve more.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPreviousMonth}
          aria-label="Previous month"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#101b46] transition hover:bg-slate-50"
        >
          <ChevronLeft size={19} />
        </button>

        <div className="flex h-11 min-w-44 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3">
          <CalendarDays size={18} className="shrink-0 text-[#101b46]" />

          <span className="flex-1 text-sm font-medium text-[#101b46]">
            {monthLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={onNextMonth}
          aria-label="Next month"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#101b46] transition hover:bg-slate-50"
        >
          <ChevronRight size={19} />
        </button>

        <button
          type="button"
          onClick={onToday}
          className="h-11 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-[#101b46] transition hover:bg-slate-50"
        >
          Today
        </button>

        <button
          type="button"
          onClick={onAddTask}
          className="flex h-11 items-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          <Plus size={19} />
          Add Task
          <ChevronDown size={16} className="ml-2" />
        </button>
      </div>
    </section>
  );
}
