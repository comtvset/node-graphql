import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Profile } from './profiles.js';
import { Post } from './posts.js';
import { GraphQLContext } from '../schema.js';

export interface UserSource {
  id: string;
  name: string;
  balance: number;
  profile: unknown;
  posts: unknown[];
  userSubscribedTo: unknown[];
  subscribedToUser: unknown[];
}

export const User = new GraphQLObjectType<UserSource, GraphQLContext>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { type: Profile },
    posts: { type: new GraphQLList(Post) },
    userSubscribedTo: { type: new GraphQLList(User) },
    subscribedToUser: { type: new GraphQLList(User) },
  }),
});
