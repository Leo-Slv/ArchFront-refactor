import type { User } from "../types/user";

const leoUser: User = {
  id: "96cd4b95-acdf-4a62-9063-53292716b656",
  name: "Leo",
  email: "leonardo1692004@gmail.com",
  type: "free",
  passwordHash: "123",
  avatarUrl:
    "https://i.pravatar.cc/240?img=13",
  createdAt: "2026-02-27T20:44:42.187409Z",
  updatedAt: "2026-03-06T09:00:00.000000Z",
};

const anaCostaUser: User = {
  id: "3de5f097-4f16-4d1b-8bbf-b7830fa6ab4c",
  name: "Ana Costa",
  email: "ana.costa@archflow.dev",
  type: "editor",
  passwordHash: "mock-ana-123",
  avatarUrl: "https://i.pravatar.cc/240?img=32",
  createdAt: "2026-03-01T10:11:00.000000Z",
  updatedAt: "2026-03-06T09:05:00.000000Z",
};

const rafaelSouzaUser: User = {
  id: "f1f52f5a-2ec8-41cb-a304-a2efa17f769d",
  name: "Rafael Souza",
  email: "rafael.souza@archflow.dev",
  type: "viewer",
  passwordHash: "mock-rafael-123",
  avatarUrl: "https://i.pravatar.cc/240?img=14",
  createdAt: "2026-03-02T08:05:00.000000Z",
  updatedAt: "2026-03-06T09:10:00.000000Z",
};

const marinaSilvaUser: User = {
  id: "8e570a67-b8ed-4f88-822a-bd52ab4e693a",
  name: "Marina Silva",
  email: "marina.silva@archflow.dev",
  type: "editor",
  passwordHash: "mock-marina-123",
  avatarUrl: "https://i.pravatar.cc/240?img=47",
  createdAt: "2026-03-02T09:00:00.000000Z",
  updatedAt: "2026-03-06T09:15:00.000000Z",
};

export const mockUsers: User[] = [
  leoUser,
  anaCostaUser,
  rafaelSouzaUser,
  marinaSilvaUser,
];

const userById = new Map(mockUsers.map((user) => [user.id, user]));

export const currentUserId = leoUser.id;
export const currentUserProfile = leoUser;

export function getUserById(userId: string): User {
  const user = userById.get(userId);

  if (!user) {
    throw new Error(`Missing user mock for userId: ${userId}`);
  }

  return user;
}
