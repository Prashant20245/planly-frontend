"use client";

import { useMemo, useState } from "react";

import { CalendarDays, ChevronRight, Leaf, X } from "lucide-react";

import { WeeklyPlanHeader } from "./weekly-plan-header";
import { WeeklyStatistics } from "./weekly-statistics";
import { WeeklyCalendar } from "./weekly-calendar";
import {
  WeeklyGoalsCard,
  TaskStatisticsCard,
  TimeAllocationCard,
} from "./weekly-sidebar";
import { WeeklyBottomSection } from "./weekly-bottom-section";

import type { WeekDay, WeeklyTask } from "@/types/weekly-types";
import {
  weeklyDays,
  weeklyGoals,
  weeklyStats,
  upcomingDeadlines,
} from "@/lib/weekly-data";

function getWeekStart(date: Date): Date {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  const day = result.getDay();

  // Monday is the first day of the week.
  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);

  return result;
}

function addDays(date: Date, amount: number): Date {
  const result = new Date(date);

  result.setDate(result.getDate() + amount);

  return result;
}

function formatWeekLabel(start: Date): string {
  const end = addDays(start, 6);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const startLabel = start.toLocaleDateString("en-GB", options);
  const endLabel = end.toLocaleDateString("en-GB", options);

  return `${startLabel} – ${endLabel}`;
}

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function WeeklyPlanPage() {
  const [weekStart, setWeekStart] = useState(() =>
    getWeekStart(new Date(2025, 8, 22)),
  );

  const [days, setDays] = useState<WeekDay[]>(() =>
    weeklyDays.map((day) => ({
      ...day,
      date: new Date(day.date),
      tasks: [...day.tasks],
    })),
  );

  const [selectedTask, setSelectedTask] = useState<WeeklyTask | null>(null);

  const [taskDate, setTaskDate] = useState<Date | null>(null);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const weekLabel = useMemo(() => formatWeekLabel(weekStart), [weekStart]);

  function handlePreviousWeek() {
    setWeekStart((current) => addDays(current, -7));
  }

  function handleNextWeek() {
    setWeekStart((current) => addDays(current, 7));
  }

  function handleToday() {
    setWeekStart(getWeekStart(new Date()));
  }

  function handleAddTask(date: Date) {
    setTaskDate(date);
    setNewTaskTitle("");
    setSelectedTask(null);
    setIsCreateOpen(true);
  }

  function handleSelectTask(task: WeeklyTask) {
    setSelectedTask(task);
  }

  function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newTaskTitle.trim();

    if (!title || !taskDate) {
      return;
    }

    const newTask: WeeklyTask = {
      id: crypto.randomUUID(),
      title,
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      category: "Personal",
      status: "pending",
    };

    const targetDate = formatDateKey(taskDate);

    setDays((currentDays) => {
      const existingDay = currentDays.find(
        (day) => formatDateKey(day.date) === targetDate,
      );

      if (existingDay) {
        return currentDays.map((day) =>
          formatDateKey(day.date) === targetDate
            ? {
                ...day,
                tasks: [...day.tasks, newTask],
              }
            : day,
        );
      }

      const newDay: WeekDay = {
        id: targetDate,
        date: new Date(taskDate),
        tasks: [newTask],
      };

      return [...currentDays, newDay].sort(
        (a, b) => a.date.getTime() - b.date.getTime(),
      );
    });

    setIsCreateOpen(false);
    setTaskDate(null);
  }

  return (
    <div className="min-h-full bg-[#f8fafc] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[1800px] space-y-5">
        <WeeklyPlanHeader
          weekLabel={weekLabel}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
          onToday={handleToday}
          onAddTask={() => handleAddTask(weekStart)}
        />

        <WeeklyStatistics stats={weeklyStats} />

        <div className="grid grid-cols-1 items-start gap-4 2xl:grid-cols-[minmax(0,1fr)_328px]">
          <div className="min-w-0 space-y-3">
            <WeeklyCalendar
              days={days.filter(
                (day) =>
                  day.date >= weekStart && day.date < addDays(weekStart, 7),
              )}
              onAddTask={handleAddTask}
              onSelectTask={handleSelectTask}
            />

            <WeeklyBottomSection deadlines={upcomingDeadlines} />
          </div>

          <aside className="min-w-0 space-y-3">
            <QuoteCard />

            <WeeklyGoalsCard goals={weeklyGoals} />

            <TaskStatisticsCard />

            <TimeAllocationCard />
          </aside>
        </div>
      </div>

      {isCreateOpen && (
        <CreateTaskDialog
          date={taskDate}
          title={newTaskTitle}
          onTitleChange={setNewTaskTitle}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateTask}
        />
      )}

      {selectedTask && (
        <TaskDetailsDialog
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

function QuoteCard() {
  return (
    <section className="relative min-h-32 overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 p-4">
      <div className="relative z-10 max-w-[220px]">
        <p className="text-base leading-6 text-[#101b46]">
          “A productive week brings you closer to your bigger dreams.”
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

interface CreateTaskDialogProps {
  date: Date | null;
  title: string;
  onTitleChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function CreateTaskDialog({
  date,
  title,
  onTitleChange,
  onClose,
  onSubmit,
}: CreateTaskDialogProps) {
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
        aria-labelledby="create-task-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2
            id="create-task-title"
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

          {date
            ? date.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Select a date"}
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium text-[#101b46]"
            >
              Task title
            </label>

            <input
              id="task-title"
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

function TaskDetailsDialog({
  task,
  onClose,
}: {
  task: WeeklyTask;
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
        aria-labelledby="task-details-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              {task.category}
            </p>

            <h2
              id="task-details-title"
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
            <span className="font-medium text-[#101b46]">Time:</span>{" "}
            {task.startTime} – {task.endTime}
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
