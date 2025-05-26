import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Profile } from './profile.js';
import { Post } from './post.js';
import { GraphQLContext } from '../schema.js';

interface UserSubscriptionRelation {
  author: UserSource | null;
  subscriber: UserSource | null;
}

export interface UserSource {
  id: string;
  name: string;
  balance: number;
  profile: unknown;
  posts: unknown[];
  userSubscribedTo: UserSubscriptionRelation[];
  subscribedToUser: UserSubscriptionRelation[];
}

export const User = new GraphQLObjectType<UserSource, GraphQLContext>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { type: Profile },
    posts: { type: new GraphQLList(Post) },
    userSubscribedTo: {
      type: new GraphQLList(User),
      resolve: (parent) => {
        return parent.userSubscribedTo
          .map((rel) => rel.author)
          .filter((author): author is UserSource => author !== null);
      },
    },

    subscribedToUser: {
      type: new GraphQLList(User),
      resolve: (parent) => {
        return parent.subscribedToUser
          .map((rel) => rel.subscriber)
          .filter((subscriber): subscriber is UserSource => subscriber !== null);
      },
    },
  }),
});
