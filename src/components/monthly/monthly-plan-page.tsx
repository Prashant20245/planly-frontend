"use client";

import { useMemo, useState } from "react";

import { CalendarDays, Leaf, X } from "lucide-react";

import {
  monthlyDeadlines,
  monthlyGoals,
  monthlyStats,
  monthlyTasks,
} from "@/lib/monthly-data";

import { MonthlyPlanHeader } from "./monthly-plan-header";
import { MonthlyStatistics } from "./monthly-statistics";
import { MonthlyCalendar } from "./monthly-calendar";

import {
  MonthlyGoalsCard,
  MonthlyTaskStatisticsCard,
  MonthlyTimeAllocationCard,
} from "./monthly-sidebar";

import { MonthlyBottomSection } from "./monthly-bottom-section";

import type { MonthlyTask } from "@/types/monthly-types";

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function MonthlyPlanPage() {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    getMonthStart(new Date(2026, 8, 1)),
  );

  const [tasks, setTasks] = useState<MonthlyTask[]>(() =>
    monthlyTasks.map((task) => ({ ...task })),
  );

  const [selectedTask, setSelectedTask] = useState<MonthlyTask | null>(null);

  const [taskDate, setTaskDate] = useState<string | null>(null);

  const [taskTitle, setTaskTitle] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const monthLabel = useMemo(
    () => formatMonthLabel(selectedMonth),
    [selectedMonth],
  );

  function handlePreviousMonth() {
    setSelectedMonth((current) => addMonths(current, -1));
  }

  function handleNextMonth() {
    setSelectedMonth((current) => addMonths(current, 1));
  }

  function handleToday() {
    setSelectedMonth(getMonthStart(new Date()));
  }

  function handleAddTask(date: string) {
    setTaskDate(date);
    setTaskTitle("");
    setSelectedTask(null);
    setIsCreateOpen(true);
  }

  function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = taskTitle.trim();

    if (!title || !taskDate) {
      return;
    }

    const newTask: MonthlyTask = {
      id: crypto.randomUUID(),
      title,
      date: taskDate,
      category: "Personal",
      status: "pending",
    };

    setTasks((current) => [...current, newTask]);

    setSelectedMonth(
      getMonthStart(
        new Date(
          Number(taskDate.slice(0, 4)),
          Number(taskDate.slice(5, 7)) - 1,
          Number(taskDate.slice(8, 10)),
        ),
      ),
    );

    setIsCreateOpen(false);
    setTaskDate(null);
    setTaskTitle("");
  }

  return (
    <div className="min-h-full bg-[#f8fafc] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[1800px] space-y-4">
        <MonthlyPlanHeader
          monthLabel={monthLabel}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          onAddTask={() =>
            handleAddTask(
              `${selectedMonth.getFullYear()}-${String(
                selectedMonth.getMonth() + 1,
              ).padStart(2, "0")}-01`,
            )
          }
        />

        <MonthlyStatistics stats={monthlyStats} />

        <div className="grid grid-cols-1 items-start gap-4 2xl:grid-cols-[minmax(0,1fr)_328px]">
          <div className="min-w-0 space-y-3">
            <MonthlyCalendar
              month={selectedMonth}
              tasks={tasks}
              onAddTask={handleAddTask}
              onSelectTask={setSelectedTask}
            />

            <MonthlyBottomSection deadlines={monthlyDeadlines} />
          </div>

          <aside className="min-w-0 space-y-3">
            <MonthlyQuoteCard />

            <MonthlyGoalsCard goals={monthlyGoals} />

            <MonthlyTaskStatisticsCard />

            <MonthlyTimeAllocationCard />
          </aside>
        </div>
      </div>

      {isCreateOpen && (
        <CreateMonthlyTaskDialog
          date={taskDate}
          title={taskTitle}
          onTitleChange={setTaskTitle}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateTask}
        />
      )}

      {selectedTask && (
        <MonthlyTaskDetailsDialog
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

function MonthlyQuoteCard() {
  return (
    <section className="relative min-h-28 overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 p-4">
      <div className="relative z-10 max-w-[220px]">
        <p className="text-base leading-6 text-[#101b46]">
          “A month of focused effort brings you closer to the life you want.”
        </p>

        <div className="mt-3 h-px w-7 bg-slate-500" />
      </div>

      <Leaf
        size={100}
        strokeWidth={0.7}
        className="absolute -bottom-5 -right-2 rotate-12 text-emerald-700/20"
      />

      <Leaf
        size={65}
        strokeWidth={0.7}
        className="absolute -bottom-5 right-16 -rotate-12 text-emerald-600/15"
      />
    </section>
  );
}

interface CreateMonthlyTaskDialogProps {
  date: string | null;
  title: string;
  onTitleChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function CreateMonthlyTaskDialog({
  date,
  title,
  onTitleChange,
  onClose,
  onSubmit,
}: CreateMonthlyTaskDialogProps) {
  const formattedDate = date
    ? new Date(
        Number(date.slice(0, 4)),
        Number(date.slice(5, 7)) - 1,
        Number(date.slice(8, 10)),
      ).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Select a date";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-monthly-task-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3">
          <h2
            id="create-monthly-task-title"
            className="text-xl font-bold text-[#101b46]"
          >
            Create Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />
          {formattedDate}
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="monthly-task-title"
              className="mb-2 block text-sm font-medium text-[#101b46]"
            >
              Task title
            </label>

            <input
              id="monthly-task-title"
              autoFocus
              required
              maxLength={200}
              value={title}
              onChange={(event) => onTitleChange(event.target.value)}
              placeholder="What do you want to accomplish?"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Task
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function MonthlyTaskDetailsDialog({
  task,
  onClose,
}: {
  task: MonthlyTask;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="monthly-task-details-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              {task.category}
            </p>

            <h2
              id="monthly-task-details-title"
              className="mt-2 text-xl font-bold text-[#101b46]"
            >
              {task.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task details"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <p>
            <span className="font-medium text-[#101b46]">Date:</span>{" "}
            {task.date}
          </p>

          <p>
            <span className="font-medium text-[#101b46]">Category:</span>{" "}
            {task.category}
          </p>

          <p>
            <span className="font-medium text-[#101b46]">Status:</span>{" "}
            {task.status.replace("-", " ")}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Close
        </button>
      </section>
    </div>
  );
}
