"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Ellipsis } from "lucide-react";

import type { DashboardTask, TaskCategory } from "@/lib/dashboard/types";

type TodaysTasksProps = {
  tasks: DashboardTask[];
};

const categoryStyles: Record<TaskCategory, string> = {
  Work: "bg-blue-50 text-blue-700",
  Health: "bg-emerald-50 text-emerald-700",
  Learning: "bg-violet-50 text-violet-700",
  Personal: "bg-orange-50 text-orange-700",
};

export function TodaysTasks({ tasks }: TodaysTasksProps) {
  const [completedIds, setCompletedIds] = useState<string[]>(() =>
    tasks.filter((task) => task.status === "completed").map((task) => task.id),
  );

  function toggleTask(taskId: string) {
    setCompletedIds((current) =>
      current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId],
    );
  }

  return (
    <section
      aria-labelledby="todays-tasks-title"
      className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="todays-tasks-title"
          className="text-base font-semibold text-slate-950"
        >
          Today&apos;s Tasks
        </h2>

        <Link
          href="/daily"
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          View All
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>

      <ul className="mt-4 divide-y divide-slate-100">
        {tasks.map((task) => {
          const isCompleted = completedIds.includes(task.id);

          return (
            <li
              key={task.id}
              className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
            >
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                aria-label={
                  isCompleted
                    ? `Mark ${task.title} incomplete`
                    : `Mark ${task.title} complete`
                }
                aria-pressed={isCompleted}
                className={`mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                  isCompleted
                    ? "border-emerald-600 bg-emerald-600"
                    : "border-slate-400 hover:border-emerald-600"
                }`}
              >
                {isCompleted && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-3 text-white"
                  >
                    <path
                      d="m3 8 3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p
                  className={`break-words text-xs font-medium ${
                    isCompleted
                      ? "text-slate-400 line-through"
                      : "text-slate-800"
                  }`}
                >
                  {task.title}
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  {task.startTime} – {task.endTime}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <span
                  className={`hidden rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-flex ${categoryStyles[task.category]}`}
                >
                  {task.category}
                </span>

                <button
                  type="button"
                  aria-label={`More actions for ${task.title}`}
                  className="flex size-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  <Ellipsis aria-hidden="true" className="size-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {tasks.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-sm font-medium text-slate-700">
            No tasks scheduled for today.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Enjoy the breathing room or plan something new.
          </p>
        </div>
      )}
    </section>
  );
}
