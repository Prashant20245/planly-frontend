import type { ReactNode } from "react";

import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-dvh bg-slate-50">
      {/* Persistent application sidebar */}
      <AppSidebar />

      {/* Main application area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Shared header */}
        <AppHeader userName="Prashant" />

        {/* Individual page content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

// import type { ReactNode } from "react";
// import AppHeader from "@/components/shared/app-header";
// import AppSidebar from "@/components/shared/app-sidebar";

// export default function AppLayout({
//   children,
// }: Readonly<{
//   children: ReactNode;
// }>) {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <AppSidebar />

//       {/* Main application area */}
//       <div className="flex min-w-0 flex-1 flex-col">
//         {/* Header */}
//         <AppHeader />

//         {/* Page content */}
//         <main className="flex-1">{children}</main>
//       </div>
//     </div>
//   );
// }
