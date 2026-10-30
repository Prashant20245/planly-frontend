import type { LucideIcon } from "lucide-react";

export type MonthlyTaskCategory =
  | "Development"
  | "System Design"
  | "Health"
  | "Learning"
  | "Personal"
  | "Work"
  | "Projects"
  | "Planning";

export type MonthlyTaskStatus =
  | "completed"
  | "in-progress"
  | "pending"
  | "overdue";

export interface MonthlyTask {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  category: MonthlyTaskCategory;
  status: MonthlyTaskStatus;
}

export interface MonthlyGoal {
  id: string;
  title: string;
  progress: number;
  color: string;
}

export interface MonthlyDeadline {
  id: string;
  title: string;
  date: string;
  daysLeft: number;
  priority: "high" | "medium" | "low";
  icon: LucideIcon;
}

export interface MonthlyStat {
  id: string;
  title: string;
  value: string;
  description: string;
  progress: number;
  icon: LucideIcon;
  color: "green" | "blue" | "orange" | "red";
}
