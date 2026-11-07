"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, X } from "lucide-react";

import { sidebarNavItems } from "./sidebar-nav-items";

type AppSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  function isActiveRoute(href: string): boolean {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside
      id="app-sidebar"
      className={`
        fixed inset-y-0 left-0 z-50
        flex h-dvh w-60 shrink-0 flex-col
        border-r border-slate-200/80 bg-white
        transition-transform duration-300 ease-in-out
        lg:sticky lg:top-0 lg:z-20
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo and brand */}
      <div className="flex items-center justify-between px-5 pb-5 pt-5">
        <Link
          href="/dashboard"
          onClick={onClose}
          aria-label="Planly home"
          className="inline-flex flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
        >
          <Image
            src="/logo.png"
            alt="Planly"
            width={150}
            height={60}
            priority
            className="h-10 w-auto max-w-36 object-contain object-left"
          />

          <span className="ml-1 mt-1 text-[11px] tracking-tight text-slate-600">
            Plan Today, Build Tomorrow.
          </span>
        </Link>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="flex size-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Primary navigation */}
      <nav
        aria-label="Main navigation"
        className="flex-1 overflow-y-auto px-3 py-2"
      >
        <ul className="space-y-1.5">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`
                    group flex min-h-12 items-center gap-3
                    rounded-xl px-3.5 py-3 text-sm font-medium
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-600
                    ${
                      active
                        ? "bg-emerald-50 text-emerald-950"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }
                  `}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={active ? 2.3 : 1.8}
                    className={`
                      size-[22px] shrink-0 transition-colors
                      ${
                        active
                          ? "text-emerald-800"
                          : "text-slate-700 group-hover:text-emerald-800"
                      }
                    `}
                  />

                  <span className="truncate">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom motivational card */}
      <div className="mt-auto px-4 pb-5 pt-4">
        <div className="relative isolate min-h-[118px] overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-emerald-50 to-emerald-100/80 px-3.5 py-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-9 bg-gradient-to-t from-emerald-800/15 to-transparent"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-2 -z-10 h-12 w-28 rounded-[50%] bg-emerald-800/10 blur-sm"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-6 right-0 -z-10 h-14 w-24 rounded-[50%] bg-emerald-700/15 blur-sm"
          />

          <div className="flex items-start gap-3">
            <Leaf
              aria-hidden="true"
              className="mt-0.5 size-8 shrink-0 fill-emerald-700/20 text-emerald-800"
              strokeWidth={1.5}
            />

            <p className="text-sm leading-5 text-slate-800">
              Small steps
              <br />
              big progress.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
