import UserAvatar from "../ui/UserAvatar";
import type { KanbanCardView } from "../../pages/projects/kanban/_mocks/kanban.mock";
import { getInlineCardTags } from "../../pages/projects/kanban/_mocks/kanban.mock";
import KanbanBadges from "./KanbanBadges";

interface KanbanCardProps {
  card: KanbanCardView;
  onOpen: (cardId: string) => void;
  isDragging?: boolean;
  onDragStart: (cardId: string) => void;
  onDragEnd: () => void;
}

export default function KanbanCard({
  card,
  onOpen,
  isDragging = false,
  onDragStart,
  onDragEnd,
}: KanbanCardProps) {
  return (
    <button
      type="button"
      draggable
      onClick={() => onOpen(card.id)}
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", card.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStart(card.id);
      }}
      onDragEnd={onDragEnd}
      className={`af-surface-md af-surface-hover w-full bg-white/[0.03] px-3 py-3 text-left transition ${
        isDragging ? "opacity-60" : ""
      }`}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-white">{card.title}</h3>
          <p className="text-[11px] text-white/55">{card.persona}</p>
        </div>

        <p
          className="text-[11px] leading-relaxed text-white/62"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {card.description}
        </p>

        <KanbanBadges items={getInlineCardTags(card)} tone="subtle" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
              {card.dueDateLabel}
            </span>
            <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
              {card.type}
            </span>
            <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
              Task
            </span>
          </div>

          <UserAvatar
            user={card.assignee}
            className="af-surface-sm h-7 w-7 shrink-0 bg-black/20 text-[10px] font-semibold text-white/80"
            fallbackClassName="text-[10px] font-semibold"
          />
        </div>
      </div>
    </button>
  );
}
