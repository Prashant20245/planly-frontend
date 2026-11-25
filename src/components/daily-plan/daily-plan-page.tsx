"use client";

import { useEffect, useMemo, useState } from "react";

import { DailyPlanHeader } from "./daily-plan-header";
import { DailyPlanStats } from "./daily-plan-stats";
import { DailyPlanFilters } from "./daily-plan-filters";
import { TaskList } from "./task-list";
import { CreateTaskInput, TaskFormPanel } from "./task-form-panel";

import {
  getPriorityRank,
  getTaskStatus,
  matchesStatusFilter,
  toDateKey,
} from "@/lib/daily-plan/utils";

import {
  type Task,
  type TaskPriority,
  type TaskSortOption,
  type TaskStatusFilter,
  type TaskTag,
  InitialTask,
} from "@/types/daily-plan";
import { toast } from "../ui/toast";

const initialTaskValue: InitialTask = {
  title: "",
  description: "",
  deadline: "",
  difficulty: "EASY",
  tag: "Development",
  subtasks: [],
};

export function DailyPlanPage() {
  // Use a stable initial date for this UI prototype.
  // Replace it with the actual current date or a URL-selected date
  // when integrating the page with the backend.
  const [selectedDate, setSelectedDate] = useState(() => new Date(Date.now()));

  const [tasks, setTasks] = useState<Task[]>([]);

  const [initialTask, setInitialTask] = useState<InitialTask>(initialTaskValue);

  const [activeStatus, setActiveStatus] = useState<TaskStatusFilter>("TODO");

  const [selectedTag, setSelectedTag] = useState<TaskTag | "ALL">("ALL");

  const [selectedPriority, setSelectedPriority] = useState<
    TaskPriority | "ALL"
  >("ALL");

  const [sortBy, setSortBy] = useState<TaskSortOption>("DEADLINE");

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const selectedDateKey = toDateKey(selectedDate);

  const token = localStorage.getItem("accessToken");

  const formattedDate = [
    selectedDate.getFullYear(),
    String(selectedDate.getMonth() + 1).padStart(2, "0"),
    String(selectedDate.getDate()).padStart(2, "0"),
  ].join("-");

  //fetch all daily task
  useEffect(() => {
    async function fetchTasks() {
      try {
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
    fetchTasks();
  }, [formattedDate]);

  // used for calculating task count of differnt type
  const statistics = useMemo(() => {
    const completed = tasks.filter(
      (task) => getTaskStatus(task, selectedDateKey) === "COMPLETED",
    ).length;

    const inProgress = tasks.filter(
      (task) => getTaskStatus(task, selectedDateKey) === "IN_PROGRESS",
    ).length;

    const overdue = tasks.filter(
      (task) => getTaskStatus(task, selectedDateKey) === "OVERDUE",
    ).length;

    const upcoming = tasks.filter(
      (task) => getTaskStatus(task, selectedDateKey) === "UPCOMING",
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
      upcoming,
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
      UPCOMING: 0,
    };

    for (const task of tasks) {
      const status = getTaskStatus(task, selectedDateKey);

      counts[status]++;
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

  console.log("Tasks", tasks);

  async function toggleTask(taskId: string) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) return;

    const nextCompleted = !task.completed;

    // Preserve the previous state for rollback.
    const previousTasks = tasks;

    // Optimistically update the UI.
    setTasks((current) =>
      current.map((item) =>
        item.id === taskId
          ? {
              ...item,
              completed: nextCompleted,
              subtasks: item.subtasks.map((subtask) => ({
                ...subtask,
                completed: nextCompleted,
              })),
            }
          : item,
      ),
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/updateStatus/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: nextCompleted,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update task.");
      }

      const result = await response.json();

      toast.add({
        type: "success",
        description: result.message,
      });
    } catch {
      // Roll back if the API request fails.
      setTasks(previousTasks);

      toast.add({
        type: "failed",
        description: "Failed to update task status.",
      });
    }
  }

  async function toggleSubtask(taskId: string, subtaskId: string) {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;
    const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
    if (!subtask) return;
    const nextCompleted = !subtask.completed;
    const previousTasks = tasks;

    //optimistically update the ui
    setTasks((current) =>
      current.map((item) => {
        if (item.id !== taskId) return item;

        const subtasks = item.subtasks.map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, completed: nextCompleted }
            : subtask,
        );

        // 2. Calculate parent task completion
        const allCompleted =
          subtasks.length > 0 && subtasks.every((subtask) => subtask.completed);

        const someCompleted = subtasks.some((subtask) => subtask.completed);

        return {
          ...item,
          subtasks,
          completed: allCompleted,
          status: allCompleted
            ? "COMPLETED"
            : someCompleted
              ? "IN_PROGRESS"
              : "TODO",
        };
      }),
    );

    //update backend
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/updateStatus/task/${subtask.taskId}/subTask/${subtask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: nextCompleted,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update subtask.");
      }

      const result = await response.json();
      toast.add({ type: "success", description: result.message });
    } catch {
      setTasks(previousTasks);
      toast.add({
        type: "failed",
        description: "Failed to update subtask status.",
      });
    }
  }

  async function createTask(payload: CreateTaskInput) {
    console.log("Create Task");
    // onSubmit(task);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error("Task creation failed.");
    }
    const result = await response.json();

    const createdTask = result.task;

    // Update parent state
    setTasks((previousTasks) => [...previousTasks, createdTask]);

    toast.add({ type: "success", description: result.message });
    setIsTaskFormOpen(false);
  }

  async function deleteTask(taskId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/delete/${taskId}`,
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

      //update your task state
      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== taskId),
      );

      //add toast
      toast.add({ type: "success", description: "Task deleted successfully." });
    } catch (error) {
      console.error(error);

      toast.add({
        type: "failed",
        description: "Failed to delete task.",
      });
    }
  }

  async function editTask(taskId: string) {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;
    // console.log(task);
    setInitialTask({
      title: task.title,
      description: task.description,
      deadline: task.deadline.slice(0, 10),
      difficulty: task.difficulty,
      tag: task.tag,
      subtasks: task.subtasks,
    });
    setEditingTaskId(task.id);
    setIsTaskFormOpen(true);
  }

  // console.log("editingTaskId", editingTaskId);

  async function updateTask(taskId: string, payload: CreateTaskInput) {
    console.log("Update Task");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/update/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error("Task update failed.");
    }

    const result = await response.json();

    setTasks((previousTasks) =>
      previousTasks.map((task) => (task.id === taskId ? result.task : task)),
    );

    toast.add({
      type: "success",
      description: result.message,
    });
  }

  async function handleTaskFormSubmit(payload: CreateTaskInput) {
    if (editingTaskId) {
      await updateTask(editingTaskId, payload);
    } else {
      await createTask(payload);
    }

    setIsTaskFormOpen(false);
    setEditingTaskId(null);
  }

  async function deleteSubtask(taskId: string, subtaskId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/delete/task/${taskId}/subtask/${subtaskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete subtask.");
      }

      const result = await response.json();
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: task.subtasks.filter(
                  (subtask) => subtask.id !== subtaskId,
                ),
              }
            : task,
        ),
      );
      console.log(result);
      toast.add({
        type: "success",
        description: "Subtask deleted successfully.",
      });
    } catch (error) {
      console.error("Subtask deletion error:", error);

      toast.add({
        type: "error",
        description: "Unable to delete subtask.",
      });
    }
  }

  return (
    <main className="mx-auto w-full max-w-[1800px] space-y-5 p-4 sm:p-5 lg:p-7">
      <DailyPlanHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onAddTask={() => {
          setEditingTaskId(null);
          setInitialTask(initialTaskValue);
          setIsTaskFormOpen(true);
        }}
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
            onDeleteTask={deleteTask}
            onDeleteSubtask={deleteSubtask}
            onEditTask={editTask}
          />
        </div>

        {/* {isTaskFormOpen && (
          <div className="min-w-0 xl:sticky xl:top-[85px]">
            <TaskFormPanel
              onClose={() => setIsTaskFormOpen(false)}
              onSubmit={createTask}
            />
          </div>
        )} */}
        {isTaskFormOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center
    bg-slate-950/40 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsTaskFormOpen(false);
              }
            }}
          >
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
              <TaskFormPanel
                onClose={() => {
                  setIsTaskFormOpen(false);
                  setEditingTaskId(null);
                }}
                onSubmit={handleTaskFormSubmit}
                initialTask={initialTask}
                editingTaskId={editingTaskId}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
