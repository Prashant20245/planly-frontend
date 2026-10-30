import { AlertCircle, Check, CirclePlus, Pencil } from "lucide-react";

import type { RecentActivityItem } from "@/lib/dashboard/types";

type RecentActivityProps = {
  activities: RecentActivityItem[];
};

const activityStyles = {
  completed: {
    icon: Check,
    className: "bg-emerald-500 text-white",
  },
  updated: {
    icon: Pencil,
    className: "bg-blue-500 text-white",
  },
  created: {
    icon: CirclePlus,
    className: "bg-amber-400 text-white",
  },
  pending: {
    icon: AlertCircle,
    className: "bg-red-500 text-white",
  },
} as const;

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <section
      aria-labelledby="recent-activity-title"
      className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="recent-activity-title"
          className="text-base font-semibold text-slate-950"
        >
          Recent Activity
        </h2>

        <a
          href="/activity"
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          View All
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <ul className="mt-4 space-y-3">
        {activities.map((activity) => {
          const { icon: Icon, className } = activityStyles[activity.type];

          return (
            <li key={activity.id} className="flex items-center gap-3">
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full ${className}`}
              >
                <Icon
                  aria-hidden="true"
                  className="size-3.5"
                  strokeWidth={2.5}
                />
              </span>

              <p className="min-w-0 flex-1 truncate text-xs text-slate-700">
                {activity.title}
              </p>

              <time className="shrink-0 text-[11px] text-slate-500">
                {activity.timestamp}
              </time>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
