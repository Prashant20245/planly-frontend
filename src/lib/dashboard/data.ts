import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodo,
  TriangleAlert,
} from "lucide-react";

import type {
  ContributionData,
  DashboardStat,
  DashboardTask,
  RecentActivityItem,
} from "./types";

export const dashboardStats: DashboardStat[] = [
  {
    id: "daily-hours",
    title: "Daily Hours",
    value: "4.5h",
    icon: Clock3,
    variant: "blue",
    trend: {
      value: "12%",
      description: "vs yesterday",
      direction: "up",
    },
  },
  {
    id: "weekly-hours",
    title: "Weekly Hours",
    value: "28h",
    icon: CalendarDays,
    variant: "green",
    trend: {
      value: "8%",
      description: "vs last week",
      direction: "up",
    },
  },
  {
    id: "monthly-hours",
    title: "Monthly Hours",
    value: "96h",
    icon: CalendarDays,
    variant: "purple",
    trend: {
      value: "15%",
      description: "vs last month",
      direction: "up",
    },
  },
  {
    id: "completed-tasks",
    title: "Tasks Completed",
    value: 32,
    icon: CheckCircle2,
    variant: "green",
    trend: {
      value: "20%",
      description: "vs last month",
      direction: "up",
    },
  },
  {
    id: "upcoming-tasks",
    title: "Tasks To Be Completed",
    value: 18,
    icon: ListTodo,
    variant: "orange",
    caption: "Upcoming tasks",
  },
  {
    id: "pending-tasks",
    title: "Pending Tasks",
    value: 5,
    icon: TriangleAlert,
    variant: "red",
    caption: "Past due tasks",
  },
];

export const contributionData: ContributionData[] = [
  { day: "Mon", daily: 2.2, weekly: 5.4, monthly: 6.2 },
  { day: "Tue", daily: 3.5, weekly: 6.0, monthly: 8.0 },
  { day: "Wed", daily: 2.9, weekly: 4.3, monthly: 5.4 },
  { day: "Thu", daily: 3.7, weekly: 5.7, monthly: 7.5 },
  { day: "Fri", daily: 3.7, weekly: 5.4, monthly: 7.5 },
  { day: "Sat", daily: 4.2, weekly: 6.3, monthly: 8.3 },
  { day: "Sun", daily: 3.7, weekly: 6.8, monthly: 9.3 },
];

export const dashboardTasks: DashboardTask[] = [
  {
    id: "task-1",
    title: "Finish search feature UI",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    category: "Work",
    status: "upcoming",
  },
  {
    id: "task-2",
    title: "Workout",
    startTime: "06:00 PM",
    endTime: "07:00 PM",
    category: "Health",
    status: "upcoming",
  },
  {
    id: "task-3",
    title: "Read system design",
    startTime: "08:00 PM",
    endTime: "09:00 PM",
    category: "Learning",
    status: "upcoming",
  },
  {
    id: "task-4",
    title: "Plan tomorrow",
    startTime: "09:30 PM",
    endTime: "10:00 PM",
    category: "Personal",
    status: "upcoming",
  },
];

export const recentActivities: RecentActivityItem[] = [
  {
    id: "activity-1",
    title: 'Completed "Next.js project setup"',
    timestamp: "2 hours ago",
    type: "completed",
  },
  {
    id: "activity-2",
    title: "Updated weekly plan",
    timestamp: "5 hours ago",
    type: "updated",
  },
  {
    id: "activity-3",
    title: 'Added new task "Learn Docker"',
    timestamp: "1 day ago",
    type: "created",
  },
  {
    id: "activity-4",
    title: 'Task "Write blog" is now pending',
    timestamp: "1 day ago",
    type: "pending",
  },
];
