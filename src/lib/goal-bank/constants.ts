import type { GoalPriority, GoalStatus, GoalTag } from "@/types/goal";

export const GOAL_TAGS: {
  value: GoalTag;
  label: string;
}[] = [
  { value: "DEVELOPMENT", label: "Development" },
  { value: "LEARNING", label: "Learning" },
  { value: "HEALTH", label: "Health" },
  { value: "WORK", label: "Work" },
  { value: "PERSONAL", label: "Personal" },
  { value: "READING", label: "Reading" },
  { value: "FINANCE", label: "Finance" },
  { value: "OTHER", label: "Other" },
];

export const GOAL_PRIORITIES: {
  value: GoalPriority;
  label: string;
}[] = [
  { value: "HARD", label: "Hard" },
  { value: "MEDIUM", label: "Medium" },
  { value: "EASY", label: "Easy" },
];

export const GOAL_STATUSES: {
  value: GoalStatus;
  label: string;
}[] = [
  { value: "BACKLOG", label: "Yet to Plan" },
  { value: "PLANNED", label: "Planned" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ARCHIVED", label: "Archived" },
];
