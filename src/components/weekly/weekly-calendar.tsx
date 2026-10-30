"use client";

import { useState } from "react";

import { CalendarDays, Check, List, Plus } from "lucide-react";

import type { TaskCategory, WeekDay, WeeklyTask } from "@/types/weekly-types";

interface WeeklyCalendarProps {
  days: WeekDay[];
  onAddTask: (date: Date) => void;
  onSelectTask: (task: WeeklyTask) => void;
}

const categoryStyles: Record<
  TaskCategory,
  {
    dot: string;
    badge: string;
    text: string;
  }
> = {
  Development: {
    dot: "bg-blue-500",
    badge: "bg-blue-50",
    text: "text-blue-600",
  },
  Learning: {
    dot: "bg-violet-500",
    badge: "bg-violet-50",
    text: "text-violet-600",
  },
  Health: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50",
    text: "text-emerald-700",
  },
  Personal: {
    dot: "bg-amber-500",
    badge: "bg-orange-50",
    text: "text-orange-600",
  },
  Work: {
    dot: "bg-blue-500",
    badge: "bg-blue-50",
    text: "text-blue-600",
  },
  Planning: {
    dot: "bg-violet-500",
    badge: "bg-violet-50",
    text: "text-violet-600",
  },
};

function formatTimeRange(task: WeeklyTask) {
  return `${task.startTime} – ${task.endTime}`;
}

export function WeeklyCalendar({
  days,
  onAddTask,
  onSelectTask,
}: WeeklyCalendarProps) {
  const [view, setView] = useState<"list" | "calendar">("calendar");

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm shadow-slate-100/50">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <h2 className="text-xl font-bold text-[#101b46]">This Week</h2>

        <div className="flex items-center gap-1 rounded-lg bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={`flex h-9 items-center gap-2 rounded-md px-3 text-xs font-medium transition ${
              view === "list"
                ? "bg-emerald-50 text-emerald-800"
                : "bg-white text-slate-600"
            }`}
          >
            <List size={16} />
            List View
          </button>

          <button
            type="button"
            onClick={() => setView("calendar")}
            aria-pressed={view === "calendar"}
            className={`flex h-9 items-center gap-2 rounded-md px-3 text-xs font-medium transition ${
              view === "calendar"
                ? "bg-emerald-50 text-emerald-800"
                : "bg-white text-slate-600"
            }`}
          >
            <CalendarDays size={16} />
            Calendar View
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="overflow-x-auto px-2 pb-2">
          <div className="grid min-w-[980px] grid-cols-7 gap-1">
            {days.map((day) => {
              const isToday =
                day.date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={day.id}
                  className={`flex min-w-0 flex-col rounded-lg border ${
                    isToday
                      ? "border-emerald-100 bg-emerald-50/70"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <div className="border-b border-slate-100 px-2 py-3 text-center">
                    <p className="text-xs font-semibold text-[#101b46]">
                      {day.date.toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#101b46]">
                      {day.date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {day.tasks.length}{" "}
                      {day.tasks.length === 1 ? "task" : "tasks"}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col gap-1 p-1.5">
                    {day.tasks.map((task) => {
                      const styles = categoryStyles[task.category];

                      return (
                        <button
                          key={task.id}
                          type="button"
                          onClick={() => onSelectTask(task)}
                          className="w-full min-w-0 rounded-md border border-slate-200/80 bg-white p-2 text-left transition hover:border-emerald-300 hover:shadow-sm"
                        >
                          <div className="flex items-start gap-1.5">
                            <span
                              className={`mt-1 h-2 w-2 shrink-0 rounded-full ${styles.dot}`}
                            />

                            <span className="break-words text-xs font-medium leading-4 text-[#101b46]">
                              {task.title}
                            </span>
                          </div>

                          <p className="mt-1.5 text-[10px] leading-4 text-slate-500">
                            {formatTimeRange(task)}
                          </p>

                          <span
                            className={`mt-1.5 inline-flex max-w-full rounded-full px-2 py-1 text-[10px] font-medium ${styles.badge} ${styles.text}`}
                          >
                            {task.category}
                          </span>

                          {task.status === "completed" && (
                            <span className="mt-1 flex items-center gap-1 text-[10px] text-emerald-700">
                              <Check size={11} />
                              Completed
                            </span>
                          )}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => onAddTask(day.date)}
                      className="mt-1 flex min-h-9 items-center justify-center gap-1 rounded-md px-1 py-2 text-xs text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Plus size={14} />
                      Add Task
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 px-4">
          {days.map((day) => (
            <div
              key={day.id}
              className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-[100px_1fr] sm:items-start"
            >
              <div>
                <p className="text-sm font-semibold text-[#101b46]">
                  {day.date.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {day.date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>

              <div className="space-y-2">
                {day.tasks.map((task) => (
                  <button
                    type="button"
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-100 p-3 text-left transition hover:bg-slate-50"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-[#101b46]">
                        {task.title}
                      </span>

                      <span className="mt-1 block text-xs text-slate-500">
                        {formatTimeRange(task)}
                      </span>
                    </span>

                    <span className="shrink-0 text-xs text-slate-500">
                      {task.category}
                    </span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => onAddTask(day.date)}
                  className="flex items-center gap-1 py-2 text-xs text-emerald-700 hover:text-emerald-800"
                >
                  <Plus size={14} />
                  Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
