type TaskOverviewChartProps = {
  completed: number;
  upcoming: number;
  pending: number;
};

export function TaskOverviewChart({
  completed,
  upcoming,
  pending,
}: TaskOverviewChartProps) {
  const total = completed + upcoming + pending;

  const segments = [
    {
      label: "Completed",
      value: completed,
      color: "#10B981",
      dot: "bg-emerald-500",
    },
    {
      label: "To Be Completed",
      value: upcoming,
      color: "#FBBF24",
      dot: "bg-amber-400",
    },
    {
      label: "Pending",
      value: pending,
      color: "#EF4444",
      dot: "bg-red-500",
    },
  ];

  const completedPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const gradientStops: string[] = [];
  let currentPercentage = 0;

  for (const segment of segments) {
    const percentage = total > 0 ? (segment.value / total) * 100 : 0;

    const start = currentPercentage;
    const end = currentPercentage + percentage;

    gradientStops.push(`${segment.color} ${start}% ${end}%`);

    currentPercentage = end;
  }

  const background =
    total > 0 ? `conic-gradient(${gradientStops.join(", ")})` : "#E2E8F0";

  return (
    <section
      aria-labelledby="task-overview-title"
      className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2
        id="task-overview-title"
        className="text-base font-semibold text-slate-950"
      >
        Task Overview
      </h2>

      <div className="flex flex-col items-center">
        <div
          role="img"
          aria-label={`${total} total tasks. ${completed} completed, ${upcoming} to be completed, and ${pending} pending.`}
          className="relative mt-5 flex size-32 items-center justify-center rounded-full sm:size-36"
          style={{ background }}
        >
          <div className="absolute inset-[9px] rounded-full bg-white" />

          <div className="relative text-center">
            <p className="text-2xl font-bold text-slate-950">{total}</p>
            <p className="mt-1 text-xs text-slate-500">Total Tasks</p>
          </div>
        </div>

        <p className="sr-only">
          {completedPercentage}% of tasks are completed.
        </p>

        <div className="mt-5 w-full space-y-3">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2 text-slate-700">
                <span
                  aria-hidden="true"
                  className={`size-2.5 rounded-full ${segment.dot}`}
                />

                {segment.label}
              </span>

              <span className="font-semibold tabular-nums text-slate-950">
                {segment.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
