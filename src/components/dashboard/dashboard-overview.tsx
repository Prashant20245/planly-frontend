import {
  contributionData,
  dashboardStats,
  dashboardTasks,
  recentActivities,
} from "@/lib/dashboard/data";

import { CalendarWidget } from "./calendar-widget";
import { DailyQuote } from "./daily-quote";
import { DashboardGreeting } from "./dashboard-greeting";
import { DashboardStats } from "./dashboard-stats";
import { FocusAreas } from "./focus-areas";
import { HoursContributionChart } from "./hours-contribution-chart";
import { RecentActivity } from "./recent-activity";
import { TaskOverviewChart } from "./task-overview-chart";
import { TodaysTasks } from "./todays-tasks";

type DashboardOverviewProps = {
  userName: string;
};

export function DashboardOverview({ userName }: DashboardOverviewProps) {
  return (
    <main className="mx-auto w-full max-w-[1800px] space-y-4 p-3 sm:p-5 lg:p-6">
      {/* Personalized greeting */}
      <DashboardGreeting name={userName} />

      {/* Dashboard content */}
      <div className="grid min-w-0 grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Primary dashboard column */}
        <div className="min-w-0 space-y-4">
          {/* Six productivity statistics */}
          <DashboardStats stats={dashboardStats} />

          {/* Hours chart and task overview */}
          <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(260px,1fr)]">
            <HoursContributionChart data={contributionData} />

            <TaskOverviewChart completed={32} upcoming={18} pending={5} />
          </div>

          {/* Activity and focus areas */}
          <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
            <RecentActivity activities={recentActivities} />

            <FocusAreas />
          </div>
        </div>

        {/* Secondary dashboard column */}
        <aside className="min-w-0 space-y-3">
          <CalendarWidget weeklyProgress={70} />

          <TodaysTasks tasks={dashboardTasks} />

          <DailyQuote />
        </aside>
      </div>
    </main>
  );
}
