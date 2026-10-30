import { AlertCircle, CheckCircle2, Circle, Clock3, Leaf } from "lucide-react";

type DailyPlanStatsProps = {
  total: number;
  completed: number;
  subtasks: number;
  inProgress: number;
  overdue: number;
};

export function DailyPlanStats({
  total,
  completed,
  subtasks,
  inProgress,
  overdue,
}: DailyPlanStatsProps) {
  const completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const cards = [
    {
      label: "Tasks Completed",
      value: `${completed} / ${total}`,
      percentage: completionPercentage,
      icon: CheckCircle2,
      iconClass: "bg-emerald-50 text-emerald-700",
      barClass: "bg-emerald-500",
    },
    {
      label: "Total Subtasks",
      value: String(subtasks),
      percentage: 50,
      icon: Circle,
      iconClass: "bg-blue-50 text-blue-600",
      barClass: "bg-blue-500",
    },
    {
      label: "In Progress",
      value: String(inProgress),
      percentage: total > 0 ? Math.round((inProgress / total) * 100) : 0,
      icon: Clock3,
      iconClass: "bg-amber-50 text-amber-600",
      barClass: "bg-amber-500",
    },
    {
      label: "Overdue",
      value: String(overdue),
      percentage: total > 0 ? Math.round((overdue / total) * 100) : 0,
      icon: AlertCircle,
      iconClass: "bg-red-50 text-red-600",
      barClass: "bg-red-500",
    },
  ];

  return (
    <section
      aria-label="Daily productivity statistics"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-[repeat(4,minmax(0,1fr))]"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.label}
            className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/[0.02]"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon aria-hidden="true" className="size-6" />
              </div>

              <div className="min-w-0">
                <p className="text-xl font-bold tracking-tight text-slate-950">
                  {card.value}
                </p>

                <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                  {card.label}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div
                role="progressbar"
                aria-label={`${card.label} percentage`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={card.percentage}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200"
              >
                <div
                  className={`h-full rounded-full transition-[width] ${card.barClass}`}
                  style={{ width: `${card.percentage}%` }}
                />
              </div>

              <span className="text-xs font-medium text-slate-800">
                {card.percentage}%
              </span>
            </div>
          </article>
        );
      })}

      <article className="relative isolate flex min-h-32 items-center overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/80 p-4 sm:col-span-2 2xl:col-span-1">
        <div className="max-w-[85%]">
          <p className="font-serif text-base leading-6 text-slate-800">
            “Discipline today creates the life you want tomorrow.”
          </p>
        </div>

        <Leaf
          aria-hidden="true"
          className="absolute -bottom-2 -right-1 -z-10 size-24 rotate-[-25deg] text-emerald-800/20"
          strokeWidth={1}
        />
      </article>
    </section>
  );
}
