export type ActivityType = "USEFUL" | "USELESS" | "NEUTRAL";

export type ActivityCategory =
  | "HEALTH"
  | "LEARNING"
  | "DEVELOPMENT"
  | "PERSONAL"
  | "WORK"
  | "OTHER";

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
  category: ActivityCategory;
  activityType: ActivityType;
}

export interface DailyReflectionType {
  wentWell: string[];
  improvements: string[];
  nextDayFocus: string[];
}

export interface DailySummary {
  date: string;
  activities: TimeSlot[];
  reflection: DailyReflectionType;
}
