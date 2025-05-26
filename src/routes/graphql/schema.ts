import { PrismaClient } from '@prisma/client';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { Post } from './types/post.js';
import { MemberType, MemberTypeId } from './types/memberType.js';
import { Profile } from './types/profile.js';
import { User, UserSource } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import { Post as PrismaPost } from '@prisma/client';
import {
  resolveMemberType,
  resolveMemberTypes,
  resolvePost,
  resolvePosts,
  resolveProfile,
  resolveProfiles,
  resolveUser,
  resolveUsers,
} from './resolvers.js';

export interface GraphQLContext {
  prisma: PrismaClient;
}

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType<unknown, GraphQLContext>({
    name: 'Query',
    fields: {
      posts: {
        type: new GraphQLList(Post),
        resolve: resolvePosts,
      },
      post: {
        type: Post as GraphQLObjectType<PrismaPost, GraphQLContext>,
        args: { id: { type: UUIDType } },
        resolve: resolvePost,
      },
      memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: resolveMemberTypes,
      },
      memberType: {
        type: MemberType,
        args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
        resolve: resolveMemberType,
      },
      profiles: {
        type: new GraphQLList(Profile),
        resolve: resolveProfiles,
      },
      profile: {
        type: Profile,
        args: { id: { type: UUIDType } },
        resolve: resolveProfile,
      },
      users: {
        type: new GraphQLList(User),
        resolve: resolveUsers,
      },
      user: {
        type: User as GraphQLObjectType<UserSource, GraphQLContext>,
        args: { id: { type: UUIDType } },
        resolve: resolveUser,
      },
    },
  }),
});
