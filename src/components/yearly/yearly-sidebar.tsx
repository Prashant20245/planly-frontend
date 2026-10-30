import { ArrowRight, CheckCircle2 } from "lucide-react";

import type { AnnualGoal, TimeAllocation } from "@/types/yearly-types";

interface AnnualGoalsCardProps {
  goals: AnnualGoal[];
  onViewAll?: () => void;
}

export function AnnualGoalsCard({ goals, onViewAll }: AnnualGoalsCardProps) {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#101b46]">Annual Goals</h2>

        <button
          type="button"
          onClick={onViewAll}
          className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {goals.map((goal) => {
          const Icon = goal.icon;

          return (
            <div key={goal.id} className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${goal.color}18`,
                  color: goal.color,
                }}
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#101b46]">
                  {goal.title}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"
                    role="progressbar"
                    aria-label={`${goal.title} progress`}
                    aria-valuenow={goal.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${goal.progress}%`,
                        backgroundColor: goal.color,
                      }}
                    />
                  </div>

                  <span className="w-8 shrink-0 text-right text-[11px] text-[#101b46]">
                    {goal.progress}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerValue: string;
  centerLabel: string;
  formatValue?: (value: number) => string;
}

export function DonutChart({
  segments,
  centerValue,
  centerLabel,
  formatValue = (value) => String(value),
}: DonutChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  const gap = 2;

  let offset = 0;

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="relative h-32 w-32 shrink-0">
        <svg
          viewBox="0 0 120 120"
          className="h-full w-full -rotate-90"
          role="img"
          aria-label={`${centerValue} ${centerLabel}`}
        >
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="14"
          />

          {segments.map((segment) => {
            const length =
              total > 0 ? (segment.value / total) * circumference : 0;

            const currentOffset = offset;

            offset += length;

            return (
              <circle
                key={segment.label}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="14"
                strokeDasharray={`${Math.max(0, length - gap)} ${circumference}`}
                strokeDashoffset={-currentOffset}
                strokeLinecap="butt"
              >
                <title>
                  {segment.label}: {segment.value}
                </title>
              </circle>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[#101b46]">
            {centerValue}
          </span>

          <span className="mt-0.5 text-[10px] text-slate-500">
            {centerLabel}
          </span>
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

            <span className="shrink-0 text-[11px] font-semibold text-[#101b46]">
              {formatValue(segment.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function YearlyTaskStatisticsCard() {
  const segments: DonutSegment[] = [
    {
      label: "Completed",
      value: 312,
      color: "#10b981",
    },
    {
      label: "In Progress",
      value: 96,
      color: "#3b82f6",
    },
    {
      label: "To Be Completed",
      value: 48,
      color: "#f59e0b",
    },
    {
      label: "Overdue",
      value: 24,
      color: "#ef4444",
    },
  ];

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <h2 className="mb-3 text-base font-bold text-[#101b46]">
        Task Statistics
      </h2>

      <DonutChart
        segments={segments}
        centerValue="480"
        centerLabel="Total Tasks"
      />
    </section>
  );
}

interface YearlyTimeAllocationCardProps {
  allocation: TimeAllocation[];
  totalHours: number;
}

export function YearlyTimeAllocationCard({
  allocation,
  totalHours,
}: YearlyTimeAllocationCardProps) {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <h2 className="mb-3 text-base font-bold text-[#101b46]">
        Time Allocation (Yearly)
      </h2>

      <DonutChart
        segments={allocation.map((item) => ({
          label: item.label,
          value: item.percentage,
          color: item.color,
        }))}
        centerValue={`${totalHours}h`}
        centerLabel="Total"
        formatValue={(value) => `${value}%`}
      />
    </section>
  );
}
