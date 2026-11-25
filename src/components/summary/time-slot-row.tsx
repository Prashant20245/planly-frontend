import { getCategoryStyles } from "@/lib/summary/utils";
import { TimeSlot } from "@/types/summary";
import {
  CheckCircle2,
  CircleMinus,
  CircleX,
  Edit2,
  Trash2,
} from "lucide-react";

export default function TimeSlotRow({
  slot,
  onEdit,
  onDelete,
}: {
  slot: TimeSlot;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const useful = slot.activityType === "USEFUL";
  const useless = slot.activityType === "USELESS";
  // const neutral = slot.activityType === "NEUTRAL";

  return (
    <div className="group flex min-w-0 items-center gap-2">
      <div className="relative hidden h-10 w-4 shrink-0 items-center justify-center sm:flex">
        <div className="absolute h-full w-px bg-slate-200" />

        <span
          className={`relative z-10 h-2.5 w-2.5 rounded-full ring-4 ring-white ${
            useful ? "bg-emerald-500" : useless ? "bg-rose-400" : "bg-slate-400"
          }`}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-xl border border-slate-100 px-3 py-2.5 transition hover:border-slate-200 sm:flex-row sm:items-center">
        <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-2 text-xs font-bold tabular-nums text-slate-800 sm:w-[112px] sm:text-center">
          {slot.startTime} – {slot.endTime}
        </span>

        <p className="min-w-0 flex-1 text-sm font-medium text-slate-700">
          {slot.description}
        </p>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryStyles(slot.category)}`}
          >
            {slot.category.charAt(0) + slot.category.slice(1).toLowerCase()}
          </span>

          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              useful
                ? "bg-emerald-50 text-emerald-700"
                : useless
                  ? "bg-rose-50 text-rose-600"
                  : "bg-slate-50 text-slate-600"
            }`}
          >
            {useful ? (
              <CheckCircle2 size={13} />
            ) : useless ? (
              <CircleX size={13} />
            ) : (
              <CircleMinus size={13} />
            )}
            {useful ? "Useful" : useless ? "Useless" : "Neutral"}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={onEdit}
          aria-label={`Edit ${slot.description}`}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
        >
          <Edit2 size={16} />
        </button>

        <button
          onClick={onDelete}
          aria-label={`Delete ${slot.description}`}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
