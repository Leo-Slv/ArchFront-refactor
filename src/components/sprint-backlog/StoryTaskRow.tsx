import type { StoryTaskRowView } from "../../pages/projects/sprint-backlog/_mocks/sprintBacklog.mock";

interface StoryTaskRowProps {
  task: StoryTaskRowView;
}

export default function StoryTaskRow({ task }: StoryTaskRowProps) {
  return (
    <article className="af-surface-md bg-white/[0.03] px-3 py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate text-sm text-white">{task.title}</h4>
            <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
              {task.priorityLabel}
            </span>
          </div>

          <p className="text-[11px] text-white/60">{task.description}</p>
        </div>

        <div className="shrink-0 space-y-1 text-left sm:text-right">
          <span className="af-surface-sm inline-flex items-center bg-black/30 px-2 py-0.5 text-[10px] text-white/72">
            {task.doneHours}h / {task.estimatedHours}h
          </span>
          <p className="text-[11px] text-white/55">{task.assigneeName}</p>
        </div>
      </div>
    </article>
  );
}
