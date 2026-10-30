import { ArrowRight, CalendarDays } from "lucide-react";

import type { YearlyMilestone } from "@/types/yearly-types";

interface YearlyMilestonesProps {
  milestones: YearlyMilestone[];
  onViewAll?: () => void;
}

export function YearlyMilestones({
  milestones,
  onViewAll,
}: YearlyMilestonesProps) {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-[#101b46]">
          Upcoming Milestones
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="mt-3 divide-y divide-slate-100">
        {milestones.map((milestone) => {
          const Icon = milestone.icon;

          const formattedDate = new Date(
            `${milestone.date}T12:00:00`,
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <div key={milestone.id} className="flex items-center gap-3 py-2.5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${milestone.color}`}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#101b46]">
                  {milestone.title}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1 text-[10px] text-slate-500">
                <CalendarDays size={12} />
                <time dateTime={milestone.date}>{formattedDate}</time>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
