"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import { useAuth } from "@/context/AuthContext";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // 1. Authentication verification is in progress.
  if (status === "pending") {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  // 2. User is not authenticated.
  if (status === "unauthenticated") {
    return null;
  }

  // 3. Safety check.
  if (!user) {
    return null;
  }

  // 4. User is authenticated.
  return (
    <div className="flex min-h-dvh bg-slate-50">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader userName={user.name} userEmail={user.email} />

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
