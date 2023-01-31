import { user } from '@prisma/client';
export type UserPayload = Omit<user, 'password' | 'hash'>;
export type UserPayloadResponse = { user: UserPayload };
export type TokensResponse = { accessToken: string; refreshToken: string };
