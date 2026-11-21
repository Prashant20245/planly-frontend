import { formatHours } from "@/lib/summary/utils";
import { CalendarDays } from "lucide-react";

export default function DayOverview({
  productiveMinutes,
  distractedMinutes,
  neutralMinutes,
  productivity,
  distractivity,
  neutrality,
}: {
  productiveMinutes: number;
  distractedMinutes: number;
  neutralMinutes: number;
  productivity: number;
  distractivity: number;
  neutrality: number;
}) {
  const productiveHours = formatHours(productiveMinutes);
  const distractedHours = formatHours(distractedMinutes);
  const neutralHours = formatHours(neutralMinutes);

  const productiveEnd = productivity;

  const distractedEnd = productivity + distractivity;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <CalendarDays size={22} className="text-slate-600" />

        <h2 className="text-lg font-bold text-slate-900">Day Overview</h2>
      </div>

      <div className="mt-6 flex flex-col items-center justify-around gap-6 sm:flex-row">
        <div
          className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(
              #10b981 0% ${productiveEnd}%,
              #fb7185 ${productiveEnd}% ${distractedEnd}%,
               #94a3b8 ${distractedEnd}% 100%
            )`,
          }}
          role="img"
          aria-label={`${productivity}% productive and ${100 - productivity}% distracted`}
        >
          <div className="flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full bg-white">
            <span className="text-2xl font-bold text-slate-900">
              {productivity}%
            </span>

            {productivity > 75 ? (
              <span className="text-xs font-medium text-slate-500">
                Productive
              </span>
            ) : productivity < 50 ? (
              <span>Non-productive</span>
            ) : (
              <span>Average</span>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 shrink-0 rounded bg-emerald-500" />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Useful ({productiveHours})
              </p>

              <p className="text-xs text-slate-500">
                {productivity}% of logged time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-4 w-4 shrink-0 rounded bg-rose-400" />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Useless ({distractedHours})
              </p>

              <p className="text-xs text-slate-500">
                {distractivity}% of logged time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-4 w-4 shrink-0 rounded bg-slate-400" />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Neutral ({neutralHours})
              </p>

              <p className="text-xs text-slate-500">
                {neutrality}% of logged time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
