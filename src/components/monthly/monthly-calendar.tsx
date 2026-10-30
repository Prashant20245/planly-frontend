"use client";

import { useMemo, useState } from "react";

import { CalendarDays, ChevronDown, Filter, List, Plus } from "lucide-react";

import type { MonthlyTask } from "@/types/monthly-types";

interface MonthlyCalendarProps {
  month: Date;
  tasks: MonthlyTask[];
  onAddTask: (date: string) => void;
  onSelectTask: (task: MonthlyTask) => void;
}

type CalendarView = "month" | "week" | "list";

interface CalendarCell {
  date: Date;
  dateKey: string;
  isCurrentMonth: boolean;
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const categoryStyles: Record<
  MonthlyTask["category"],
  {
    dot: string;
    badge: string;
    text: string;
  }
> = {
  Development: {
    dot: "bg-blue-500",
    badge: "bg-blue-50",
    text: "text-blue-700",
  },
  "System Design": {
    dot: "bg-violet-500",
    badge: "bg-violet-50",
    text: "text-violet-700",
  },
  Health: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50",
    text: "text-emerald-700",
  },
  Learning: {
    dot: "bg-amber-500",
    badge: "bg-orange-50",
    text: "text-orange-700",
  },
  Personal: {
    dot: "bg-rose-500",
    badge: "bg-rose-50",
    text: "text-rose-700",
  },
  Work: {
    dot: "bg-red-500",
    badge: "bg-red-50",
    text: "text-red-700",
  },
  Projects: {
    dot: "bg-orange-500",
    badge: "bg-orange-50",
    text: "text-orange-700",
  },
  Planning: {
    dot: "bg-violet-500",
    badge: "bg-violet-50",
    text: "text-violet-700",
  },
};

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthCells(month: Date): CalendarCell[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  // Sunday-first calendar.
  const leadingDays = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const totalCells = Math.ceil((leadingDays + daysInMonth) / 7) * 7;

  const gridStart = new Date(year, monthIndex, 1 - leadingDays);

  return Array.from({ length: totalCells }, (_, index): CalendarCell => {
    const date = new Date(gridStart);

    date.setDate(gridStart.getDate() + index);

    return {
      date,
      dateKey: getDateKey(date),
      isCurrentMonth: date.getMonth() === monthIndex,
    };
  });
}

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function MonthlyCalendar({
  month,
  tasks,
  onAddTask,
  onSelectTask,
}: MonthlyCalendarProps) {
  const [view, setView] = useState<CalendarView>("month");

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedWeek, setSelectedWeek] = useState(0);

  const cells = useMemo(() => getMonthCells(month), [month]);

  const filteredTasks = useMemo(
    () =>
      selectedCategory === "all"
        ? tasks
        : tasks.filter((task) => task.category === selectedCategory),
    [tasks, selectedCategory],
  );

  const tasksByDate = useMemo(() => {
    const result = new Map<string, MonthlyTask[]>();

    for (const task of filteredTasks) {
      const existing = result.get(task.date) ?? [];

      existing.push(task);

      result.set(task.date, existing);
    }

    return result;
  }, [filteredTasks]);

  const weeks = useMemo(() => {
    const result: CalendarCell[][] = [];

    for (let index = 0; index < cells.length; index += 7) {
      result.push(cells.slice(index, index + 7));
    }

    return result;
  }, [cells]);

  const visibleCells =
    view === "week"
      ? (weeks[Math.min(selectedWeek, weeks.length - 1)] ?? [])
      : cells;

  const visibleWeeks = view === "week" ? [visibleCells] : weeks;

  const categories = Array.from(new Set(tasks.map((task) => task.category)));

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm shadow-slate-100/50">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-base font-bold text-[#101b46]">
          {formatMonthLabel(month)}
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg border border-slate-200 p-0.5">
            {(
              [
                ["month", "Month"],
                ["week", "Week"],
                ["list", "List"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setView(value)}
                aria-pressed={view === value}
                className={`h-8 rounded-md px-4 text-xs font-medium transition ${
                  view === value
                    ? "bg-emerald-100 text-emerald-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {view === "week" && (
            <select
              aria-label="Select week"
              value={selectedWeek}
              onChange={(event) => setSelectedWeek(Number(event.target.value))}
              className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-700 outline-none focus:border-emerald-500"
            >
              {weeks.map((week, index) => (
                <option key={index} value={index}>
                  Week {index + 1}
                </option>
              ))}
            </select>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen((current) => !current)}
              aria-expanded={isFilterOpen}
              className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-4 text-xs font-medium text-[#101b46] transition hover:bg-slate-50"
            >
              <Filter size={15} />
              Filter
              <ChevronDown size={13} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-11 z-30 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setIsFilterOpen(false);
                  }}
                  className={`w-full rounded-md px-3 py-2 text-left text-xs ${
                    selectedCategory === "all"
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  All categories
                </button>

                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full rounded-md px-3 py-2 text-left text-xs ${
                      selectedCategory === category
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {view !== "list" && (
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
              {weekdays.map((day) => (
                <div
                  key={day}
                  className="border-r border-slate-100 px-2 py-2 text-center text-xs font-semibold text-[#101b46] last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            <div>
              {visibleWeeks.map((week, weekIndex) => (
                <div key={`${view}-${weekIndex}`} className="grid grid-cols-7">
                  {week.map((cell) => {
                    const dayTasks = tasksByDate.get(cell.dateKey) ?? [];

                    const isToday = cell.dateKey === getDateKey(new Date());

                    return (
                      <div
                        key={cell.dateKey}
                        className={`group min-h-[82px] min-w-0 border-b border-r border-slate-100 p-1.5 transition last:border-r-0 sm:min-h-[100px] sm:p-2 ${
                          cell.isCurrentMonth ? "bg-white" : "bg-slate-50/60"
                        } ${isToday ? "bg-emerald-50" : "hover:bg-slate-50"}`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                              isToday
                                ? "bg-emerald-600 font-semibold text-white"
                                : cell.isCurrentMonth
                                  ? "font-semibold text-[#101b46]"
                                  : "text-slate-400"
                            }`}
                          >
                            {cell.date.getDate()}
                          </span>

                          <button
                            type="button"
                            onClick={() => onAddTask(cell.dateKey)}
                            aria-label={`Add task on ${cell.date.toDateString()}`}
                            className="rounded p-0.5 text-slate-400 opacity-0 transition hover:bg-emerald-100 hover:text-emerald-700 group-hover:opacity-100 focus:opacity-100"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className="mt-1 space-y-0.5">
                          {dayTasks.slice(0, 2).map((task) => {
                            const style = categoryStyles[task.category];

                            return (
                              <button
                                key={task.id}
                                type="button"
                                onClick={() => onSelectTask(task)}
                                title={task.title}
                                className="flex w-full min-w-0 items-center gap-1 rounded-sm px-0.5 py-0.5 text-left hover:bg-slate-100"
                              >
                                <span
                                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                                />

                                <span className="truncate text-[10px] leading-3 text-slate-600 sm:text-[11px]">
                                  {task.title}
                                </span>
                              </button>
                            );
                          })}

                          {dayTasks.length > 2 && (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectTask(dayTasks[2]);
                              }}
                              className="text-[10px] text-slate-500 hover:text-emerald-700"
                            >
                              +{dayTasks.length - 2} more
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "list" && (
        <div className="divide-y divide-slate-100">
          {cells
            .filter((cell) => cell.isCurrentMonth)
            .map((cell) => {
              const dayTasks = tasksByDate.get(cell.dateKey) ?? [];

              return (
                <div
                  key={cell.dateKey}
                  className="grid grid-cols-1 gap-3 px-4 py-3 sm:grid-cols-[100px_1fr] sm:items-start"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#101b46]">
                      {cell.date.toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {cell.date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {dayTasks.map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => onSelectTask(task)}
                        className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-100 p-2.5 text-left hover:bg-slate-50"
                      >
                        <span className="truncate text-sm text-[#101b46]">
                          {task.title}
                        </span>

                        <span className="shrink-0 text-xs text-slate-500">
                          {task.category}
                        </span>
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => onAddTask(cell.dateKey)}
                      className="flex items-center gap-1 py-1 text-xs text-emerald-700 hover:text-emerald-800"
                    >
                      <Plus size={14} />
                      Add Task
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </section>
  );
}
