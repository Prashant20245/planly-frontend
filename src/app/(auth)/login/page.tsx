import type { Metadata } from "next";

import { LoginPage } from "@/components/auth/login-page";

export const metadata: Metadata = {
  title: "Sign In | Planly",
  description:
    "Sign in to Planly to organize your plans, track your progress, and achieve your goals.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <LoginPage />;
}
