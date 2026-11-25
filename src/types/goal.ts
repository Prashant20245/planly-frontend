export type GoalStatus =
  | "BACKLOG"
  | "PLANNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ARCHIVED";

export type GoalPriority = "EASY" | "MEDIUM" | "HARD";

export type GoalTag =
  | "DEVELOPMENT"
  | "LEARNING"
  | "HEALTH"
  | "WORK"
  | "PERSONAL"
  | "READING"
  | "FINANCE"
  | "OTHER";

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string | null;
  tag: GoalTag;
  priority: GoalPriority;
  status: GoalStatus;
  plannedDate: string | null;
  subtasks: Subtask[];
  createdAt: string;
  updatedAt: string;
}

export type CreateGoalInput = Pick<
  Goal,
  "title" | "description" | "tag" | "priority" | "subtasks"
>;

export type UpdateGoalInput = Partial<CreateGoalInput>;

export type GoalFilter = {
  search: string;
  status: "ALL" | GoalStatus;
  tag: "ALL" | GoalTag;
  priority: "ALL" | GoalPriority;
  sort: "RECENT" | "OLDEST" | "TITLE" | "PRIORITY";
};
