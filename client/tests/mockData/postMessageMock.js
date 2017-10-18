import sinon from 'sinon';

export default {
  props: {
    apiError: {
      redirect: {
        yes: true,
        to: '/messageboard'
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
    history: { push: sinon.spy() },
    getPostItMembers: sinon.spy(),
    resetLoadingState: sinon.spy(),
    resetRedirect: sinon.spy(),
    getMessages: sinon.spy(),
    getGroupsForUser: sinon.spy(),
    getAllGroupsForUser: sinon.spy(),
    getGroupMembers: sinon.spy(),
    leaveGroup: sinon.spy(),
    deleteGroup: sinon.spy(),
    deleteMember: sinon.spy(),
    getState: sinon.spy(),
    allUserGroups: {
      userGroups: {
        12345: {
          info: {}
        }
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
