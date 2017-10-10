export default {
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
  groups: { meta: { count: 0 }, userGroups: {} },
  allUserGroups: { meta: { count: 0 }, userGroups: {} }
};
