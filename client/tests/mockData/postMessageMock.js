import sinon from 'sinon';

export default {
  props: {
    apiError: {
      redirect: {
        yes: false,
        to: null
      }
    },
    appInfo: {
      userDetails: {}
    },
    messageInfo: {
      seenBy: []
    },
    postItInfo: {
      members: {
        postItMembers: {},
        meta: { count: 0, allLoaded: 0 }
      }
    },
    match: {
      params: { groupId: '12345' }
    },
    getPostItMembers: sinon.spy(),
    resetLoadingState: sinon.spy(),
    getMessages: sinon.spy(),
    getAllGroupsForUser: sinon.spy(),
    getGroupMembers: sinon.spy(),
    leaveGroup: sinon.spy(),
    deleteGroup: sinon.spy(),
    deleteMember: sinon.spy(),
    getState: sinon.spy(),
    match: {
      params: {
        groupId: '12345'
      }
    },
    allUserGroups: {
      userGroups: {

      },
      meta: {
        count: 0
      }
    },
    groups: {
      userGroups: {

      }
    },
  }
};
