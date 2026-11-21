export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
  trendIcon,
  trendClass,
  badge,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconClass: string;
  trendIcon?: React.ReactNode;
  trendClass?: string;
  badge?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </h3>

        {badge ? (
          <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {subtitle}
          </span>
        ) : (
          <p
            className={`mt-1 flex items-center gap-1 text-xs font-medium ${trendClass ?? "text-slate-500"}`}
          >
            {trendIcon}
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
