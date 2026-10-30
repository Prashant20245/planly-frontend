import {
  AlertCircle,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  Code2,
  Heart,
  Layers,
  Lightbulb,
  Target,
  UserRound,
} from "lucide-react";

import type { MonthlyDeadline } from "@/types/monthly-types";

interface MonthlyBottomSectionProps {
  deadlines: MonthlyDeadline[];
}

export function MonthlyBottomSection({ deadlines }: MonthlyBottomSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-3 xl:grid-cols-3">
      <UpcomingDeadlinesCard deadlines={deadlines} />

      <MonthlyFocusAreasCard />

      <ProductivityTrendCard />
    </section>
  );
}

function UpcomingDeadlinesCard({
  deadlines,
}: {
  deadlines: MonthlyDeadline[];
}) {
  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-[#101b46]">Upcoming Deadlines</h2>

        <button
          type="button"
          className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          View All →
        </button>
      </div>

      <div className="mt-3 divide-y divide-slate-100">
        {deadlines.map((deadline) => {
          const Icon = deadline.icon;

          const iconStyle =
            deadline.priority === "high"
              ? "bg-red-50 text-red-500"
              : deadline.priority === "medium"
                ? "bg-orange-50 text-orange-500"
                : "bg-slate-50 text-[#101b46]";

          return (
            <div key={deadline.id} className="flex items-center gap-2 py-2">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconStyle}`}
              >
                <Icon size={18} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-[#101b46]">
                  {deadline.title}
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  {deadline.date}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[10px] font-medium text-[#101b46]">
                  {deadline.daysLeft} days left
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function MonthlyFocusAreasCard() {
  const areas = [
    {
      label: "Development",
      icon: Code2,
      style: "bg-blue-50 text-blue-600",
    },
    {
      label: "System Design",
      icon: Layers,
      style: "bg-violet-50 text-violet-600",
    },
    {
      label: "Health",
      icon: Heart,
      style: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Learning",
      icon: BookOpen,
      style: "bg-orange-50 text-orange-600",
    },
    {
      label: "Personal",
      icon: UserRound,
      style: "bg-rose-50 text-rose-500",
    },
    {
      label: "Projects",
      icon: BriefcaseBusiness,
      style: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-[#101b46]">
          Focus Areas This Month
        </h2>

        <button
          type="button"
          className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Edit →
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {areas.map((area) => {
          const Icon = area.icon;

          return (
            <div
              key={area.label}
              className={`flex min-w-0 items-center gap-1.5 rounded-full px-2 py-2 ${area.style}`}
            >
              <Icon size={14} className="shrink-0" />

              <span className="truncate text-[10px] font-medium">
                {area.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-start gap-2">
        <Lightbulb size={17} className="mt-0.5 shrink-0 text-amber-500" />

        <p className="text-xs leading-5 text-[#101b46]">
          Small consistent steps this month create big results tomorrow.
        </p>
      </div>
    </article>
  );
}

function ProductivityTrendCard() {
  const weeks = [
    {
      label: "W1",
      range: "(1 - 6)",
      hours: 62,
    },
    {
      label: "W2",
      range: "(7 - 13)",
      hours: 78,
    },
    {
      label: "W3",
      range: "(14 - 20)",
      hours: 64,
    },
    {
      label: "W4",
      range: "(21 - 27)",
      hours: 48,
    },
    {
      label: "W5",
      range: "(28 - 30)",
      hours: 24,
    },
  ];

  const maximumHours = 100;

  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-[#101b46]">Productivity Trend</h2>

        <label className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1.5">
          <span className="sr-only">Productivity metric</span>

          <select
            defaultValue="focus"
            className="max-w-24 bg-transparent text-[10px] text-[#101b46] outline-none"
          >
            <option value="focus">Focus Time</option>
            <option value="tasks">Tasks Completed</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex gap-2">
        <div className="flex h-36 flex-col justify-between pb-5 text-right text-[10px] text-slate-500">
          {[100, 80, 60, 40, 20, 0].map((value) => (
            <span key={value}>{value}h</span>
          ))}
        </div>

        <div className="relative flex h-36 min-w-0 flex-1 items-end justify-around gap-2 border-b border-l border-slate-200 px-2">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-5">
            {[0, 1, 2, 3, 4].map((line) => (
              <div key={line} className="border-t border-slate-100" />
            ))}
          </div>

          {weeks.map((week) => (
            <div
              key={week.label}
              className="relative z-10 flex h-full min-w-0 flex-1 flex-col items-center justify-end"
            >
              <span className="mb-1 text-[10px] text-[#101b46]">
                {week.hours}h
              </span>

              <div
                className="w-full max-w-8 rounded-t-md bg-emerald-600/65"
                style={{
                  height: `${(week.hours / maximumHours) * 78}%`,
                  minHeight: "4px",
                }}
                title={`${week.label}: ${week.hours} hours`}
              />

              <span className="mt-2 text-[10px] font-medium text-[#101b46]">
                {week.label}
              </span>

              <span className="mt-0.5 whitespace-nowrap text-[8px] text-slate-500">
                {week.range}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
