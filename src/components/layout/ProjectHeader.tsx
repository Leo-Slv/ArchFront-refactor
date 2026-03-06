import type { ReactNode } from "react";
import { Search } from "lucide-react";

import type { User } from "../../types/user";
import UserAvatar from "../ui/UserAvatar";

interface ProjectHeaderProps {
  title: string;
  subtitleChip?: string;
  description?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  user: User;
  rightSlot?: ReactNode;
}

export default function ProjectHeader({
  title,
  subtitleChip,
  description,
  showSearch = false,
  searchPlaceholder = "Buscar...",
  searchValue = "",
  onSearchChange,
  user,
  rightSlot,
}: ProjectHeaderProps) {
  return (
    <header className="af-separator-b flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-lg font-semibold text-white sm:text-xl">{title}</h1>

          {subtitleChip ? (
            <span className="af-surface-sm inline-flex items-center bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/72">
              {subtitleChip}
            </span>
          ) : null}
        </div>

        {description ? <p className="text-sm text-white/62">{description}</p> : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {showSearch ? (
          <label className="af-surface-md flex h-9 min-w-[15rem] items-center gap-2 bg-white/5 px-3 text-sm text-white/68 sm:min-w-[19rem]">
            <Search className="h-4 w-4 shrink-0 text-white/45" aria-hidden="true" />
            <input
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/38"
            />
          </label>
        ) : null}

        {rightSlot}

        <button
          type="button"
          aria-label={user.name}
          className="af-surface-md af-surface-hover af-focus-ring inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/5 text-xs font-semibold text-white/80 transition hover:text-white"
          style={{ borderRadius: "9999px" }}
        >
          <UserAvatar
            user={user}
            className="h-full w-full bg-transparent text-xs font-semibold text-white/80"
            fallbackClassName="text-xs font-semibold"
          />
        </button>
      </div>
    </header>
  );
}
