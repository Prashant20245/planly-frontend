import { TaskPriority } from "@/types/daily-plan";

type PrioritySelectorProps = {
  value: TaskPriority;
  onChange?: (priority: TaskPriority) => void;
  disabled?: boolean;
};

const priorityStyles: Record<TaskPriority, string> = {
  EASY: "border-emerald-100 bg-emerald-50 text-emerald-800",
  MEDIUM: "border-amber-100 bg-amber-50 text-amber-800",
  HIGH: "border-red-100 bg-red-50 text-red-700",
};

export function PrioritySelector({
  value,
  onChange,
  disabled = false,
}: PrioritySelectorProps) {
  if (onChange) {
    return (
      <fieldset disabled={disabled} className="min-w-0">
        {/* <legend className="mb-2 text-sm font-medium text-slate-800">
          Priority / Difficulty
          <span className="text-red-500"> *</span>
        </legend> */}

        <div className="grid grid-cols-3 gap-2">
          {(["EASY", "MEDIUM", "HIGH"] as const).map((priority) => {
            const selected = value === priority;

            return (
              <label
                key={priority}
                className={`flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-2 text-xs transition-colors ${
                  selected
                    ? priorityStyles[priority]
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="task-priority"
                  value={priority}
                  checked={selected}
                  onChange={() => onChange(priority)}
                  className="sr-only"
                />

                <span
                  aria-hidden="true"
                  className={`size-3 rounded-full border-2 ${
                    priority === "EASY"
                      ? "border-emerald-500"
                      : priority === "MEDIUM"
                        ? "border-amber-500"
                        : "border-red-500"
                  }`}
                />

                {priority.charAt(0) + priority.slice(1).toLowerCase()}
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${priorityStyles[value]}`}
    >
      {value.charAt(0) + value.slice(1).toLowerCase()}
    </span>
  );
}
