import type { Sprint } from "../../pages/projects/sprint/_mocks/sprint.mock";

interface SprintSummaryCardProps {
  sprint: Sprint;
  scopeHours: number;
  burnedHours: number;
  remainingHours: number;
  periodLabel: string;
}

function formatHours(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  if (Number.isInteger(rounded)) {
    return `${rounded}h`;
  }
  return `${rounded.toFixed(1)}h`;
}

function formatStatusLabel(status: Sprint["status"]): string {
  if (status === "active") return "active";
  if (status === "completed") return "completed";
  return "planned";
}

export default function SprintSummaryCard({
  sprint,
  scopeHours,
  burnedHours,
  remainingHours,
  periodLabel,
}: SprintSummaryCardProps) {
  const capacity = sprint.capacityHours;

  const registeredRatio =
    capacity > 0 ? Math.min(burnedHours / capacity, 1) : 0;
  const estimatedRatio =
    capacity > 0 ? Math.min(scopeHours / capacity, 1) : 0;

  const registeredPercent = Math.round(registeredRatio * 100);
  const estimatedPercent = Math.round(estimatedRatio * 100);

  return (
    <section className="af-surface-lg bg-[#14121a]/70 px-4 py-4 sm:px-5 sm:py-4">
      <header className="af-separator-b pb-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-sm font-semibold text-white">
                {sprint.name}
              </h2>
              <span className="af-surface-sm inline-flex items-center bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
                {formatStatusLabel(sprint.status)}
              </span>
            </div>
            <p className="text-xs text-white/70">{sprint.goal}</p>
          </div>

          <div className="af-surface-sm inline-flex items-center bg-white/5 px-2.5 py-0.5 text-[10px] text-white/72">
            {periodLabel}
          </div>
        </div>
      </header>

      <div className="mt-3 space-y-4">
        <div className="grid gap-3 text-xs text-white/72 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/52">
              Período
            </p>
            <p>{periodLabel}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/52">
              Capacidade
            </p>
            <p>{formatHours(capacity)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/52">
            Progresso
          </p>

          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-white/72">
                <span>Horas registradas</span>
                <span>
                  {formatHours(burnedHours)} • {registeredPercent}%
                </span>
              </div>
              <div className="af-surface-md bg-black/30">
                <div
                  className="bg-[var(--af-pin,#6f32ff)]"
                  style={{
                    width: `${registeredRatio * 100}%`,
                    height: "6px",
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-white/72">
                <span>Horas estimadas</span>
                <span>
                  {formatHours(scopeHours)} • {estimatedPercent}%
                </span>
              </div>
              <div className="af-surface-md bg-black/30">
                <div
                  className="bg-white/60"
                  style={{
                    width: `${estimatedRatio * 100}%`,
                    height: "6px",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2 text-[11px] text-white/72 sm:grid-cols-3">
            <div className="af-surface-sm bg-white/5 px-2 py-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                Scope
              </p>
              <p className="mt-0.5 text-sm text-white">
                {formatHours(scopeHours)}
              </p>
            </div>
            <div className="af-surface-sm bg-white/5 px-2 py-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                Burned
              </p>
              <p className="mt-0.5 text-sm text-white">
                {formatHours(burnedHours)}
              </p>
            </div>
            <div className="af-surface-sm bg-white/5 px-2 py-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                Remaining
              </p>
              <p className="mt-0.5 text-sm text-white">
                {formatHours(remainingHours)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

