import Link from "next/link";
import {
  BookOpen,
  Code2,
  Heart,
  Layers3,
  Pencil,
  UserRound,
} from "lucide-react";

const focusAreas = [
  {
    id: "development",
    label: "Development",
    icon: Code2,
    className: "bg-blue-50 text-blue-700",
  },
  {
    id: "system-design",
    label: "System Design",
    icon: Layers3,
    className: "bg-violet-50 text-violet-700",
  },
  {
    id: "health",
    label: "Health",
    icon: Heart,
    className: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "reading",
    label: "Reading",
    icon: BookOpen,
    className: "bg-orange-50 text-orange-700",
  },
  {
    id: "personal",
    label: "Personal",
    icon: UserRound,
    className: "bg-pink-50 text-pink-700",
  },
];

export function FocusAreas() {
  return (
    <section
      aria-labelledby="focus-areas-title"
      className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="focus-areas-title"
          className="text-base font-semibold text-slate-950"
        >
          Focus Areas
        </h2>

        <Link
          href="/settings"
          aria-label="Edit focus areas in settings"
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Edit
          <Pencil aria-hidden="true" className="size-3.5" />
        </Link>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2.5">
        {focusAreas.map((area) => {
          const Icon = area.icon;

          return (
            <li key={area.id}>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${area.className}`}
              >
                <Icon aria-hidden="true" className="size-4" />
                {area.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
