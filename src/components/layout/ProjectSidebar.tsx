import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Layers2 } from "lucide-react";

import { cx } from "../../pages/ArchFlowLanding/utils/cx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";

export type ProjectSidebarNavItemId =
  | "backlog"
  | "sprint"
  | "sprint-backlog"
  | "kanban";

export interface ProjectSidebarNavItem {
  id: ProjectSidebarNavItemId;
  label: string;
  icon?: LucideIcon;
  href?: string;
  badge?: number | string;
}

export interface ProjectSidebarProps {
  projectName: string;
  projectOwnerName: string;
  projectOwnerLabel?: string;
  projectCode?: string;
  /** Optional badge for project summary (e.g. member count). Same style as Projects hub user summary badge. */
  projectBadgeLabel?: string;
  navItems: ProjectSidebarNavItem[];
  activeItem: ProjectSidebarNavItemId;
  className?: string;
  footer?: ReactNode;
}

export default function ProjectSidebar({
  projectName,
  projectOwnerName,
  projectOwnerLabel,
  projectCode,
  projectBadgeLabel,
  navItems,
  activeItem,
  className,
  footer,
}: ProjectSidebarProps) {
  const projectAvatarText =
    projectCode ?? projectName.charAt(0).toUpperCase();
  const ownerLabel = `owner: ${projectOwnerName}`;

  return (
    <Sidebar
      collapsible="none"
      className={cx(
        "af-surface-lg h-[100dvh] min-h-[100dvh] w-[17.5rem] overflow-hidden bg-[#14121a] backdrop-blur-md",
        className,
      )}
    >
      <SidebarHeader className="bg-[#14121a]">
        {/* Brand block (same as ProjectsHub top block) */}
        <header className="af-separator-b shrink-0 p-4">
          <div className="af-surface-md flex items-center gap-3 bg-white/[0.03] px-3 py-3">
            <span className="af-surface-sm inline-flex h-8 w-8 shrink-0 items-center justify-center bg-white/5 text-white/80">
              <Layers2 className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                ArchFlow Platform
              </p>
              <p className="truncate text-[11px] text-white/52">
                Workspace
              </p>
            </div>
          </div>
        </header>

        {/* Project summary block (same visual style as user summary in ProjectsHub) */}
        <div className="af-separator-b shrink-0 px-4 py-4">
          <div className="af-surface-md bg-white/[0.02] px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex items-center gap-3">
                <span className="af-surface-sm inline-flex h-9 w-9 shrink-0 items-center justify-center bg-white/5 text-sm font-semibold text-white/80">
                  {projectAvatarText}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">
                    {projectName}
                  </p>
                  <p className="truncate text-[11px] text-white/52">
                    {ownerLabel}
                  </p>
                </div>
              </div>

              {projectBadgeLabel ? (
                <span className="af-surface-sm inline-flex shrink-0 items-center bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white/70">
                  {projectBadgeLabel}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="af-separator-b px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Navegação do projeto
          </p>
        </div>

        <nav className="px-4 py-3">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeItem;

              const baseClassName =
                "af-surface-md af-surface-hover flex w-full items-center justify-between gap-3 px-3 py-2.5 transition";
              const toneClassName = isActive
                ? "bg-white/[0.04] text-white"
                : "bg-transparent text-white/72 hover:text-white hover:bg-white/[0.03]";

              const content = (
                <>
                  <span className="inline-flex min-w-0 items-center gap-2 text-sm">
                    {Icon ? (
                      <Icon
                        className={cx(
                          "h-4 w-4",
                          isActive ? "text-white/65" : "text-white/52",
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="truncate">{item.label}</span>
                  </span>

                  {item.badge !== undefined ? (
                    <span className="af-surface-sm inline-flex min-w-6 shrink-0 items-center justify-center bg-white/5 px-1.5 py-0.5 text-[10px] text-white/60">
                      {item.badge}
                    </span>
                  ) : null}
                </>
              );

              if (item.href) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cx(baseClassName, toneClassName)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  key={item.id}
                  className={cx(baseClassName, toneClassName)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </nav>
      </SidebarContent>

      <SidebarFooter className="af-separator-t bg-[#14121a] px-4 py-3">
        {footer ?? (
          <a
            href="/projects"
            className="af-surface-md af-surface-hover af-focus-ring inline-flex w-full items-center justify-center bg-white/[0.03] px-3 py-2.5 text-sm text-white/76 transition hover:text-white"
          >
            Sair do projeto
          </a>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

