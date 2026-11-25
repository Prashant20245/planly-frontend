"use client";

import { useEffect, useState } from "react";
import { ClipboardList, ChevronLeft, ChevronRight } from "lucide-react";

import { TaskItem } from "./task-item";
import type { Task } from "@/types/daily-plan";

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onEditTask: (taskId: string) => void;
};

const PAGE_SIZE = 5;

export function TaskList({
  tasks,
  onToggle,
  onToggleSubtask,
  onDeleteTask,
  onDeleteSubtask,
  onEditTask,
}: TaskListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);

  // Ensure current page remains valid when tasks are deleted or filtered.
  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  // Get tasks for the current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const currentTasks = tasks.slice(startIndex, endIndex);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  }

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
    <div className="space-y-4">
      {/* Task List */}
      <section aria-label="Daily tasks" className="space-y-2">
        {currentTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onToggleSubtask={onToggleSubtask}
            onDeleteTask={onDeleteTask}
            onDeleteSubtask={onDeleteSubtask}
            onEditTask={onEditTask}
          />
        ))}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Task pagination"
          className="flex flex-col items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row"
        >
          {/* Showing count */}
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-800">
              {startIndex + 1}–{Math.min(endIndex, tasks.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-800">{tasks.length}</span>{" "}
            tasks
          </p>

          <div className="flex items-center gap-1.5">
            {/* Previous */}
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`flex size-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    currentPage === page
                      ? "bg-emerald-700 text-white"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
