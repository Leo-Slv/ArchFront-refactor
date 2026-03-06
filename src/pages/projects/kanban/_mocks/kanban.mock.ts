import { getUserById } from "../../../../mocks/users.mock";
import type { User } from "../../../../types/user";
import { mockProjects } from "../../_mocks/projects.mock";

export type UserStoryPriority = "P1" | "P2" | "P3";
export type UserStoryStatus = "todo" | "in-progress" | "done";
export type BusinessValue = "low" | "medium" | "high";
export type StoryComplexity = "low" | "medium" | "high";
export type KanbanColumnId = "todo" | "doing" | "review" | "done";

export interface KanbanSprint {
  id: string;
  projectId: string;
  name: string;
  capacityHours: number;
  status: "planned" | "active" | "completed";
}

export interface KanbanEpic {
  id: string;
  name: string;
}

export interface KanbanUserStory {
  id: string;
  epicId: string;
  title: string;
  persona: string;
  description: string;
  acceptanceCriteria: string[];
  effort: number;
  complexity: StoryComplexity;
  businessValue: BusinessValue;
  priority: UserStoryPriority;
  status: UserStoryStatus;
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanTask {
  id: string;
  userStoryId: string;
  title: string;
  priority: UserStoryPriority;
  estimateMinutes: number;
  loggedMinutes: number;
  assigneeId: string;
  status: UserStoryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanComment {
  id: string;
  userStoryId: string;
  authorId: string;
  body: string;
  type: "comment" | "note";
  createdAt: string;
}

interface KanbanUiMeta {
  kanbanStatus: KanbanColumnId;
  labels: string[];
  dueDateISO: string;
  type: "US";
  estimatedMinutes: number;
  loggedMinutes: number;
}

export interface KanbanTaskView {
  id: string;
  title: string;
  priority: UserStoryPriority;
  estimatedHours: number;
  doneHours: number;
  assignee: User;
}

export interface KanbanCommentView {
  id: string;
  author: User;
  body: string;
  type: "comment" | "note";
  createdAt: string;
  createdAtLabel: string;
}

export interface KanbanCardView {
  id: string;
  title: string;
  persona: string;
  description: string;
  acceptanceCriteria: string[];
  effort: number;
  epicName: string;
  labels: string[];
  priority: UserStoryPriority;
  businessValue: BusinessValue;
  complexity: StoryComplexity;
  dueDateISO: string;
  dueDateLabel: string;
  status: UserStoryStatus;
  kanbanStatus: KanbanColumnId;
  type: "US";
  assignee: User;
  estimatedHours: number;
  doneHours: number;
  createdAt: string;
  updatedAt: string;
  createdAtLabel: string;
  updatedAtLabel: string;
  linkedChips: string[];
  tasks: KanbanTaskView[];
  comments: KanbanCommentView[];
  searchText: string;
  position: number;
}

export interface KanbanColumnView {
  id: KanbanColumnId;
  title: string;
  wipLabel: string;
  wipLimitHours: number | null;
  currentHours: number;
  helpText: string;
  cards: KanbanCardView[];
}

export interface KanbanBoardCardState {
  id: string;
  kanbanStatus: KanbanColumnId;
  position: number;
}

export interface KanbanBoardViewModel {
  sprint: KanbanSprint;
  columns: KanbanColumnView[];
  allCards: KanbanCardView[];
}

const baseProject = mockProjects[0];

export const mockKanbanSprint: KanbanSprint = {
  id: "sprint-14-kanban",
  projectId: baseProject.id,
  name: "Sprint 14",
  capacityHours: 32,
  status: "active",
};

export const mockKanbanEpics: KanbanEpic[] = [
  { id: "epic-kanban-board", name: "Kanban Board" },
  { id: "epic-backlog-refinement", name: "Backlog Refinement" },
  { id: "epic-sprint-planning", name: "Sprint Planning" },
  { id: "epic-observability", name: "Observability" },
];

export const mockKanbanStories: KanbanUserStory[] = [
  {
    id: "story-kanban-dnd-columns",
    epicId: "epic-kanban-board",
    title: "Mover cards entre colunas (DnD)",
    persona: "Como usuário",
    description: "Quero arrastar cards entre colunas para atualizar o fluxo de trabalho.",
    acceptanceCriteria: [
      "Arrastar e soltar atualiza a coluna e a posição do card.",
      "O card mantém feedback visual durante o movimento.",
    ],
    effort: 5,
    complexity: "medium",
    businessValue: "high",
    priority: "P1",
    status: "in-progress",
    assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    createdAt: "2026-03-05T09:07:24.000Z",
    updatedAt: "2026-03-06T09:07:24.000Z",
  },
  {
    id: "story-kanban-add-column",
    epicId: "epic-kanban-board",
    title: "Adicionar colunas customizadas no quadro",
    persona: "Como PO",
    description: "Quero criar novas colunas no board para adaptar o fluxo do time.",
    acceptanceCriteria: [
      "Colunas novas aparecem no final do board.",
      "Cada coluna permite configurar nome e limite de WIP.",
    ],
    effort: 8,
    complexity: "high",
    businessValue: "medium",
    priority: "P2",
    status: "todo",
    assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
    createdAt: "2026-03-04T10:11:00.000Z",
    updatedAt: "2026-03-06T08:55:00.000Z",
  },
  {
    id: "story-backlog-list-epics",
    epicId: "epic-backlog-refinement",
    title: "Listar epics e user stories",
    persona: "Como PO",
    description: "Quero visualizar epics e suas histórias para priorizar o backlog.",
    acceptanceCriteria: [
      "Epics e histórias aparecem agrupadas.",
      "A visão principal destaca prioridade e valor.",
    ],
    effort: 3,
    complexity: "low",
    businessValue: "high",
    priority: "P2",
    status: "done",
    assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
    createdAt: "2026-03-03T14:22:00.000Z",
    updatedAt: "2026-03-06T09:05:00.000Z",
  },
  {
    id: "story-backlog-preview",
    epicId: "epic-backlog-refinement",
    title: "Mostrar resumo das histórias por epic",
    persona: "Como PM",
    description: "Quero ver um resumo curto por epic para acelerar o refinement.",
    acceptanceCriteria: [
      "A lista mostra até três histórias por epic.",
      "A visualização indica valor e complexidade.",
    ],
    effort: 2,
    complexity: "low",
    businessValue: "medium",
    priority: "P2",
    status: "in-progress",
    assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
    createdAt: "2026-03-03T16:00:00.000Z",
    updatedAt: "2026-03-06T08:40:00.000Z",
  },
  {
    id: "story-sprint-capacity",
    epicId: "epic-sprint-planning",
    title: "Planejar sprint com capacidade",
    persona: "Como Scrum Master",
    description: "Quero definir capacidade e meta da sprint para organizar o trabalho.",
    acceptanceCriteria: [
      "Capacidade considera estimativas totais do sprint.",
      "A tela destaca quando o limite é excedido.",
    ],
    effort: 5,
    complexity: "medium",
    businessValue: "high",
    priority: "P1",
    status: "todo",
    assigneeId: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    createdAt: "2026-03-04T09:30:00.000Z",
    updatedAt: "2026-03-06T09:03:00.000Z",
  },
  {
    id: "story-sprint-warning",
    epicId: "epic-sprint-planning",
    title: "Alertar quando capacidade for excedida",
    persona: "Como Scrum Master",
    description: "Quero receber um alerta quando o time ultrapassar a capacidade planejada.",
    acceptanceCriteria: [
      "O alerta aparece antes de confirmar a sprint.",
      "A interface sugere itens com maior impacto na capacidade.",
    ],
    effort: 3,
    complexity: "medium",
    businessValue: "high",
    priority: "P1",
    status: "in-progress",
    assigneeId: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    createdAt: "2026-03-04T10:40:00.000Z",
    updatedAt: "2026-03-06T08:58:00.000Z",
  },
  {
    id: "story-observability-events",
    epicId: "epic-observability",
    title: "Instrumentar eventos do board",
    persona: "Como engenharia",
    description: "Quero registrar eventos do board para acompanhar uso e gargalos.",
    acceptanceCriteria: [
      "Eventos de mover card e abrir modal são registrados.",
      "Os dados podem ser filtrados por sprint.",
    ],
    effort: 5,
    complexity: "medium",
    businessValue: "medium",
    priority: "P2",
    status: "in-progress",
    assigneeId: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    createdAt: "2026-03-03T11:10:00.000Z",
    updatedAt: "2026-03-06T09:12:00.000Z",
  },
  {
    id: "story-observability-dashboard",
    epicId: "epic-observability",
    title: "Criar painel com métricas do fluxo",
    persona: "Como liderança",
    description: "Quero acompanhar throughput e tempo em etapa por coluna.",
    acceptanceCriteria: [
      "O painel consolida métricas por sprint.",
      "O time consegue identificar cards bloqueados com rapidez.",
    ],
    effort: 8,
    complexity: "high",
    businessValue: "medium",
    priority: "P3",
    status: "todo",
    assigneeId: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    createdAt: "2026-03-04T13:50:00.000Z",
    updatedAt: "2026-03-06T09:06:00.000Z",
  },
  {
    id: "story-card-comments",
    epicId: "epic-kanban-board",
    title: "Exibir comentários no detalhe do card",
    persona: "Como squad",
    description: "Quero acompanhar comentários do time para alinhar decisões do card.",
    acceptanceCriteria: [
      "Comentários ficam disponíveis no modal do card.",
      "Cada comentário mostra autor e horário.",
    ],
    effort: 3,
    complexity: "low",
    businessValue: "medium",
    priority: "P2",
    status: "done",
    assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    createdAt: "2026-03-02T15:20:00.000Z",
    updatedAt: "2026-03-06T08:12:00.000Z",
  },
  {
    id: "story-card-search",
    epicId: "epic-kanban-board",
    title: "Buscar cards por título e etiquetas",
    persona: "Como usuário",
    description: "Quero localizar cards rapidamente usando título, epic e labels.",
    acceptanceCriteria: [
      "A busca filtra cards visíveis sem recarregar a página.",
      "Busca considera título, epic e tags derivadas.",
    ],
    effort: 2,
    complexity: "low",
    businessValue: "high",
    priority: "P2",
    status: "in-progress",
    assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
    createdAt: "2026-03-05T12:20:00.000Z",
    updatedAt: "2026-03-06T09:18:00.000Z",
  },
  {
    id: "story-board-wip-labels",
    epicId: "epic-kanban-board",
    title: "Mostrar WIP por coluna",
    persona: "Como Scrum Master",
    description: "Quero ver o trabalho em progresso por coluna para balancear o fluxo.",
    acceptanceCriteria: [
      "Cada coluna mostra o WIP atual.",
      "O limite fica visível no cabeçalho da coluna.",
    ],
    effort: 2,
    complexity: "low",
    businessValue: "medium",
    priority: "P3",
    status: "todo",
    assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    createdAt: "2026-03-05T08:10:00.000Z",
    updatedAt: "2026-03-06T08:45:00.000Z",
  },
  {
    id: "story-link-us-task",
    epicId: "epic-sprint-planning",
    title: "Relacionar user stories com tasks",
    persona: "Como time",
    description: "Quero ver vínculos entre histórias e tasks para não perder contexto.",
    acceptanceCriteria: [
      "O modal mostra chips com os vínculos do card.",
      "Cada task vinculada mantém estimativa e responsável.",
    ],
    effort: 5,
    complexity: "medium",
    businessValue: "medium",
    priority: "P2",
    status: "in-progress",
    assigneeId: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    createdAt: "2026-03-05T11:30:00.000Z",
    updatedAt: "2026-03-06T09:20:00.000Z",
  },
];

const kanbanUiMetaByStoryId: Record<string, KanbanUiMeta> = {
  "story-kanban-dnd-columns": {
    kanbanStatus: "review",
    labels: ["Front-end", "drag"],
    dueDateISO: "2026-02-14",
    type: "US",
    estimatedMinutes: 360,
    loggedMinutes: 120,
  },
  "story-kanban-add-column": {
    kanbanStatus: "todo",
    labels: ["Front-end", "WIP limits"],
    dueDateISO: "2026-02-18",
    type: "US",
    estimatedMinutes: 300,
    loggedMinutes: 0,
  },
  "story-backlog-list-epics": {
    kanbanStatus: "doing",
    labels: ["Front-end", "core"],
    dueDateISO: "2026-02-15",
    type: "US",
    estimatedMinutes: 180,
    loggedMinutes: 90,
  },
  "story-backlog-preview": {
    kanbanStatus: "doing",
    labels: ["Refinement", "UI"],
    dueDateISO: "2026-02-15",
    type: "US",
    estimatedMinutes: 120,
    loggedMinutes: 60,
  },
  "story-sprint-capacity": {
    kanbanStatus: "todo",
    labels: ["planning", "ready"],
    dueDateISO: "2026-02-18",
    type: "US",
    estimatedMinutes: 300,
    loggedMinutes: 0,
  },
  "story-sprint-warning": {
    kanbanStatus: "doing",
    labels: ["planning", "warning"],
    dueDateISO: "2026-02-18",
    type: "US",
    estimatedMinutes: 240,
    loggedMinutes: 120,
  },
  "story-observability-events": {
    kanbanStatus: "review",
    labels: ["analytics", "events"],
    dueDateISO: "2026-02-19",
    type: "US",
    estimatedMinutes: 240,
    loggedMinutes: 180,
  },
  "story-observability-dashboard": {
    kanbanStatus: "todo",
    labels: ["metrics", "dashboard"],
    dueDateISO: "2026-02-20",
    type: "US",
    estimatedMinutes: 420,
    loggedMinutes: 0,
  },
  "story-card-comments": {
    kanbanStatus: "done",
    labels: ["collab", "comments"],
    dueDateISO: "2026-02-12",
    type: "US",
    estimatedMinutes: 180,
    loggedMinutes: 180,
  },
  "story-card-search": {
    kanbanStatus: "doing",
    labels: ["search", "UX"],
    dueDateISO: "2026-02-16",
    type: "US",
    estimatedMinutes: 180,
    loggedMinutes: 60,
  },
  "story-board-wip-labels": {
    kanbanStatus: "todo",
    labels: ["WIP", "kanban"],
    dueDateISO: "2026-02-17",
    type: "US",
    estimatedMinutes: 120,
    loggedMinutes: 0,
  },
  "story-link-us-task": {
    kanbanStatus: "done",
    labels: ["links", "tasks"],
    dueDateISO: "2026-02-13",
    type: "US",
    estimatedMinutes: 240,
    loggedMinutes: 240,
  },
};

export const mockKanbanTasks: KanbanTask[] = [
  {
    id: "task-kanban-dnd-native",
    userStoryId: "story-kanban-dnd-columns",
    title: "Implementar drag & drop nativo",
    priority: "P1",
    estimateMinutes: 360,
    loggedMinutes: 120,
    assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    status: "in-progress",
    createdAt: "2026-03-05T09:07:24.000Z",
    updatedAt: "2026-03-06T09:07:24.000Z",
  },
  {
    id: "task-kanban-state",
    userStoryId: "story-kanban-dnd-columns",
    title: "Persistir coluna/posição no estado",
    priority: "P1",
    estimateMinutes: 180,
    loggedMinutes: 0,
    assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    status: "todo",
    createdAt: "2026-03-05T10:00:00.000Z",
    updatedAt: "2026-03-06T08:40:00.000Z",
  },
  {
    id: "task-comments-feed",
    userStoryId: "story-card-comments",
    title: "Listar comentários no detalhe do card",
    priority: "P2",
    estimateMinutes: 180,
    loggedMinutes: 180,
    assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
    status: "done",
    createdAt: "2026-03-02T15:20:00.000Z",
    updatedAt: "2026-03-06T08:12:00.000Z",
  },
  {
    id: "task-search-filter",
    userStoryId: "story-card-search",
    title: "Filtrar cards por título, epic e labels",
    priority: "P2",
    estimateMinutes: 180,
    loggedMinutes: 60,
    assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
    status: "in-progress",
    createdAt: "2026-03-05T12:20:00.000Z",
    updatedAt: "2026-03-06T09:18:00.000Z",
  },
  {
    id: "task-link-relations",
    userStoryId: "story-link-us-task",
    title: "Mostrar vínculos US - Task no modal",
    priority: "P2",
    estimateMinutes: 240,
    loggedMinutes: 240,
    assigneeId: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    status: "done",
    createdAt: "2026-03-05T11:30:00.000Z",
    updatedAt: "2026-03-06T09:20:00.000Z",
  },
];

export const mockKanbanComments: KanbanComment[] = [
  {
    id: "comment-dnd-leo",
    userStoryId: "story-kanban-dnd-columns",
    authorId: "96cd4b95-acdf-4a62-9063-53292716b656",
    body: "Foco em UX tipo Trello: arraste suave e feedback visual.",
    type: "comment",
    createdAt: "2026-03-06T09:07:24.000Z",
  },
  {
    id: "comment-dnd-ana",
    userStoryId: "story-kanban-dnd-columns",
    authorId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    body: "Vou manter sem libs: só HTML5 DnD e state local.",
    type: "comment",
    createdAt: "2026-03-06T09:15:24.000Z",
  },
  {
    id: "comment-search-leo",
    userStoryId: "story-card-search",
    authorId: "96cd4b95-acdf-4a62-9063-53292716b656",
    body: "A busca precisa considerar tags derivadas e nome do epic.",
    type: "note",
    createdAt: "2026-03-06T08:42:00.000Z",
  },
  {
    id: "comment-observability-marina",
    userStoryId: "story-observability-events",
    authorId: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    body: "Vamos começar com eventos de abertura de modal e mudança de coluna.",
    type: "comment",
    createdAt: "2026-03-06T09:11:00.000Z",
  },
];

const columnMeta: Array<
  Pick<KanbanColumnView, "id" | "title" | "wipLimitHours" | "helpText">
> = [
  {
    id: "todo",
    title: "To do",
    wipLimitHours: 40,
    helpText:
      "WIP (Work in Progress): limite em horas para manter o backlog pronto sem excesso de trabalho em espera.",
  },
  {
    id: "doing",
    title: "Doing",
    wipLimitHours: 24,
    helpText:
      "WIP (Work in Progress): limite em horas para manter o time focado. Reduza o trabalho em andamento antes de puxar novos itens.",
  },
  {
    id: "review",
    title: "Review",
    wipLimitHours: 16,
    helpText:
      "WIP (Work in Progress): limite em horas para revisão. Finalize ou mova itens para evitar acúmulo nesta etapa.",
  },
  {
    id: "done",
    title: "Done",
    wipLimitHours: null,
    helpText: "Itens concluídos nesta sprint.",
  },
];

function formatDate(dateISO: string): string {
  return new Date(dateISO).toLocaleDateString("pt-BR");
}

function formatDateTime(dateISO: string): string {
  return new Date(dateISO).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function minutesToHours(value: number): number {
  return Math.round((value / 60) * 10) / 10;
}

function formatBusinessValue(value: BusinessValue): string {
  if (value === "high") return "BV high";
  if (value === "medium") return "BV medium";
  return "BV low";
}

function formatPriorityTone(priority: UserStoryPriority): string {
  if (priority === "P1") return "high";
  if (priority === "P2") return "medium";
  return "low";
}

export function buildKanbanBoardView(searchTerm = ""): KanbanBoardViewModel {
  const epicById = new Map(mockKanbanEpics.map((epic) => [epic.id, epic]));
  const tasksByStoryId = new Map<string, KanbanTaskView[]>();
  const commentsByStoryId = new Map<string, KanbanCommentView[]>();

  for (const task of mockKanbanTasks) {
    const taskView: KanbanTaskView = {
      id: task.id,
      title: task.title,
      priority: task.priority,
      estimatedHours: minutesToHours(task.estimateMinutes),
      doneHours: minutesToHours(task.loggedMinutes),
      assignee: getUserById(task.assigneeId),
    };
    const list = tasksByStoryId.get(task.userStoryId) ?? [];
    list.push(taskView);
    tasksByStoryId.set(task.userStoryId, list);
  }

  for (const comment of mockKanbanComments) {
    const commentView: KanbanCommentView = {
      id: comment.id,
      author: getUserById(comment.authorId),
      body: comment.body,
      type: comment.type,
      createdAt: comment.createdAt,
      createdAtLabel: formatDateTime(comment.createdAt),
    };
    const list = commentsByStoryId.get(comment.userStoryId) ?? [];
    list.push(commentView);
    commentsByStoryId.set(comment.userStoryId, list);
  }

  const query = searchTerm.trim().toLowerCase();

  const allCards = mockKanbanStories
    .map((story) => {
      const epic = epicById.get(story.epicId);
      const uiMeta = kanbanUiMetaByStoryId[story.id];
      const assignee = getUserById(story.assigneeId);
      const searchText = [
        story.title,
        story.persona,
        story.description,
        epic?.name,
        ...(uiMeta?.labels ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return {
        id: story.id,
        title: story.title,
        persona: story.persona,
        description: story.description,
        acceptanceCriteria: story.acceptanceCriteria,
        effort: story.effort,
        epicName: epic?.name ?? "Kanban",
        labels: uiMeta?.labels ?? [],
        priority: story.priority,
        businessValue: story.businessValue,
        complexity: story.complexity,
        dueDateISO: uiMeta?.dueDateISO ?? story.updatedAt.slice(0, 10),
        dueDateLabel: `Due ${formatDate(uiMeta?.dueDateISO ?? story.updatedAt)}`,
        status: story.status,
        kanbanStatus: uiMeta?.kanbanStatus ?? "todo",
        type: uiMeta?.type ?? "US",
        assignee,
        estimatedHours: minutesToHours(uiMeta?.estimatedMinutes ?? story.effort * 60),
        doneHours: minutesToHours(uiMeta?.loggedMinutes ?? 0),
        createdAt: story.createdAt,
        updatedAt: story.updatedAt,
        createdAtLabel: formatDateTime(story.createdAt),
        updatedAtLabel: formatDateTime(story.updatedAt),
        linkedChips: ["US", "Task"],
        tasks: tasksByStoryId.get(story.id) ?? [],
        comments: commentsByStoryId.get(story.id) ?? [],
        searchText,
        position: 0,
      } satisfies KanbanCardView;
    });

  const initialState = buildInitialKanbanCardState(allCards);

  const cardsWithState = allCards.map((card) => {
    const state = initialState.find((entry) => entry.id === card.id);
    return {
      ...card,
      kanbanStatus: state?.kanbanStatus ?? card.kanbanStatus,
      position: state?.position ?? 0,
    };
  });

  const filteredCards = cardsWithState.filter(
    (card) => !query || card.searchText.includes(query),
  );

  const columns = buildKanbanColumns(filteredCards);

  return {
    sprint: mockKanbanSprint,
    columns,
    allCards: cardsWithState,
  };
}

export function buildInitialKanbanCardState(
  cards: KanbanCardView[],
): KanbanBoardCardState[] {
  const positionByColumn = new Map<KanbanColumnId, number>();

  return cards.map((card) => {
    const currentPosition = positionByColumn.get(card.kanbanStatus) ?? 0;
    positionByColumn.set(card.kanbanStatus, currentPosition + 1);

    return {
      id: card.id,
      kanbanStatus: card.kanbanStatus,
      position: currentPosition,
    };
  });
}

export function buildKanbanColumns(cards: KanbanCardView[]): KanbanColumnView[] {
  return columnMeta.map((column) => {
    const columnCards = cards
      .filter((card) => card.kanbanStatus === column.id)
      .sort((left, right) => left.position - right.position);
    const currentHours = getColumnUsageHours(columnCards);
    const wipLabel =
      column.wipLimitHours === null
        ? `WIP ${currentHours}h`
        : `WIP ${currentHours}h / ${column.wipLimitHours}h`;

    return {
      ...column,
      currentHours,
      wipLabel,
      cards: columnCards,
    };
  });
}

export function getColumnUsageHours(cards: KanbanCardView[]): number {
  return cards.reduce((sum, card) => sum + card.estimatedHours, 0);
}

export function getColumnConfig(columnId: KanbanColumnId) {
  const config = columnMeta.find((column) => column.id === columnId);

  if (!config) {
    throw new Error(`Missing Kanban column config for ${columnId}`);
  }

  return config;
}

export function getCardById(
  board: KanbanBoardViewModel,
  cardId: string | null,
): KanbanCardView | null {
  if (!cardId) {
    return null;
  }

  return board.allCards.find((card) => card.id === cardId) ?? null;
}

export function getCardBadgeLabels(card: KanbanCardView): string[] {
  return [
    `Epic: ${card.epicName}`,
    ...card.labels,
    `Priority: ${formatPriorityTone(card.priority)}`,
    card.dueDateLabel,
    `Est/Act: ${card.estimatedHours}h / ${card.doneHours}h`,
  ];
}

export function getInlineCardTags(card: KanbanCardView): string[] {
  return [
    card.labels[0] ?? "Front-end",
    `Effort: ${card.effort}`,
    formatBusinessValue(card.businessValue),
    card.status,
  ];
}
