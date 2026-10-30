"use client";

import { ClipboardList } from "lucide-react";

import { TaskItem } from "./task-item";
import type { Task, TaskPriority } from "@/types/daily-plan";

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onPriorityChange: (taskId: string, priority: TaskPriority) => void;
};

export function TaskList({
  tasks,
  onToggle,
  onToggleSubtask,
  onPriorityChange,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <ClipboardList aria-hidden="true" className="size-6" />
        </div>

        <h2 className="mt-4 text-sm font-semibold text-slate-900">
          No tasks found
        </h2>

        <p className="mt-1 max-w-xs text-sm text-slate-500">
          Try changing your filters or create a task to get started.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Daily tasks" className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onToggleSubtask={onToggleSubtask}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </section>
  );
}
