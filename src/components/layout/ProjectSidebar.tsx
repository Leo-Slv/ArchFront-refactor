import type { LucideIcon } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { ArrowLeftFromLine, Layers2 } from "lucide-react";

import { cx } from "../../pages/ArchFlowLanding/utils/cx";
import type { User } from "../../types/user";
import UserAvatar from "../ui/UserAvatar";
import {
  navigateToPath,
  shouldHandleNavigationClick,
} from "./sidebarNavigation";
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
  projectOwner: User;
  /** Optional badge for project summary (e.g. member count). Same style as Projects hub user summary badge. */
  projectBadgeLabel?: string;
  navItems: ProjectSidebarNavItem[];
  activeItem: ProjectSidebarNavItemId;
  className?: string;
  footer?: ReactNode;
}

export default function ProjectSidebar({
  projectName,
  projectOwner,
  projectBadgeLabel,
  navItems,
  activeItem,
  className,
  footer,
}: ProjectSidebarProps) {
  const ownerLabel = `owner: ${projectOwner.name}`;

  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    href?: string,
  ): void {
    if (!href || !shouldHandleNavigationClick(event)) {
      return;
    }

    event.preventDefault();
    navigateToPath(href);
  }

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
                <UserAvatar
                  user={projectOwner}
                  className="af-surface-sm h-9 w-9 shrink-0 bg-white/5 text-sm font-semibold text-white/80"
                />
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
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeItem;

              const baseClassName =
                "af-focus-ring flex w-full items-center justify-between gap-3 px-3 py-2 text-sm transition";
              const toneClassName = isActive
                ? "bg-white/[0.04] text-white"
                : "text-white/72 hover:bg-white/[0.03] hover:text-white";

              const content = (
                <>
                  <span className="inline-flex min-w-0 items-center gap-2.5">
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
                    onClick={(event) => handleNavigation(event, item.href)}
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
            onClick={(event) => handleNavigation(event, "/projects")}
            className="af-focus-ring inline-flex w-full items-center justify-between gap-3 px-3 py-2 text-sm text-white/76 transition hover:bg-white/[0.03] hover:text-white"
          >
            <span className="inline-flex min-w-0 items-center gap-2.5">
              <ArrowLeftFromLine
                className="h-4 w-4 text-white/52"
                aria-hidden="true"
              />
              <span className="truncate">Sair do projeto</span>
            </span>
          </a>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

