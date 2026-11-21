import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export const metadata = {
  title: "Dashboard | Planly",
  description:
    "Track your productivity, manage daily tasks, and monitor your progress with Planly.",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
