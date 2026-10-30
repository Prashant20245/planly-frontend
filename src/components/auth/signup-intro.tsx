import { SignupBenefits } from "@/components/auth/signup-benefits";

export function SignupIntro() {
  return (
    <section className="relative flex min-w-0 flex-col justify-center pb-5 pt-2 lg:min-h-[650px] lg:pb-44">
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/90 px-3 py-2 text-sm font-semibold text-emerald-700">
          <span className="text-base" aria-hidden="true">
            🍃
          </span>

          <span>Join Planly</span>
        </div>

        <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-5xl xl:text-[56px]">
          Start Your
          <br />
          <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-500 bg-clip-text text-transparent">
            Productivity Journey
          </span>
        </h1>

        <p className="mt-5 max-w-md text-base leading-7 text-slate-600 sm:text-lg sm:leading-[1.65]">
          Create your account and get started with a smarter way to plan,
          organize, and achieve your goals.
        </p>

        <SignupBenefits />
      </div>

      <blockquote className="relative z-10 mt-8 max-w-sm text-sm leading-6 text-slate-700 lg:absolute lg:bottom-12 lg:left-0 lg:mt-0">
        <span
          className="block text-4xl font-bold leading-none text-emerald-700"
          aria-hidden="true"
        >
          “
        </span>

        <p className="pl-3">
          A well planned day
          <br />
          turns into a successful life.
        </p>

        <span className="mt-2 block pl-3" aria-hidden="true">
          —
        </span>
      </blockquote>
    </section>
  );
}
