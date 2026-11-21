import { formatHours, getDurationMinutes } from "@/lib/summary/utils";
import { ActivityCategory, ActivityType, TimeSlot } from "@/types/summary";
import { X } from "lucide-react";

const categoryOptions: {
  value: ActivityCategory;
  label: string;
}[] = [
  { value: "HEALTH", label: "Health" },
  { value: "LEARNING", label: "Learning" },
  { value: "DEVELOPMENT", label: "Development" },
  { value: "PERSONAL", label: "Personal" },
  { value: "WORK", label: "Work" },
  { value: "OTHER", label: "Other" },
];

export default function TimeSlotForm({
  initialData,
  editing,
  onClose,
  onSave,
  onChange,
}: {
  initialData: Omit<TimeSlot, "id">;
  editing: boolean;
  onClose: () => void;
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (value: Omit<TimeSlot, "id">) => void;
}) {
  const duration = getDurationMinutes(
    initialData.startTime,
    initialData.endTime,
  );

  console.log("Initial Data", initialData);
  const invalidDuration = duration <= 0 || duration > 24 * 60;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <form
        onSubmit={onSave}
        className="w-full max-w-lg space-y-5 rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {editing ? "Edit Time Slot" : "Add Time Slot"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Record how you spent your time.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Activity description
          </label>

          <input
            required
            maxLength={200}
            value={initialData.description}
            onChange={(event) =>
              onChange({
                ...initialData,
                description: event.target.value,
              })
            }
            placeholder="What did you do?"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Start time
            </label>

            <input
              type="time"
              required
              value={initialData.startTime}
              onChange={(event) =>
                onChange({
                  ...initialData,
                  startTime: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              End time
            </label>

            <input
              type="time"
              required
              value={initialData.endTime}
              onChange={(event) =>
                onChange({
                  ...initialData,
                  endTime: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <p
          className={`text-xs ${invalidDuration ? "text-rose-600" : "text-slate-500"}`}
        >
          {invalidDuration
            ? "Please select a valid time duration."
            : `Activity duration: ${formatHours(duration)}`}
        </p>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Category
          </label>

          <select
            value={initialData.category}
            onChange={(event) =>
              onChange({
                ...initialData,
                category: event.target.value as ActivityCategory,
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
          >
            {categoryOptions.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Activity type
          </label>

          <div className="grid grid-cols-3 gap-3">
            {(["USEFUL", "USELESS", "NEUTRAL"] as ActivityType[]).map(
              (type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    onChange({ ...initialData, activityType: type })
                  }
                  className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                    initialData.activityType === type
                      ? type === "USEFUL"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : type === "USELESS"
                          ? "border-rose-400 bg-rose-50 text-rose-600"
                          : "border-slate-400 bg-slate-100 text-slate-700"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {type === "USEFUL"
                    ? "Useful"
                    : type === "USELESS"
                      ? "Useless"
                      : "Neutral"}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!initialData.description.trim() || invalidDuration}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {editing ? "Update Activity" : "Add Activity"}
          </button>
        </div>
      </form>
    </div>
  );
}
