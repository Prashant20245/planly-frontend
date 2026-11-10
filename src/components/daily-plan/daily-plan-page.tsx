"use client";

import { useEffect, useMemo, useState } from "react";

import { DailyPlanHeader } from "./daily-plan-header";
import { DailyPlanStats } from "./daily-plan-stats";
import { DailyPlanFilters } from "./daily-plan-filters";
import { TaskList } from "./task-list";
import { TaskFormPanel } from "./task-form-panel";

import {
  getPriorityRank,
  getTaskStatus,
  isTaskOverdue,
  matchesStatusFilter,
  toDateKey,
} from "@/lib/daily-plan/utils";

import type {
  Task,
  TaskPriority,
  TaskSortOption,
  TaskStatusFilter,
  TaskTag,
} from "@/types/daily-plan";

export function DailyPlanPage() {
  // Use a stable initial date for this UI prototype.
  // Replace it with the actual current date or a URL-selected date
  // when integrating the page with the backend.
  const [selectedDate, setSelectedDate] = useState(() => new Date(Date.now()));

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeStatus, setActiveStatus] = useState<TaskStatusFilter>("ALL");

  const [selectedTag, setSelectedTag] = useState<TaskTag | "ALL">("ALL");

  const [selectedPriority, setSelectedPriority] = useState<
    TaskPriority | "ALL"
  >("ALL");

  const [sortBy, setSortBy] = useState<TaskSortOption>("DEADLINE");

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const selectedDateKey = toDateKey(selectedDate);
  // console.log(selectedDate);

  const formattedDate = [
    selectedDate.getFullYear(),
    String(selectedDate.getMonth() + 1).padStart(2, "0"),
    String(selectedDate.getDate()).padStart(2, "0"),
  ].join("-");

  console.log(formattedDate);

  //fetch all daily task
  useEffect(() => {
    async function fetchDailyTasks() {
      try {
        const token = localStorage.getItem("accessToken");
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/date/${formattedDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!result.ok) {
          throw new Error("Fetch to fail daily tasks.");
        }
        const data = await result.json();
        setTasks(data.tasks);
        console.log(data.task);
      } catch (error) {
        console.log("Task fetch error:", error);
      }
    }
    fetchDailyTasks();
  }, [formattedDate]);

  // used for calculating task count of differnt type
  const statistics = useMemo(() => {
    const completed = tasks.filter((task) => task.completed === true).length;

    const inProgress = tasks.filter((task) => task.completed === false).length;

    const overdue = tasks.filter((task) =>
      isTaskOverdue(task, selectedDateKey),
    ).length;

    const subtasks = tasks.reduce(
      (total, task) => total + task.subtasks.length,
      0,
    );

    return {
      total: tasks.length,
      completed,
      inProgress,
      overdue,
      subtasks,
    };
  }, [tasks, selectedDateKey]);

  const filterCounts = useMemo(() => {
    const counts: Record<TaskStatusFilter, number> = {
      ALL: tasks.length,
      TODO: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
      OVERDUE: 0,
    };

    for (const task of tasks) {
      const status = getTaskStatus(task);

      counts[status] += 1;

      if (isTaskOverdue(task, selectedDateKey)) {
        counts.OVERDUE += 1;
      }
    }

    return counts;
  }, [tasks, selectedDateKey]);

  const filteredTasks = useMemo(() => {
    const result = tasks.filter((task) => {
      const matchesStatus = matchesStatusFilter(
        task,
        activeStatus,
        selectedDateKey,
      );

      const matchesTag = selectedTag === "ALL" || task.tag === selectedTag;

      const matchesPriority =
        selectedPriority === "ALL" || task.difficulty === selectedPriority;

      return matchesStatus && matchesTag && matchesPriority;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "DEADLINE":
          return a.deadline.localeCompare(b.deadline);

        case "PRIORITY":
          return getPriorityRank(b.difficulty) - getPriorityRank(a.difficulty);

        case "TITLE":
          return a.title.localeCompare(b.title);
      }
    });

    return result;
  }, [
    tasks,
    activeStatus,
    selectedDateKey,
    selectedTag,
    selectedPriority,
    sortBy,
  ]);

  function toggleTask(taskId: string) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const nextStatus =
          getTaskStatus(task) === "COMPLETED" ? "TODO" : "COMPLETED";

        return {
          ...task,
          status: nextStatus,
          subtasks:
            nextStatus === "COMPLETED"
              ? task.subtasks.map((subtask) => ({
                  ...subtask,
                  completed: true,
                }))
              : task.subtasks,
        };
      }),
    );
  }

  function toggleSubtask(taskId: string, subtaskId: string) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const subtasks = task.subtasks.map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, completed: !subtask.completed }
            : subtask,
        );

        const allCompleted =
          subtasks.length > 0 && subtasks.every((subtask) => subtask.completed);

        const someCompleted = subtasks.some((subtask) => subtask.completed);

        return {
          ...task,
          subtasks,
          status: allCompleted
            ? "COMPLETED"
            : someCompleted
              ? "IN_PROGRESS"
              : "TODO",
        };
      }),
    );
  }

  function updateTaskPriority(taskId: string, priority: TaskPriority) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, priority } : task,
      ),
    );
  }

  function createTask(task: Task) {
    setTasks((current) => [...current, task]);
    setIsTaskFormOpen(false);
  }

  return (
    <main className="mx-auto w-full max-w-[1800px] space-y-5 p-4 sm:p-5 lg:p-7">
      <DailyPlanHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onAddTask={() => setIsTaskFormOpen(true)}
      />

      <DailyPlanStats
        total={statistics.total}
        completed={statistics.completed}
        subtasks={statistics.subtasks}
        inProgress={statistics.inProgress}
        overdue={statistics.overdue}
      />

      <DailyPlanFilters
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        sortBy={sortBy}
        onSortChange={setSortBy}
        counts={filterCounts}
      />

      <div
        className={`grid min-w-0 items-start gap-4 ${
          isTaskFormOpen
            ? "grid-cols-1 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.9fr)]"
            : "grid-cols-1"
        }`}
      >
        <div className="min-w-0">
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onToggleSubtask={toggleSubtask}
            onPriorityChange={updateTaskPriority}
          />
        </div>

        {isTaskFormOpen && (
          <div className="min-w-0 xl:sticky xl:top-[85px]">
            <TaskFormPanel
              onClose={() => setIsTaskFormOpen(false)}
              onSubmit={createTask}
            />
          </div>
        )}
      </div>
    </main>
  );
}
