import type { DailySummary } from "@/types/summary";

export const initialSummary: DailySummary = {
  date: "2026-11-11",

  activities: [
    {
      id: "1",
      startTime: "06:00",
      endTime: "07:00",
      activity: "Morning routine, exercise, and planning",
      category: "HEALTH",
      type: "USEFUL",
    },
    {
      id: "2",
      startTime: "07:00",
      endTime: "08:00",
      activity: 'Read "System Design" book',
      category: "LEARNING",
      type: "USEFUL",
    },
    {
      id: "3",
      startTime: "08:00",
      endTime: "09:00",
      activity: "Worked on Planly project - task module",
      category: "DEVELOPMENT",
      type: "USEFUL",
    },
    {
      id: "4",
      startTime: "09:00",
      endTime: "10:00",
      activity: "Continued development and testing",
      category: "DEVELOPMENT",
      type: "USEFUL",
    },
    {
      id: "5",
      startTime: "10:00",
      endTime: "11:00",
      activity: "Browsing social media (unplanned)",
      category: "PERSONAL",
      type: "USELESS",
    },
    {
      id: "6",
      startTime: "11:00",
      endTime: "12:00",
      activity: "Fixed bugs and pushed changes",
      category: "DEVELOPMENT",
      type: "USEFUL",
    },
    {
      id: "7",
      startTime: "12:00",
      endTime: "13:00",
      activity: "Lunch and short break",
      category: "PERSONAL",
      type: "NEUTRAL",
    },
    {
      id: "8",
      startTime: "13:00",
      endTime: "14:00",
      activity: "Worked on weekly plan UI",
      category: "DEVELOPMENT",
      type: "USEFUL",
    },
    {
      id: "9",
      startTime: "14:00",
      endTime: "15:00",
      activity: "Team discussion and review",
      category: "WORK",
      type: "USEFUL",
    },
    {
      id: "10",
      startTime: "15:00",
      endTime: "16:00",
      activity: "Watched random videos",
      category: "PERSONAL",
      type: "USELESS",
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
