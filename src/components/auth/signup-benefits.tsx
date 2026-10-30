import {
  Check,
  ChartNoAxesColumnIncreasing,
  PanelsTopLeft,
  Heart,
} from "lucide-react";

const benefits = [
  {
    title: "Plan with Clarity",
    description: "Organize your tasks and goals in one place.",
    icon: Check,
    color: "green",
  },
  {
    title: "Track Progress",
    description: "Visualize your growth with insightful stats.",
    icon: ChartNoAxesColumnIncreasing,
    color: "purple",
  },
  {
    title: "Access Anywhere",
    description: "Use Planly on web, mobile, and tablet.",
    icon: PanelsTopLeft,
    color: "orange",
  },
  {
    title: "Build Better Habits",
    description: "Stay consistent and achieve more.",
    icon: Heart,
    color: "red",
  },
] as const;

const colorClasses = {
  green: "bg-emerald-50 text-emerald-600",
  purple: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-500",
  red: "bg-rose-50 text-rose-500",
};

export function SignupBenefits() {
  return (
    <ul className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <li key={benefit.title} className="flex items-center gap-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-[58px] sm:w-[58px] ${colorClasses[benefit.color]}`}
            >
              <Icon
                size={25}
                strokeWidth={2.2}
                aria-hidden="true"
                fill={benefit.color === "red" ? "currentColor" : "none"}
              />
            </span>

            <div className="min-w-0">
              <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                {benefit.title}
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                {benefit.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
