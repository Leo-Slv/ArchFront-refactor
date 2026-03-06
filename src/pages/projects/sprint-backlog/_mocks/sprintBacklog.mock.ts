import {
  mockProductBacklog,
  type Epic,
  type UserStory,
} from "../../backlog/_mocks/productBacklog.mock";
import { mockProjects } from "../../_mocks/projects.mock";
import { getUserById } from "../../../../mocks/users.mock";
import type { User } from "../../../../types/user";

export type SprintStatus = "planned" | "active" | "completed";
export type TaskStatus = "todo" | "in-progress" | "done";
export type PriorityLevel = 1 | 2 | 3;
export type PriorityLabel = "P1" | "P2" | "P3";

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  capacityHours: number;
  status: SprintStatus;
}

export interface SprintItem {
  id: string;
  sprintId: string;
  userStoryId: string;
  position: number;
}

export interface Task {
  id: string;
  userStoryId: string;
  position: number;
  title: string;
  description: string;
  priority: PriorityLevel;
  assigneeId: string;
  estimateMinutes: number;
  loggedMinutes: number;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

interface StorySource {
  epic: Epic;
  story: UserStory;
}

export interface StoryTaskRowView {
  id: string;
  userStoryId: string;
  title: string;
  description: string;
  priorityLabel: PriorityLabel;
  assignee: User;
  estimatedHours: number;
  doneHours: number;
}

export interface SprintBacklogStoryView {
  id: string;
  title: string;
  epicName: string;
  description: string;
  effort: number;
  assignee: User;
  tasks: StoryTaskRowView[];
}

export interface AssigneeWorkloadView {
  assigneeId: string;
  assignee: User;
  storyCount: number;
  taskCount: number;
  estimatedHours: number;
  doneHours: number;
  remainingHours: number;
  averageTaskHours: number;
  loadLabel: string;
  progressRatio: number;
  sprintWeightRatio: number;
  statusChips: string[];
  topTasks: StoryTaskRowView[];
}

export interface SprintBacklogViewModel {
  sprint: Sprint;
  storyCount: number;
  taskCount: number;
  estimatedHours: number;
  doneHours: number;
  remainingHours: number;
  stories: SprintBacklogStoryView[];
  assignees: AssigneeWorkloadView[];
}

const fallbackProject = mockProjects[0];
const sourceProject =
  mockProjects.find((project) => project.id === mockProductBacklog.projectId) ??
  fallbackProject;

const storySources: StorySource[] = mockProductBacklog.epics.flatMap((epic) =>
  epic.userStories.map((story) => ({ epic, story })),
);

const storySourceById = new Map(
  storySources.map((entry) => [entry.story.id, entry]),
);

const projectMemberById = new Map(
  sourceProject.members.map((member) => [member.userId, member.user]),
);

export const mockSprintBacklogSprint: Sprint = {
  id: "sprint-14-backlog",
  projectId: sourceProject.id,
  name: "Sprint 14",
  startDate: "2026-03-03T00:00:00Z",
  endDate: "2026-03-14T00:00:00Z",
  capacityHours: 24,
  status: "active",
};

export const mockSprintItems: SprintItem[] = [
  {
    id: "sprint-item-story-dnd-columns",
    sprintId: mockSprintBacklogSprint.id,
    userStoryId: "story-dnd-columns",
    position: 0,
  },
  {
    id: "sprint-item-story-epic-list",
    sprintId: mockSprintBacklogSprint.id,
    userStoryId: "story-epic-list",
    position: 1,
  },
];

export const mockTasks: Task[] = [
  {
    id: "task-dnd-native",
    userStoryId: "story-dnd-columns",
    position: 0,
    title: "Implementar drag & drop nativo",
    description: "Usar HTML5 DnD e persistir coluna/posição no estado.",
    priority: 1,
    assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    estimateMinutes: 300,
    loggedMinutes: 120,
    status: "in-progress",
    createdAt: "2026-03-05T21:18:43.9252451Z",
    updatedAt: "2026-03-05T21:18:43.9253329Z",
  },
  {
    id: "task-dnd-persistence",
    userStoryId: "story-dnd-columns",
    position: 1,
    title: "Persistir coluna e posição no backend",
    description: "Salvar a ordem das colunas para refletir o fluxo atualizado.",
    priority: 1,
    assigneeId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    estimateMinutes: 360,
    loggedMinutes: 120,
    status: "todo",
    createdAt: "2026-03-05T21:20:10.0000000Z",
    updatedAt: "2026-03-05T21:20:10.0000000Z",
  },
  {
    id: "task-backlog-epic-table",
    userStoryId: "story-epic-list",
    position: 0,
    title: "Tela de backlog agrupada por epic",
    description: "Tabela com prioridade, valor e status para leitura rápida.",
    priority: 2,
    assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
    estimateMinutes: 360,
    loggedMinutes: 60,
    status: "in-progress",
    createdAt: "2026-03-05T21:22:10.0000000Z",
    updatedAt: "2026-03-05T21:22:10.0000000Z",
  },
  {
    id: "task-backlog-preview",
    userStoryId: "story-epic-list",
    position: 1,
    title: "Listar epics e stories para refinement",
    description: "Exibir contexto resumido para cada epic durante a priorização.",
    priority: 2,
    assigneeId: "96cd4b95-acdf-4a62-9063-53292716b656",
    estimateMinutes: 180,
    loggedMinutes: 180,
    status: "done",
    createdAt: "2026-03-05T21:23:10.0000000Z",
    updatedAt: "2026-03-05T21:23:10.0000000Z",
  },
];

function minutesToHours(value: number): number {
  return Math.round((value / 60) * 10) / 10;
}

function resolveAssignee(assigneeId: string): User {
  return projectMemberById.get(assigneeId) ?? getUserById(assigneeId);
}

function priorityToLabel(priority: PriorityLevel): PriorityLabel {
  if (priority === 1) return "P1";
  if (priority === 2) return "P2";
  return "P3";
}

function formatLoadLabel(weightRatio: number): string {
  if (weightRatio >= 0.45) return "Alta";
  if (weightRatio >= 0.25) return "Média";
  return "Baixa";
}

export function buildSprintBacklogView(): SprintBacklogViewModel {
  const sprint = mockSprintBacklogSprint;

  const sprintItems = [...mockSprintItems]
    .filter((item) => item.sprintId === sprint.id)
    .sort((left, right) => left.position - right.position);

  const storyIds = new Set(sprintItems.map((item) => item.userStoryId));

  const sprintTasks = [...mockTasks]
    .filter((task) => storyIds.has(task.userStoryId))
    .sort((left, right) => left.position - right.position);

  const taskViewsByStoryId = new Map<string, StoryTaskRowView[]>();

  for (const task of sprintTasks) {
    const taskView: StoryTaskRowView = {
      id: task.id,
      userStoryId: task.userStoryId,
      title: task.title,
      description: task.description,
      priorityLabel: priorityToLabel(task.priority),
      assignee: resolveAssignee(task.assigneeId),
      estimatedHours: minutesToHours(task.estimateMinutes),
      doneHours: minutesToHours(task.loggedMinutes),
    };

    const currentList = taskViewsByStoryId.get(task.userStoryId) ?? [];
    currentList.push(taskView);
    taskViewsByStoryId.set(task.userStoryId, currentList);
  }

  const stories = sprintItems
    .map((item) => {
      const source = storySourceById.get(item.userStoryId);
      if (!source) {
        return null;
      }

      return {
        id: source.story.id,
        title: source.story.title,
        epicName: source.epic.name,
        description: source.story.description,
        effort: source.story.effort,
        assignee: resolveAssignee(source.story.assigneeId),
        tasks: taskViewsByStoryId.get(source.story.id) ?? [],
      } satisfies SprintBacklogStoryView;
    })
    .filter((story): story is SprintBacklogStoryView => Boolean(story));

  const estimatedMinutesTotal = sprintTasks.reduce(
    (sum, task) => sum + task.estimateMinutes,
    0,
  );
  const loggedMinutesTotal = sprintTasks.reduce(
    (sum, task) => sum + task.loggedMinutes,
    0,
  );

  const assignees = Array.from(
    sprintTasks.reduce((groups, task) => {
      const existing = groups.get(task.assigneeId) ?? [];
      existing.push(task);
      groups.set(task.assigneeId, existing);
      return groups;
    }, new Map<string, Task[]>()),
  )
    .map(([assigneeId, tasksForAssignee]) => {
      const assignee = resolveAssignee(assigneeId);
      const storyCount = new Set(tasksForAssignee.map((task) => task.userStoryId))
        .size;
      const estimatedMinutes = tasksForAssignee.reduce(
        (sum, task) => sum + task.estimateMinutes,
        0,
      );
      const loggedMinutes = tasksForAssignee.reduce(
        (sum, task) => sum + task.loggedMinutes,
        0,
      );
      const remainingMinutes = Math.max(estimatedMinutes - loggedMinutes, 0);
      const averageTaskHours = tasksForAssignee.length
        ? minutesToHours(estimatedMinutes / tasksForAssignee.length)
        : 0;
      const progressRatio =
        estimatedMinutes > 0 ? Math.min(loggedMinutes / estimatedMinutes, 1) : 0;
      const sprintWeightRatio =
        estimatedMinutesTotal > 0 ? estimatedMinutes / estimatedMinutesTotal : 0;

      const topTasks = [...tasksForAssignee]
        .sort((left, right) => right.estimateMinutes - left.estimateMinutes)
        .slice(0, 3)
        .map((task) => {
          const taskViews = taskViewsByStoryId.get(task.userStoryId) ?? [];
          return taskViews.find((candidate) => candidate.id === task.id);
        })
        .filter((task): task is StoryTaskRowView => Boolean(task));

      return {
        assigneeId,
        assignee,
        storyCount,
        taskCount: tasksForAssignee.length,
        estimatedHours: minutesToHours(estimatedMinutes),
        doneHours: minutesToHours(loggedMinutes),
        remainingHours: minutesToHours(remainingMinutes),
        averageTaskHours,
        loadLabel: formatLoadLabel(sprintWeightRatio),
        progressRatio,
        sprintWeightRatio,
        statusChips: [loggedMinutes <= estimatedMinutes ? "OK" : "Risco", "assignee"],
        topTasks,
      } satisfies AssigneeWorkloadView;
    })
    .sort((left, right) => right.estimatedHours - left.estimatedHours);

  return {
    sprint,
    storyCount: stories.length,
    taskCount: sprintTasks.length,
    estimatedHours: minutesToHours(estimatedMinutesTotal),
    doneHours: minutesToHours(loggedMinutesTotal),
    remainingHours: minutesToHours(
      Math.max(estimatedMinutesTotal - loggedMinutesTotal, 0),
    ),
    stories,
    assignees,
  };
}
