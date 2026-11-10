"use client";

import { useState, type FormEvent } from "react";
import { CalendarDays, Plus, Trash2, X } from "lucide-react";

import { TASK_TAGS } from "@/lib/daily-plan/constants";

import { PrioritySelector } from "./priority-selector";
import type { Task, TaskPriority, TaskTag } from "@/types/daily-plan";
import { toast } from "../ui/toast";

type TaskFormPanelProps = {
  onClose: () => void;
  onSubmit: (task: Task) => void;
};

type SubtaskDraft = {
  id: string;
  title: string;
  completed: boolean;
};

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

export function TaskFormPanel({ onClose, onSubmit }: TaskFormPanelProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [difficulty, setDifficulty] = useState<TaskPriority>("MEDIUM");
  const [tag, setTag] = useState<string>("");

  const [subtasks, setSubtasks] = useState<SubtaskDraft[]>([]);
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function addSubtask() {
    const trimmedTitle = subtaskTitle.trim();

    if (!trimmedTitle) return;

    setSubtasks((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        completed: false,
      },
    ]);

    setSubtaskTitle("");
  }

  function removeSubtask(id: string) {
    setSubtasks((current) => current.filter((subtask) => subtask.id !== id));
  }

  // function updateSubtaskPriority(id: string, nextPriority: TaskPriority) {
  //   setSubtasks((current) =>
  //     current.map((subtask) =>
  //       subtask.id === id ? { ...subtask, priority: nextPriority } : subtask,
  //     ),
  //   );
  // }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a task title.");
      return;
    }

    if (!deadline) {
      setError("Please select a deadline.");
      return;
    }

    if (subtasks.some((subtask) => !subtask.title.trim())) {
      setError("Every subtask must have a title.");
      return;
    }

    const task: Task = {
      title: trimmedTitle,
      description: description.trim(),
      deadline,
      difficulty,
      tag,
      subtasks,
      // subtasks: subtasks.map((subtask) => ({
      //   id: subtask.id,
      //   title: subtask.title,
      //   completed: false,
      // })),
    };

    setIsSubmitting(true);

    const token = localStorage.getItem("accessToken");

    try {
      // onSubmit(task);
      console.log(task);
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(task),
        },
      );

      if (!result.ok) {
        throw new Error("Task creation failed.");
      }
      const data = await result.json();

      toast.add({ type: "success", description: data.message });
      console.log(data.data);
    } catch {
      setError("Unable to create the task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <aside
      aria-labelledby="task-form-title"
      className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-900/[0.04]"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
        <h2
          id="task-form-title"
          className="text-lg font-semibold tracking-tight text-slate-950"
        >
          Add New Task
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close task form"
          className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-600"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-5">
        <div>
          <label
            htmlFor="task-title"
            className="text-sm font-medium text-slate-800"
          >
            Task Title <span className="text-red-500">*</span>
          </label>

          <input
            id="task-title"
            autoFocus
            required
            maxLength={200}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Complete project report"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="task-description"
            className="text-sm font-medium text-slate-800"
          >
            Description
          </label>

          <textarea
            id="task-description"
            rows={3}
            maxLength={5000}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add a brief description..."
            className={`${inputClass} resize-y`}
          />
        </div>

        <div>
          <label
            htmlFor="task-deadline"
            className="text-sm font-medium text-slate-800"
          >
            Deadline <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <CalendarDays
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
            />

            <input
              id="task-deadline"
              type="date"
              required
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        <PrioritySelector value={difficulty} onChange={setDifficulty} />

        <div>
          <label
            htmlFor="task-tag"
            className="text-sm font-medium text-slate-800"
          >
            Tag
          </label>

          <select
            id="task-tag"
            // multiple
            value={tag}
            onChange={(event) => {
              setTag(event.target.value);
            }}
            className={inputClass}
          >
            {TASK_TAGS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <section aria-labelledby="subtasks-heading">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3
              id="subtasks-heading"
              className="text-sm font-medium text-slate-800"
            >
              Subtasks{" "}
              <span className="font-normal text-slate-500">(Optional)</span>
            </h3>
          </div>

          <div className="flex gap-2">
            <input
              value={subtaskTitle}
              onChange={(event) => setSubtaskTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addSubtask();
                }
              }}
              placeholder="Enter a subtask..."
              aria-label="New subtask title"
              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            <button
              type="button"
              onClick={addSubtask}
              disabled={!subtaskTitle.trim()}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          {subtasks.length > 0 && (
            <ul className="mt-3 space-y-2">
              {subtasks.map((subtask) => (
                <li
                  key={subtask.id}
                  className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2"
                >
                  <span className="min-w-0 flex-1 truncate text-xs text-slate-700">
                    {subtask.title}
                  </span>
                  {/* 
                  <select
                    aria-label={`Priority for ${subtask.title}`}
                    value={subtask.difficulty}
                    onChange={(event) =>
                      updateSubtaskPriority(
                        subtask.id,
                        event.target.value as TaskPriority,
                      )
                    }
                    className="max-w-24 rounded-md border border-slate-200 bg-white px-1.5 py-1 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select> */}

                  <button
                    type="button"
                    onClick={() => removeSubtask(subtask.id)}
                    aria-label={`Remove ${subtask.title}`}
                    className="flex size-7 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600"
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </aside>
  );
}
