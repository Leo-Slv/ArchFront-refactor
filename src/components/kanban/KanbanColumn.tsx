import { useState } from "react";
import { Plus } from "lucide-react";

import type { KanbanColumnView } from "../../pages/projects/kanban/_mocks/kanban.mock";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  column: KanbanColumnView;
  onOpenCard: (cardId: string) => void;
  draggingCardId: string | null;
  onDragStartCard: (cardId: string) => void;
  onDragEndCard: () => void;
  onDropCard: (cardId: string, columnId: KanbanColumnView["id"]) => void;
}

export default function KanbanColumn({
  column,
  onOpenCard,
  draggingCardId,
  onDragStartCard,
  onDragEndCard,
  onDropCard,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);

  return (
    <section
      className={`af-surface-lg flex h-full min-h-0 w-[19rem] shrink-0 flex-col bg-[#14121a]/70 transition ${
        isOver ? "border-white/14 bg-white/[0.04]" : ""
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData("text/plain");
        setIsOver(false);
        if (cardId) {
          onDropCard(cardId, column.id);
        }
      }}
    >
      <header className="af-separator-b px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0" title={column.helpText}>
            <h2 className="text-sm font-semibold text-white">{column.title}</h2>
            <p className="mt-1 text-[11px] text-white/52">{column.wipLabel}</p>
          </div>

          <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
            {column.cards.length}
          </span>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3">
        <div className="space-y-2.5">
          {column.cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onOpen={onOpenCard}
              isDragging={draggingCardId === card.id}
              onDragStart={onDragStartCard}
              onDragEnd={onDragEndCard}
            />
          ))}

          {!column.cards.length ? (
            <div className="af-surface-md bg-black/10 px-3 py-6 text-center text-[11px] text-white/45">
              Arraste um card para cá
            </div>
          ) : null}
        </div>
      </div>

      <footer className="af-separator-t px-3 py-3">
        <button
          type="button"
          className="af-focus-ring inline-flex w-full items-center gap-2 px-2 py-2 text-[11px] text-white/62 transition hover:bg-white/[0.03] hover:text-white"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Adicionar um card</span>
        </button>
      </footer>
    </section>
  );
}
