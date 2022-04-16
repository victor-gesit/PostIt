import sinon from 'sinon';

export default {
  dataLoading: false,
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
  match: {
    params: {
      groupId: 'abcde'
    }
  },
  groups: { meta: { count: 0 }, userGroups: { } },
  allUserGroups: { meta: { count: 0 }, userGroups: {} },
  resetLoadingState: sinon.spy(),
  resetRedirect: sinon.spy(),
  getGroupsForUser: sinon.spy(),
  getAllGroupsForUser: sinon.spy(),

  propsWithGroups: {
    dataLoading: false,
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
    match: {
      params: {
        groupId: 'abcde'
      }
    },
    groups: { meta: { count: 1 }, userGroups: { abcde: { info: { id: 'abcde' } } } },
    allUserGroups: { meta: { count: 1 }, userGroups: {} },
    resetLoadingState: sinon.spy(),
    resetRedirect: sinon.spy(),
    getGroupsForUser: sinon.spy(),
    getAllGroupsForUser: sinon.spy(),
  }
};
