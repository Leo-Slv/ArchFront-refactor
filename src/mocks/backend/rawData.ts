import type {
  BoardColumnRow,
  BoardRow,
  CardActivityRow,
  CardCommentRow,
  CardLabelRow,
  CardRow,
  EpicRow,
  LabelRow,
  ProductBacklogRow,
  ProjectMemberRow,
  ProjectRow,
  SprintItemRow,
  SprintRow,
  TaskRow,
  UserRow,
  UserStoryRow,
} from "./schema";

const roadmapProjectId = "d8fe4f36-24b2-4d23-beb1-411d1f8df4f7";
const testProjectId = "39f134b8-30ba-43d2-837a-44b9ce9b9f1b";
const abpProjectId = "d339e7f4-f03f-40f0-bfe8-5f27f5b65f5b";
const inboxProjectId = "cb63837f-e9cb-4441-bdb5-39f2b9dbe77a";

const roadmapBacklogId = "8c1fd85f-0b30-4dfc-ae78-2d5183d65216";
const activeSprintId = "6c9ad60c-043f-4f37-bfe7-bf88185de7f7";
const roadmapBoardId = "cbec3bfe-3164-4fdc-bf95-2fb48344b8c8";

const columnTodoId = "d1c948b3-843b-46ca-80fb-63ef3c8e0001";
const columnDoingId = "d1c948b3-843b-46ca-80fb-63ef3c8e0002";
const columnReviewId = "d1c948b3-843b-46ca-80fb-63ef3c8e0003";
const columnDoneId = "d1c948b3-843b-46ca-80fb-63ef3c8e0004";

const epicKanbanId = "4a1d6f10-e7ad-4fd6-a401-4d675e281001";
const epicBacklogId = "4a1d6f10-e7ad-4fd6-a401-4d675e281002";
const epicSprintId = "4a1d6f10-e7ad-4fd6-a401-4d675e281003";
const epicObservabilityId = "4a1d6f10-e7ad-4fd6-a401-4d675e281004";

const storyIds = {
  dndColumns: "8f1f9aa1-7202-4b31-9047-0d1b75434001",
  dndOrder: "8f1f9aa1-7202-4b31-9047-0d1b75434002",
  epicList: "8f1f9aa1-7202-4b31-9047-0d1b75434003",
  storyPreview: "8f1f9aa1-7202-4b31-9047-0d1b75434004",
  sprintCapacity: "8f1f9aa1-7202-4b31-9047-0d1b75434005",
  sprintWarning: "8f1f9aa1-7202-4b31-9047-0d1b75434006",
  observabilityEvents: "8f1f9aa1-7202-4b31-9047-0d1b75434007",
  observabilityDashboard: "8f1f9aa1-7202-4b31-9047-0d1b75434008",
  cardComments: "8f1f9aa1-7202-4b31-9047-0d1b75434009",
  cardSearch: "8f1f9aa1-7202-4b31-9047-0d1b7543400a",
  boardWip: "8f1f9aa1-7202-4b31-9047-0d1b7543400b",
  linkUsTask: "8f1f9aa1-7202-4b31-9047-0d1b7543400c",
} as const;

const usersTable: UserRow[] = [
  {
    id: "96cd4b95-acdf-4a62-9063-53292716b656",
    name: "Leo",
    email: "leonardo1692004@gmail.com",
    type: "free",
    password_hash: "123",
    avatar_url: "https://i.pravatar.cc/240?img=13",
    created_at: "2026-02-27T20:44:42.187409Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
  {
    id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    name: "Ana Costa",
    email: "ana.costa@archflow.dev",
    type: "editor",
    password_hash: "mock-ana-123",
    avatar_url: "https://i.pravatar.cc/240?img=32",
    created_at: "2026-03-01T10:11:00.000000Z",
    updated_at: "2026-03-06T09:05:00.000000Z",
  },
  {
    id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    name: "Rafael Souza",
    email: "rafael.souza@archflow.dev",
    type: "viewer",
    password_hash: "mock-rafael-123",
    avatar_url: "https://i.pravatar.cc/240?img=14",
    created_at: "2026-03-02T08:05:00.000000Z",
    updated_at: "2026-03-06T09:10:00.000000Z",
  },
  {
    id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    name: "Marina Silva",
    email: "marina.silva@archflow.dev",
    type: "editor",
    password_hash: "mock-marina-123",
    avatar_url: "https://i.pravatar.cc/240?img=47",
    created_at: "2026-03-02T09:00:00.000000Z",
    updated_at: "2026-03-06T09:15:00.000000Z",
  },
];

const projectsTable: ProjectRow[] = [
  {
    id: testProjectId,
    name: "Test Project",
    description: "A test request to create a Project",
    owner_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    status: "active",
    created_at: "2026-02-27T20:44:42.187409Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
  {
    id: roadmapProjectId,
    name: "Roadmap 2026",
    description:
      "Planejamento trimestral com backlog de arquitetura, sprint board e metas de entrega por squad.",
    owner_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    status: "active",
    created_at: "2026-03-01T13:22:10.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
  {
    id: abpProjectId,
    name: "ABP - Plataforma",
    description:
      "Projeto colaborativo com foco em entregas por sprint e fluxo continuo de backlog para o time de produto.",
    owner_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    status: "active",
    created_at: "2026-03-02T10:15:10.000000Z",
    updated_at: "2026-03-06T09:05:00.000000Z",
  },
  {
    id: inboxProjectId,
    name: "InboxIQ",
    description:
      "Triagem de e-mails e automacoes de pipeline para priorizacao de tarefas com indicadores compartilhados.",
    owner_id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    status: "archived",
    created_at: "2026-03-03T08:05:00.000000Z",
    updated_at: "2026-03-06T09:10:00.000000Z",
  },
];

const projectMembersTable: ProjectMemberRow[] = [
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf05001",
    project_id: testProjectId,
    user_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    role: "owner",
    joined_at: "2026-02-27T20:44:42.187872Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf05002",
    project_id: testProjectId,
    user_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    role: "developer",
    joined_at: "2026-03-01T10:11:00.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf05003",
    project_id: testProjectId,
    user_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    role: "scrum_master",
    joined_at: "2026-03-02T09:00:00.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf05004",
    project_id: roadmapProjectId,
    user_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    role: "owner",
    joined_at: "2026-03-01T13:22:10.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf05005",
    project_id: roadmapProjectId,
    user_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    role: "developer",
    joined_at: "2026-03-01T13:40:00.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf05006",
    project_id: roadmapProjectId,
    user_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    role: "scrum_master",
    joined_at: "2026-03-01T13:42:00.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf05007",
    project_id: roadmapProjectId,
    user_id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    role: "product_owner",
    joined_at: "2026-03-01T13:44:00.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf05008",
    project_id: abpProjectId,
    user_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    role: "owner",
    joined_at: "2026-03-02T10:15:10.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf05009",
    project_id: abpProjectId,
    user_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    role: "product_owner",
    joined_at: "2026-03-02T10:20:00.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf0500a",
    project_id: abpProjectId,
    user_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    role: "scrum_master",
    joined_at: "2026-03-02T10:30:00.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf0500b",
    project_id: inboxProjectId,
    user_id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    role: "owner",
    joined_at: "2026-03-03T08:05:00.000000Z",
  },
  {
    id: "56ef6aa4-d983-4870-b2ea-3c5f4cf0500c",
    project_id: inboxProjectId,
    user_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    role: "developer",
    joined_at: "2026-03-03T08:20:00.000000Z",
  },
];

const productBacklogsTable: ProductBacklogRow[] = [
  {
    id: roadmapBacklogId,
    project_id: roadmapProjectId,
    overview:
      "Backlog principal do Roadmap 2026, com foco em Scrum, Kanban e visibilidade de fluxo.",
    created_at: "2026-03-01T13:25:00.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
];

const epicsTable: EpicRow[] = [
  {
    id: epicKanbanId,
    product_backlog_id: roadmapBacklogId,
    name: "Kanban Board",
    description: "Melhorias no quadro visual e no fluxo operacional do time.",
    business_value: "high",
    status: "active",
    priority: 1,
    color: "#6f32ff",
    created_at: "2026-03-01T13:26:00.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
  {
    id: epicBacklogId,
    product_backlog_id: roadmapBacklogId,
    name: "Backlog Refinement",
    description: "Visao consolidada do backlog com agrupamentos e triagem.",
    business_value: "high",
    status: "active",
    priority: 2,
    color: "#4f8cff",
    created_at: "2026-03-01T13:27:00.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
  {
    id: epicSprintId,
    product_backlog_id: roadmapBacklogId,
    name: "Sprint Planning",
    description: "Planejamento de sprint com capacidade, vinculos e previsibilidade.",
    business_value: "medium",
    status: "active",
    priority: 3,
    color: "#ff7b7b",
    created_at: "2026-03-01T13:28:00.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
  {
    id: epicObservabilityId,
    product_backlog_id: roadmapBacklogId,
    name: "Observability",
    description: "Métricas e eventos para acompanhar o fluxo do board.",
    business_value: "medium",
    status: "draft",
    priority: 4,
    color: "#22c55e",
    created_at: "2026-03-01T13:29:00.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
];

const userStoriesTable: UserStoryRow[] = [
  {
    id: storyIds.dndColumns,
    epic_id: epicKanbanId,
    title: "Mover cards entre colunas (DnD)",
    persona: "Como Product Owner",
    description: "Quero arrastar cards entre colunas para atualizar o fluxo de trabalho.",
    acceptance_criteria:
      "- Deve permitir mover o card entre colunas validas.\n- Deve atualizar o estado visual imediatamente apos o drop.\n- Deve respeitar os limites de WIP configurados.",
    complexity: "medium",
    effort: 5,
    dependencies: "Definicao de colunas e regras de WIP em horas.",
    priority: 1,
    business_value: "high",
    status: "in_progress",
    assignee_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    created_at: "2026-03-05T09:07:24.000Z",
    updated_at: "2026-03-06T09:07:24.000Z",
  },
  {
    id: storyIds.dndOrder,
    epic_id: epicKanbanId,
    title: "Reordenar cards dentro da mesma coluna",
    persona: "Como Scrum Master",
    description: "Quero reorganizar cards dentro da mesma coluna sem perder a ordem visual.",
    acceptance_criteria:
      "- Deve preservar a ordem dos cards apos o drop.\n- Deve refletir a nova ordem no estado local.\n- Deve reaplicar a ordenacao ao reabrir o quadro.",
    complexity: "medium",
    effort: 3,
    dependencies: null,
    priority: 2,
    business_value: "medium",
    status: "ready",
    assignee_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    created_at: "2026-03-05T10:00:00.000Z",
    updated_at: "2026-03-06T08:40:00.000Z",
  },
  {
    id: storyIds.epicList,
    epic_id: epicBacklogId,
    title: "Listar epics e user stories",
    persona: "Como Product Owner",
    description: "Quero visualizar epics e suas stories para priorizar o backlog com mais rapidez.",
    acceptance_criteria:
      "- Deve agrupar por epic.\n- Deve exibir prioridade, business value e status.\n- Deve permitir busca rapida.",
    complexity: "low",
    effort: 3,
    dependencies: null,
    priority: 1,
    business_value: "high",
    status: "done",
    assignee_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    created_at: "2026-03-03T14:22:00.000Z",
    updated_at: "2026-03-06T09:05:00.000Z",
  },
  {
    id: storyIds.storyPreview,
    epic_id: epicBacklogId,
    title: "Mostrar 1-3 stories por epic na visao principal",
    persona: "Como stakeholder",
    description: "Quero ver um resumo das stories por epic para acelerar o refinement.",
    acceptance_criteria:
      "- Deve exibir de 1 a 3 stories por epic na visao principal.\n- Deve mostrar informacoes essenciais de cada story.\n- Deve oferecer opcao para aprofundar os detalhes.",
    complexity: "low",
    effort: 2,
    dependencies: "Agrupamento por epic e tabela principal disponiveis.",
    priority: 2,
    business_value: "medium",
    status: "in_progress",
    assignee_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    created_at: "2026-03-03T16:00:00.000Z",
    updated_at: "2026-03-06T08:40:00.000Z",
  },
  {
    id: storyIds.sprintCapacity,
    epic_id: epicSprintId,
    title: "Definir capacidade da sprint em pontos",
    persona: "Como Scrum Master",
    description: "Quero informar a capacidade da sprint para equilibrar o planejamento.",
    acceptance_criteria:
      "- Deve aceitar a capacidade informada para a sprint.\n- Deve recalcular o total comprometido apos a atualizacao.\n- Deve sinalizar folga ou excesso de capacidade.",
    complexity: "medium",
    effort: null,
    dependencies: null,
    priority: 2,
    business_value: "medium",
    status: "draft",
    assignee_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    created_at: "2026-03-04T09:30:00.000Z",
    updated_at: "2026-03-06T09:03:00.000Z",
  },
  {
    id: storyIds.sprintWarning,
    epic_id: epicSprintId,
    title: "Mostrar alerta quando capacidade for excedida",
    persona: "Como time de desenvolvimento",
    description: "Quero receber um alerta quando o time ultrapassar a capacidade planejada.",
    acceptance_criteria:
      "- Deve destacar quando a capacidade for excedida.\n- Deve orientar o ajuste do escopo antes da confirmacao.\n- Deve manter o alerta visivel ate a capacidade voltar ao limite.",
    complexity: "medium",
    effort: 3,
    dependencies: "Capacidade da sprint calculada com base nas stories selecionadas.",
    priority: 1,
    business_value: "high",
    status: "ready",
    assignee_id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    created_at: "2026-03-04T10:40:00.000Z",
    updated_at: "2026-03-06T08:58:00.000Z",
  },
  {
    id: storyIds.observabilityEvents,
    epic_id: epicObservabilityId,
    title: "Instrumentar eventos do board",
    persona: "Como engenharia",
    description: "Quero registrar eventos do board para acompanhar uso e gargalos.",
    acceptance_criteria:
      "- Deve registrar eventos de mover card e abrir modal.\n- Deve permitir filtro por sprint.\n- Deve manter payload suficiente para analise.",
    complexity: "medium",
    effort: 5,
    dependencies: null,
    priority: 2,
    business_value: "medium",
    status: "in_progress",
    assignee_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    created_at: "2026-03-03T11:10:00.000Z",
    updated_at: "2026-03-06T09:12:00.000Z",
  },
  {
    id: storyIds.observabilityDashboard,
    epic_id: epicObservabilityId,
    title: "Criar painel com metricas do fluxo",
    persona: "Como lideranca",
    description: "Quero acompanhar throughput e tempo em etapa por coluna.",
    acceptance_criteria: "",
    complexity: "high",
    effort: 8,
    dependencies: "Instrumentacao de eventos consolidada.",
    priority: 3,
    business_value: "medium",
    status: "draft",
    assignee_id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    created_at: "2026-03-04T13:50:00.000Z",
    updated_at: "2026-03-06T09:06:00.000Z",
  },
  {
    id: storyIds.cardComments,
    epic_id: epicKanbanId,
    title: "Exibir comentarios no detalhe do card",
    persona: "Como squad",
    description: "Quero acompanhar comentarios do time para alinhar decisoes do card.",
    acceptance_criteria:
      "- Deve exibir comentarios no modal do card.\n- Deve mostrar autor e horario em cada comentario.\n- Deve preservar a ordem cronologica.",
    complexity: "low",
    effort: 3,
    dependencies: null,
    priority: 2,
    business_value: "medium",
    status: "done",
    assignee_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    created_at: "2026-03-02T15:20:00.000Z",
    updated_at: "2026-03-06T08:12:00.000Z",
  },
  {
    id: storyIds.cardSearch,
    epic_id: epicKanbanId,
    title: "Buscar cards por titulo e etiquetas",
    persona: "Como usuario",
    description: "Quero localizar cards rapidamente usando titulo, epic e labels.",
    acceptance_criteria:
      "- Deve filtrar cards visiveis sem recarregar a pagina.\n- Deve considerar titulo, epic e tags derivadas.\n- Deve manter a navegacao atual do board.",
    complexity: "low",
    effort: 2,
    dependencies: null,
    priority: 2,
    business_value: "high",
    status: "in_progress",
    assignee_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    created_at: "2026-03-05T12:20:00.000Z",
    updated_at: "2026-03-06T09:18:00.000Z",
  },
  {
    id: storyIds.boardWip,
    epic_id: epicKanbanId,
    title: "Mostrar WIP por coluna",
    persona: "Como Scrum Master",
    description: "Quero ver o trabalho em progresso por coluna para balancear o fluxo.",
    acceptance_criteria:
      "- Deve exibir o WIP atual por coluna.\n- Deve mostrar o limite no cabecalho.\n- Deve sinalizar excesso de capacidade visualmente.",
    complexity: "low",
    effort: 0,
    dependencies: null,
    priority: 3,
    business_value: "medium",
    status: "draft",
    assignee_id: null,
    created_at: "2026-03-05T08:10:00.000Z",
    updated_at: "2026-03-06T08:45:00.000Z",
  },
  {
    id: storyIds.linkUsTask,
    epic_id: epicSprintId,
    title: "Relacionar user stories com tasks",
    persona: "Como time",
    description: "Quero ver vinculos entre historias e tasks para nao perder contexto.",
    acceptance_criteria:
      "- Deve exibir chips com os vinculos do card.\n- Deve manter estimativa e responsavel das tasks vinculadas.\n- Deve permitir leitura rapida do contexto tecnico.",
    complexity: "medium",
    effort: 5,
    dependencies: "Board principal e backlog sincronizados.",
    priority: 2,
    business_value: "medium",
    status: "in_progress",
    assignee_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    created_at: "2026-03-05T11:30:00.000Z",
    updated_at: "2026-03-06T09:20:00.000Z",
  },
];

const sprintsTable: SprintRow[] = [
  {
    id: activeSprintId,
    project_id: roadmapProjectId,
    name: "Sprint 14",
    goal: "Entregar backlog navegavel, board funcional e sinalizacao de capacidade.",
    start_date: "2026-03-03",
    end_date: "2026-03-14",
    status: "active",
    capacity_hours: 32,
    created_at: "2026-03-05T21:16:43.619918Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
];

const sprintItemsTable: SprintItemRow[] = [
  {
    id: "fd35bf41-519c-4112-8959-aef7179a4001",
    sprint_id: activeSprintId,
    user_story_id: storyIds.dndColumns,
    added_at: "2026-03-05T21:17:41.3027478Z",
  },
  {
    id: "fd35bf41-519c-4112-8959-aef7179a4002",
    sprint_id: activeSprintId,
    user_story_id: storyIds.epicList,
    added_at: "2026-03-05T21:18:41.3027478Z",
  },
  {
    id: "fd35bf41-519c-4112-8959-aef7179a4003",
    sprint_id: activeSprintId,
    user_story_id: storyIds.sprintWarning,
    added_at: "2026-03-05T21:19:41.3027478Z",
  },
  {
    id: "fd35bf41-519c-4112-8959-aef7179a4004",
    sprint_id: activeSprintId,
    user_story_id: storyIds.linkUsTask,
    added_at: "2026-03-05T21:20:41.3027478Z",
  },
];

const tasksTable: TaskRow[] = [
  {
    id: "c5dc7f0a-6d4e-4ab5-91ea-12eb5d7d7001",
    user_story_id: storyIds.dndColumns,
    title: "Implementar drag & drop nativo",
    description: "Usar HTML5 DnD e persistir coluna/posicao no estado.",
    assignee_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    estimated_hours: 10,
    actual_hours: 4,
    priority: 1,
    created_at: "2026-03-05T21:18:43.9252451Z",
    updated_at: "2026-03-05T21:18:43.9253329Z",
  },
  {
    id: "c5dc7f0a-6d4e-4ab5-91ea-12eb5d7d7002",
    user_story_id: storyIds.dndColumns,
    title: "Persistir coluna e posicao no backend",
    description: "Salvar a ordem para refletir o fluxo atualizado.",
    assignee_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    estimated_hours: 6,
    actual_hours: 2,
    priority: 1,
    created_at: "2026-03-05T21:20:10.0000000Z",
    updated_at: "2026-03-05T21:20:10.0000000Z",
  },
  {
    id: "c5dc7f0a-6d4e-4ab5-91ea-12eb5d7d7003",
    user_story_id: storyIds.epicList,
    title: "Tela de backlog agrupada por epic",
    description: "Tabela com prioridade, business value e status para leitura rapida.",
    assignee_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    estimated_hours: 6,
    actual_hours: 3,
    priority: 2,
    created_at: "2026-03-05T21:22:10.0000000Z",
    updated_at: "2026-03-05T21:22:10.0000000Z",
  },
  {
    id: "c5dc7f0a-6d4e-4ab5-91ea-12eb5d7d7004",
    user_story_id: storyIds.epicList,
    title: "Refinar filtros e busca por backlog",
    description: "Aprimorar leitura rapida por valor, status e prioridade.",
    assignee_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    estimated_hours: 3,
    actual_hours: 3,
    priority: 2,
    created_at: "2026-03-05T21:23:10.0000000Z",
    updated_at: "2026-03-05T21:23:10.0000000Z",
  },
  {
    id: "c5dc7f0a-6d4e-4ab5-91ea-12eb5d7d7005",
    user_story_id: storyIds.sprintWarning,
    title: "Alertar quando capacidade for excedida",
    description: "Destacar excesso de capacidade antes da confirmacao.",
    assignee_id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    estimated_hours: 4,
    actual_hours: 1,
    priority: 1,
    created_at: "2026-03-05T21:24:10.0000000Z",
    updated_at: "2026-03-05T21:24:10.0000000Z",
  },
  {
    id: "c5dc7f0a-6d4e-4ab5-91ea-12eb5d7d7006",
    user_story_id: storyIds.linkUsTask,
    title: "Mostrar vinculos US - Task no modal",
    description: "Exibir contexto das tasks vinculadas no detalhe do card.",
    assignee_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    estimated_hours: 4,
    actual_hours: 2,
    priority: 2,
    created_at: "2026-03-05T21:25:10.0000000Z",
    updated_at: "2026-03-05T21:25:10.0000000Z",
  },
  {
    id: "c5dc7f0a-6d4e-4ab5-91ea-12eb5d7d7007",
    user_story_id: storyIds.linkUsTask,
    title: "Sincronizar estimativas entre card e task",
    description: "Manter valores de horas consistentes nas visoes do board.",
    assignee_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    estimated_hours: 3,
    actual_hours: 1,
    priority: 2,
    created_at: "2026-03-05T21:26:10.0000000Z",
    updated_at: "2026-03-05T21:26:10.0000000Z",
  },
];

const boardsTable: BoardRow[] = [
  {
    id: roadmapBoardId,
    project_id: roadmapProjectId,
    sprint_id: activeSprintId,
    name: "Roadmap 2026 - Sprint 14",
    description: "Quadro kanban principal do sprint ativo.",
    board_type: "kanban",
    is_default: true,
    created_at: "2026-03-04T08:00:00.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
];

const boardColumnsTable: BoardColumnRow[] = [
  {
    id: columnTodoId,
    board_id: roadmapBoardId,
    name: "To do",
    description: "Itens prontos para iniciar.",
    position: 0,
    wip_limit: 40,
    color: "#95a5a6",
    is_done_column: false,
    created_at: "2026-03-04T08:01:00.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
  {
    id: columnDoingId,
    board_id: roadmapBoardId,
    name: "Doing",
    description: "Itens em desenvolvimento.",
    position: 1,
    wip_limit: 24,
    color: "#6f32ff",
    is_done_column: false,
    created_at: "2026-03-04T08:01:10.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
  {
    id: columnReviewId,
    board_id: roadmapBoardId,
    name: "Review",
    description: "Itens em revisao antes da conclusao.",
    position: 2,
    wip_limit: 16,
    color: "#4f8cff",
    is_done_column: false,
    created_at: "2026-03-04T08:01:20.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
  {
    id: columnDoneId,
    board_id: roadmapBoardId,
    name: "Done",
    description: "Itens concluidos nesta sprint.",
    position: 3,
    wip_limit: null,
    color: "#22c55e",
    is_done_column: true,
    created_at: "2026-03-04T08:01:30.000000Z",
    updated_at: "2026-03-06T09:00:00.000000Z",
  },
];

const cardsTable: CardRow[] = [
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b8001",
    column_id: columnReviewId,
    user_story_id: storyIds.dndColumns,
    task_id: null,
    title: "Mover cards entre colunas (DnD)",
    description: "Story principal para DnD entre colunas.",
    assignee_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    position: 0,
    priority: "high",
    due_date: "2026-03-14",
    estimated_hours: 6,
    actual_hours: 2,
    color: "#ffffff",
    created_at: "2026-03-05T09:07:24.000Z",
    updated_at: "2026-03-06T09:07:24.000Z",
  },
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b8002",
    column_id: columnTodoId,
    user_story_id: storyIds.dndOrder,
    task_id: null,
    title: "Reordenar cards dentro da mesma coluna",
    description: "Aprimorar ordenacao manual na mesma etapa.",
    assignee_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    position: 0,
    priority: "medium",
    due_date: "2026-03-15",
    estimated_hours: 4,
    actual_hours: 0,
    color: "#ffffff",
    created_at: "2026-03-05T10:00:00.000Z",
    updated_at: "2026-03-06T08:40:00.000Z",
  },
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b8003",
    column_id: columnDoingId,
    user_story_id: storyIds.cardSearch,
    task_id: null,
    title: "Buscar cards por titulo e etiquetas",
    description: "Busca por titulo, epic e labels dentro do board.",
    assignee_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    position: 0,
    priority: "medium",
    due_date: "2026-03-16",
    estimated_hours: 3,
    actual_hours: 1,
    color: "#ffffff",
    created_at: "2026-03-05T12:20:00.000Z",
    updated_at: "2026-03-06T09:18:00.000Z",
  },
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b8004",
    column_id: columnDoneId,
    user_story_id: storyIds.cardComments,
    task_id: null,
    title: "Exibir comentarios no detalhe do card",
    description: "Disponibilizar comentarios no modal com autor e horario.",
    assignee_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    position: 0,
    priority: "medium",
    due_date: "2026-03-12",
    estimated_hours: 3,
    actual_hours: 3,
    color: "#ffffff",
    created_at: "2026-03-02T15:20:00.000Z",
    updated_at: "2026-03-06T08:12:00.000Z",
  },
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b8005",
    column_id: columnDoneId,
    user_story_id: storyIds.epicList,
    task_id: null,
    title: "Listar epics e user stories",
    description: "Visao consolidada do backlog por epic.",
    assignee_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    position: 1,
    priority: "high",
    due_date: "2026-03-12",
    estimated_hours: 3,
    actual_hours: 3,
    color: "#ffffff",
    created_at: "2026-03-03T14:22:00.000Z",
    updated_at: "2026-03-06T09:05:00.000Z",
  },
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b8006",
    column_id: columnDoingId,
    user_story_id: storyIds.sprintWarning,
    task_id: null,
    title: "Mostrar alerta quando capacidade for excedida",
    description: "Alerta antes de confirmar sprint acima da capacidade.",
    assignee_id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    position: 1,
    priority: "high",
    due_date: "2026-03-18",
    estimated_hours: 4,
    actual_hours: 2,
    color: "#ffffff",
    created_at: "2026-03-04T10:40:00.000Z",
    updated_at: "2026-03-06T08:58:00.000Z",
  },
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b8007",
    column_id: columnReviewId,
    user_story_id: storyIds.observabilityEvents,
    task_id: null,
    title: "Instrumentar eventos do board",
    description: "Registrar eventos de uso e movimentacao do board.",
    assignee_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    position: 1,
    priority: "medium",
    due_date: "2026-03-19",
    estimated_hours: 4,
    actual_hours: 3,
    color: "#ffffff",
    created_at: "2026-03-03T11:10:00.000Z",
    updated_at: "2026-03-06T09:12:00.000Z",
  },
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b8008",
    column_id: columnTodoId,
    user_story_id: storyIds.observabilityDashboard,
    task_id: null,
    title: "Criar painel com metricas do fluxo",
    description: "Consolidar throughput e tempo por etapa.",
    assignee_id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    position: 1,
    priority: "medium",
    due_date: "2026-03-20",
    estimated_hours: 7,
    actual_hours: 0,
    color: "#ffffff",
    created_at: "2026-03-04T13:50:00.000Z",
    updated_at: "2026-03-06T09:06:00.000Z",
  },
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b8009",
    column_id: columnTodoId,
    user_story_id: storyIds.boardWip,
    task_id: null,
    title: "Mostrar WIP por coluna",
    description: "Exibir o trabalho em progresso no cabecalho das colunas.",
    assignee_id: null,
    position: 2,
    priority: "low",
    due_date: "2026-03-17",
    estimated_hours: 2,
    actual_hours: 0,
    color: "#ffffff",
    created_at: "2026-03-05T08:10:00.000Z",
    updated_at: "2026-03-06T08:45:00.000Z",
  },
  {
    id: "9db44c60-5c3b-4cfb-8b15-1039482b800a",
    column_id: columnDoneId,
    user_story_id: storyIds.linkUsTask,
    task_id: null,
    title: "Relacionar user stories com tasks",
    description: "Manter vinculos tecnicos visiveis no modal do board.",
    assignee_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    position: 2,
    priority: "medium",
    due_date: "2026-03-13",
    estimated_hours: 4,
    actual_hours: 4,
    color: "#ffffff",
    created_at: "2026-03-05T11:30:00.000Z",
    updated_at: "2026-03-06T09:20:00.000Z",
  },
];

const labelsTable: LabelRow[] = [
  {
    id: "7fc7e005-b37e-4e91-b891-7d13b4f69001",
    project_id: roadmapProjectId,
    name: "Front-end",
    color: "#6f32ff",
    created_at: "2026-03-04T08:10:00.000000Z",
  },
  {
    id: "7fc7e005-b37e-4e91-b891-7d13b4f69002",
    project_id: roadmapProjectId,
    name: "Drag",
    color: "#4f8cff",
    created_at: "2026-03-04T08:12:00.000000Z",
  },
  {
    id: "7fc7e005-b37e-4e91-b891-7d13b4f69003",
    project_id: roadmapProjectId,
    name: "Refinement",
    color: "#f59e0b",
    created_at: "2026-03-04T08:14:00.000000Z",
  },
  {
    id: "7fc7e005-b37e-4e91-b891-7d13b4f69004",
    project_id: roadmapProjectId,
    name: "Planning",
    color: "#ef4444",
    created_at: "2026-03-04T08:16:00.000000Z",
  },
  {
    id: "7fc7e005-b37e-4e91-b891-7d13b4f69005",
    project_id: roadmapProjectId,
    name: "Analytics",
    color: "#22c55e",
    created_at: "2026-03-04T08:18:00.000000Z",
  },
  {
    id: "7fc7e005-b37e-4e91-b891-7d13b4f69006",
    project_id: roadmapProjectId,
    name: "Search",
    color: "#a855f7",
    created_at: "2026-03-04T08:20:00.000000Z",
  },
];

const cardLabelsTable: CardLabelRow[] = [
  {
    id: "aaf5f3a9-cf4e-457e-8f79-aee174689001",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8001",
    label_id: "7fc7e005-b37e-4e91-b891-7d13b4f69001",
    created_at: "2026-03-05T09:08:00.000Z",
  },
  {
    id: "aaf5f3a9-cf4e-457e-8f79-aee174689002",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8001",
    label_id: "7fc7e005-b37e-4e91-b891-7d13b4f69002",
    created_at: "2026-03-05T09:08:10.000Z",
  },
  {
    id: "aaf5f3a9-cf4e-457e-8f79-aee174689003",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8003",
    label_id: "7fc7e005-b37e-4e91-b891-7d13b4f69006",
    created_at: "2026-03-05T12:21:00.000Z",
  },
  {
    id: "aaf5f3a9-cf4e-457e-8f79-aee174689004",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8005",
    label_id: "7fc7e005-b37e-4e91-b891-7d13b4f69003",
    created_at: "2026-03-05T14:21:00.000Z",
  },
  {
    id: "aaf5f3a9-cf4e-457e-8f79-aee174689005",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8006",
    label_id: "7fc7e005-b37e-4e91-b891-7d13b4f69004",
    created_at: "2026-03-05T14:30:00.000Z",
  },
  {
    id: "aaf5f3a9-cf4e-457e-8f79-aee174689006",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8007",
    label_id: "7fc7e005-b37e-4e91-b891-7d13b4f69005",
    created_at: "2026-03-05T14:32:00.000Z",
  },
  {
    id: "aaf5f3a9-cf4e-457e-8f79-aee174689007",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b800a",
    label_id: "7fc7e005-b37e-4e91-b891-7d13b4f69004",
    created_at: "2026-03-05T14:34:00.000Z",
  },
];

const cardCommentsTable: CardCommentRow[] = [
  {
    id: "b8d657de-990d-4e1d-9eb8-0e67a8df1001",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8001",
    user_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    content: "Foco em UX tipo Trello: arraste suave e feedback visual.",
    parent_comment_id: null,
    created_at: "2026-03-06T09:07:24.000Z",
    updated_at: "2026-03-06T09:07:24.000Z",
  },
  {
    id: "b8d657de-990d-4e1d-9eb8-0e67a8df1002",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8001",
    user_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    content: "Vou manter sem libs: so HTML5 DnD e state local.",
    parent_comment_id: "b8d657de-990d-4e1d-9eb8-0e67a8df1001",
    created_at: "2026-03-06T09:15:24.000Z",
    updated_at: "2026-03-06T09:15:24.000Z",
  },
  {
    id: "b8d657de-990d-4e1d-9eb8-0e67a8df1003",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8003",
    user_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    content: "A busca precisa considerar tags derivadas e nome do epic.",
    parent_comment_id: null,
    created_at: "2026-03-06T08:42:00.000Z",
    updated_at: "2026-03-06T08:42:00.000Z",
  },
  {
    id: "b8d657de-990d-4e1d-9eb8-0e67a8df1004",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8007",
    user_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    content: "Vamos comecar por eventos de abertura de modal e mudanca de coluna.",
    parent_comment_id: null,
    created_at: "2026-03-06T09:11:00.000Z",
    updated_at: "2026-03-06T09:11:00.000Z",
  },
];

const cardActivitiesTable: CardActivityRow[] = [
  {
    id: "d02f3ee8-7477-4753-8dd7-90b854d81001",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8001",
    user_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    activity_type: "moved",
    old_value: { column: "doing" },
    new_value: { column: "review" },
    description: "Card movido de Doing para Review.",
    created_at: "2026-03-06T09:06:00.000Z",
  },
  {
    id: "d02f3ee8-7477-4753-8dd7-90b854d81002",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8003",
    user_id: "96cd4b95-acdf-4a62-9063-53292716b656",
    activity_type: "updated",
    old_value: { query: "titulo" },
    new_value: { query: "titulo + label" },
    description: "Escopo da busca ajustado para considerar labels.",
    created_at: "2026-03-06T08:50:00.000Z",
  },
  {
    id: "d02f3ee8-7477-4753-8dd7-90b854d81003",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b8004",
    user_id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    activity_type: "commented",
    old_value: null,
    new_value: { comment_count: 2 },
    description: "Novos comentarios adicionados ao card.",
    created_at: "2026-03-06T08:12:00.000Z",
  },
  {
    id: "d02f3ee8-7477-4753-8dd7-90b854d81004",
    card_id: "9db44c60-5c3b-4cfb-8b15-1039482b800a",
    user_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    activity_type: "assigned",
    old_value: { assignee_id: null },
    new_value: { assignee_id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a" },
    description: "Story vinculada assumida por Marina Silva.",
    created_at: "2026-03-06T09:20:00.000Z",
  },
];

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Raw mock validation failed: ${message}`);
  }
}

function validateUnique<T>(rows: T[], buildKey: (row: T) => string, label: string): void {
  const seen = new Set<string>();
  for (const row of rows) {
    const key = buildKey(row);
    assert(!seen.has(key), `${label} duplicate key "${key}"`);
    seen.add(key);
  }
}

function validateRawMockDataset(): void {
  const userIds = new Set(usersTable.map((row) => row.id));
  const projectIds = new Set(projectsTable.map((row) => row.id));
  const backlogIds = new Set(productBacklogsTable.map((row) => row.id));
  const epicIds = new Set(epicsTable.map((row) => row.id));
  const storyIdsSet = new Set(userStoriesTable.map((row) => row.id));
  const sprintIds = new Set(sprintsTable.map((row) => row.id));
  const taskIds = new Set(tasksTable.map((row) => row.id));
  const boardIds = new Set(boardsTable.map((row) => row.id));
  const columnIds = new Set(boardColumnsTable.map((row) => row.id));
  const cardIds = new Set(cardsTable.map((row) => row.id));
  const labelIds = new Set(labelsTable.map((row) => row.id));

  validateUnique(projectMembersTable, (row) => `${row.project_id}:${row.user_id}`, "project_members");
  validateUnique(productBacklogsTable, (row) => row.project_id, "product_backlogs.project_id");
  validateUnique(sprintItemsTable, (row) => `${row.sprint_id}:${row.user_story_id}`, "sprint_items");
  validateUnique(boardColumnsTable, (row) => `${row.board_id}:${row.position}`, "columns");
  validateUnique(cardsTable, (row) => `${row.column_id}:${row.position}`, "cards");
  validateUnique(labelsTable, (row) => `${row.project_id}:${row.name}`, "labels");
  validateUnique(cardLabelsTable, (row) => `${row.card_id}:${row.label_id}`, "card_labels");

  for (const project of projectsTable) {
    assert(userIds.has(project.owner_id), `projects.owner_id missing for ${project.id}`);
  }

  for (const member of projectMembersTable) {
    assert(projectIds.has(member.project_id), `project_members.project_id missing for ${member.id}`);
    assert(userIds.has(member.user_id), `project_members.user_id missing for ${member.id}`);
  }

  for (const backlog of productBacklogsTable) {
    assert(projectIds.has(backlog.project_id), `product_backlogs.project_id missing for ${backlog.id}`);
  }

  for (const epic of epicsTable) {
    assert(backlogIds.has(epic.product_backlog_id), `epics.product_backlog_id missing for ${epic.id}`);
  }

  for (const story of userStoriesTable) {
    assert(epicIds.has(story.epic_id), `user_stories.epic_id missing for ${story.id}`);
    assert(
      !story.assignee_id || userIds.has(story.assignee_id),
      `user_stories.assignee_id missing for ${story.id}`,
    );
  }

  for (const sprint of sprintsTable) {
    assert(projectIds.has(sprint.project_id), `sprints.project_id missing for ${sprint.id}`);
  }

  for (const item of sprintItemsTable) {
    assert(sprintIds.has(item.sprint_id), `sprint_items.sprint_id missing for ${item.id}`);
    assert(storyIdsSet.has(item.user_story_id), `sprint_items.user_story_id missing for ${item.id}`);
  }

  for (const task of tasksTable) {
    assert(storyIdsSet.has(task.user_story_id), `tasks.user_story_id missing for ${task.id}`);
    assert(!task.assignee_id || userIds.has(task.assignee_id), `tasks.assignee_id missing for ${task.id}`);
  }

  for (const board of boardsTable) {
    assert(projectIds.has(board.project_id), `boards.project_id missing for ${board.id}`);
    assert(!board.sprint_id || sprintIds.has(board.sprint_id), `boards.sprint_id missing for ${board.id}`);
  }

  for (const column of boardColumnsTable) {
    assert(boardIds.has(column.board_id), `columns.board_id missing for ${column.id}`);
  }

  for (const card of cardsTable) {
    assert(columnIds.has(card.column_id), `cards.column_id missing for ${card.id}`);
    assert(!card.user_story_id || storyIdsSet.has(card.user_story_id), `cards.user_story_id missing for ${card.id}`);
    assert(!card.task_id || taskIds.has(card.task_id), `cards.task_id missing for ${card.id}`);
    assert(!card.assignee_id || userIds.has(card.assignee_id), `cards.assignee_id missing for ${card.id}`);
  }

  for (const label of labelsTable) {
    assert(projectIds.has(label.project_id), `labels.project_id missing for ${label.id}`);
  }

  for (const cardLabel of cardLabelsTable) {
    assert(cardIds.has(cardLabel.card_id), `card_labels.card_id missing for ${cardLabel.id}`);
    assert(labelIds.has(cardLabel.label_id), `card_labels.label_id missing for ${cardLabel.id}`);
  }

  for (const comment of cardCommentsTable) {
    assert(cardIds.has(comment.card_id), `card_comments.card_id missing for ${comment.id}`);
    assert(userIds.has(comment.user_id), `card_comments.user_id missing for ${comment.id}`);
    assert(
      !comment.parent_comment_id ||
        cardCommentsTable.some((row) => row.id === comment.parent_comment_id),
      `card_comments.parent_comment_id missing for ${comment.id}`,
    );
  }

  for (const activity of cardActivitiesTable) {
    assert(cardIds.has(activity.card_id), `card_activities.card_id missing for ${activity.id}`);
    assert(userIds.has(activity.user_id), `card_activities.user_id missing for ${activity.id}`);
  }
}

validateRawMockDataset();

export {
  activeSprintId,
  boardColumnsTable,
  boardsTable,
  cardActivitiesTable,
  cardCommentsTable,
  cardLabelsTable,
  cardsTable,
  columnDoingId,
  columnDoneId,
  columnReviewId,
  columnTodoId,
  epicsTable,
  inboxProjectId,
  labelsTable,
  productBacklogsTable,
  projectMembersTable,
  projectsTable,
  roadmapBacklogId,
  roadmapBoardId,
  roadmapProjectId,
  sprintItemsTable,
  sprintsTable,
  storyIds,
  tasksTable,
  testProjectId,
  userStoriesTable,
  usersTable,
};
