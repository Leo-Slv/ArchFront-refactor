import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import ProjectShell from "../../../components/layout/ProjectShell";
import KanbanColumn from "../../../components/kanban/KanbanColumn";
import KanbanModal from "../../../components/kanban/KanbanModal";
import {
  currentUserProfile,
  mockProjects,
  type Project,
} from "../_mocks/projects.mock";
import {
  buildInitialKanbanCardState,
  buildKanbanBoardView,
  buildKanbanColumns,
  getColumnConfig,
  getColumnUsageHours,
  getCardById,
  type KanbanBoardCardState,
  type KanbanColumnId,
} from "./_mocks/kanban.mock";

interface KanbanPageProps {
  projectId?: string;
}

const fallbackProject: Project = mockProjects[1] ?? mockProjects[0];

export default function KanbanPage({ projectId }: KanbanPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    title: string;
    body: string;
  } | null>(null);

  const baseBoard = useMemo(() => buildKanbanBoardView(), []);
  const [cardState, setCardState] = useState<KanbanBoardCardState[]>(
    () => buildInitialKanbanCardState(baseBoard.allCards),
  );
  const boardCards = useMemo(
    () =>
      baseBoard.allCards.map((card) => {
        const state = cardState.find((entry) => entry.id === card.id);

        return {
          ...card,
          kanbanStatus: state?.kanbanStatus ?? card.kanbanStatus,
          position: state?.position ?? card.position,
        };
      }),
    [baseBoard.allCards, cardState],
  );
  const filteredCards = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return boardCards.filter(
      (card) => !query || card.searchText.includes(query),
    );
  }, [boardCards, searchTerm]);
  const filteredColumns = useMemo(
    () => buildKanbanColumns(filteredCards),
    [filteredCards],
  );

  let projectFromParam: Project | undefined;
  if (projectId) {
    projectFromParam = mockProjects.find((project) => project.id === projectId);
  }

  const currentProject: Project = projectFromParam ?? fallbackProject;
  const effectiveProjectId = projectId ?? baseBoard.sprint.projectId;
  const selectedCard = getCardById(
    {
      ...baseBoard,
      allCards: boardCards,
      columns: buildKanbanColumns(boardCards),
    },
    selectedCardId,
  );

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 4200);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function handleDropCard(cardId: string, targetColumnId: KanbanColumnId) {
    setCardState((currentState) => {
      const movingState = currentState.find((entry) => entry.id === cardId);
      if (!movingState) {
        return currentState;
      }

      if (movingState.kanbanStatus === targetColumnId) {
        return currentState;
      }

      const movingCard = boardCards.find((card) => card.id === cardId);
      if (!movingCard) {
        return currentState;
      }

      const targetColumnConfig = getColumnConfig(targetColumnId);
      const targetCards = boardCards.filter(
        (card) =>
          card.id !== cardId && card.kanbanStatus === targetColumnId,
      );
      const currentHours = getColumnUsageHours(targetCards);
      const nextHours = currentHours + movingCard.estimatedHours;

      if (
        targetColumnConfig.wipLimitHours !== null &&
        nextHours > targetColumnConfig.wipLimitHours
      ) {
        setToast({
          title: "WIP limit exceeded",
          body: `This column is limited to ${targetColumnConfig.wipLimitHours}h. Moving this item would increase WIP to ${nextHours}h. Reduce work in progress or move it to another column.`,
        });
        return currentState;
      }

      const reorderedState = currentState
        .filter((entry) => entry.id !== cardId)
        .map((entry) => ({ ...entry }));
      const nextPosition = reorderedState.filter(
        (entry) => entry.kanbanStatus === targetColumnId,
      ).length;

      reorderedState.push({
        id: cardId,
        kanbanStatus: targetColumnId,
        position: nextPosition,
      });

      return reorderedState.map((entry) => {
        const columnEntries = reorderedState
          .filter((candidate) => candidate.kanbanStatus === entry.kanbanStatus)
          .sort((left, right) => left.position - right.position);
        const normalizedPosition = columnEntries.findIndex(
          (candidate) => candidate.id === entry.id,
        );

        return {
          ...entry,
          position: normalizedPosition,
        };
      });
    });

    setDraggingCardId(null);
  }

  return (
    <ProjectShell
      projectId={effectiveProjectId}
      projectName={currentProject.name}
      projectOwner={currentProject.owner}
      projectBadgeLabel={String(currentProject.members.length)}
      activeNavItem="kanban"
      pageTitle="Kanban"
      pageSubtitle="Fluxo visual das user stories em andamento no sprint."
      pageContextLabel={`${baseBoard.sprint.name} - Kanban`}
      currentUser={currentUserProfile}
      showSearch
      searchPlaceholder="Buscar por epic, story, tarefa..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      fullWidthMain
      mainColumn={
        <>
          {toast ? (
            <div className="pointer-events-none fixed right-5 top-5 z-40 w-full max-w-sm">
              <div className="af-surface-lg af-accent-panel bg-[#14121a]/95 px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
                <p className="text-sm font-semibold text-white">{toast.title}</p>
                <p className="af-text-secondary mt-1 text-xs leading-relaxed">
                  {toast.body}
                </p>
              </div>
            </div>
          ) : null}

          <section className="min-h-0">
            <div className="overflow-x-auto overflow-y-hidden pb-2">
              <div className="flex min-h-[calc(100dvh-14rem)] items-stretch gap-3">
                {filteredColumns.map((column) => (
                  <KanbanColumn
                    key={column.id}
                    column={column}
                    onOpenCard={setSelectedCardId}
                    draggingCardId={draggingCardId}
                    onDragStartCard={setDraggingCardId}
                    onDragEndCard={() => setDraggingCardId(null)}
                    onDropCard={handleDropCard}
                  />
                ))}

                <section className="af-surface-lg flex h-full min-h-0 w-[16rem] shrink-0 flex-col bg-[#14121a]/45">
                  <div className="af-separator-b px-3 py-3">
                    <button
                      type="button"
                      className="af-focus-ring af-accent-hover af-text-secondary inline-flex w-full items-center gap-2 px-2 py-2 text-sm transition hover:bg-white/[0.03] hover:text-[var(--accent-primary)]"
                    >
                      <Plus className="af-accent-icon h-4 w-4" aria-hidden="true" />
                      <span>Adicionar outra coluna</span>
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </section>

          <KanbanModal card={selectedCard} onClose={() => setSelectedCardId(null)} />
        </>
      }
    />
  );
}
