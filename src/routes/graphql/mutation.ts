import { GraphQLNonNull, GraphQLObjectType, GraphQLBoolean } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { Post as PrismaPost } from '@prisma/client';
import { User, UserSource } from './types/user.js';
import { Post } from './types/post.js';
import { Profile } from './types/profile.js';
import type { GraphQLContext } from './schema.js';
import {
  CreatePostInputType,
  CreateProfileInputType,
  CreateUserInputType,
} from './types/inputs/create.js';
import {
  ChangePostInputType,
  ChangeProfileInputType,
  ChangeUserInputType,
} from './types/inputs/change.js';
import { mutationResolvers } from './mutationResolvers.js';



export const RootMutationType = new GraphQLObjectType<unknown, GraphQLContext>({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      type: User as GraphQLObjectType<UserSource, GraphQLContext>,
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInputType) },
      },
      resolve: mutationResolvers.createUser,
    },

    createPost: {
      type: Post as GraphQLObjectType<PrismaPost, GraphQLContext>,
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInputType) },
      },
      resolve: mutationResolvers.createPost,
    },

    createProfile: {
      type: Profile,
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInputType) },
      },
      resolve: mutationResolvers.createProfile,
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: mutationResolvers.deleteUser,
    },

    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: mutationResolvers.deletePost,
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: mutationResolvers.deleteProfile,
    },

    changeUser: {
      type: User as GraphQLObjectType<UserSource, GraphQLContext>,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInputType) },
      },
      resolve: mutationResolvers.changeUser,
    },

    changePost: {
      type: Post as GraphQLObjectType<PrismaPost, GraphQLContext>,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInputType) },
      },
      resolve: mutationResolvers.changePost,
    },

    changeProfile: {
      type: Profile,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
      },
      resolve: mutationResolvers.changeProfile,
    },

    subscribeTo: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: mutationResolvers.subscribeTo,
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: mutationResolvers.unsubscribeFrom,
    },
  }),
});
