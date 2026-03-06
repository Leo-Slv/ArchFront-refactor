export type UserStoryStatus = "todo" | "in-progress" | "done";

export type StoryValue = "low" | "medium" | "high";

export type StoryComplexity = "low" | "medium" | "high";

export interface UserStory {
  id: string;
  title: string;
  description: string;
  effort: number;
  assigneeId: string;
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
          title: "Mover cards entre colunas (DnD)",
          description:
            "Quero arrastar cards entre colunas para atualizar o fluxo de trabalho.",
          effort: 5,
          assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
          assignee: "Ana Costa",
          status: "in-progress",
          value: "high",
          complexity: "medium",
        },
        {
          id: "story-dnd-order",
          title: "Reordenar cards dentro da mesma coluna",
          description:
            "Quero reorganizar cards dentro da mesma coluna sem perder a ordem visual.",
          effort: 3,
          assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
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
          title: "Listar epics e user stories",
          description:
            "Quero visualizar epics e suas stories para priorizar o backlog com mais rapidez.",
          effort: 3,
          assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
          assignee: "Leo Irineu",
          status: "done",
          value: "high",
          complexity: "low",
        },
        {
          id: "story-story-preview",
          title: "Mostrar 1–3 stories por epic na visão principal",
          description:
            "Quero ver um resumo das stories por epic para acelerar o refinement.",
          effort: 2,
          assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
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
          description:
            "Quero informar a capacidade da sprint para equilibrar o planejamento.",
          effort: 5,
          assigneeId: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
          assignee: "Time ArchFlow",
          status: "todo",
          value: "medium",
          complexity: "medium",
        },
        {
          id: "story-capacity-warning",
          title: "Mostrar alerta quando capacidade for excedida",
          description:
            "Quero receber um alerta quando o time ultrapassar a capacidade planejada.",
          effort: 3,
          assigneeId: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
          assignee: "Time ArchFlow",
          status: "todo",
          value: "high",
          complexity: "medium",
        },
      ],
    },
  ],
};

