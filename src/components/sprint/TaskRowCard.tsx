import { cx } from "../../pages/ArchFlowLanding/utils/cx";

interface TaskRowCardProps {
  title: string;
  priorityLabel: string;
  doneHours: number;
  estimatedHours: number;
  subtitle?: string;
  metaLabel?: string;
  hoverable?: boolean;
}

export default function TaskRowCard({
  title,
  priorityLabel,
  doneHours,
  estimatedHours,
  subtitle,
  metaLabel,
  hoverable = false,
}: TaskRowCardProps) {
  return (
    <article
      className={cx(
        "af-surface-md bg-white/[0.03] px-3 py-3",
        hoverable && "af-surface-hover transition",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="min-w-0 flex items-start gap-2">
            <p className="min-w-0 flex-1 break-words text-sm leading-snug text-white">
              {title}
            </p>
            <span className="af-surface-sm inline-flex h-6 shrink-0 items-center whitespace-nowrap bg-white/5 px-2 py-0 text-[10px] font-semibold uppercase tracking-[0.16em] leading-none text-white/72">
              {priorityLabel}
            </span>
          </div>

          {subtitle ? (
            <p className="text-[11px] text-white/60">{subtitle}</p>
          ) : null}
        </div>

        <div className="shrink-0 space-y-1 text-right">
          <span className="af-surface-sm inline-flex h-6 shrink-0 items-center justify-center whitespace-nowrap bg-black/30 px-2 py-0 text-[10px] leading-none text-white/72">
            {doneHours}h / {estimatedHours}h
          </span>

          {metaLabel ? (
            <p className="text-[11px] text-white/55">{metaLabel}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
