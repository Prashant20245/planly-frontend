import { dashboardNavigation, dashboardStats } from "@/lib/site-date";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Circle,
  Leaf,
  MoreHorizontal,
} from "lucide-react";

const weeklyBars = [
  { day: "Mon", daily: 38, weekly: 57 },
  { day: "Tue", daily: 55, weekly: 74 },
  { day: "Wed", daily: 31, weekly: 64 },
  { day: "Thu", daily: 72, weekly: 88 },
  { day: "Fri", daily: 47, weekly: 62 },
  { day: "Sat", daily: 84, weekly: 71 },
  { day: "Sun", daily: 58, weekly: 91 },
];

export function DashboardPreview() {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="mb-6 flex items-center gap-2 px-2">
          <Leaf
            className="h-5 w-5 fill-emerald-500 text-emerald-600"
            aria-hidden="true"
          />
          <span className="font-bold text-slate-900">Planly</span>
        </div>

        <div className="space-y-1">
          {dashboardNavigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-2 py-2 text-[11px] font-medium ${
                  index === 0
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-500"
                }`}
              >
                <Icon size={14} aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex h-12 items-center justify-between border-b border-slate-100 px-3 sm:px-5">
          <div className="max-w-52 truncate rounded-md border border-slate-200 px-3 py-1.5 text-[10px] text-slate-400">
            Search tasks, plans, or anything...
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Bell size={15} aria-hidden="true" />
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white">
              P
            </span>
            <span className="hidden sm:inline">Prashant</span>
          </div>
        </div>

        <div className="space-y-3 p-3 sm:p-5">
          <div>
            <p className="text-[10px] font-medium text-slate-500">
              Good afternoon,
            </p>

            <h3 className="text-lg font-bold text-slate-900 sm:text-2xl">
              Prashant 👋
            </h3>

            <p className="text-[10px] text-slate-500">
              Consistent progress creates extraordinary results.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
            {dashboardStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm sm:p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className={`icon-box icon-${stat.color}`}>
                      <Icon size={15} aria-hidden="true" />
                    </span>

                    <p className="min-w-0 text-[9px] font-medium text-slate-500 sm:text-[10px]">
                      {stat.label}
                    </p>
                  </div>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {stat.value}
                  </p>

                  <p className="mt-1 truncate text-[9px] text-slate-500">
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800">
                  Hours Contribution
                </h4>

                <MoreHorizontal
                  size={17}
                  className="text-slate-400"
                  aria-hidden="true"
                />
              </div>

              <div className="flex h-32 items-end justify-between gap-2 border-b border-slate-100 px-1">
                {weeklyBars.map((bar) => (
                  <div
                    key={bar.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                  >
                    <div className="flex h-full w-full items-end justify-center gap-1">
                      <div
                        className="w-2 rounded-t-sm bg-emerald-500 sm:w-2.5"
                        style={{ height: `${bar.daily}%` }}
                      />

                      <div
                        className="w-2 rounded-t-sm bg-violet-400 sm:w-2.5"
                        style={{ height: `${bar.weekly}%` }}
                      />
                    </div>

                    <span className="text-[9px] text-slate-500">{bar.day}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" />
                  Daily
                </span>

                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-violet-400" />
                  Weekly
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:col-span-2">
              <h4 className="text-xs font-bold text-slate-800">
                Task Overview
              </h4>

              <div className="flex flex-col items-center gap-3 py-4">
                <div className="progress-ring">
                  <div className="progress-ring-inner">
                    <span className="text-lg font-bold text-slate-900">
                      55%
                    </span>
                    <span className="text-[9px] text-slate-500">
                      Tasks done
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      Completed
                    </span>
                    <strong>32</strong>
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Circle size={12} className="text-amber-500" />
                      To Be Completed
                    </span>
                    <strong>18</strong>
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <ArrowDownRight size={12} className="text-red-500" />
                      Pending
                    </span>
                    <strong>5</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-emerald-50/80 px-3 py-2">
            <p className="text-[10px] font-medium text-emerald-800">
              Small steps lead to big achievements.
            </p>

            <ArrowUpRight
              size={14}
              className="text-emerald-700"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
