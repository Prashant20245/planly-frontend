import type { Goal, GoalFilter, GoalPriority } from "@/types/goal";

export function getGoalProgress(goal: Goal): number {
  if (goal.subtasks.length === 0) {
    return goal.status === "COMPLETED" ? 100 : 0;
  }

  const completed = goal.subtasks.filter((subtask) => subtask.completed).length;

  return Math.round((completed / goal.subtasks.length) * 100);
}

export function getGoalCounts(goals: Goal[]) {
  return {
    total: goals.filter((g) => g.status !== "ARCHIVED").length,

    planned: goals.filter(
      (g) => g.status === "PLANNED" || g.status === "IN_PROGRESS",
    ).length,

    completed: goals.filter((g) => g.status === "COMPLETED").length,

    backlog: goals.filter((g) => g.status === "BACKLOG").length,

    archived: goals.filter((g) => g.status === "ARCHIVED").length,
  };
}

const priorityRank: Record<GoalPriority, number> = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

export function filterAndSortGoals(goals: Goal[], filters: GoalFilter): Goal[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  const result = goals.filter((goal) => {
    if (
      normalizedSearch &&
      !goal.title.toLowerCase().includes(normalizedSearch) &&
      !(goal.description ?? "").toLowerCase().includes(normalizedSearch)
    ) {
      return false;
    }

    if (filters.status !== "ALL" && goal.status !== filters.status) {
      return false;
    }

    if (filters.tag !== "ALL" && goal.tag !== filters.tag) {
      return false;
    }

    if (filters.priority !== "ALL" && goal.priority !== filters.priority) {
      return false;
    }

    return true;
  });

  return result.sort((a, b) => {
    switch (filters.sort) {
      case "OLDEST":
        return a.createdAt.localeCompare(b.createdAt);

      case "TITLE":
        return a.title.localeCompare(b.title);

      case "PRIORITY":
        return priorityRank[b.priority] - priorityRank[a.priority];

      case "RECENT":
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });
}

export function formatGoalDate(date: string | null) {
  if (!date) return "—";

  const [year, month, day] = date.slice(0, 10).split("-").map(Number);

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}
