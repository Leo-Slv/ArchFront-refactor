import type { KeyboardEvent, MouseEvent } from "react";

import type { Project } from "../../pages/projects/_mocks/projects.mock";
import {
  navigateToPath,
  shouldHandleNavigationClick,
} from "../layout/sidebarNavigation";

interface ProjectCardProps {
  project: Project;
}

const statusLabel: Record<Project["status"], string> = {
  active: "active",
  paused: "paused",
  archived: "archived",
};

const statusTone: Record<Project["status"], string> = {
  active: "text-white/85",
  paused: "text-white/70",
  archived: "text-white/50",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const backlogPath = `/projects/${project.id}/backlog`;

  function shouldIgnoreCardNavigation(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(
      target.closest(
        'a, button, input, select, textarea, summary, [role="button"], [data-no-card-navigation]',
      ),
    );
  }

  function handleCardClick(event: MouseEvent<HTMLElement>): void {
    if (
      !shouldHandleNavigationClick(event) ||
      shouldIgnoreCardNavigation(event.target)
    ) {
      return;
    }

    navigateToPath(backlogPath);
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLElement>): void {
    if (event.defaultPrevented || shouldIgnoreCardNavigation(event.target)) {
      return;
    }

    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    navigateToPath(backlogPath);
  }

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`Abrir backlog do projeto ${project.name}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className="af-surface-lg af-surface-hover af-focus-ring flex min-h-[10.75rem] flex-col bg-[#14121a]/70 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex items-start gap-2.5">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-white">
              {project.name}
            </h3>
            <p className="truncate text-[11px] text-white/56">
              owner: {project.owner.name}
            </p>
          </div>
        </div>
        <span
          className={`af-surface-md inline-flex items-center bg-white/[0.04] px-2 py-1 text-[10px] uppercase tracking-[0.08em] ${statusTone[project.status]}`}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      <p
        className="mt-3 text-xs leading-relaxed text-white/62"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </p>

      <footer className="mt-auto pt-3">
        <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-white/62">
          membros: {project.members.length}
        </span>
      </footer>
    </article>
  );
}
