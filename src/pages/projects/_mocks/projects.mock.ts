import {
  currentUserId,
  currentUserProfile,
  getUserById,
  mockUsers,
} from "../../../mocks/users.mock";
import type { User } from "../../../types/user";

export type ProjectStatus = "active" | "paused" | "archived";

export interface ProjectMember {
  userId: string;
  user: User;
  role: "owner" | "editor" | "viewer";
  joinedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  owner: User;
  members: ProjectMember[];
  status: ProjectStatus;
  createdAt: string;
}

export { currentUserId, currentUserProfile, mockUsers };
export type { User };

const baseProject = {
  id: "39f134b8-30ba-43d2-837a-44b9ce9b9f1b",
  name: "Test Project",
  description: "A test request to create a Project",
  ownerId: currentUserProfile.id,
  owner: currentUserProfile,
  members: [
    {
      userId: currentUserProfile.id,
      user: currentUserProfile,
      role: "owner" as const,
      joinedAt: "2026-02-27T20:44:42.187872Z",
    },
  ],
  status: "active" as const,
  createdAt: "2026-02-27T20:44:42.187409Z",
};

function buildMembers({
  ownerId,
  size,
  requiredUserIds,
  seedOffset,
}: {
  ownerId: string;
  size: number;
  requiredUserIds?: string[];
  seedOffset: number;
}): ProjectMember[] {
  const owner = getUserById(ownerId);
  const members: ProjectMember[] = [
    {
      userId: owner.id,
      user: owner,
      role: "owner",
      joinedAt: owner.createdAt,
    },
  ];

  for (const userId of requiredUserIds ?? []) {
    if (members.some((member) => member.userId === userId)) {
      continue;
    }

    const user = getUserById(userId);
    members.push({
      userId: user.id,
      user,
      role: "editor",
      joinedAt: "2026-03-01T10:11:00.000000Z",
    });
  }

  let cursor = 0;
  while (members.length < size) {
    const user = mockUsers[(seedOffset + cursor) % mockUsers.length];

    if (!members.some((member) => member.userId === user.id)) {
      members.push({
        userId: user.id,
        user,
        role: members.length % 2 === 0 ? "editor" : "viewer",
        joinedAt: "2026-03-02T09:00:00.000000Z",
      });
    }

    cursor += 1;
  }

  return members;
}

const anaUser = getUserById("3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c");
const rafaelUser = getUserById("f1f52f5a-2ec8-41cb-a304-a2efa17f769d");

export const mockProjects: Project[] = [
  {
    ...baseProject,
    members: buildMembers({
      ownerId: currentUserId,
      size: 3,
      seedOffset: 1,
    }),
  },
  {
    id: "d8fe4f36-24b2-4d23-beb1-411d1f8df4f7",
    name: "Roadmap 2026",
    description:
      "Planejamento trimestral com backlog de arquitetura, sprint board e metas de entrega por squad.",
    ownerId: currentUserId,
    owner: currentUserProfile,
    members: buildMembers({
      ownerId: currentUserId,
      size: 4,
      seedOffset: 2,
    }),
    status: "active",
    createdAt: "2026-03-01T13:22:10.000000Z",
  },
  {
    id: "d339e7f4-f03f-40f0-bfe8-5f27f5b65f5b",
    name: "ABP - Plataforma",
    description:
      "Projeto colaborativo com foco em entregas por sprint e fluxo continuo de backlog para o time de produto.",
    ownerId: anaUser.id,
    owner: anaUser,
    members: buildMembers({
      ownerId: anaUser.id,
      size: 4,
      requiredUserIds: [currentUserId],
      seedOffset: 3,
    }),
    status: "active",
    createdAt: "2026-03-02T10:15:10.000000Z",
  },
  {
    id: "cb63837f-e9cb-4441-bdb5-39f2b9dbe77a",
    name: "InboxIQ",
    description:
      "Triagem de e-mails e automacoes de pipeline para priorizacao de tarefas com indicadores compartilhados.",
    ownerId: rafaelUser.id,
    owner: rafaelUser,
    members: buildMembers({
      ownerId: rafaelUser.id,
      size: 2,
      requiredUserIds: [currentUserId],
      seedOffset: 1,
    }),
    status: "paused",
    createdAt: "2026-03-03T08:05:00.000000Z",
  },
];
