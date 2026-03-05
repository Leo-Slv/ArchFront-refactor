export type UserStoryStatus = "todo" | "in-progress" | "done";

export type StoryValue = "low" | "medium" | "high";

export type StoryComplexity = "low" | "medium" | "high";

export interface UserStory {
  id: string;
  title: string;
  assignee: string;
  status: UserStoryStatus;
  value: StoryValue;
  complexity: StoryComplexity;
}

export type EpicPriority = "P1" | "P2" | "P3";

export interface Epic {
  id: string;
  name: string;
  description: string;
  priority: EpicPriority;
  position: number;
  userStories: UserStory[];
}

export interface ProductBacklog {
  projectId: string;
  epics: Epic[];
}

export const mockProductBacklog: ProductBacklog = {
  projectId: "proj-archflow-platform",
  epics: [
    {
      id: "epic-backlog-dnd",
      name: "Mover cards entre colunas (DnD)",
      description:
        "Permitir que o usuário reorganize stories no quadro Kanban com drag & drop suave.",
      priority: "P1",
      position: 1,
      userStories: [
        {
          id: "story-dnd-columns",
          title: "Mover cards entre colunas do Kanban",
          assignee: "Ana Costa",
          status: "in-progress",
          value: "high",
          complexity: "medium",
        },
        {
          id: "story-dnd-order",
          title: "Reordenar cards dentro da mesma coluna",
          assignee: "Ana Costa",
          status: "todo",
          value: "medium",
          complexity: "medium",
        },
      ],
    },
    {
      id: "epic-backlog-views",
      name: "Listar epics e user stories",
      description:
        "Criar visão consolidada do backlog com agrupamento por epic e filtros básicos.",
      priority: "P2",
      position: 2,
      userStories: [
        {
          id: "story-epic-list",
          title: "Exibir lista de epics com resumo",
          assignee: "Leo Irineu",
          status: "done",
          value: "high",
          complexity: "low",
        },
        {
          id: "story-story-preview",
          title: "Mostrar 1–3 stories por epic na visão principal",
          assignee: "Leo Irineu",
          status: "in-progress",
          value: "medium",
          complexity: "low",
        },
      ],
    },
    {
      id: "epic-sprint-planning",
      name: "Planejar sprint com capacidade",
      description:
        "Permitir seleção de stories para a próxima sprint respeitando limite de capacidade do time.",
      priority: "P3",
      position: 3,
      userStories: [
        {
          id: "story-capacity-input",
          title: "Definir capacidade da sprint em pontos",
          assignee: "Time ArchFlow",
          status: "todo",
          value: "medium",
          complexity: "medium",
        },
        {
          id: "story-capacity-warning",
          title: "Mostrar alerta quando capacidade for excedida",
          assignee: "Time ArchFlow",
          status: "todo",
          value: "high",
          complexity: "medium",
        },
      ],
    },
  ],
};

