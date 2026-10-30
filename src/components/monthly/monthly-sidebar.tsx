import type { MonthlyGoal } from "@/types/monthly-types";

interface MonthlySidebarProps {
  goals: MonthlyGoal[];
}

export function MonthlyGoalsCard({ goals }: MonthlySidebarProps) {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#101b46]">Monthly Goals</h2>

        <button
          type="button"
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          View All →
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {goals.map((goal) => {
          const radius = 12;
          const circumference = 2 * Math.PI * radius;

          return (
            <div key={goal.id} className="flex items-center gap-3">
              <svg
                viewBox="0 0 32 32"
                className="h-9 w-9 shrink-0 -rotate-90"
                role="img"
                aria-label={`${goal.progress}% complete`}
              >
                <circle
                  cx="16"
                  cy="16"
                  r={radius}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="4"
                />

                <circle
                  cx="16"
                  cy="16"
                  r={radius}
                  fill="none"
                  stroke={goal.color}
                  strokeWidth="4"
                  strokeDasharray={`${(goal.progress / 100) * circumference} ${circumference}`}
                  strokeLinecap="round"
                />
              </svg>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#101b46]">
                  {goal.title}
                </p>

                <div className="mt-1.5 flex items-center gap-3">
                  <div
                    className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"
                    role="progressbar"
                    aria-label={`${goal.title} progress`}
                    aria-valuenow={goal.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${goal.progress}%`,
                        backgroundColor: goal.color,
                      }}
                    />
                  </div>

                  <span className="w-8 text-right text-[11px] text-[#101b46]">
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

function DonutChart({
  segments,
  totalLabel,
  totalValue,
}: {
  segments: DonutSegment[];
  totalLabel: string;
  totalValue: string;
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  const radius = 43;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-32 w-32 shrink-0">
        <svg
          viewBox="0 0 120 120"
          className="h-full w-full -rotate-90"
          role="img"
          aria-label={totalLabel}
        >
          {segments.map((segment) => {
            const length =
              total > 0 ? (segment.value / total) * circumference : 0;

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
          <span className="text-2xl font-bold text-[#101b46]">
            {totalValue}
          </span>

          <span className="text-[10px] text-slate-500">{totalLabel}</span>
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
  );
}

export function MonthlyTaskStatisticsCard() {
  const segments: DonutSegment[] = [
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

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <h2 className="mb-3 text-base font-bold text-[#101b46]">
        Task Statistics
      </h2>

      <DonutChart
        segments={segments}
        totalLabel="Total Tasks"
        totalValue="40"
      />
    </section>
  );
}

export function MonthlyTimeAllocationCard() {
  const segments: DonutSegment[] = [
    {
      label: "Development",
      value: 40,
      color: "#3b82f6",
    },
    {
      label: "Learning",
      value: 20,
      color: "#8b5cf6",
    },
    {
      label: "Work",
      value: 15,
      color: "#60a5fa",
    },
    {
      label: "Personal",
      value: 15,
      color: "#f59e0b",
    },
    {
      label: "Health",
      value: 10,
      color: "#10b981",
    },
  ];

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-100/50">
      <h2 className="mb-3 text-base font-bold text-[#101b46]">
        Time Allocation
      </h2>

      <DonutChart segments={segments} totalLabel="Total" totalValue="96h" />
    </section>
  );
}
