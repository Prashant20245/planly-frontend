import { Check, Circle } from "lucide-react";

import type { WeeklyGoal } from "@/types/weekly-types";

interface WeeklySidebarProps {
  goals: WeeklyGoal[];
}

const goalProgressColors = [
  "bg-emerald-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-blue-500",
  "bg-violet-500",
];

export function WeeklyGoalsCard({ goals }: WeeklySidebarProps) {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#101b46]">Weekly Goals</h2>

        <button
          type="button"
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          View All →
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {goals.map((goal, index) => (
          <div key={goal.id}>
            <div className="flex items-center gap-3">
              {goal.completed ? (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-600 text-white">
                  <Check size={14} strokeWidth={3} />
                </span>
              ) : (
                <Circle size={21} className="shrink-0 text-slate-300" />
              )}

              <p className="min-w-0 flex-1 truncate text-xs font-medium text-[#101b46]">
                {goal.title}
              </p>
            </div>

            <div className="ml-8 mt-1.5 flex items-center gap-3">
              <div
                className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
                aria-label={`${goal.title} progress`}
                aria-valuenow={goal.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full ${goalProgressColors[index % goalProgressColors.length]}`}
                  style={{
                    width: `${goal.progress}%`,
                  }}
                />
              </div>

              <span className="w-8 text-right text-[11px] text-[#101b46]">
                {goal.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TaskStatisticsCard() {
  const segments = [
    {
      label: "Completed",
      value: 28,
      color: "#10b981",
    },
    {
      label: "In Progress",
      value: 6,
      color: "#3b82f6",
    },
    {
      label: "To Be Completed",
      value: 2,
      color: "#f59e0b",
    },
    {
      label: "Overdue",
      value: 4,
      color: "#ef4444",
    },
  ];

  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <h2 className="text-base font-bold text-[#101b46]">Task Statistics</h2>

      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-32 w-32 shrink-0">
          <svg
            viewBox="0 0 120 120"
            className="h-full w-full -rotate-90"
            role="img"
            aria-label={`Task distribution: ${total} total tasks`}
          >
            {segments.map((segment) => {
              const length = (segment.value / total) * circumference;

              const offset = cumulative;

              cumulative += length;

              return (
                <circle
                  key={segment.label}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="14"
                  strokeDasharray={`${Math.max(0, length - 2)} ${circumference}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                />
              );
            })}
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#101b46]">{total}</span>

            <span className="text-[10px] text-slate-500">Total Tasks</span>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-2.5">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center gap-2">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{
                  backgroundColor: segment.color,
                }}
              />

              <span className="min-w-0 flex-1 text-[11px] text-[#101b46]">
                {segment.label}
              </span>

              <span className="text-xs font-semibold text-[#101b46]">
                {segment.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TimeAllocationCard() {
  const categories = [
    {
      label: "Development",
      hours: 11.2,
      percentage: 40,
      color: "#3b82f6",
    },
    {
      label: "Learning",
      hours: 5.6,
      percentage: 20,
      color: "#8b5cf6",
    },
    {
      label: "Work",
      hours: 4.2,
      percentage: 15,
      color: "#60a5fa",
    },
    {
      label: "Personal",
      hours: 4.2,
      percentage: 15,
      color: "#f59e0b",
    },
    {
      label: "Health",
      hours: 2.8,
      percentage: 10,
      color: "#10b981",
    },
  ];

  const totalHours = categories.reduce(
    (sum, category) => sum + category.hours,
    0,
  );

  const radius = 43;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <h2 className="text-base font-bold text-[#101b46]">Time Allocation</h2>

      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-32 w-32 shrink-0">
          <svg
            viewBox="0 0 120 120"
            className="h-full w-full -rotate-90"
            role="img"
            aria-label="Time allocation by category"
          >
            {categories.map((category) => {
              const length = (category.percentage / 100) * circumference;

              const offset = cumulative;

              cumulative += length;

              return (
                <circle
                  key={category.label}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke={category.color}
                  strokeWidth="14"
                  strokeDasharray={`${Math.max(0, length - 2)} ${circumference}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                />
              );
            })}
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#101b46]">
              {totalHours}h
            </span>

            <span className="text-[10px] text-slate-500">Total</span>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-2.5">
          {categories.map((category) => (
            <div key={category.label} className="flex items-center gap-2">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{
                  backgroundColor: category.color,
                }}
              />

              <span className="min-w-0 flex-1 text-[11px] text-[#101b46]">
                {category.label}
              </span>

              <span className="text-xs font-semibold text-[#101b46]">
                {category.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
