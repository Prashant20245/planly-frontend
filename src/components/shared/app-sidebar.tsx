import {
  Calendar,
  CalendarDays,
  CalendarRange,
  ChartNoAxesColumnIncreasing,
  House,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const sidebarTitle = [
  {
    title: "Dashboard",
    icon: <House />,
  },
  {
    title: "Daily Plan",
    icon: <CalendarDays />,
  },
  {
    title: "Weekly Plan",
    icon: <CalendarRange />,
  },
  {
    title: "Monthly Plan",
    icon: <Calendar />,
  },
  {
    title: "Yearly Plan",
    icon: <ChartNoAxesColumnIncreasing />,
  },
  {
    title: "Settings",
    icon: <Settings />,
  },
];
export default function AppSidebar() {
  return (
    <div className="bg-gray-100">
      <Image
        src="/logo.png"
        height={100}
        width={150}
        alt="Planly Logo"
        className="mb-5"
      />

      {sidebarTitle.map((val, idx) => (
        <div className="flex px-4 py-2">
          <div className="mr-2">{val.icon}</div>
          <div>{val.title}</div>
        </div>
      ))}
    </div>
  );
}
