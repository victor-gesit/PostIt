export default {
  initialState: {
    // Hold some groups (batch loading from db for pagination)
    groups: { meta: { count: 0, allLoaded: 0 }, userGroups: {} },
    // This will contain all the groups and everything about each
    allUserGroups: { meta: { count: 0, allLoaded: 0 }, userGroups: {} },
    // This indicates any error during queries to the API
    apiError: { errored: false,
      message: null,
      redirect: { yes: false, to: null } },
    appInfo: {
      userDetails: {
        firstName: null,
        lastName: null,
        id: null,
        token: null,
        email: null,
        phone: null
      },
      authState: { signedIn: false, message: null },
      loadedMessages: {
        groupId: null
      }
    },
    messageInfo: {
      seenBy: []
    },
    dataLoading: false,
    postItInfo: {
      members: {
        postItMembers: {
        },
        meta: { count: 0, allLoaded: 0 }
      },
      groups: {
        postItGroups: {},
        meta: { count: 0, allLoaded: 0 }
      }
    }
  },
  actionSignOut: { type: 'SIGN_OUT' }
};
