import type { ActivityCategory, TimeSlot } from "@/types/summary";

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatSummaryDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatTime(time: string): string {
  return time.slice(11, 16);
}

export function getDurationMinutes(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = startHour * 60 + startMinute;
  let end = endHour * 60 + endMinute;

  // Supports activities that cross midnight.
  if (end <= start) {
    end += 24 * 60;
  }

  return end - start;
}

export function formatHours(minutes: number): string {
  const hours = minutes / 60;
  return `${Number.isInteger(hours) ? hours.toFixed(0) : hours.toFixed(1)}h`;
}

export function calculateSummary(activities: TimeSlot[]) {
  const productiveMinutes = activities
    .filter((item) => item.activityType === "USEFUL")
    .reduce(
      (total, item) => total + getDurationMinutes(item.startTime, item.endTime),
      0,
    );

  const distractedMinutes = activities
    .filter((item) => item.activityType === "USELESS")
    .reduce(
      (total, item) => total + getDurationMinutes(item.startTime, item.endTime),
      0,
    );

  const neutralMinutes = activities
    .filter((item) => item.activityType === "NEUTRAL")
    .reduce(
      (total, item) => total + getDurationMinutes(item.startTime, item.endTime),
      0,
    );

  const totalMinutes = productiveMinutes + distractedMinutes + neutralMinutes;

  return {
    productiveMinutes,
    distractedMinutes,
    neutralMinutes,
    totalMinutes,
    productivityScore:
      totalMinutes > 0
        ? Math.round((productiveMinutes / totalMinutes) * 100)
        : 0,
    distractedScore:
      totalMinutes > 0
        ? Math.round((distractedMinutes / totalMinutes) * 100)
        : 0,
    neutralScore:
      totalMinutes > 0 ? Math.round((neutralMinutes / totalMinutes) * 100) : 0,
  };
}

export function getCategoryStyles(category: ActivityCategory) {
  const styles: Record<ActivityCategory, string> = {
    HEALTH: "bg-emerald-50 text-emerald-700",
    LEARNING: "bg-violet-50 text-violet-700",
    DEVELOPMENT: "bg-sky-100 text-blue-700",
    PERSONAL: "bg-pink-100 text-pink-700",
    WORK: "bg-cyan-100 text-cyan-700",
    OTHER: "bg-slate-100 text-slate-700",
  };

  return styles[category];
}
