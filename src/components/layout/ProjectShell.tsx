import type { CSSProperties, ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import ProjectSidebar, {
  type ProjectSidebarNavItemId,
} from "./ProjectSidebar";

const pageStyle: CSSProperties = {
  fontFamily:
    'Satoshi, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, monospace',
};

interface ProjectShellProps {
  projectId: string;
  projectName: string;
  projectOwnerName: string;
  projectOwnerLabel?: string;
  projectCode?: string;
  activeNavItem: ProjectSidebarNavItemId;
  pageTitle: string;
  pageSubtitle: string;
  pageContextLabel?: string;
  userName: string;
  userInitials?: string;
  mainColumn: ReactNode;
  sideColumn: ReactNode;
}

export default function ProjectShell({
  projectId,
  projectName,
  projectOwnerName,
  projectOwnerLabel,
  projectCode,
  activeNavItem,
  pageTitle,
  pageSubtitle,
  pageContextLabel,
  userName,
  userInitials,
  mainColumn,
  sideColumn,
}: ProjectShellProps) {
  const avatarText = (userInitials ?? userName.charAt(0)).toUpperCase();

  return (
    <div
      className="h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-[var(--site-bg,#16171d)] text-white"
      style={pageStyle}
    >
      <SidebarProvider className="h-full min-h-[100dvh] w-full">
        <ProjectSidebar
          className="w-[17.5rem] shrink-0"
          projectName={projectName}
          projectOwnerName={projectOwnerName}
          projectOwnerLabel={projectOwnerLabel}
          projectCode={projectCode}
          activeItem={activeNavItem}
          navItems={[
            {
              id: "backlog",
              label: "Backlog",
              href: `/projects/${projectId}/backlog`,
            },
            {
              id: "sprint",
              label: "Sprint",
              href: `/projects/${projectId}/sprint`,
            },
            {
              id: "sprint-backlog",
              label: "Sprint Backlog",
              href: `/projects/${projectId}/sprint-backlog`,
            },
            {
              id: "kanban",
              label: "Kanban",
              href: `/projects/${projectId}/kanban`,
            },
          ]}
        />

        <SidebarInset className="h-full min-h-0">
          <main className="h-full min-h-0 min-w-0 overflow-hidden">
            <div className="af-surface-lg flex h-full min-h-0 flex-col bg-[#14121a]/40">
              <header className="af-separator-b flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-lg font-semibold text-white sm:text-xl">
                      {pageTitle}
                    </h1>

                    {pageContextLabel ? (
                      <span className="af-surface-sm inline-flex items-center bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/72">
                        {pageContextLabel}
                      </span>
                    ) : null}
                  </div>

                  <p className="text-sm text-white/62">{pageSubtitle}</p>
                </div>

                <button
                  type="button"
                  aria-label={userName}
                  className="af-surface-md af-surface-hover af-focus-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-semibold text-white/80 transition hover:text-white"
                >
                  {avatarText}
                </button>
              </header>

              <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
                <div className="grid min-h-0 gap-4 lg:gap-5 xl:gap-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
                  <section aria-label="Product backlog epics" className="min-w-0">
                    {mainColumn}
                  </section>

                  <aside
                    aria-label="Backlog refinement and metrics"
                    className="min-w-0 space-y-4 lg:space-y-5"
                  >
                    {sideColumn}
                  </aside>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

