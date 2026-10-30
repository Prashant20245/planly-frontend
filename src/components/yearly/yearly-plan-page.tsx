"use client";

import { useMemo, useState } from "react";

import { Leaf, X } from "lucide-react";

import {
  annualGoals,
  initialYearlyTasks,
  monthlyProgress,
  timeAllocation,
  yearlyMilestones,
  yearlyStats,
} from "@/lib/yearly-data";

import { YearlyPlanHeader } from "./yearly-plan-header";
import { YearlyStatistics } from "./yearly-statistics";
import { YearlyActivityHeatmap } from "./yearly-activity-heatmap";

import { AnnualGoalsCard, YearlyTaskStatisticsCard } from "./yearly-sidebar";

import { YearlyAnalytics } from "./yearly-analytics";
import { YearlyMilestones } from "./yearly-milestones";
import { YearlyTaskDialog } from "./yearly-task-dialog";

import type { YearlyTask } from "@/types/yearly-types";

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getInitialTaskDate(year: number): string {
  const today = new Date();

  if (today.getFullYear() === year) {
    return getDateKey(today);
  }

  return `${year}-01-01`;
}

export default function YearlyPlanPage() {
  // The reference screenshot displays 2026.
  const [year, setYear] = useState(2026);

  const [tasks, setTasks] = useState<YearlyTask[]>(() =>
    initialYearlyTasks.map((task) => ({ ...task })),
  );

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");

  const [taskDate, setTaskDate] = useState(() => getInitialTaskDate(2026));

  const yearlyTasks = useMemo(
    () => tasks.filter((task) => Number(task.date.slice(0, 4)) === year),
    [tasks, year],
  );

  const yearlyMilestonesForYear = useMemo(
    () =>
      yearlyMilestones.filter(
        (milestone) => Number(milestone.date.slice(0, 4)) === year,
      ),
    [year],
  );

  function openTaskDialog(date?: string) {
    setTaskTitle("");
    setTaskDate(date ?? getInitialTaskDate(year));
    setIsTaskDialogOpen(true);
  }

  function handlePreviousYear() {
    setYear((current) => current - 1);
  }

  function handleNextYear() {
    setYear((current) => current + 1);
  }

  function handleYearChange(nextYear: number) {
    if (!Number.isInteger(nextYear)) {
      return;
    }

    setYear(nextYear);
  }

  function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = taskTitle.trim();

    if (!title || !taskDate) {
      return;
    }

    // The date must belong to the currently selected year.
    if (Number(taskDate.slice(0, 4)) !== year) {
      return;
    }

    const newTask: YearlyTask = {
      id: crypto.randomUUID(),
      title,
      date: taskDate,
      category: "Personal",
      status: "pending",
      focusMinutes: 0,
    };

    setTasks((current) => [...current, newTask]);

    setIsTaskDialogOpen(false);
    setTaskTitle("");
    setTaskDate(getInitialTaskDate(year));
  }

  return (
    <div className="min-h-full bg-[#f8fafc] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[1800px] space-y-4">
        <YearlyPlanHeader
          year={year}
          onPreviousYear={handlePreviousYear}
          onNextYear={handleNextYear}
          onYearChange={handleYearChange}
          onAddTask={() => openTaskDialog()}
        />

        <YearlyStatistics stats={yearlyStats} />

        <div className="grid grid-cols-1 items-start gap-3 2xl:grid-cols-[minmax(0,1fr)_368px]">
          {/* Main content */}
          <main className="min-w-0 space-y-3">
            <YearlyQuoteCard />

            <YearlyActivityHeatmap
              year={year}
              tasks={yearlyTasks}
              onSelectDate={(date) => openTaskDialog(date)}
            />

            <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
              <YearlyAnalytics
                progress={monthlyProgress}
                allocation={timeAllocation}
                totalFocusHours={620}
              />

              <YearlyMilestones milestones={yearlyMilestonesForYear} />
            </div>
          </main>

          {/* Right sidebar */}
          <aside className="min-w-0 space-y-3">
            <AnnualGoalsCard goals={annualGoals} />

            <YearlyTaskStatisticsCard />
          </aside>
        </div>
      </div>

      {isTaskDialogOpen && (
        <YearlyTaskDialog
          year={year}
          initialDate={getInitialTaskDate(year)}
          title={taskTitle}
          date={taskDate}
          onTitleChange={setTaskTitle}
          onDateChange={setTaskDate}
          onClose={() => setIsTaskDialogOpen(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  );
}

function YearlyQuoteCard() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 px-5 py-4">
      <div className="relative z-10 max-w-sm">
        <p className="text-base leading-6 text-[#101b46]">
          “A focused year turns plans into reality.”
        </p>

        <div className="mt-3 h-px w-7 bg-slate-500" />
      </div>

      <Leaf
        size={115}
        strokeWidth={0.7}
        className="absolute -bottom-7 right-2 rotate-12 text-emerald-700/20"
      />

      <Leaf
        size={75}
        strokeWidth={0.7}
        className="absolute -bottom-7 right-20 -rotate-12 text-emerald-600/15"
      />
    </section>
  );
}
