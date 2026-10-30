import type { LucideIcon } from "lucide-react";

export type StatTrend = {
  value: string;
  description: string;
  direction: "up" | "down" | "neutral";
};

export type DashboardStat = {
  id: string;
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant: "blue" | "green" | "purple" | "orange" | "red";
  trend?: StatTrend;
  caption?: string;
};

export type ContributionData = {
  day: string;
  daily: number;
  weekly: number;
  monthly: number;
};

export type TaskStatus = "completed" | "upcoming" | "pending";

export type TaskCategory = "Work" | "Health" | "Learning" | "Personal";

export type DashboardTask = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: TaskCategory;
  status: TaskStatus;
};

export type RecentActivityItem = {
  id: string;
  title: string;
  timestamp: string;
  type: "completed" | "updated" | "created" | "pending";
};
