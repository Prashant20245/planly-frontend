"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Target } from "lucide-react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarWidgetProps = {
  initialDate?: Date;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  weeklyProgress?: number;
};

export function CalendarWidget({
  initialDate,
  selectedDate,
  onDateSelect,
  weeklyProgress = 70,
}: CalendarWidgetProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const date = initialDate ?? new Date();

    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    () => selectedDate ?? new Date(),
  );

  const activeDate = selectedDate ?? internalSelectedDate;

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  const calendarCells = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDayOfMonth + 1;

    if (dayNumber < 1) {
      return {
        day: daysInPreviousMonth + dayNumber,
        monthOffset: -1,
      };
    }

    if (dayNumber > daysInMonth) {
      return {
        day: dayNumber - daysInMonth,
        monthOffset: 1,
      };
    }

    return {
      day: dayNumber,
      monthOffset: 0,
    };
  });

  function changeMonth(offset: number) {
    setVisibleMonth(new Date(year, month + offset, 1));
  }

  function selectDate(day: number, monthOffset: number) {
    const nextDate = new Date(year, month + monthOffset, day);

    setInternalSelectedDate(nextDate);
    setVisibleMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));

    onDateSelect?.(nextDate);
  }

  const monthLabel = visibleMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isSameDate = (day: number, monthOffset: number) => {
    if (!activeDate) return false;

    const date = new Date(year, month + monthOffset, day);

    return (
      date.getFullYear() === activeDate.getFullYear() &&
      date.getMonth() === activeDate.getMonth() &&
      date.getDate() === activeDate.getDate()
    );
  };

  return (
    <section
      aria-labelledby="calendar-title"
      className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="calendar-title"
          className="text-base font-semibold text-slate-950"
        >
          {monthLabel}
        </h2>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="flex size-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="flex size-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-1 text-center">
        {weekdays.map((weekday) => (
          <span
            key={weekday}
            className="py-2 text-[11px] font-medium text-slate-500 sm:text-xs"
          >
            {weekday}
          </span>
        ))}

        {calendarCells.map((cell, index) => {
          const isSelected = isSameDate(cell.day, cell.monthOffset);

          return (
            <button
              key={`${cell.monthOffset}-${cell.day}-${index}`}
              type="button"
              onClick={() => selectDate(cell.day, cell.monthOffset)}
              aria-pressed={isSelected}
              aria-label={`${new Date(
                year,
                month + cell.monthOffset,
                cell.day,
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`}
              className={`mx-auto flex size-8 items-center justify-center rounded-full text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                isSelected
                  ? "bg-emerald-800 font-semibold text-white"
                  : cell.monthOffset !== 0
                    ? "text-slate-400 hover:bg-slate-100"
                    : "text-slate-700 hover:bg-emerald-50"
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-50/80 p-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700">
          <Target aria-hidden="true" className="size-6" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-emerald-900">Keep going!</p>

          <p className="mt-0.5 text-xs text-emerald-800">
            You&apos;re {weeklyProgress}% on track this week.
          </p>
        </div>

        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 text-emerald-800"
        />
      </div>
    </section>
  );
}
