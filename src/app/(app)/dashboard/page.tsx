import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { useAuth } from "@/context/AuthContext";

export const metadata = {
  title: "Dashboard | Planly",
  description:
    "Track your productivity, manage daily tasks, and monitor your progress with Planly.",
};

export default function DashboardPage() {
  // const { user } = useAuth();
  return <DashboardOverview />;
}
