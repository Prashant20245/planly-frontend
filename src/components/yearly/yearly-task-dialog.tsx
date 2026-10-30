"use client";

import { CalendarDays, X } from "lucide-react";

interface YearlyTaskDialogProps {
  year: number;
  initialDate: string;
  title: string;
  date: string;
  onTitleChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function YearlyTaskDialog({
  year,
  initialDate,
  title,
  date,
  onTitleChange,
  onDateChange,
  onClose,
  onSubmit,
}: YearlyTaskDialogProps) {
  const minDate = `${year}-01-01`;
  const maxDate = `${year}-12-31`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="yearly-task-dialog-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3">
          <h2
            id="yearly-task-dialog-title"
            className="text-xl font-bold text-[#101b46]"
          >
            Add Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />
          Add a task to your {year} plan.
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="yearly-task-title"
              className="mb-2 block text-sm font-medium text-[#101b46]"
            >
              Task title
            </label>

            <input
              id="yearly-task-title"
              autoFocus
              required
              maxLength={200}
              value={title}
              onChange={(event) => onTitleChange(event.target.value)}
              placeholder="What do you want to accomplish?"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="yearly-task-date"
              className="mb-2 block text-sm font-medium text-[#101b46]"
            >
              Task date
            </label>

            <input
              id="yearly-task-date"
              type="date"
              required
              min={minDate}
              max={maxDate}
              value={date || initialDate}
              onChange={(event) => onDateChange(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim() || !date}
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Task
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
