import type { DashboardStat } from "@/lib/dashboard/types";

import { StatCard } from "./stat-card";

type DashboardStatsProps = {
  stats: DashboardStat[];
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section aria-label="Productivity statistics">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
