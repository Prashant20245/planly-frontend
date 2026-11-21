import type { Metadata } from "next";

import { DailyPlanPage } from "@/components/daily-plan/daily-plan-page";

export const metadata: Metadata = {
  title: "Daily Plan | Planly",
  description:
    "Organize daily tasks, track progress, manage subtasks, and stay focused with Planly.",
};

export default function DailyPage() {
  return <DailyPlanPage />;
}
