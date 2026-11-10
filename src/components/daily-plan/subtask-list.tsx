"use client";

import { CalendarDays } from "lucide-react";

import { formatShortDate } from "@/lib/daily-plan/utils";

import { PrioritySelector } from "./priority-selector";
import type { Subtask, TaskPriority } from "@/types/daily-plan";

type SubtaskListProps = {
  subtasks: Subtask[];
  onToggle: (subtaskId: string) => void;
  onPriorityChange: (subtaskId: string, priority: TaskPriority) => void;
};

export function SubtaskList({
  subtasks,
  onToggle,
  onPriorityChange,
}: SubtaskListProps) {
  if (subtasks.length === 0) {
    return <p className="py-3 text-sm text-slate-500">No subtasks yet.</p>;
  }

  return (
    <ul className="space-y-1">
      {subtasks.map((subtask) => (
        <li
          key={subtask.id}
          className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-lg px-2 py-2 hover:bg-white/80 sm:gap-3"
        >
          <label className="flex min-w-0 cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => onToggle(subtask.id)}
              className="size-[18px] shrink-0 cursor-pointer accent-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            />

            <span
              className={`truncate text-xs ${
                subtask.completed
                  ? "text-slate-500 line-through"
                  : "text-slate-800"
              }`}
            >
              {subtask.title}
            </span>
          </label>

          {/* <div className="hidden sm:block">
            <PrioritySelector value={subtask.priority} />
          </div> */}

          {/* <div className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-slate-500">
            <CalendarDays aria-hidden="true" className="size-3.5 shrink-0" />

            {formatShortDate(subtask.dueDate)}
          </div> */}

          {/* <div className="sm:hidden">
            <PrioritySelector value={subtask.priority} />
          </div> */}
        </li>
      ))}
    </ul>
  );
}
