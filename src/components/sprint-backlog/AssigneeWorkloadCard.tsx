import type { AssigneeWorkloadView } from "../../pages/projects/sprint-backlog/_mocks/sprintBacklog.mock";
import UserAvatar from "../ui/UserAvatar";

interface AssigneeWorkloadCardProps {
  assignee: AssigneeWorkloadView;
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export default function AssigneeWorkloadCard({
  assignee,
}: AssigneeWorkloadCardProps) {
  return (
    <article className="af-surface-md bg-white/[0.03] px-3 py-3">
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <UserAvatar
              user={assignee.assignee}
              className="af-surface-sm h-9 w-9 shrink-0 bg-white/5 text-xs font-semibold text-white/80"
              fallbackClassName="text-xs font-semibold"
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5 text-white">
                {assignee.assignee.name}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
            {assignee.statusChips.map((chip) => (
              <span
                key={chip}
                className="af-surface-sm inline-flex h-6 items-center bg-white/5 px-2 py-1 text-[10px] leading-none text-white/65"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 text-[10px] text-white/72">
          <span className="af-surface-sm inline-flex h-6 shrink-0 items-center bg-white/5 px-2 py-1 leading-none">
            {assignee.storyCount} stories
          </span>
          <span className="af-surface-sm inline-flex h-6 shrink-0 items-center bg-white/5 px-2 py-1 leading-none">
            {assignee.taskCount} tasks
          </span>
          <span className="af-surface-sm inline-flex h-6 shrink-0 items-center bg-white/5 px-2 py-1 leading-none">
            Est {assignee.estimatedHours}h
          </span>
          <span className="af-surface-sm inline-flex h-6 shrink-0 items-center bg-white/5 px-2 py-1 leading-none">
            Act {assignee.doneHours}h
          </span>
          <span className="af-surface-sm inline-flex h-6 shrink-0 items-center bg-white/5 px-2 py-1 leading-none">
            Rem {assignee.remainingHours}h
          </span>
        </div>
      </header>

      <div className="mt-3 space-y-3">
        <div className="space-y-1 text-[11px] text-white/62">
          <p>Carga: {assignee.loadLabel}</p>
          <p>Média por task: {assignee.averageTaskHours}h</p>
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-[11px] text-white/68">
              <span>Progresso</span>
              <span>{formatPercent(assignee.progressRatio)}</span>
            </div>
            <div className="af-surface-md bg-black/30">
              <div
                className="bg-[var(--af-pin,#6f32ff)]"
                style={{
                  width: `${assignee.progressRatio * 100}%`,
                  height: "6px",
                }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-[11px] text-white/68">
              <span>Peso no sprint</span>
              <span>{formatPercent(assignee.sprintWeightRatio)}</span>
            </div>
            <div className="af-surface-md bg-black/30">
              <div
                className="bg-white/55"
                style={{
                  width: `${assignee.sprintWeightRatio * 100}%`,
                  height: "6px",
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="af-separator-b pb-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Top tasks (maior estimativa)
            </p>
          </div>

          <div className="space-y-1.5">
            {assignee.topTasks.map((task) => (
              <div
                key={task.id}
                className="af-surface-sm flex items-center justify-between gap-3 bg-black/20 px-2.5 py-2 text-[11px] text-white/70"
              >
                <div className="min-w-0">
                  <p className="truncate text-white/80">{task.title}</p>
                  <p className="truncate text-white/50">{task.priorityLabel}</p>
                </div>

                <span className="shrink-0 text-white/65">
                  Rem {Math.max(task.estimatedHours - task.doneHours, 0)}h
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
