import { AlertCircle, CheckCircle2, Clock3, Target } from "lucide-react";

import {
  Deadline,
  WeekDay,
  WeeklyGoal,
  WeeklyStat,
} from "@/types/weekly-types";

export const weeklyStats: WeeklyStat[] = [
  {
    id: "tasks",
    title: "Tasks Planned",
    value: "12",
    description: "8 completed",
    progress: 67,
    icon: CheckCircle2,
    color: "green",
  },
  {
    id: "focus",
    title: "Total Focus Time",
    value: "28h",
    description: "18h completed",
    progress: 64,
    icon: Clock3,
    color: "blue",
  },
  {
    id: "goals",
    title: "Goals for This Week",
    value: "5",
    description: "3 on track",
    progress: 60,
    icon: Target,
    color: "orange",
  },
  {
    id: "overdue",
    title: "Overdue Tasks",
    value: "2",
    description: "Take action",
    progress: 15,
    icon: AlertCircle,
    color: "red",
  },
];

export const weeklyDays: WeekDay[] = [
  {
    id: "mon",
    date: new Date(2025, 8, 22),
    tasks: [
      {
        id: "task-1",
        title: "Workout",
        startTime: "6:00 AM",
        endTime: "7:00 AM",
        category: "Health",
        status: "completed",
      },
      {
        id: "task-2",
        title: "Read system design",
        startTime: "9:00 AM",
        endTime: "10:00 AM",
        category: "Learning",
        status: "pending",
      },
      {
        id: "task-3",
        title: "Work on Naik Foods",
        startTime: "2:00 PM",
        endTime: "5:00 PM",
        category: "Work",
        status: "in-progress",
      },
    ],
  },
  {
    id: "tue",
    date: new Date(2025, 8, 23),
    tasks: [
      {
        id: "task-4",
        title: "Complete UI design",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        category: "Development",
        status: "in-progress",
      },
      {
        id: "task-5",
        title: "Learn Docker",
        startTime: "3:00 PM",
        endTime: "5:00 PM",
        category: "Learning",
        status: "pending",
      },
    ],
  },
  {
    id: "wed",
    date: new Date(2025, 8, 24),
    tasks: [
      {
        id: "task-6",
        title: "Project meeting",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        category: "Work",
        status: "completed",
      },
      {
        id: "task-7",
        title: "Workout",
        startTime: "6:00 PM",
        endTime: "7:00 PM",
        category: "Health",
        status: "pending",
      },
      {
        id: "task-8",
        title: "Plan next week",
        startTime: "8:00 PM",
        endTime: "8:30 PM",
        category: "Personal",
        status: "pending",
      },
    ],
  },
  {
    id: "thu",
    date: new Date(2025, 8, 25),
    tasks: [
      {
        id: "task-9",
        title: "Implement API",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        category: "Development",
        status: "in-progress",
      },
      {
        id: "task-10",
        title: "Read a book",
        startTime: "8:00 PM",
        endTime: "9:00 PM",
        category: "Personal",
        status: "pending",
      },
    ],
  },
  {
    id: "fri",
    date: new Date(2025, 8, 26),
    tasks: [
      {
        id: "task-11",
        title: "Write blog",
        startTime: "11:00 AM",
        endTime: "12:30 PM",
        category: "Personal",
        status: "pending",
      },
      {
        id: "task-12",
        title: "Grocery shopping",
        startTime: "6:00 PM",
        endTime: "7:00 PM",
        category: "Personal",
        status: "pending",
      },
    ],
  },
  {
    id: "sat",
    date: new Date(2025, 8, 27),
    tasks: [
      {
        id: "task-13",
        title: "Build side project",
        startTime: "11:00 AM",
        endTime: "2:00 PM",
        category: "Development",
        status: "pending",
      },
    ],
  },
  {
    id: "sun",
    date: new Date(2025, 8, 28),
    tasks: [
      {
        id: "task-14",
        title: "Weekly review",
        startTime: "5:00 PM",
        endTime: "6:00 PM",
        category: "Planning",
        status: "pending",
      },
    ],
  },
];

export const weeklyGoals: WeeklyGoal[] = [
  {
    id: "goal-1",
    title: "Complete Naik Foods MVP",
    progress: 80,
    completed: true,
  },
  {
    id: "goal-2",
    title: "Workout 4 times",
    progress: 75,
    completed: true,
  },
  {
    id: "goal-3",
    title: "Read 1 book",
    progress: 25,
    completed: false,
  },
  {
    id: "goal-4",
    title: "Learn Docker basics",
    progress: 50,
    completed: false,
  },
  {
    id: "goal-5",
    title: "Write 2 blog posts",
    progress: 0,
    completed: false,
  },
];

export const upcomingDeadlines: Deadline[] = [
  {
    id: "deadline-1",
    title: "Submit project report",
    date: "26 Sep 2025",
    daysLeft: 2,
    type: "urgent",
  },
  {
    id: "deadline-2",
    title: "Prepare presentation",
    date: "28 Sep 2025",
    daysLeft: 4,
    type: "upcoming",
  },
  {
    id: "deadline-3",
    title: "Monthly review",
    date: "30 Sep 2025",
    daysLeft: 6,
    type: "normal",
  },
];
