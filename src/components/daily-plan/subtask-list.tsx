"use client";

import { Trash } from "lucide-react";

import type { Subtask } from "@/types/daily-plan";
import { toast } from "../ui/toast";

type SubtaskListProps = {
  taskId: string;
  subtasks: Subtask[];
  onToggle: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
};

export function SubtaskList({
  taskId,
  subtasks,
  onToggle,
  onDeleteSubtask,
}: SubtaskListProps) {
  if (subtasks.length === 0) {
    return <p className="py-3 text-sm text-slate-500">No subtasks yet.</p>;
  }

  return (
    <ul className="space-y-1">
      {subtasks.map((subtask) => (
        <li
          key={subtask.id}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-2 py-2 hover:bg-white/80"
        >
          <label className="flex min-w-0 cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => onToggle(taskId, subtask.id)}
              className="size-[18px] shrink-0 cursor-pointer accent-emerald-600"
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

          <button
            type="button"
            onClick={() => onDeleteSubtask(subtask.taskId, subtask.id)}
            aria-label={`Delete ${subtask.title}`}
            className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash className="size-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
