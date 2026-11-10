import { Task, TaskStatusFilter, TaskPriority } from "@/types/daily-plan";

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

// export function formatShortDate(dateString: string): string {
//   const [year, month, day] = dateString.split("-").map(Number);

//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     timeZone: "UTC",
//   }).format(new Date(Date.UTC(year, month - 1, day)));
// }

export function formatShortDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return "No date";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isTaskOverdue(task: Task, selectedDate: string): boolean {
  return task.completed && task.deadline < selectedDate;
}

export function getTaskProgress(task: Task): number {
  if (task.completed) {
    return 100;
  }

  // if (task.subtasks.length === 0) {
  //   return task.status === "IN_PROGRESS" ? 60 : 0;
  // }

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed,
  ).length;

  return Math.round((completedSubtasks / task.subtasks.length) * 100);
}

export function getTaskStatus(
  task: Task,
): "TODO" | "IN_PROGRESS" | "COMPLETED" {
  if (task.completed) {
    return "COMPLETED";
  }

  if (
    task.subtasks.length > 0 &&
    task.subtasks.every((subtask) => subtask.completed)
  ) {
    return "COMPLETED";
  }

  if (
    task.subtasks.some((subtask) => subtask.completed) ||
    task.completed === false
  ) {
    return "IN_PROGRESS";
  }

  return "TODO";
}

export function matchesStatusFilter(
  task: Task,
  filter: TaskStatusFilter,
  selectedDate: string,
): boolean {
  const status = getTaskStatus(task);

  switch (filter) {
    case "ALL":
      return true;

    case "TODO":
      return status === "TODO";

    case "IN_PROGRESS":
      return status === "IN_PROGRESS";

    case "COMPLETED":
      return status === "COMPLETED";

    case "OVERDUE":
      return isTaskOverdue(task, selectedDate);
  }
}

export function getPriorityRank(priority: TaskPriority): number {
  const ranks: Record<TaskPriority, number> = {
    HIGH: 3,
    MEDIUM: 2,
    EASY: 1,
  };

  return ranks[priority];
}
