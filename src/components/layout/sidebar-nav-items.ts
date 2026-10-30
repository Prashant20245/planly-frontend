import {
  CalendarDays,
  CalendarRange,
  ChartNoAxesColumnIncreasing,
  House,
  Settings,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Daily Plan",
    href: "/daily",
    icon: CalendarDays,
  },
  {
    title: "Weekly Plan",
    href: "/weekly",
    icon: CalendarRange,
  },
  {
    title: "Monthly Plan",
    href: "/monthly",
    icon: CalendarDays,
  },
  {
    title: "Yearly Plan",
    href: "/yearly",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
