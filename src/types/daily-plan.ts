export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export type TaskPriority = "EASY" | "MEDIUM" | "HIGH";

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
};

export type Task = {
  id?: string;
  title: string;
  description: string;
  difficulty: TaskPriority;
  tag: string;
  deadline: string;
  completed: boolean;
  subtasks: Subtask[];
};

export type TaskStatusFilter =
  | "ALL"
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "OVERDUE";

export type TaskSortOption = "DEADLINE" | "PRIORITY" | "TITLE";
