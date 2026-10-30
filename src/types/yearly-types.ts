import type { LucideIcon } from "lucide-react";

export type TaskCategory =
  | "Development"
  | "Learning"
  | "Work"
  | "Personal"
  | "Health"
  | "Planning"
  | "Projects"
  | "System Design";

export type TaskStatus = "completed" | "in-progress" | "pending";

export interface YearlyTask {
  id: string;
  title: string;
  date: string;
  category: TaskCategory;
  status: TaskStatus;
  focusMinutes?: number;
}

export interface YearlyStat {
  id: string;
  title: string;
  value: string;
  description: string;
  progress: number;
  color: "green" | "blue" | "orange" | "red";
  icon: LucideIcon;
}

export interface AnnualGoal {
  id: string;
  title: string;
  progress: number;
  icon: LucideIcon;
  color: string;
}

export interface MonthlyProgress {
  month: number;
  planned: number;
  completed: number;
}

export interface TimeAllocation {
  label: string;
  percentage: number;
  color: string;
}

export interface YearlyMilestone {
  id: string;
  title: string;
  date: string;
  icon: LucideIcon;
  color: string;
}
