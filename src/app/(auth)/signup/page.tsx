import { SignupPage } from "@/components/auth/signup-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Account",
  description:
    "Join Planly to organize your tasks, track your progress, and build better habits.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <SignupPage />;
}
