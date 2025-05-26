import { Post as PrismaPost } from '@prisma/client';
import { GraphQLContext } from './schema.js';

export const resolvePosts = async (
  _parent: unknown,
  _args: unknown,
  context: GraphQLContext,
) => {
  return context.prisma.post.findMany();
};

export const resolvePost = async (
  _parent: unknown,
  args: { id: string },
  context: GraphQLContext,
): Promise<PrismaPost | null> => {
  return context.prisma.post.findUnique({
    where: { id: args.id },
  });
};

export const resolveMemberTypes = (
  _parent: unknown,
  _args: unknown,
  context: GraphQLContext,
) => {
  return context.prisma.memberType.findMany();
};

export const resolveMemberType = async (
  _parent: unknown,
  args: { id: 'BASIC' | 'PREMIUM' },
  context: GraphQLContext,
) => {
  const memberType = await context.prisma.memberType.findUnique({
    where: { id: args.id },
  });
  if (!memberType) throw new Error('MemberType not found');
  return memberType;
};

export const resolveProfiles = (
  _parent: unknown,
  _args: unknown,
  context: GraphQLContext,
) => {
  return context.prisma.profile.findMany();
};

export const resolveProfile = async (
  _parent: unknown,
  args: { id: string },
  context: GraphQLContext,
) => {
  return context.prisma.profile.findUnique({
    where: { id: args.id },
  });
};

const userInclude = {
  profile: true,
  posts: true,
  userSubscribedTo: {
    include: {
      author: {
        include: {
          userSubscribedTo: {
            include: {
              author: true,
            },
          },
          subscribedToUser: {
            include: {
              subscriber: true,
            },
          },
        },
      },
    },
  },
  subscribedToUser: {
    include: {
      subscriber: {
        include: {
          userSubscribedTo: {
            include: {
              author: true,
            },
          },
          subscribedToUser: {
            include: {
              subscriber: true,
            },
          },
        },
      },
    },
  },
};

export const resolveUsers = (
  _parent: unknown,
  _args: unknown,
  context: GraphQLContext,
) => {
  return context.prisma.user.findMany({ include: userInclude });
};

export const resolveUser = async (
  _parent: unknown,
  args: { id: string },
  context: GraphQLContext,
) => {
  return context.prisma.user.findUnique({
    where: { id: args.id },
    include: userInclude,
  });
};
