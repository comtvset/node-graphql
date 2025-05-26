export const userInclude = {
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
