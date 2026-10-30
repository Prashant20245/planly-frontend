import {
  AlertCircle,
  CalendarDays,
  Clock3,
  Heart,
  Layers,
  Lightbulb,
  Target,
  UserRound,
  BriefcaseBusiness,
  Code2,
} from "lucide-react";

import type { Deadline } from "@/types/weekly-types";

interface WeeklyBottomSectionProps {
  deadlines: Deadline[];
}

export function WeeklyBottomSection({ deadlines }: WeeklyBottomSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-3 xl:grid-cols-3">
      <UpcomingDeadlinesCard deadlines={deadlines} />

      <MostActiveDaysCard />

      <FocusAreasCard />
    </section>
  );
}

function UpcomingDeadlinesCard({ deadlines }: { deadlines: Deadline[] }) {
  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#101b46]">
          Upcoming Deadlines
        </h2>

        <button
          type="button"
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          View All →
        </button>
      </div>

      <div className="mt-3 divide-y divide-slate-100">
        {deadlines.map((deadline) => {
          const Icon =
            deadline.type === "urgent"
              ? AlertCircle
              : deadline.type === "upcoming"
                ? Clock3
                : CalendarDays;

          const iconStyle =
            deadline.type === "urgent"
              ? "bg-red-50 text-red-500"
              : deadline.type === "upcoming"
                ? "bg-orange-50 text-orange-500"
                : "bg-slate-50 text-[#101b46]";

          return (
            <div key={deadline.id} className="flex items-center gap-3 py-2.5">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
              >
                <Icon size={20} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#101b46]">
                  {deadline.title}
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  {deadline.date}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[11px] font-medium text-[#101b46]">
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

function MostActiveDaysCard() {
  const activity = [
    { day: "Mon", hours: 6 },
    { day: "Tue", hours: 8 },
    { day: "Wed", hours: 4 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 3 },
    { day: "Sat", hours: 2 },
    { day: "Sun", hours: 0.5 },
  ];

  const maximumHours = Math.max(...activity.map((item) => item.hours));

  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <h2 className="text-base font-bold text-[#101b46]">Most Active Days</h2>

      <div className="mt-5 flex h-36 items-end justify-between gap-2">
        {activity.map((item) => (
          <div
            key={item.day}
            className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
          >
            <span className="mb-1 text-[10px] text-[#101b46]">
              {item.hours}h
            </span>

            <div
              className="w-full max-w-7 rounded-t-md bg-emerald-600/55"
              style={{
                height: `${(item.hours / maximumHours) * 75}%`,
                minHeight: "4px",
              }}
              title={`${item.day}: ${item.hours} hours`}
            />

            <span className="mt-2 text-[10px] text-slate-500">{item.day}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function FocusAreasCard() {
  const areas = [
    {
      label: "Development",
      icon: Code2,
      style: "bg-blue-50 text-blue-600",
    },
    {
      label: "Learning",
      icon: Layers,
      style: "bg-violet-50 text-violet-600",
    },
    {
      label: "Health",
      icon: Heart,
      style: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Personal",
      icon: UserRound,
      style: "bg-rose-50 text-rose-500",
    },
    {
      label: "Work",
      icon: BriefcaseBusiness,
      style: "bg-blue-50 text-blue-600",
    },
    {
      label: "Planning",
      icon: Target,
      style: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#101b46]">Focus Areas</h2>

        <button
          type="button"
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
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
              className={`flex min-w-0 items-center gap-1.5 rounded-lg px-2 py-2 ${area.style}`}
            >
              <Icon size={15} className="shrink-0" />

              <span className="truncate text-[11px] font-medium">
                {area.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-start gap-2">
        <Lightbulb size={17} className="mt-0.5 shrink-0 text-amber-500" />

        <p className="text-xs leading-5 text-[#101b46]">
          Consistency this week creates opportunities next week.
        </p>
      </div>
    </article>
  );
}
