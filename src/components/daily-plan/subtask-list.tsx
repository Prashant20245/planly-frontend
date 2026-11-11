"use client";

import { CalendarDays, Trash } from "lucide-react";

import { formatShortDate } from "@/lib/daily-plan/utils";

import { PrioritySelector } from "./priority-selector";
import type { Subtask, TaskPriority } from "@/types/daily-plan";
import { useState } from "react";
import { toast } from "../ui/toast";

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
  const [completed, setCompleted] = useState<boolean>();
  async function handleChange(subTaskId: string, taskId: string) {
    const token = localStorage.getItem("accessToken");
    // Calculate the next state
    const nextCompleted = !completed;

    // Optimistically update UI
    setCompleted(nextCompleted);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/updateStatus/task/${taskId}/subTask/${subTaskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: true,
          }),
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(taskId: string, subtaskId: string) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/delete/task/${taskId}/subtask/${subtaskId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("API failed.");
      }
      const result = await response.json();
      toast.add({ type: "success", description: result.message });
    } catch (error) {
      console.log(error);
    }
  }
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
              onChange={() => handleChange(subtask.id, subtask.taskId)}
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

          <Trash
            onClick={() => handleDelete(subtask.taskId, subtask.id)}
            className="h-3 w-3"
          />

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
