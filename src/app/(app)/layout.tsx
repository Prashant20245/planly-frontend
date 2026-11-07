"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import { useAuth } from "@/context/AuthContext";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect unauthenticated users.
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Close mobile sidebar whenever the route changes.
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Handle Escape and prevent background scrolling.
  useEffect(() => {
    if (!isSidebarOpen) return;

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen]);

  if (status === "pending") {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (status === "unauthenticated" || !user) {
    return null;
  }

  return (
    <div className="flex min-h-dvh bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Responsive sidebar */}
      <AppSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main application area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          userName={user.name}
          userEmail={user.email}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
