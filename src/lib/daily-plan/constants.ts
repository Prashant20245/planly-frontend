import {
  TaskSortOption,
  TaskPriority,
  TaskStatusFilter,
  TaskTag,
} from "@/types/daily-plan";

export const TASK_TAGS: TaskTag[] = [
  "Development",
  "Health",
  "Learning",
  "Work",
  "Personal",
  "System Design",
  "Reading",
];

export const TASK_PRIORITIES: TaskPriority[] = ["LOW", "MEDIUM", "HIGH"];

export const TASK_STATUS_FILTERS: {
  label: string;
  value: TaskStatusFilter;
}[] = [
  { label: "All", value: "ALL" },
  { label: "To Do", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Overdue", value: "OVERDUE" },
];

export const TASK_SORT_OPTIONS: {
  label: string;
  value: TaskSortOption;
}[] = [
  { label: "Deadline", value: "DEADLINE" },
  { label: "Priority", value: "PRIORITY" },
  { label: "Title", value: "TITLE" },
];
