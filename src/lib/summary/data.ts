import type { DailySummary } from "@/types/summary";

export const initialSummary: DailySummary = {
  date: "2026-11-11",

  activities: [
    {
      id: "1",
      startTime: "06:00",
      endTime: "07:00",
      description: "Morning routine, exercise, and planning",
      category: "HEALTH",
      activityType: "USEFUL",
    },
    {
      id: "2",
      startTime: "07:00",
      endTime: "08:00",
      description: 'Read "System Design" book',
      category: "LEARNING",
      activityType: "USEFUL",
    },
    {
      id: "3",
      startTime: "08:00",
      endTime: "09:00",
      description: "Worked on Planly project - task module",
      category: "DEVELOPMENT",
      activityType: "USEFUL",
    },
    {
      id: "4",
      startTime: "09:00",
      endTime: "10:00",
      description: "Continued development and testing",
      category: "DEVELOPMENT",
      activityType: "USEFUL",
    },
  ],

  reflection: {
    wentWell: [
      "Completed key development tasks.",
      "Stayed focused for most of the day.",
    ],
    improvements: [
      "Spent too much time on social media.",
      "Need a stricter break limit.",
    ],
    nextDayFocus: [
      "Complete remaining features.",
      "Avoid unplanned distractions.",
    ],
  },
};
