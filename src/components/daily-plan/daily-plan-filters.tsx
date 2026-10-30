"use client";

import { ArrowDownUp, ChevronDown } from "lucide-react";

import {
  TASK_PRIORITIES,
  TASK_SORT_OPTIONS,
  TASK_STATUS_FILTERS,
  TASK_TAGS,
} from "@/lib/daily-plan/constants";

import type {
  TaskPriority,
  TaskSortOption,
  TaskStatusFilter,
  TaskTag,
} from "@/types/daily-plan";

type DailyPlanFiltersProps = {
  activeStatus: TaskStatusFilter;
  onStatusChange: (value: TaskStatusFilter) => void;
  selectedTag: TaskTag | "ALL";
  onTagChange: (value: TaskTag | "ALL") => void;
  selectedPriority: TaskPriority | "ALL";
  onPriorityChange: (value: TaskPriority | "ALL") => void;
  sortBy: TaskSortOption;
  onSortChange: (value: TaskSortOption) => void;
  counts: Record<TaskStatusFilter, number>;
};

const selectClass =
  "h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-xs font-medium text-slate-800 outline-none transition-colors hover:border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

export function DailyPlanFilters({
  activeStatus,
  onStatusChange,
  selectedTag,
  onTagChange,
  selectedPriority,
  onPriorityChange,
  sortBy,
  onSortChange,
  counts,
}: DailyPlanFiltersProps) {
  return (
    <section aria-label="Filter tasks" className="flex flex-col gap-3">
      <div className="flex min-w-0 flex-wrap gap-2">
        {TASK_STATUS_FILTERS.map((filter) => {
          const active = activeStatus === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={active}
              onClick={() => onStatusChange(filter.value)}
              className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                active
                  ? "border-emerald-100 bg-emerald-50 text-emerald-900"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {filter.label}
              <span className={active ? "text-emerald-800" : "text-slate-500"}>
                ({counts[filter.value]})
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <label className="relative">
          <span className="sr-only">Filter by tag</span>

          <select
            value={selectedTag}
            onChange={(event) =>
              onTagChange(event.target.value as TaskTag | "ALL")
            }
            className={selectClass}
          >
            <option value="ALL">All Tags</option>

            {TASK_TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-600"
          />
        </label>

        <label className="relative">
          <span className="sr-only">Filter by priority</span>

          <select
            value={selectedPriority}
            onChange={(event) =>
              onPriorityChange(event.target.value as TaskPriority | "ALL")
            }
            className={selectClass}
          >
            <option value="ALL">All Priorities</option>

            {TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0) + priority.slice(1).toLowerCase()}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-600"
          />
        </label>

        <label className="relative">
          <span className="sr-only">Sort tasks by</span>

          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <ArrowDownUp aria-hidden="true" className="size-4 text-slate-700" />
          </div>

          <select
            value={sortBy}
            onChange={(event) =>
              onSortChange(event.target.value as TaskSortOption)
            }
            className={`${selectClass} pl-9`}
          >
            {TASK_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-600"
          />
        </label>
      </div>
    </section>
  );
}
