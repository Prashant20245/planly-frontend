export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type TaskTag =
  | "Development"
  | "Health"
  | "Learning"
  | "Work"
  | "Personal"
  | "System Design"
  | "Reading";

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  tag: TaskTag;
  dueDate: string;
  subtasks: Subtask[];
  createdAt: string;
};

export type TaskStatusFilter =
  | "ALL"
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "OVERDUE";

export type TaskSortOption = "DEADLINE" | "PRIORITY" | "TITLE";
