import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cx } from "../../pages/ArchFlowLanding/utils/cx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";

export interface AppSidebarItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: number | string;
  href?: string;
  onClick?: () => void;
}

export interface AppSidebarHeader {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export interface AppSidebarUserSummary {
  avatarText?: string;
  name: string;
  plan?: string;
  badgeLabel?: string;
}

interface AppSidebarProps {
  activeItem?: string;
  items: AppSidebarItem[];
  header?: AppSidebarHeader;
  userSummary?: AppSidebarUserSummary;
  navLabel?: string;
  className?: string;
  footer?: ReactNode;
  onSignOut?: () => void;
  signOutLabel?: string;
}

function SidebarItem({
  item,
  active,
}: {
  item: AppSidebarItem;
  active: boolean;
}) {
  const Icon = item.icon;
  const baseClassName =
    "af-surface-md af-surface-hover flex w-full items-center justify-between gap-3 px-3 py-2.5 transition";
  const toneClassName = active
    ? "bg-white/[0.04] text-white"
    : "bg-transparent text-white/72 hover:text-white hover:bg-white/[0.03]";

  const content = (
    <>
      <span className="inline-flex min-w-0 items-center gap-2 text-sm">
        {Icon ? (
          <Icon
            className={cx("h-4 w-4", active ? "text-white/65" : "text-white/52")}
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
        href={item.href}
        className={cx(baseClassName, toneClassName)}
        aria-current={active ? "page" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      className={cx(baseClassName, toneClassName)}
      aria-current={active ? "page" : undefined}
    >
      {content}
    </button>
  );
}

export default function AppSidebar({
  activeItem,
  items,
  header,
  userSummary,
  navLabel = "Navegacao",
  className,
  footer,
  onSignOut,
  signOutLabel = "Sair",
}: AppSidebarProps) {
  const avatarText =
    userSummary?.avatarText ?? userSummary?.name.charAt(0).toUpperCase();

  return (
    <Sidebar
      collapsible="none"
      className={cx(
        "af-surface-lg h-[100dvh] min-h-[100dvh] w-[17.5rem] overflow-hidden bg-[#14121a] backdrop-blur-md",
        className,
      )}
    >
      <SidebarHeader className="bg-[#14121a]">
        {header ? (
          <header className="af-separator-b shrink-0 p-4">
            <div className="af-surface-md flex items-center gap-3 bg-white/[0.03] px-3 py-3">
              {header.icon ? (
                <span className="af-surface-sm inline-flex h-8 w-8 items-center justify-center bg-white/5 text-white/80">
                  {header.icon}
                </span>
              ) : null}

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {header.title}
                </p>
                {header.subtitle ? (
                  <p className="truncate text-[11px] text-white/52">
                    {header.subtitle}
                  </p>
                ) : null}
              </div>
            </div>
          </header>
        ) : null}

        {userSummary ? (
          <div className="af-separator-b shrink-0 px-4 py-4">
            <div className="af-surface-md bg-white/[0.02] px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex items-center gap-3">
                  <span className="af-surface-sm inline-flex h-9 w-9 shrink-0 items-center justify-center bg-white/5 text-sm font-semibold text-white/80">
                    {avatarText}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">
                      {userSummary.name}
                    </p>
                    {userSummary.plan ? (
                      <p className="truncate text-[11px] text-white/52">
                        plano {userSummary.plan}
                      </p>
                    ) : null}
                  </div>
                </div>

                {userSummary.badgeLabel ? (
                  <span className="af-surface-sm inline-flex shrink-0 items-center bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white/70">
                    {userSummary.badgeLabel}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </SidebarHeader>

      <SidebarContent>
        <div className="af-separator-b px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
            {navLabel}
          </p>
        </div>

        <nav className="px-4 py-3">
          <div className="space-y-2">
            {items.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                active={item.id === activeItem}
              />
            ))}
          </div>
        </nav>
      </SidebarContent>

      <SidebarFooter className="af-separator-t bg-[#14121a] px-4 py-3">
        {footer ?? (
          <button
            type="button"
            onClick={onSignOut}
            className="af-surface-md af-surface-hover af-focus-ring inline-flex w-full items-center justify-center bg-white/[0.03] px-3 py-2.5 text-sm text-white/76 transition hover:text-white"
          >
            {signOutLabel}
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
