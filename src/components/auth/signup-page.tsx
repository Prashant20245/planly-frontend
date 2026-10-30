import { SignupHeader } from "@/components/auth/signup-header";
import { SignupIntro } from "@/components/auth/signup-intro";
import { SignupForm } from "@/components/auth/signup-form";
import { LandscapeBackground } from "@/components/auth/landscape-background";

export function SignupPage() {
  return (
    <main className="signup-page relative min-h-screen overflow-hidden">
      <LandscapeBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SignupHeader />

        <div className="grid items-center gap-10 pb-12 pt-8 lg:min-h-[calc(100vh-112px)] lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:py-8">
          <SignupIntro />

          <div className="flex w-full justify-center lg:justify-end">
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}
