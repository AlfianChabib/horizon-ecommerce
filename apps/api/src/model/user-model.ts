import { Profile, User } from '@prisma/client';

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};

export type CreateUserRequest = {
  email: string;
  password: string;
};

export type SessionResponseData = {
  id: number;
  username: string;
  email: string;
  role: string;
  image: string | null;
  createdAt: Date;
};

export function toSessionResponse(user: User & { profile: Profile }): SessionResponseData {
  return {
    id: user.id,
    username: user.username!,
    email: user.email,
    role: user.role,
    image: user.profile.image,
    createdAt: user.createdAt,
  };
}
