"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";

import { formatShortDate, getTaskProgress } from "@/lib/daily-plan/utils";

import { PrioritySelector } from "./priority-selector";
import { SubtaskList } from "./subtask-list";

import type { Task, TaskPriority, TaskTag } from "@/types/daily-plan";

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onPriorityChange: (taskId: string, priority: TaskPriority) => void;
};

const tagStyles: Record<TaskTag, string> = {
  Development: "bg-blue-50 text-blue-700",
  Health: "bg-emerald-50 text-emerald-700",
  Learning: "bg-violet-50 text-violet-700",
  Work: "bg-sky-50 text-sky-700",
  Personal: "bg-pink-50 text-pink-700",
  "System Design": "bg-purple-50 text-purple-700",
  Reading: "bg-orange-50 text-orange-700",
};

export function TaskItem({
  task,
  onToggle,
  onToggleSubtask,
  onPriorityChange,
}: TaskItemProps) {
  const [expanded, setExpanded] = useState(false);

  const completed = task.status === "COMPLETED";
  const progress = getTaskProgress(task);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.02] transition-colors hover:border-slate-300">
      <div className="grid min-h-[60px] grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 px-3.5 py-3 sm:grid-cols-[24px_minmax(0,1fr)_minmax(100px,0.65fr)_minmax(110px,0.8fr)_minmax(100px,0.7fr)_24px] sm:px-4">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as ${
            completed ? "incomplete" : "complete"
          }`}
          className="size-[19px] cursor-pointer accent-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        />

        <div className="min-w-0">
          <p
            className={`truncate text-sm font-medium ${
              completed ? "text-slate-500 line-through" : "text-slate-900"
            }`}
          >
            {task.title}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:hidden">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tagStyles[task.tag]}`}
            >
              {task.tag}
            </span>

            <PrioritySelector value={task.priority} />
          </div>
        </div>

        <div className="hidden min-w-0 sm:block">
          <span
            className={`inline-flex max-w-full truncate rounded-full px-2.5 py-1 text-[11px] font-medium ${tagStyles[task.tag]}`}
          >
            {task.tag}
          </span>
        </div>

        <div className="hidden sm:block">
          <PrioritySelector
            value={task.priority}
            onChange={(priority) => onPriorityChange(task.id, priority)}
          />
        </div>

        <div className="hidden min-w-0 sm:block">
          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <CalendarDays
              aria-hidden="true"
              className="size-3.5 shrink-0 text-slate-500"
            />

            <span className="truncate">{formatShortDate(task.dueDate)}</span>
          </div>

          <p className="mt-1 text-[11px] text-slate-500">
            {task.subtasks.length > 0
              ? `${task.subtasks.filter((item) => item.completed).length}/${task.subtasks.length} subtasks`
              : completed
                ? "Completed"
                : "Task deadline"}
          </p>
        </div>

        <div className="hidden min-w-0 items-center gap-2 sm:flex">
          <div
            role="progressbar"
            aria-label={`${task.title} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200"
          >
            <div
              className={`h-full rounded-full transition-[width] ${
                completed ? "bg-emerald-500" : "bg-emerald-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="w-9 shrink-0 text-right text-[11px] text-slate-700">
            {progress}%
          </span>
        </div>

        <button
          type="button"
          aria-label={`${expanded ? "Collapse" : "Expand"} ${task.title}`}
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
          className="flex size-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600"
        >
          {expanded ? (
            <ChevronUp aria-hidden="true" className="size-4" />
          ) : (
            <ChevronDown aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/80 px-3 py-3 sm:px-5">
          {task.description && (
            <p className="mb-2 text-xs leading-5 text-slate-600">
              {task.description}
            </p>
          )}

          <SubtaskList
            subtasks={task.subtasks}
            onToggle={(subtaskId) => onToggleSubtask(task.id, subtaskId)}
            onPriorityChange={(subtaskId, priority) => {
              // Subtask priority editing can be connected to the
              // corresponding backend mutation when implemented.
              console.debug(
                "Subtask priority change requested",
                subtaskId,
                priority,
              );
            }}
          />
        </div>
      )}
    </article>
  );
}
