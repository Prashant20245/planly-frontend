import {
  AlertCircle,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  Dumbbell,
  Flag,
  Heart,
  Layers,
  Target,
} from "lucide-react";

import type {
  AnnualGoal,
  MonthlyProgress,
  TimeAllocation,
  YearlyMilestone,
  YearlyStat,
  YearlyTask,
} from "@/types/yearly-types";

export const yearlyStats: YearlyStat[] = [
  {
    id: "completed",
    title: "Tasks Completed",
    value: "312 / 480",
    description: "Tasks completed",
    progress: 65,
    color: "green",
    icon: CheckCircle2,
  },
  {
    id: "focus",
    title: "Total Focus Time",
    value: "620h",
    description: "Annual focus time",
    progress: 69,
    color: "blue",
    icon: Clock3,
  },
  {
    id: "goals",
    title: "Goals in Progress",
    value: "18",
    description: "75% average progress",
    progress: 75,
    color: "orange",
    icon: Target,
  },
  {
    id: "overdue",
    title: "Overdue Tasks",
    value: "24",
    description: "Require attention",
    progress: 12,
    color: "red",
    icon: AlertCircle,
  },
];

export const annualGoals: AnnualGoal[] = [
  {
    id: "career",
    title: "Get Placed in Product-Based Company",
    progress: 80,
    icon: BriefcaseBusiness,
    color: "#10b981",
  },
  {
    id: "dsa",
    title: "Improve DSA & System Design",
    progress: 60,
    icon: Code2,
    color: "#3b82f6",
  },
  {
    id: "projects",
    title: "Build 3 Real Projects",
    progress: 33,
    icon: Layers,
    color: "#8b5cf6",
  },
  {
    id: "reading",
    title: "Read 24 Books",
    progress: 50,
    icon: BookOpen,
    color: "#f59e0b",
  },
  {
    id: "fitness",
    title: "Maintain Fitness & Health",
    progress: 70,
    icon: Heart,
    color: "#ef4444",
  },
];

export const monthlyProgress: MonthlyProgress[] = [
  { month: 0, planned: 52, completed: 34 },
  { month: 1, planned: 58, completed: 30 },
  { month: 2, planned: 78, completed: 61 },
  { month: 3, planned: 54, completed: 38 },
  { month: 4, planned: 49, completed: 29 },
  { month: 5, planned: 64, completed: 43 },
  { month: 6, planned: 72, completed: 51 },
  { month: 7, planned: 56, completed: 39 },
  { month: 8, planned: 84, completed: 62 },
  { month: 9, planned: 80, completed: 46 },
  { month: 10, planned: 70, completed: 56 },
  { month: 11, planned: 84, completed: 58 },
];

export const timeAllocation: TimeAllocation[] = [
  {
    label: "Development",
    percentage: 35,
    color: "#10b981",
  },
  {
    label: "Learning",
    percentage: 20,
    color: "#8b5cf6",
  },
  {
    label: "Work / Projects",
    percentage: 18,
    color: "#3b82f6",
  },
  {
    label: "Personal",
    percentage: 15,
    color: "#f59e0b",
  },
  {
    label: "Health & Fitness",
    percentage: 8,
    color: "#ef4444",
  },
  {
    label: "Others",
    percentage: 4,
    color: "#cbd5e1",
  },
];

export const yearlyMilestones: YearlyMilestone[] = [
  {
    id: "project",
    title: "Complete final year project",
    date: "2026-11-15",
    icon: Flag,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    id: "placement",
    title: "Give placement interviews",
    date: "2026-11-30",
    icon: BriefcaseBusiness,
    color: "text-orange-600 bg-orange-50",
  },
  {
    id: "books",
    title: "Complete 24 books",
    date: "2026-12-31",
    icon: BookOpen,
    color: "text-rose-600 bg-rose-50",
  },
  {
    id: "fitness",
    title: "Run 5km without stopping",
    date: "2026-12-31",
    icon: Dumbbell,
    color: "text-violet-600 bg-violet-50",
  },
];

export const initialYearlyTasks: YearlyTask[] = [
  {
    id: "task-1",
    title: "Complete portfolio project",
    date: "2026-01-12",
    category: "Development",
    status: "completed",
    focusMinutes: 120,
  },
  {
    id: "task-2",
    title: "Study system design",
    date: "2026-03-15",
    category: "System Design",
    status: "completed",
    focusMinutes: 90,
  },
  {
    id: "task-3",
    title: "Build authentication module",
    date: "2026-06-18",
    category: "Development",
    status: "in-progress",
    focusMinutes: 150,
  },
  {
    id: "task-4",
    title: "Review annual goals",
    date: "2026-09-10",
    category: "Planning",
    status: "completed",
    focusMinutes: 45,
  },
  {
    id: "task-5",
    title: "Complete final year project",
    date: "2026-11-15",
    category: "Projects",
    status: "pending",
    focusMinutes: 0,
  },
];
