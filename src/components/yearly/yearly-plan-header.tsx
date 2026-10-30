"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

interface YearlyPlanHeaderProps {
  year: number;
  onPreviousYear: () => void;
  onNextYear: () => void;
  onYearChange: (year: number) => void;
  onAddTask: () => void;
}

export function YearlyPlanHeader({
  year,
  onPreviousYear,
  onNextYear,
  onYearChange,
  onAddTask,
}: YearlyPlanHeaderProps) {
  return (
    <section className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#101b46]">
          Yearly Plan
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Zoom out. Stay focused. Make this year count.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPreviousYear}
          aria-label="Previous year"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#101b46] transition hover:bg-slate-50"
        >
          <ChevronLeft size={19} />
        </button>

        <label className="flex h-11 min-w-44 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3">
          <CalendarDays size={18} className="shrink-0 text-[#101b46]" />

          <select
            aria-label="Select year"
            value={year}
            onChange={(event) => onYearChange(Number(event.target.value))}
            className="min-w-0 flex-1 appearance-none bg-transparent text-sm font-medium text-[#101b46] outline-none"
          >
            {Array.from(
              { length: 11 },
              (_, index) => new Date().getFullYear() - 5 + index,
            ).map((optionYear) => (
              <option key={optionYear} value={optionYear}>
                {optionYear}
              </option>
            ))}
          </select>

          <ChevronDown size={15} className="shrink-0 text-slate-500" />
        </label>

        <button
          type="button"
          onClick={onNextYear}
          aria-label="Next year"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#101b46] transition hover:bg-slate-50"
        >
          <ChevronRight size={19} />
        </button>

        <button
          type="button"
          onClick={() => onYearChange(new Date().getFullYear())}
          className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-[#101b46] transition hover:bg-slate-50"
        >
          This Year
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
