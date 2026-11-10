"use client";

import { useEffect, useState } from "react";
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

  const completed = task.completed === true;

  // Calculate progress safely
  const calculatedProgress = getTaskProgress(task);

  const progress = Number.isFinite(calculatedProgress)
    ? Math.min(100, Math.max(0, calculatedProgress))
    : completed
      ? 100
      : 0;

  const completedSubtasks = task.subtasks.filter(
    (item) => item.completed,
  ).length;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.02] transition-colors hover:border-slate-300">
      <div
        className="
          grid min-h-[76px]
          grid-cols-[24px_minmax(0,1fr)_32px]
          items-start gap-3 px-3.5 py-3
          sm:px-4
          xl:grid-cols-[24px_minmax(120px,1.3fr)_minmax(80px,0.7fr)_minmax(210px,1.4fr)_minmax(125px,1fr)_minmax(120px,1fr)_32px]
        "
      >
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleChange}
          aria-label={`Mark ${task.title} as ${
            completed ? "incomplete" : "complete"
          }`}
          className="
            mt-2 size-[19px] self-start cursor-pointer
            accent-emerald-600
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-emerald-600
          "
        />

        {/* Title */}
        <div className="min-w-0">
          <p className="mb-1 text-sm font-medium text-slate-700">Title</p>

          <p
            className={`truncate text-sm font-medium ${
              completed ? "text-slate-500 line-through" : "text-slate-900"
            }`}
          >
            {task.title}
          </p>

          {/* Mobile and Tablet: Tag and Difficulty */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5 xl:hidden">
            <span
              className={`
                rounded-full px-2.5 py-1
                text-[11px] font-medium
                ${tagStyles[task.tag]}
              `}
            >
              {task.tag}
            </span>

            <PrioritySelector
              value={task.difficulty}
              onChange={(priority) => onPriorityChange(task.id, priority)}
            />
          </div>

          {/* Mobile and Tablet: Deadline */}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 xl:hidden">
            <CalendarDays aria-hidden="true" className="size-3.5 shrink-0" />

            <span className="truncate">{formatShortDate(task.deadline)}</span>
          </div>
        </div>

        {/* Tag */}
        <div className="hidden min-w-0 xl:block">
          <p className="mb-1 text-sm font-medium text-slate-700">Tag</p>

          <span
            className={`
              inline-flex max-w-full truncate
              rounded-full px-2.5 py-1.5
              text-[11px] font-medium
              ${tagStyles[task.tag]}
            `}
          >
            {task.tag}
          </span>
        </div>

        {/* Difficulty */}
        <div className="hidden min-w-0 xl:block">
          <p className="mb-1 text-sm font-medium text-slate-700">Difficulty</p>

          <PrioritySelector
            value={task.difficulty}
            onChange={(priority) => onPriorityChange(task.id, priority)}
          />
        </div>

        {/* Deadline */}
        <div className="hidden min-w-0 xl:block">
          <p className="mb-1 text-sm font-medium text-slate-700">Deadline</p>

          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <CalendarDays
              aria-hidden="true"
              className="size-3.5 shrink-0 text-slate-500"
            />

            <span className="truncate">{formatShortDate(task.deadline)}</span>
          </div>

          <p className="mt-1 text-[11px] text-slate-500">
            {task.subtasks.length > 0
              ? `${completedSubtasks}/${task.subtasks.length} subtasks`
              : completed
                ? "Completed"
                : "Task deadline"}
          </p>
        </div>

        {/* Progress */}
        <div className="hidden min-w-0 xl:block">
          <p className="mb-1 text-sm font-medium text-slate-700">Progress</p>

          <div className="flex min-w-0 items-center gap-2">
            <div
              role="progressbar"
              aria-label={`${task.title} progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="
                h-1.5 min-w-0 flex-1
                overflow-hidden rounded-full bg-slate-200
              "
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width] duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <span className="w-9 shrink-0 text-right text-[11px] font-medium tabular-nums text-slate-600">
              {progress}%
            </span>
          </div>
        </div>

        {/* Expand / Collapse */}
        <button
          type="button"
          aria-label={`${expanded ? "Collapse" : "Expand"} ${task.title}`}
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
          className="
            mt-1 flex size-8 shrink-0 self-start
            items-center justify-center rounded-lg
            text-slate-600 transition-colors
            hover:bg-slate-100
            focus-visible:outline-2
            focus-visible:outline-emerald-600
          "
        >
          {expanded ? (
            <ChevronUp aria-hidden="true" className="size-4" />
          ) : (
            <ChevronDown aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>

      {/* Expanded Content */}
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
              // Connect this to the backend mutation
              // when subtask priority editing is implemented.
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
