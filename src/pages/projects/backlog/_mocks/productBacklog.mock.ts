export type UserStoryStatus = string;

export type StoryComplexity = "low" | "medium" | "high";
export type StoryBusinessValue = "low" | "medium" | "high";

export interface UserStory {
  id: string;
  title: string;
  persona: string;
  description: string;
  acceptanceCriteria: string;
  effort: number;
  dependencies: string;
  priority: number;
  businessValue: StoryBusinessValue;
  assigneeId: string;
  status: UserStoryStatus;
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
          persona: "Como PO",
          description:
            "Quero arrastar cards entre colunas para atualizar o fluxo de trabalho.",
          acceptanceCriteria:
            "- Deve permitir mover o card entre colunas validas.\n- Deve atualizar o estado visual imediatamente apos o drop.\n- Deve respeitar os limites de WIP configurados.",
          effort: 5,
          dependencies: "Definição das colunas do Kanban e validação de WIP por horas.",
          priority: 1,
          businessValue: "high",
          assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
          status: "in-progress",
          complexity: "medium",
        },
        {
          id: "story-dnd-order",
          title: "Reordenar cards dentro da mesma coluna",
          persona: "Como Scrum Master",
          description:
            "Quero reorganizar cards dentro da mesma coluna sem perder a ordem visual.",
          acceptanceCriteria:
            "- Deve preservar a ordem dos cards apos o drop.\n- Deve refletir a nova ordem no estado local.\n- Deve reaplicar a ordenacao ao reabrir o quadro.",
          effort: 3,
          dependencies: "Story de drag & drop entre colunas implementada.",
          priority: 2,
          businessValue: "medium",
          assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
          status: "todo",
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
          persona: "Como Product Owner",
          description:
            "Quero visualizar epics e suas stories para priorizar o backlog com mais rapidez.",
          acceptanceCriteria:
            "- Deve agrupar por epic.\n- Deve exibir prioridade, business value e status.\n- Deve permitir busca rapida.",
          effort: 3,
          dependencies: "Mocks de epics e stories consolidados para o projeto.",
          priority: 1,
          businessValue: "high",
          assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
          status: "done",
          complexity: "low",
        },
        {
          id: "story-story-preview",
          title: "Mostrar 1–3 stories por epic na visão principal",
          persona: "Como stakeholder",
          description:
            "Quero ver um resumo das stories por epic para acelerar o refinement.",
          acceptanceCriteria:
            "- Deve exibir de 1 a 3 stories por epic na visao principal.\n- Deve mostrar informacoes essenciais de cada story.\n- Deve oferecer opcao para aprofundar os detalhes.",
          effort: 2,
          dependencies: "Agrupamento por epic e tabela principal ja disponiveis.",
          priority: 2,
          businessValue: "medium",
          assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
          status: "in-progress",
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
          persona: "Como Scrum Master",
          description:
            "Quero informar a capacidade da sprint para equilibrar o planejamento.",
          acceptanceCriteria:
            "- Deve aceitar a capacidade informada para a sprint.\n- Deve recalcular o total comprometido apos a atualizacao.\n- Deve sinalizar folga ou excesso de capacidade.",
          effort: 5,
          dependencies: "Resumo de sprint e regras de planejamento conectadas ao backlog.",
          priority: 2,
          businessValue: "medium",
          assigneeId: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
          status: "todo",
          complexity: "medium",
        },
        {
          id: "story-capacity-warning",
          title: "Mostrar alerta quando capacidade for excedida",
          persona: "Como time de desenvolvimento",
          description:
            "Quero receber um alerta quando o time ultrapassar a capacidade planejada.",
          acceptanceCriteria:
            "- Deve destacar quando a capacidade for excedida.\n- Deve orientar o ajuste do escopo antes da confirmacao.\n- Deve manter o alerta visivel ate a capacidade voltar ao limite.",
          effort: 3,
          dependencies: "Capacidade da sprint calculada com base nas stories selecionadas.",
          priority: 1,
          businessValue: "high",
          assigneeId: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
          status: "todo",
          complexity: "medium",
        },
      ],
    },
  ],
};

