"use client";
import { useEffect, useState, type ReactNode } from "react";

import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import { useRouter } from "next/navigation";
import { AuthUser, requireAuth } from "@/lib/requireAuth";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;

    async function checkAuthentication() {
      try {
        const authenticatedUser = await requireAuth();

        if (!isMounted) return;

        if (!authenticatedUser) {
          router.replace("/login");
          return;
        }

        setUser(authenticatedUser);
      } catch (error) {
        if (!isMounted) return;

        setError(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // 1. Authentication check in progress
  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  // 2. Backend/network error
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // 3. No authenticated user
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-dvh bg-slate-50">
      {/* Persistent application sidebar */}
      <AppSidebar />

      {/* Main application area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Shared header */}
        <AppHeader userName={user.name} userEmail={user.email} />

        {/* Individual page content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
