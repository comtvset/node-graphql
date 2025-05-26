import { Prisma } from '@prisma/client';
import type { GraphQLContext } from './schema.js';
import { ChangePostInput, ChangeProfileInput } from './types/inputs/change.js';
import { CreateUserInput } from './types/inputs/create.js';

export const mutationResolvers = {
  createUser: async (
    _: unknown,
    { dto }: { dto: CreateUserInput },
    context: GraphQLContext,
  ) => {
    return context.prisma.user.create({ data: dto as Prisma.UserCreateInput });
  },

  createPost: async (
    _: unknown,
    { dto }: { dto: CreateUserInput },
    context: GraphQLContext,
  ) => {
    return context.prisma.post.create({
      data: dto as unknown as Prisma.PostCreateInput,
    });
  },

  createProfile: async (
    _: unknown,
    { dto }: { dto: CreateUserInput },
    context: GraphQLContext,
  ) => {
    return context.prisma.profile.create({
      data: dto as unknown as Prisma.ProfileCreateInput,
    });
  },

  deleteUser: async (_: unknown, { id }: { id: string }, context: GraphQLContext) => {
    try {
      await context.prisma.user.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },

  deletePost: async (_: unknown, { id }: { id: string }, context: GraphQLContext) => {
    try {
      await context.prisma.post.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },

  deleteProfile: async (_: unknown, { id }: { id: string }, context: GraphQLContext) => {
    try {
      await context.prisma.profile.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },

  changeUser: async (
    _: unknown,
    { id, dto }: { id: string; dto: CreateUserInput },
    context: GraphQLContext,
  ) => {
    const existing = await context.prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new Error(`User with id ${id} not found`);
    }
    return context.prisma.user.update({ where: { id }, data: dto });
  },

  changePost: async (
    _: unknown,
    { id, dto }: { id: string; dto: ChangePostInput },
    context: GraphQLContext,
  ) => {
    const existing = await context.prisma.post.findUnique({ where: { id } });
    if (!existing) {
      throw new Error(`Post with id ${id} not found`);
    }
    return context.prisma.post.update({ where: { id }, data: dto });
  },

  changeProfile: async (
    _: unknown,
    { id, dto }: { id: string; dto: ChangeProfileInput },
    context: GraphQLContext,
  ) => {
    const existing = await context.prisma.profile.findUnique({ where: { id } });
    if (!existing) {
      throw new Error(`Profile with id ${id} not found`);
    }
    return context.prisma.profile.update({ where: { id }, data: dto });
  },

  subscribeTo: async (
    _: unknown,
    { userId, authorId }: { userId: string; authorId: string },
    context: GraphQLContext,
  ) => {
    await context.prisma.user.update({
      where: { id: userId },
      data: { userSubscribedTo: { create: { authorId } } },
    });
    return true;
  },

  unsubscribeFrom: async (
    _: unknown,
    { userId, authorId }: { userId: string; authorId: string },
    context: GraphQLContext,
  ) => {
    await context.prisma.subscribersOnAuthors.delete({
      where: { subscriberId_authorId: { subscriberId: userId, authorId } },
    });
    return true;
  },
};
