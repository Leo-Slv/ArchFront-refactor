export type SprintStatus = "planned" | "active" | "completed";

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal: string;
  executionPlan: string;
  startDate: string;
  endDate: string;
  status: SprintStatus;
  capacityHours: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SprintItem {
  id: number;
  sprintId: string;
  userStoryId: number;
  position: number;
  notes: string;
  addedAt: string;
}

export interface Task {
  id: number;
  userStoryId: number;
  position: number;
  title: string;
  description: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export const mockSprint: Sprint = {
  id: "6c9ad60c-043f-4f37-bfe7-bf88185de7f7",
  projectId: "39f134b8-30ba-43d2-837a-44b9ce9b9f1b",
  name: "Sprint 14",
  goal: "Entregar Kanban funcional e backlog navegável.",
  executionPlan: "",
  startDate: "2026-02-10T00:00:00Z",
  endDate: "2026-02-21T00:00:00Z",
  status: "active",
  capacityHours: 32,
  isArchived: false,
  createdAt: "2026-03-05T21:16:43.619918Z",
  updatedAt: "2026-03-05T21:16:43.6201266Z",
};

export const mockSprintItems: SprintItem[] = [
  {
    id: 1,
    sprintId: mockSprint.id,
    userStoryId: 1,
    position: 0,
    notes: "",
    addedAt: "2026-03-05T21:17:41.3027478Z",
  },
  {
    id: 2,
    sprintId: mockSprint.id,
    userStoryId: 2,
    position: 1,
    notes: "",
    addedAt: "2026-03-05T21:17:41.3027478Z",
  },
  {
    id: 3,
    sprintId: mockSprint.id,
    userStoryId: 3,
    position: 2,
    notes: "",
    addedAt: "2026-03-05T21:17:41.3027478Z",
  },
];

export const mockTasks: Task[] = [
  {
    id: 1,
    userStoryId: 1,
    position: 0,
    title: "Implementar drag & drop nativo",
    description: "",
    priority: 1,
    createdAt: "2026-03-05T21:18:43.9252451Z",
    updatedAt: "2026-03-05T21:18:43.9253329Z",
  },
  {
    id: 2,
    userStoryId: 1,
    position: 1,
    title: "Persistir coluna/posição no backend",
    description: "",
    priority: 1,
    createdAt: "2026-03-05T21:20:10.0000000Z",
    updatedAt: "2026-03-05T21:20:10.0000000Z",
  },
  {
    id: 3,
    userStoryId: 1,
    position: 2,
    title: "Ajustar microinterações de hover",
    description: "",
    priority: 2,
    createdAt: "2026-03-05T21:21:10.0000000Z",
    updatedAt: "2026-03-05T21:21:10.0000000Z",
  },
  {
    id: 4,
    userStoryId: 2,
    position: 0,
    title: "Tela de backlog agrupada por epic",
    description: "",
    priority: 2,
    createdAt: "2026-03-05T21:22:10.0000000Z",
    updatedAt: "2026-03-05T21:22:10.0000000Z",
  },
  {
    id: 5,
    userStoryId: 2,
    position: 1,
    title: "Filtro por valor, status e risco",
    description: "",
    priority: 3,
    createdAt: "2026-03-05T21:23:10.0000000Z",
    updatedAt: "2026-03-05T21:23:10.0000000Z",
  },
  {
    id: 6,
    userStoryId: 3,
    position: 0,
    title: "Configurar capacidade do time",
    description: "",
    priority: 2,
    createdAt: "2026-03-05T21:24:10.0000000Z",
    updatedAt: "2026-03-05T21:24:10.0000000Z",
  },
  {
    id: 7,
    userStoryId: 3,
    position: 1,
    title: "Alertar quando capacidade for excedida",
    description: "",
    priority: 1,
    createdAt: "2026-03-05T21:25:10.0000000Z",
    updatedAt: "2026-03-05T21:25:10.0000000Z",
  },
];

type PriorityLabel = "P1" | "P2" | "P3";

interface SprintTaskMeta {
  assigneeName: string;
  estimatedHours: number;
  doneHours: number;
  priorityLabel: PriorityLabel;
}

const taskMetaById: Record<number, SprintTaskMeta> = {
  1: {
    assigneeName: "Ana Costa",
    estimatedHours: 10,
    doneHours: 4,
    priorityLabel: "P1",
  },
  2: {
    assigneeName: "Ana Costa",
    estimatedHours: 6,
    doneHours: 2,
    priorityLabel: "P1",
  },
  3: {
    assigneeName: "Ana Costa",
    estimatedHours: 4,
    doneHours: 1,
    priorityLabel: "P2",
  },
  4: {
    assigneeName: "Leo Irineu",
    estimatedHours: 6,
    doneHours: 3,
    priorityLabel: "P2",
  },
  5: {
    assigneeName: "Leo Irineu",
    estimatedHours: 4,
    doneHours: 0,
    priorityLabel: "P3",
  },
  6: {
    assigneeName: "Time ArchFlow",
    estimatedHours: 4,
    doneHours: 0,
    priorityLabel: "P2",
  },
  7: {
    assigneeName: "Time ArchFlow",
    estimatedHours: 4,
    doneHours: 0,
    priorityLabel: "P1",
  },
};

export interface SprintTaskView {
  id: number;
  sprintId: string;
  userStoryId: number;
  title: string;
  assigneeName: string;
  estimatedHours: number;
  doneHours: number;
  priorityLabel: PriorityLabel;
}

export interface BurndownPoint {
  dateISO: string;
  label: string;
  idealRemaining: number;
  actualRemaining: number;
  delta: number;
}

export interface SprintViewModel {
  sprint: Sprint;
  items: SprintItem[];
  tasks: Task[];
  taskViews: SprintTaskView[];
  scopeHours: number;
  burnedHours: number;
  remainingHours: number;
  burndownPoints: BurndownPoint[];
}

function eachDayInclusive(startISO: string, endISO: string): Date[] {
  const dates: Date[] = [];
  const start = new Date(startISO);
  const end = new Date(endISO);

  const cursor = new Date(start);
  cursor.setUTCHours(0, 0, 0, 0);

  while (cursor <= end) {
    dates.push(new Date(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return dates;
}

export function buildMockSprintView(): SprintViewModel {
  const sprint = mockSprint;

  const items = mockSprintItems.filter(
    (item) => item.sprintId === sprint.id,
  );

  const userStoryIds = new Set(items.map((item) => item.userStoryId));

  const tasks = mockTasks.filter((task) =>
    userStoryIds.has(task.userStoryId),
  );

  const taskViews: SprintTaskView[] = tasks.map((task) => {
    const meta = taskMetaById[task.id] ?? {
      assigneeName: "Squad",
      estimatedHours: 2,
      doneHours: 0,
      priorityLabel: "P3" as PriorityLabel,
    };

    return {
      id: task.id,
      sprintId: sprint.id,
      userStoryId: task.userStoryId,
      title: task.title,
      assigneeName: meta.assigneeName,
      estimatedHours: meta.estimatedHours,
      doneHours: meta.doneHours,
      priorityLabel: meta.priorityLabel,
    };
  });

  const scopeHours = taskViews.reduce(
    (sum, task) => sum + task.estimatedHours,
    0,
  );

  const burnedHours = taskViews.reduce(
    (sum, task) => sum + task.doneHours,
    0,
  );

  const remainingHours = Math.max(scopeHours - burnedHours, 0);

  const days = eachDayInclusive(sprint.startDate, sprint.endDate);
  const totalDays = Math.max(days.length, 1);

  const effectiveBurned = scopeHours - remainingHours;
  const burndownPoints: BurndownPoint[] = days.map((day, index) => {
    const t = totalDays === 1 ? 0 : index / (totalDays - 1);

    const idealRemaining = scopeHours * (1 - t);
    const actualRemainingRaw = scopeHours - effectiveBurned * t;
    const actualRemaining = Math.max(actualRemainingRaw, 0);

    const delta = actualRemaining - idealRemaining;

    const label = day.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });

    const dateISO = day.toISOString().slice(0, 10);

    return {
      dateISO,
      label,
      idealRemaining: Number(idealRemaining.toFixed(2)),
      actualRemaining: Number(actualRemaining.toFixed(2)),
      delta: Number(delta.toFixed(2)),
    };
  });

  return {
    sprint,
    items,
    tasks,
    taskViews,
    scopeHours,
    burnedHours,
    remainingHours,
    burndownPoints,
  };
}

