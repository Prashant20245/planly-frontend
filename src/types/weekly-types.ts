import type { LucideIcon } from "lucide-react";

export type TaskCategory =
  | "Development"
  | "Learning"
  | "Health"
  | "Personal"
  | "Work"
  | "Planning";

export type TaskStatus = "completed" | "in-progress" | "pending" | "overdue";

export interface WeeklyTask {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: TaskCategory;
  status: TaskStatus;
}

export interface WeekDay {
  id: string;
  date: Date;
  tasks: WeeklyTask[];
}

export interface WeeklyStat {
  id: string;
  title: string;
  value: string;
  description: string;
  progress: number;
  icon: LucideIcon;
  color: "green" | "blue" | "orange" | "red";
}

export interface WeeklyGoal {
  id: string;
  title: string;
  progress: number;
  completed: boolean;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  daysLeft: number;
  type: "urgent" | "upcoming" | "normal";
}
