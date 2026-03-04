export type ProjectStatus = "active" | "paused" | "archived";

export interface ProjectMember {
  userId: string;
  name: string;
  email: string;
  role: "owner" | "editor" | "viewer";
  joinedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerName: string;
  members: ProjectMember[];
  status: ProjectStatus;
  createdAt: string;
}

export const currentUserId = "96cd4b95-acdf-4a62-9063-53292716b656";

export const baseProject = {
  id: "39f134b8-30ba-43d2-837a-44b9ce9b9f1b",
  name: "Test Project",
  description: "A test request to create a Project",
  ownerId: "96cd4b95-acdf-4a62-9063-53292716b656",
  ownerName: "Leo",
  members: [
    {
      userId: "96cd4b95-acdf-4a62-9063-53292716b656",
      name: "Leo",
      email: "leonardo1692004@gmail.com",
      role: "owner",
      joinedAt: "2026-02-27T20:44:42.187872",
    },
  ],
  status: "active",
  createdAt: "2026-02-27T20:44:42.187409",
} as const;

interface MemberSeed {
  userId: string;
  name: string;
  email: string;
}

const memberSeeds: MemberSeed[] = [
  {
    userId: currentUserId,
    name: "Leo",
    email: "leonardo1692004@gmail.com",
  },
  {
    userId: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
    name: "Ana Costa",
    email: "ana.costa@archflow.dev",
  },
  {
    userId: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
    name: "Rafael Souza",
    email: "rafael.souza@archflow.dev",
  },
  {
    userId: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
    name: "Marina Silva",
    email: "marina.silva@archflow.dev",
  },
  {
    userId: "7bf56d38-8970-4e47-a95d-38edbb59de6c",
    name: "Joao Lima",
    email: "joao.lima@archflow.dev",
  },
  {
    userId: "6a7df596-6436-4ce5-8228-84344ca89f03",
    name: "Sofia Rocha",
    email: "sofia.rocha@archflow.dev",
  },
];

function findSeed(userId: string): MemberSeed {
  const seed = memberSeeds.find((candidate) => candidate.userId === userId);

  if (!seed) {
    throw new Error(`Missing member seed for userId: ${userId}`);
  }

  return seed;
}

function buildMembers({
  ownerId,
  ownerName,
  ownerEmail,
  size,
  requiredMemberIds,
  seedOffset,
}: {
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  size: number;
  requiredMemberIds?: string[];
  seedOffset: number;
}): ProjectMember[] {
  const members: ProjectMember[] = [
    {
      userId: ownerId,
      name: ownerName,
      email: ownerEmail,
      role: "owner",
      joinedAt: "2026-02-27T20:44:42.187872",
    },
  ];

  for (const memberId of requiredMemberIds ?? []) {
    if (members.some((member) => member.userId === memberId)) {
      continue;
    }

    const seed = findSeed(memberId);
    members.push({
      userId: seed.userId,
      name: seed.name,
      email: seed.email,
      role: "editor",
      joinedAt: "2026-03-01T10:11:00.000000",
    });
  }

  let cursor = 0;
  while (members.length < size) {
    const seed = memberSeeds[(seedOffset + cursor) % memberSeeds.length];

    if (!members.some((member) => member.userId === seed.userId)) {
      members.push({
        userId: seed.userId,
        name: seed.name,
        email: seed.email,
        role: members.length % 2 === 0 ? "editor" : "viewer",
        joinedAt: "2026-03-02T09:00:00.000000",
      });
    }

    cursor += 1;
  }

  return members;
}

export const currentUserProfile = {
  userId: currentUserId,
  name: "Leo Irineu",
  plan: "free",
} as const;

const anaSeed = findSeed("3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c");
const rafaelSeed = findSeed("f1f52f5a-2ec8-41cb-a304-a2efa17f769d");

export const mockProjects: Project[] = [
  {
    ...baseProject,
    members: buildMembers({
      ownerId: currentUserId,
      ownerName: "Leo",
      ownerEmail: "leonardo1692004@gmail.com",
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
    ownerName: "Leo",
    members: buildMembers({
      ownerId: currentUserId,
      ownerName: "Leo",
      ownerEmail: "leonardo1692004@gmail.com",
      size: 5,
      seedOffset: 3,
    }),
    status: "active",
    createdAt: "2026-03-01T13:22:10.000000",
  },
  {
    id: "d339e7f4-f03f-40f0-bfe8-5f27f5b65f5b",
    name: "ABP - Plataforma",
    description:
      "Projeto colaborativo com foco em entregas por sprint e fluxo continuo de backlog para o time de produto.",
    ownerId: anaSeed.userId,
    ownerName: "Ana Costa",
    members: buildMembers({
      ownerId: anaSeed.userId,
      ownerName: anaSeed.name,
      ownerEmail: anaSeed.email,
      size: 4,
      requiredMemberIds: [currentUserId],
      seedOffset: 4,
    }),
    status: "active",
    createdAt: "2026-03-02T10:15:10.000000",
  },
  {
    id: "cb63837f-e9cb-4441-bdb5-39f2b9dbe77a",
    name: "InboxIQ",
    description:
      "Triagem de e-mails e automacoes de pipeline para priorizacao de tarefas com indicadores compartilhados.",
    ownerId: rafaelSeed.userId,
    ownerName: "Rafael Souza",
    members: buildMembers({
      ownerId: rafaelSeed.userId,
      ownerName: rafaelSeed.name,
      ownerEmail: rafaelSeed.email,
      size: 2,
      requiredMemberIds: [currentUserId],
      seedOffset: 2,
    }),
    status: "paused",
    createdAt: "2026-03-03T08:05:00.000000",
  },
];
