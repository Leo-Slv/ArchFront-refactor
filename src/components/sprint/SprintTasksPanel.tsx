import type { SprintTaskView } from "../../pages/projects/sprint/_mocks/sprint.mock";

interface SprintTasksPanelProps {
  tasks: SprintTaskView[];
}

export default function SprintTasksPanel({ tasks }: SprintTasksPanelProps) {
  const orderedTasks = [...tasks].sort((a, b) => a.id - b.id);

  return (
    <section className="af-surface-lg bg-[#14121a]/70 px-4 py-4 sm:px-5 sm:py-4">
      <header className="af-separator-b pb-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Tarefas do Sprint
            </h2>
            <p className="mt-1 text-xs text-white/60">
              Estimativa vs realizado, por responsável.
            </p>
          </div>

          <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
            {tasks.length} tasks
          </span>
        </div>
      </header>

      <div className="mt-3 space-y-2.5">
        {orderedTasks.map((task) => (
          <article
            key={task.id}
            className="af-surface-md af-surface-hover bg-white/[0.03] px-3 py-3 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm text-white">
                    {task.title}
                  </h3>
                  <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
                    {task.priorityLabel}
                  </span>
                </div>
                <p className="text-[11px] text-white/60">{task.assigneeName}</p>
              </div>

              <div className="flex flex-col items-end gap-1 text-right text-xs text-white/72">
                <span className="af-surface-sm inline-flex items-center bg-black/30 px-2 py-0.5 text-[10px]">
                  {task.doneHours}h / {task.estimatedHours}h
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

