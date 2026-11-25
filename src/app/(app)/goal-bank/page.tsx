"use client";

import { useMemo, useState, type FormEvent } from "react";

import {
  Layers3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Search,
  ChevronDown,
  ArrowUpDown,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
  Check,
  Circle,
  X,
  Archive,
  Target,
} from "lucide-react";

import type {
  Goal,
  GoalFilter,
  GoalStatus,
  GoalTag,
  GoalPriority,
  Subtask,
} from "@/types/goal";

import { initialGoals } from "@/lib/goal-bank/data";

import {
  filterAndSortGoals,
  formatGoalDate,
  getGoalCounts,
  getGoalProgress,
} from "@/lib/goal-bank/utils";

import { GOAL_PRIORITIES, GOAL_TAGS } from "@/lib/goal-bank/constants";

const initialFilters: GoalFilter = {
  search: "",
  status: "ALL",
  tag: "ALL",
  priority: "ALL",
  sort: "RECENT",
};

const emptyGoal = {
  title: "",
  description: "",
  tag: "DEVELOPMENT" as GoalTag,
  priority: "MEDIUM" as GoalPriority,
};

const statusLabels: Record<GoalStatus, string> = {
  BACKLOG: "Yet to Plan",
  PLANNED: "Planned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

const statusStyles: Record<GoalStatus, string> = {
  BACKLOG: "bg-slate-100 text-slate-600",
  PLANNED: "bg-violet-50 text-violet-700",
  IN_PROGRESS: "bg-blue-50 text-blue-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  ARCHIVED: "bg-amber-50 text-amber-700",
};

const priorityStyles: Record<GoalPriority, string> = {
  HARD: "bg-rose-50 text-rose-600",
  MEDIUM: "bg-amber-50 text-amber-700",
  EASY: "bg-emerald-50 text-emerald-700",
};

const tagStyles: Record<GoalTag, string> = {
  DEVELOPMENT: "bg-blue-100 text-blue-700",
  LEARNING: "bg-violet-100 text-violet-700",
  HEALTH: "bg-emerald-50 text-emerald-700",
  WORK: "bg-sky-100 text-blue-700",
  PERSONAL: "bg-pink-100 text-pink-700",
  READING: "bg-orange-50 text-orange-700",
  FINANCE: "bg-teal-50 text-teal-700",
  OTHER: "bg-slate-100 text-slate-700",
};

function makeId() {
  return crypto.randomUUID();
}

export default function GoalBankPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const [filters, setFilters] = useState<GoalFilter>(initialFilters);

  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(
    initialGoals[0]?.id ?? null,
  );

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  const [showPlanForm, setShowPlanForm] = useState(false);
  const [plannedDate, setPlannedDate] = useState("");

  const [goalForm, setGoalForm] = useState(emptyGoal);

  const [newSubtask, setNewSubtask] = useState("");

  const counts = useMemo(() => getGoalCounts(goals), [goals]);

  const visibleGoals = useMemo(
    () => filterAndSortGoals(goals, filters),
    [goals, filters],
  );

  const selectedGoal = useMemo(
    () => goals.find((goal) => goal.id === selectedGoalId) ?? null,
    [goals, selectedGoalId],
  );

  const updateFilter = <K extends keyof GoalFilter>(
    key: K,
    value: GoalFilter[K],
  ) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // ---------------- CREATE / EDIT ----------------

  const openCreateForm = () => {
    setEditingGoalId(null);
    setGoalForm(emptyGoal);
    setShowGoalForm(true);
  };

  const openEditForm = (goal: Goal) => {
    setEditingGoalId(goal.id);

    setGoalForm({
      title: goal.title,
      description: goal.description ?? "",
      tag: goal.tag,
      priority: goal.priority,
    });

    setShowGoalForm(true);
  };

  const closeGoalForm = () => {
    setShowGoalForm(false);
    setEditingGoalId(null);
    setGoalForm(emptyGoal);
  };

  const handleSaveGoal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = goalForm.title.trim();

    if (!title) return;

    if (editingGoalId) {
      setGoals((previous) =>
        previous.map((goal) =>
          goal.id === editingGoalId
            ? {
                ...goal,
                ...goalForm,
                title,
                description: goalForm.description.trim() || null,
                updatedAt: new Date().toISOString(),
              }
            : goal,
        ),
      );
    } else {
      const newGoal: Goal = {
        id: makeId(),
        ...goalForm,
        title,
        description: goalForm.description.trim() || null,
        status: "BACKLOG",
        plannedDate: null,
        subtasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setGoals((previous) => [newGoal, ...previous]);
      setSelectedGoalId(newGoal.id);
    }

    closeGoalForm();
  };

  // ---------------- STATUS MANAGEMENT ----------------

  const updateGoalStatus = (id: string, status: GoalStatus) => {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              status,
              plannedDate:
                status === "BACKLOG" || status === "ARCHIVED"
                  ? null
                  : goal.plannedDate,
              subtasks:
                status === "COMPLETED"
                  ? goal.subtasks.map((subtask) => ({
                      ...subtask,
                      completed: true,
                    }))
                  : goal.subtasks,
              updatedAt: new Date().toISOString(),
            }
          : goal,
      ),
    );
  };

  // ---------------- DELETE / ARCHIVE ----------------

  const deleteGoal = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this goal?",
    );

    if (!confirmed) return;

    setGoals((previous) => previous.filter((goal) => goal.id !== id));

    setSelectedGoalId((previous) => (previous === id ? null : previous));
  };

  const archiveGoal = (id: string) => {
    updateGoalStatus(id, "ARCHIVED");
  };

  // ---------------- PLANNING ----------------

  const openPlanForm = () => {
    if (!selectedGoal) return;

    setPlannedDate(
      selectedGoal.plannedDate ?? new Date().toISOString().slice(0, 10),
    );

    setShowPlanForm(true);
  };

  const handlePlanGoal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedGoal || !plannedDate) return;

    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === selectedGoal.id
          ? {
              ...goal,
              plannedDate,
              status: goal.status === "IN_PROGRESS" ? "IN_PROGRESS" : "PLANNED",
              updatedAt: new Date().toISOString(),
            }
          : goal,
      ),
    );

    setShowPlanForm(false);
  };

  // ---------------- SUBTASK MANAGEMENT ----------------

  const toggleSubtask = (subtaskId: string) => {
    if (!selectedGoal) return;

    setGoals((previous) =>
      previous.map((goal) => {
        if (goal.id !== selectedGoal.id) return goal;

        const subtasks = goal.subtasks.map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, completed: !subtask.completed }
            : subtask,
        );

        const allCompleted =
          subtasks.length > 0 && subtasks.every((subtask) => subtask.completed);

        const anyCompleted = subtasks.some((subtask) => subtask.completed);

        return {
          ...goal,
          subtasks,
          status: allCompleted
            ? "COMPLETED"
            : anyCompleted
              ? "IN_PROGRESS"
              : goal.plannedDate
                ? "PLANNED"
                : "BACKLOG",
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const addSubtask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedGoal || !newSubtask.trim()) return;

    const subtask: Subtask = {
      id: makeId(),
      title: newSubtask.trim(),
      completed: false,
    };

    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === selectedGoal.id
          ? {
              ...goal,
              subtasks: [...goal.subtasks, subtask],
              status: goal.status === "BACKLOG" ? "BACKLOG" : goal.status,
              updatedAt: new Date().toISOString(),
            }
          : goal,
      ),
    );

    setNewSubtask("");
  };

  const removeSubtask = (subtaskId: string) => {
    if (!selectedGoal) return;

    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === selectedGoal.id
          ? {
              ...goal,
              subtasks: goal.subtasks.filter(
                (subtask) => subtask.id !== subtaskId,
              ),
              status:
                goal.status === "COMPLETED"
                  ? goal.plannedDate
                    ? "PLANNED"
                    : "BACKLOG"
                  : goal.status,
              updatedAt: new Date().toISOString(),
            }
          : goal,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 sm:p-6">
      <div className="mx-auto max-w-[1700px] space-y-6">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Layers3 size={29} className="text-emerald-700" />

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Goal Bank
              </h1>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              A single place for all your tasks, ideas, and long-term goals. Add
              anything, then plan it to a date when you're ready.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            <Plus size={19} />
            Add Goal
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Goals"
            value={counts.total}
            icon={<Layers3 size={26} />}
            iconClass="bg-violet-50 text-violet-600"
          />

          <StatCard
            title="Planned to Dates"
            value={counts.planned}
            icon={<CalendarDays size={26} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Completed"
            value={counts.completed}
            icon={<CheckCircle2 size={26} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Yet to Plan"
            value={counts.backlog}
            icon={<Clock3 size={26} />}
            iconClass="bg-amber-50 text-amber-600"
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 2xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-4">
            {/* TABS */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { value: "ALL", label: "All", count: counts.total },
                {
                  value: "BACKLOG",
                  label: "Yet to Plan",
                  count: counts.backlog,
                },
                {
                  value: "PLANNED",
                  label: "Planned",
                  count: goals.filter((g) =>
                    ["PLANNED", "IN_PROGRESS"].includes(g.status),
                  ).length,
                },
                {
                  value: "COMPLETED",
                  label: "Completed",
                  count: counts.completed,
                },
                {
                  value: "ARCHIVED",
                  label: "Archived",
                  count: counts.archived,
                },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() =>
                    updateFilter("status", tab.value as GoalFilter["status"])
                  }
                  className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    filters.status === tab.value
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* FILTERS */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <FilterSelect
                value={filters.tag}
                onChange={(value) =>
                  updateFilter("tag", value as GoalFilter["tag"])
                }
                options={[
                  { value: "ALL", label: "All Tags" },
                  ...GOAL_TAGS.map((tag) => ({
                    value: tag.value,
                    label: tag.label,
                  })),
                ]}
              />

              <FilterSelect
                value={filters.priority}
                onChange={(value) =>
                  updateFilter("priority", value as GoalFilter["priority"])
                }
                options={[
                  { value: "ALL", label: "All Priorities" },
                  ...GOAL_PRIORITIES.map((priority) => ({
                    value: priority.value,
                    label: priority.label,
                  })),
                ]}
              />

              <FilterSelect
                value={filters.status}
                onChange={(value) =>
                  updateFilter("status", value as GoalFilter["status"])
                }
                options={[
                  { value: "ALL", label: "All Status" },
                  { value: "BACKLOG", label: "Yet to Plan" },
                  { value: "PLANNED", label: "Planned" },
                  { value: "IN_PROGRESS", label: "In Progress" },
                  { value: "COMPLETED", label: "Completed" },
                  { value: "ARCHIVED", label: "Archived" },
                ]}
              />

              <FilterSelect
                value={filters.sort}
                onChange={(value) =>
                  updateFilter("sort", value as GoalFilter["sort"])
                }
                options={[
                  { value: "RECENT", label: "Recently Added" },
                  { value: "OLDEST", label: "Oldest First" },
                  { value: "TITLE", label: "Title" },
                  { value: "PRIORITY", label: "Priority" },
                ]}
              />
            </div>

            {/* GOAL TABLE */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70">
                      <th className="w-14 px-5 py-4">
                        <span className="sr-only">Selection</span>
                      </th>

                      <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                        Goal / Task
                      </th>

                      <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                        Tag
                      </th>

                      <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                        Priority
                      </th>

                      <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                        Status
                      </th>

                      <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                        Planned Date
                      </th>

                      <th className="w-24 px-4 py-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleGoals.length > 0 ? (
                      visibleGoals.map((goal) => (
                        <tr
                          key={goal.id}
                          onClick={() => setSelectedGoalId(goal.id)}
                          className={`cursor-pointer border-b border-slate-100 transition last:border-0 hover:bg-slate-50 ${
                            selectedGoalId === goal.id ? "bg-emerald-50/70" : ""
                          }`}
                        >
                          <td className="px-5 py-4">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded border ${
                                goal.status === "COMPLETED"
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : "border-slate-400 bg-white"
                              }`}
                            >
                              {goal.status === "COMPLETED" && (
                                <Check size={14} />
                              )}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <span className="text-sm font-semibold text-slate-800">
                              {goal.title}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <Badge className={tagStyles[goal.tag]}>
                              {goal.tag.charAt(0) +
                                goal.tag.slice(1).toLowerCase()}
                            </Badge>
                          </td>

                          <td className="px-4 py-4">
                            <Badge className={priorityStyles[goal.priority]}>
                              {goal.priority.charAt(0) +
                                goal.priority.slice(1).toLowerCase()}
                            </Badge>
                          </td>

                          <td className="px-4 py-4">
                            <Badge className={statusStyles[goal.status]}>
                              {statusLabels[goal.status]}
                            </Badge>
                          </td>

                          <td className="px-4 py-4">
                            <span className="flex items-center gap-2 text-sm text-slate-600">
                              {goal.plannedDate ? (
                                <>
                                  <CalendarDays size={16} />
                                  {formatGoalDate(goal.plannedDate)}
                                </>
                              ) : (
                                "—"
                              )}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setSelectedGoalId(goal.id);
                                }}
                                aria-label="View goal details"
                                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                              >
                                <ExternalLink size={17} />
                              </button>

                              <div className="relative group/menu">
                                <button
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setSelectedGoalId(goal.id);
                                    openEditForm(goal);
                                  }}
                                  aria-label="Edit goal"
                                  className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                                >
                                  <MoreHorizontal size={18} />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-5 py-16 text-center">
                          <Target
                            className="mx-auto text-slate-400"
                            size={34}
                          />

                          <p className="mt-3 font-semibold text-slate-700">
                            No goals found
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            Try changing your filters or add a new goal.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
                Showing {visibleGoals.length} of{" "}
                {goals.filter((g) => g.status !== "ARCHIVED").length} active
                goals
              </div>
            </div>
          </div>

          {/* DETAILS PANEL */}
          <aside className="min-w-0">
            {selectedGoal ? (
              <GoalDetailsPanel
                goal={selectedGoal}
                onEdit={() => openEditForm(selectedGoal)}
                onPlan={openPlanForm}
                onToggleSubtask={toggleSubtask}
                onAddSubtask={addSubtask}
                onRemoveSubtask={removeSubtask}
                onMarkCompleted={() =>
                  updateGoalStatus(selectedGoal.id, "COMPLETED")
                }
                onArchive={() => archiveGoal(selectedGoal.id)}
                onDelete={() => deleteGoal(selectedGoal.id)}
                newSubtask={newSubtask}
                setNewSubtask={setNewSubtask}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <Target className="mx-auto text-slate-400" size={32} />
                <p className="mt-3 font-semibold text-slate-700">
                  Select a goal
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Select any goal to see its details.
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* CREATE / EDIT MODAL */}
        {showGoalForm && (
          <GoalFormDialog
            editing={Boolean(editingGoalId)}
            value={goalForm}
            onChange={setGoalForm}
            onClose={closeGoalForm}
            onSubmit={handleSaveGoal}
          />
        )}

        {/* PLAN MODAL */}
        {showPlanForm && selectedGoal && (
          <PlanGoalDialog
            value={plannedDate}
            onChange={setPlannedDate}
            onClose={() => setShowPlanForm(false)}
            onSubmit={handlePlanGoal}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   REUSABLE COMPONENTS
------------------------------------------------------- */

function StatCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconClass}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>

        <p className="text-sm text-slate-500">{title}</p>
      </div>
    </div>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={17}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </div>
  );
}

/* -------------------------------------------------------
   GOAL DETAILS PANEL
------------------------------------------------------- */

function GoalDetailsPanel({
  goal,
  onEdit,
  onPlan,
  onToggleSubtask,
  onAddSubtask,
  onRemoveSubtask,
  onMarkCompleted,
  onArchive,
  onDelete,
  newSubtask,
  setNewSubtask,
}: {
  goal: Goal;
  onEdit: () => void;
  onPlan: () => void;
  onToggleSubtask: (id: string) => void;
  onAddSubtask: (event: FormEvent<HTMLFormElement>) => void;
  onRemoveSubtask: (id: string) => void;
  onMarkCompleted: () => void;
  onArchive: () => void;
  onDelete: () => void;
  newSubtask: string;
  setNewSubtask: (value: string) => void;
}) {
  const progress = getGoalProgress(goal);

  const completedCount = goal.subtasks.filter(
    (subtask) => subtask.completed,
  ).length;

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-slate-900">Goal Details</h2>

        <button
          onClick={onEdit}
          aria-label="Edit selected goal"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
        >
          <Pencil size={16} />
        </button>
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">{goal.title}</h3>

      {goal.description && (
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {goal.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className={tagStyles[goal.tag]}>{goal.tag}</Badge>

        <Badge className={priorityStyles[goal.priority]}>
          {goal.priority} PRIORITY
        </Badge>
      </div>

      {/* PROGRESS */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">Progress</p>

          <p className="text-sm font-bold text-slate-800">{progress}%</p>
        </div>

        <div
          className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Goal completion progress"
        >
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* PLANNED DATE */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Planned Date
        </p>

        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <CalendarDays size={16} />
          {formatGoalDate(goal.plannedDate)}
        </p>
      </div>

      {/* SUBTASKS */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">
            Subtasks ({completedCount}/{goal.subtasks.length})
          </h3>

          <span className="text-xs text-slate-500">
            {goal.subtasks.length} total
          </span>
        </div>

        <form onSubmit={onAddSubtask} className="mt-3 flex gap-2">
          <input
            value={newSubtask}
            onChange={(event) => setNewSubtask(event.target.value)}
            maxLength={150}
            placeholder="Add a subtask..."
            className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />

          <button
            type="submit"
            disabled={!newSubtask.trim()}
            className="rounded-lg bg-emerald-50 px-3 text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-40"
            aria-label="Add subtask"
          >
            <Plus size={18} />
          </button>
        </form>

        <div className="mt-3 space-y-3">
          {goal.subtasks.map((subtask) => (
            <div key={subtask.id} className="group flex items-start gap-3">
              <button
                onClick={() => onToggleSubtask(subtask.id)}
                aria-label={`Mark ${subtask.title} as ${subtask.completed ? "incomplete" : "complete"}`}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  subtask.completed
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-400 bg-white"
                }`}
              >
                {subtask.completed && <Check size={13} />}
              </button>

              <span
                className={`flex-1 text-sm ${
                  subtask.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-700"
                }`}
              >
                {subtask.title}
              </span>

              <button
                onClick={() => onRemoveSubtask(subtask.id)}
                aria-label={`Remove ${subtask.title}`}
                className="rounded p-1 text-slate-400 opacity-0 transition hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 focus:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {goal.subtasks.length === 0 && (
            <p className="py-3 text-center text-xs text-slate-400">
              No subtasks yet. Break this goal into smaller steps.
            </p>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
        {goal.status !== "COMPLETED" && (
          <button
            onClick={onPlan}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <CalendarDays size={17} />
            {goal.plannedDate ? "Reschedule Goal" : "Plan to a Date"}
          </button>
        )}

        {goal.status !== "COMPLETED" && (
          <button
            onClick={onMarkCompleted}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <CheckCircle2 size={17} />
            Mark as Completed
          </button>
        )}

        {goal.status === "COMPLETED" && (
          <button
            onClick={() => onArchive()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Archive size={17} />
            Archive Goal
          </button>
        )}

        <button
          onClick={() => setShowMore((previous) => !previous)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <MoreHorizontal size={17} />
          More Actions
          <ChevronDown
            size={15}
            className={`transition ${showMore ? "rotate-180" : ""}`}
          />
        </button>

        {showMore && (
          <div className="space-y-1 rounded-xl border border-slate-100 p-2">
            {goal.status !== "ARCHIVED" && goal.status !== "COMPLETED" && (
              <button
                onClick={onArchive}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <Archive size={16} />
                Archive goal
              </button>
            )}

            {goal.status === "ARCHIVED" && (
              <button
                onClick={() => {
                  onPlan();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <CalendarDays size={16} />
                Restore and plan
              </button>
            )}

            <button
              onClick={onDelete}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
            >
              <Trash2 size={16} />
              Delete permanently
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   CREATE / EDIT GOAL DIALOG
------------------------------------------------------- */

function GoalFormDialog({
  editing,
  value,
  onChange,
  onClose,
  onSubmit,
}: {
  editing: boolean;
  value: typeof emptyGoal;
  onChange: (value: typeof emptyGoal) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg space-y-5 rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {editing ? "Edit Goal" : "Create New Goal"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Goal title
          </label>

          <input
            required
            autoFocus
            maxLength={150}
            value={value.title}
            onChange={(event) =>
              onChange({ ...value, title: event.target.value })
            }
            placeholder="What do you want to accomplish?"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Description
          </label>

          <textarea
            rows={3}
            maxLength={1000}
            value={value.description}
            onChange={(event) =>
              onChange({
                ...value,
                description: event.target.value,
              })
            }
            placeholder="Add more details about your goal..."
            className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tag
            </label>

            <select
              value={value.tag}
              onChange={(event) =>
                onChange({
                  ...value,
                  tag: event.target.value as GoalTag,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
            >
              {GOAL_TAGS.map((tag) => (
                <option key={tag.value} value={tag.value}>
                  {tag.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Priority
            </label>

            <select
              value={value.priority}
              onChange={(event) =>
                onChange({
                  ...value,
                  priority: event.target.value as GoalPriority,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
            >
              {GOAL_PRIORITIES.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!value.title.trim()}
            className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
          >
            {editing ? "Save Changes" : "Create Goal"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* -------------------------------------------------------
   PLAN GOAL DIALOG
------------------------------------------------------- */

function PlanGoalDialog({
  value,
  onChange,
  onClose,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Plan Goal</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-slate-500">
          Choose the date on which you want to work on this goal.
        </p>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Planned date
          </label>

          <input
            type="date"
            required
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!value}
            className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
          >
            Confirm Plan
          </button>
        </div>
      </form>
    </div>
  );
}
