"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  ChevronDown,
  Command,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { useAuth } from "@/context/AuthContext";

type AppHeaderProps = {
  userName?: string;
  userEmail?: string;
  onMenuClick: () => void;
  onSignOut?: () => void | Promise<void>;
};

export default function AppHeader({
  userName = "",
  userEmail,
  onMenuClick,
  onSignOut,
}: AppHeaderProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyboardShortcut(event: KeyboardEvent) {
      const isShortcutPressed = event.metaKey || event.ctrlKey;

      if (isShortcutPressed && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
        searchInputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const target = event.target as Node;

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  // Search functionality
  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      searchInputRef.current?.focus();
      return;
    }

    setIsNotificationsOpen(false);
    setIsProfileOpen(false);

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  // Logout functionality
  async function handleSignOut() {
    if (isSigningOut) return;

    try {
      setIsSigningOut(true);

      await logout();
      await onSignOut?.();

      router.replace("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    } finally {
      setIsSigningOut(false);
      setIsProfileOpen(false);
    }
  }

  return (
    <header
      className="
        sticky top-0 z-30
        flex h-[69px] w-full min-w-0 shrink-0
        items-center gap-2
        border-b border-slate-200/70
        bg-white/95 px-3
        backdrop-blur-sm
        sm:gap-3 sm:px-6
        lg:px-8
      "
    >
      {/* Mobile sidebar toggle */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        aria-controls="app-sidebar"
        className="
          flex size-10 shrink-0
          items-center justify-center
          rounded-lg text-slate-700
          transition-colors
          hover:bg-slate-100
          focus-visible:outline-2
          focus-visible:outline-emerald-600
          lg:hidden
        "
      >
        <Menu className="size-6" />
      </button>

      {/* Global search */}
      <form
        role="search"
        onSubmit={handleSearchSubmit}
        className="min-w-0 flex-1"
      >
        <div
          className="
            flex h-10 w-full max-w-[560px]
            items-center gap-2
            rounded-lg border border-slate-200
            bg-slate-50/80 px-2.5
            text-slate-500
            transition-colors
            focus-within:border-emerald-300
            focus-within:bg-white
            focus-within:ring-2
            focus-within:ring-emerald-100
            sm:px-3
          "
        >
          <Search
            aria-hidden="true"
            className="size-[18px] shrink-0 text-slate-500"
          />

          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search..."
            aria-label="Search tasks and plans"
            className="
              h-full min-w-0 flex-1
              bg-transparent text-sm
              text-slate-800 outline-none
              placeholder:text-slate-500
              sm:placeholder:text-slate-500
            "
          />

          {searchQuery ? (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                searchInputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="
                flex size-6 shrink-0
                items-center justify-center
                rounded text-slate-500
                hover:bg-slate-200
                hover:text-slate-800
              "
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => searchInputRef.current?.focus()}
              aria-label="Focus search"
              className="
                hidden h-7 shrink-0
                items-center gap-1
                rounded border border-slate-200
                bg-white px-1.5
                text-xs text-slate-500
                shadow-sm transition-colors
                hover:bg-slate-100
                sm:inline-flex
              "
            >
              <Command aria-hidden="true" className="size-3" />
              <span>K</span>
            </button>
          )}
        </div>
      </form>

      {/* Header actions */}
      <div
        className="
          flex shrink-0 items-center
          gap-1 sm:gap-5
        "
      >
        {/* Notifications */}
        <div ref={notificationsRef} className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-haspopup="dialog"
            aria-expanded={isNotificationsOpen}
            onClick={() => {
              setIsNotificationsOpen((current) => !current);
              setIsProfileOpen(false);
            }}
            className="
              relative flex size-10
              items-center justify-center
              rounded-full text-slate-800
              transition-colors
              hover:bg-slate-100
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-emerald-600
            "
          >
            <Bell
              aria-hidden="true"
              className="size-[21px]"
              strokeWidth={1.8}
            />

            <span
              aria-hidden="true"
              className="
                absolute right-1.5 top-1.5
                size-2 rounded-full
                bg-red-500 ring-2 ring-white
              "
            />
          </button>

          {isNotificationsOpen && (
            <div
              role="dialog"
              aria-label="Notifications"
              className="
                absolute right-0 top-full z-50 mt-3
                w-[min(340px,calc(100vw-2rem))]
                rounded-xl border border-slate-200
                bg-white p-4
                shadow-xl shadow-slate-900/10
              "
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-950">
                  Notifications
                </h2>

                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen(false)}
                  aria-label="Close notifications"
                  className="
                    flex size-7 items-center
                    justify-center rounded-lg
                    text-slate-500
                    hover:bg-slate-100
                  "
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="py-7 text-center">
                <div
                  className="
                    mx-auto flex size-11
                    items-center justify-center
                    rounded-full bg-emerald-50
                    text-emerald-700
                  "
                >
                  <CheckCheck className="size-5" />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-800">
                  You&apos;re all caught up
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  New task reminders and updates will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* User profile */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            aria-label={`Open ${userName || "user"}'s profile menu`}
            aria-haspopup="menu"
            aria-expanded={isProfileOpen}
            onClick={() => {
              setIsProfileOpen((current) => !current);
              setIsNotificationsOpen(false);
            }}
            className="
              flex items-center gap-2.5
              rounded-lg py-1 pl-1 pr-1
              transition-colors
              hover:bg-slate-50
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-emerald-600
              sm:gap-3 sm:pr-1.5
            "
          >
            {/* Avatar */}
            <span
              aria-hidden="true"
              className="
                flex size-10 shrink-0
                items-center justify-center
                rounded-full
                bg-gradient-to-br
                from-slate-600 to-slate-800
                text-base font-medium text-white
                shadow-sm
              "
            >
              {userName.trim().charAt(0).toUpperCase() || "U"}
            </span>

            {/* Username hidden on small screens */}
            <span
              className="
                hidden max-w-32 truncate
                text-sm font-medium
                text-slate-900 sm:block
              "
            >
              {userName}
            </span>

            <ChevronDown
              aria-hidden="true"
              className={`
                hidden size-4
                text-slate-600
                transition-transform
                sm:block
                ${isProfileOpen ? "rotate-180" : ""}
              `}
            />
          </button>

          {isProfileOpen && (
            <div
              role="menu"
              aria-label="User profile menu"
              className="
                absolute right-0 top-full z-50 mt-3
                w-[min(240px,calc(100vw-2rem))]
                rounded-xl border border-slate-200
                bg-white p-2
                shadow-xl shadow-slate-900/10
              "
            >
              {/* User details */}
              <div className="border-b border-slate-100 px-3 py-3">
                <p className="truncate text-sm font-semibold text-slate-950">
                  {userName || "User"}
                </p>

                {userEmail && (
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {userEmail}
                  </p>
                )}
              </div>

              {/* Profile links */}
              <div className="py-1">
                <Link
                  href="/profile"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm text-slate-700
                    transition-colors
                    hover:bg-slate-50
                    focus-visible:outline-2
                    focus-visible:outline-emerald-600
                  "
                >
                  <UserRound className="size-4" />
                  My Profile
                </Link>

                <Link
                  href="/settings"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm text-slate-700
                    transition-colors
                    hover:bg-slate-50
                    focus-visible:outline-2
                    focus-visible:outline-emerald-600
                  "
                >
                  <Settings className="size-4" />
                  Settings
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  role="menuitem"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                  className="
                    flex w-full items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm text-red-600
                    transition-colors
                    hover:bg-red-50
                    focus-visible:outline-2
                    focus-visible:outline-red-600
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <LogOut className="size-4" />

                  {isSigningOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
