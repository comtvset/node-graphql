import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLContext } from '../schema.js';
import type { Post as PrismaPost } from '@prisma/client';
import { User, UserSource } from './user.js';

export const Post = new GraphQLObjectType<PrismaPost, GraphQLContext>({
  name: 'Post',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: User as GraphQLObjectType<UserSource, GraphQLContext>,
      resolve: (parent, _args, context: GraphQLContext) => {
        return context.prisma.user.findUnique({
          where: { id: parent.authorId },
        });
      },
    },
  },
});
