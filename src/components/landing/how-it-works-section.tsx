import { workflowSteps } from "@/lib/site-date";
import {
  CalendarDays,
  Check,
  Circle,
  Clock3,
  Leaf,
  Smartphone,
} from "lucide-react";

const tasks = [
  {
    title: "Finish search feature UI",
    time: "10:00 AM – 12:00 PM",
    category: "Work",
    color: "blue",
    completed: false,
  },
  {
    title: "Workout",
    time: "06:00 PM – 07:00 PM",
    category: "Health",
    color: "green",
    completed: true,
  },
  {
    title: "Read system design",
    time: "08:00 PM – 09:00 PM",
    category: "Learning",
    color: "purple",
    completed: false,
  },
  {
    title: "Plan tomorrow",
    time: "09:30 PM – 10:00 PM",
    category: "Personal",
    color: "orange",
    completed: false,
  },
];

function TaskList() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900">Today&apos;s Tasks</h3>

        <span className="text-xs font-semibold text-emerald-600">
          View All →
        </span>
      </div>

      <div className="space-y-5">
        {tasks.map((task) => (
          <div key={task.title} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                task.completed
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-300 text-slate-300"
              }`}
            >
              {task.completed ? (
                <Check size={12} aria-hidden="true" />
              ) : (
                <Circle size={12} aria-hidden="true" />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-800">{task.title}</p>

              <p className="mt-1 text-[10px] text-slate-400">{task.time}</p>
            </div>

            <span className={`category-tag category-${task.color}`}>
              {task.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="phone-frame">
      <div className="phone-notch" />

      <div className="px-3 pb-4 pt-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Leaf
              size={16}
              className="fill-emerald-500 text-emerald-600"
              aria-hidden="true"
            />

            <span className="text-sm font-extrabold text-slate-900">
              Planly
            </span>
          </div>

          <Smartphone size={14} className="text-slate-500" aria-hidden="true" />
        </div>

        <div className="mt-5 flex gap-3 border-b border-slate-100 pb-2 text-[10px]">
          <span className="border-b-2 border-emerald-500 pb-2 font-bold text-emerald-700">
            Today
          </span>

          <span className="text-slate-400">Week</span>
          <span className="text-slate-400">Month</span>
        </div>

        <div className="mt-4 space-y-4">
          {tasks.map((task) => (
            <div key={task.title} className="flex items-start gap-2">
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  task.completed
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-300"
                }`}
              >
                {task.completed && <Check size={10} aria-hidden="true" />}
              </span>

              <div className="min-w-0">
                <p className="text-[9px] font-medium leading-4 text-slate-800">
                  {task.title}
                </p>

                <p className="text-[8px] text-slate-400">{task.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-3 bottom-3 flex justify-around border-t border-slate-100 pt-2">
        <CalendarDays size={13} className="text-emerald-600" />
        <Clock3 size={13} className="text-slate-400" />
        <Circle size={13} className="text-slate-400" />
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="section-padding overflow-hidden bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50"
    >
      <div className="container-main grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-xl">
          <div
            className="absolute inset-0 rounded-[40px] bg-emerald-200/30 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-[1fr_105px] items-center gap-3 sm:grid-cols-[1fr_145px] sm:gap-5">
            <div className="relative z-10">
              <TaskList />
            </div>

            <div className="relative z-20 -ml-4 rotate-[4deg] sm:-ml-6">
              <PhonePreview />
            </div>
          </div>

          <div
            className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-100/80 blur-2xl"
            aria-hidden="true"
          />
        </div>

        <div>
          <p className="section-badge">✨ How It Works</p>

          <h2 className="section-heading mt-4">
            Simple Steps
            <br />
            for a <span className="text-emerald-600">Better You</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500">
            Get started with Planly in just a few simple steps and take control
            of your productivity.
          </p>

          <ol className="mt-8 space-y-6">
            {workflowSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-md shadow-emerald-600/15">
                  {index + 1}
                </span>

                <div className="pt-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
