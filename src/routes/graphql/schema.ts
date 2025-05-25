import { PrismaClient } from '@prisma/client';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { Post } from './types/posts.js';
import { MemberType } from './types/memberType.js';
import { Profile } from './types/profiles.js';
import { User } from './types/user.js';

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
        type: Post,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_parent, args: { id: string }, context) => {
          const post = await context.prisma.post.findUnique({
            where: { id: args.id },
          });
          if (!post) throw new Error('Post not found');
          return post;
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
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_parent, args: { id: string }, context) => {
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
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_parent, args: { id: string }, context) => {
          const profile = await context.prisma.profile.findUnique({
            where: { id: args.id },
          });
          if (!profile) throw new Error('Profile not found');
          return profile;
        },
      },
      users: {
        type: new GraphQLList(User),
        resolve: (_parent, _args, context) => {
          return context.prisma.user.findMany({
            include: {
              profile: true,
              posts: true,
              userSubscribedTo: true,
              subscribedToUser: true,
            },
          });
        },
      },
      user: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: User,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_parent, args: { id: string }, context) => {
          const user = await context.prisma.user.findUnique({
            where: { id: args.id },
            include: {
              profile: true,
              posts: true,
              userSubscribedTo: true,
              subscribedToUser: true,
            },
          });
          if (!user) throw new Error('User not found');
          return user;
        },
      },
    },
  }),
});
