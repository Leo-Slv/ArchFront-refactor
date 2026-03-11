import StoryTaskRow from "./StoryTaskRow";
import type { SprintBacklogStoryView } from "../../pages/projects/sprint-backlog/_mocks/sprintBacklog.mock";
import UserAvatar from "../ui/UserAvatar";

interface StorySprintCardProps {
  story: SprintBacklogStoryView;
}

export default function StorySprintCard({ story }: StorySprintCardProps) {
  return (
    <article className="af-surface-md bg-white/[0.03] px-4 py-4 sm:px-4 sm:py-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-white">
              {story.title}
            </h3>
            <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/72">
              {story.epicName}
            </span>
          </div>

          <p className="text-xs text-white/62">{story.description}</p>
          <p className="text-[11px] text-white/55">Effort: {story.effort}</p>
        </div>

        <div className="af-surface-sm inline-flex items-center gap-2 self-start bg-white/5 px-2.5 py-1 text-[10px] text-white/72">
          <UserAvatar
            user={story.assignee}
            className="af-surface-sm h-5 w-5 bg-black/20 text-[9px] font-semibold text-white/80"
            fallbackClassName="text-[9px] font-semibold"
          />
          <span>{story.assignee.name}</span>
        </div>
      </header>

      <div className="mt-3 space-y-2">
        <div className="af-separator-b pb-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Acceptance Criteria
          </p>
          <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-white/62">
            {story.acceptanceCriteria}
          </p>
        </div>

        <div className="af-separator-b pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Tarefas
          </p>
        </div>

        <div className="space-y-2">
          {story.tasks.map((task) => (
            <StoryTaskRow key={task.id} task={task} />
          ))}
        </div>
      </div>
    </article>
  );
}
