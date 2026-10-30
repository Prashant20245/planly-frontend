import {
  ChartNoAxesColumnIncreasing,
  Check,
  Heart,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    title: "All your plans in one place",
    description: "Access your daily, weekly, monthly and yearly plans.",
    icon: Check,
    iconClass: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Track your progress",
    description: "Stay consistent with insightful analytics.",
    icon: ChartNoAxesColumnIncreasing,
    iconClass: "bg-violet-100 text-violet-600",
  },
  {
    title: "Accessible anywhere",
    description: "Sync across web, mobile and tablet.",
    icon: UsersRound,
    iconClass: "bg-amber-100 text-amber-600",
  },
  {
    title: "Your data is safe",
    description: "We take security and privacy seriously.",
    icon: ShieldCheck,
    iconClass: "bg-rose-100 text-rose-600",
  },
];

export function LoginIntro() {
  return (
    <section
      aria-labelledby="login-intro-title"
      className="relative flex flex-col justify-center py-8 lg:min-h-[700px] lg:py-12"
    >
      {/* Welcome badge */}
      <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-2 text-sm font-semibold text-emerald-700">
        <span aria-hidden="true" className="text-base">
          🍃
        </span>
        Welcome Back!
      </div>

      {/* Main heading */}
      <h1
        id="login-intro-title"
        className="max-w-xl text-4xl leading-[1.08] font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl xl:text-[52px]"
      >
        Continue Your
        <span className="mt-1 block bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
          Productivity Journey
        </span>
      </h1>

      <p className="mt-5 max-w-lg text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
        Sign in to access your plans, track your progress, and stay on top of
        your goals.
      </p>

      {/* Benefits */}
      <ul className="mt-7 space-y-4 sm:mt-8 sm:space-y-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <li key={benefit.title} className="flex items-center gap-4">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-2xl sm:size-[52px] ${benefit.iconClass}`}
              >
                <Icon size={25} strokeWidth={2.2} aria-hidden="true" />
              </div>

              <div>
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

      {/* Motivational quote */}
      <div className="mt-10 hidden max-w-sm text-white lg:block xl:mt-14">
        <Heart
          size={24}
          className="mb-2 fill-white/20 text-white"
          aria-hidden="true"
        />

        <blockquote className="text-sm leading-6 font-medium">
          A well planned day
          <br />
          turns into a successful life.
        </blockquote>

        <span aria-hidden="true" className="mt-3 block">
          —
        </span>
      </div>
    </section>
  );
}
