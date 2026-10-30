"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

interface WeeklyPlanHeaderProps {
  weekLabel: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  onAddTask: () => void;
}

export function WeeklyPlanHeader({
  weekLabel,
  onPreviousWeek,
  onNextWeek,
  onToday,
  onAddTask,
}: WeeklyPlanHeaderProps) {
  return (
    <section className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#101b46]">
          Weekly Plan
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Plan your week, stay consistent, make progress.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPreviousWeek}
          aria-label="Previous week"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
        >
          <ChevronLeft size={19} />
        </button>

        <div className="flex h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3">
          <CalendarDays size={18} className="text-[#101b46]" />

          <span className="whitespace-nowrap text-sm font-medium text-[#101b46]">
            {weekLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={onNextWeek}
          aria-label="Next week"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
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

          <span>Add Task</span>

          <ChevronDown size={16} className="ml-2" />
        </button>
      </div>
    </section>
  );
}
