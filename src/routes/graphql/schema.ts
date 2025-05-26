import { PrismaClient } from '@prisma/client';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { Post } from './types/post.js';
import { MemberType, MemberTypeId } from './types/memberType.js';
import { Profile } from './types/profile.js';
import { User, UserSource } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import { Post as PostType } from './types/post.js';
import { Post as PrismaPost } from '@prisma/client';
import { userInclude } from './utils.js';

export interface GraphQLContext {
  prisma: PrismaClient;
}

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType<unknown, GraphQLContext>({
    name: 'Query',
    fields: {
      posts: {
        type: new GraphQLList(Post),
        resolve: async (_parent, _args, context) => {
          return context.prisma.post.findMany();
        },
      },
      post: {
        type: PostType as GraphQLObjectType<PrismaPost, GraphQLContext>,
        args: {
          id: { type: UUIDType },
        },
        resolve: async (_parent, args: { id: string }, context) => {
          const post = await context.prisma.post.findUnique({
            where: { id: args.id },
          });
          return post ?? null;
        },
      },

      memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: (_parent, _args, context) => {
          return context.prisma.memberType.findMany();
        },
      },
      memberType: {
        type: MemberType,
        args: {
          id: { type: new GraphQLNonNull(MemberTypeId) },
        },
        resolve: async (_parent, args: { id: 'BASIC' | 'PREMIUM' }, context) => {
          const memberType = await context.prisma.memberType.findUnique({
            where: { id: args.id },
          });
          if (!memberType) throw new Error('MemberType not found');
          return memberType;
        },
      },

      profiles: {
        type: new GraphQLList(Profile),
        resolve: (_parent, _args, context) => {
          return context.prisma.profile.findMany();
        },
      },
      profile: {
        type: Profile,
        args: {
          id: { type: UUIDType },
        },
        resolve: async (_parent, args: { id: string }, context) => {
          const profile = await context.prisma.profile.findUnique({
            where: { id: args.id },
          });
          return profile ?? null;
        },
      },

      users: {
        type: new GraphQLList(User),
        resolve: (_parent, _args, context) => {
          return context.prisma.user.findMany({ include: userInclude });
        },
      },
      user: {
        type: User as GraphQLObjectType<UserSource, GraphQLContext>,
        args: {
          id: { type: UUIDType },
        },
        resolve: async (_parent, args: { id: string }, context) => {
          const user = await context.prisma.user.findUnique({
            where: { id: args.id },
            include: userInclude,
          });

          if (!user) return null;

          return user;
        },
      },
    },
  }),
});
