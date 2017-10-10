import sinon from 'sinon';

export default {
  props: {
    apiError: {
      redirect: {
        yes: false,
        to: null
      }
    },
    messageInfo: {
      seenBy: []
    },
    getPostItMembers: sinon.spy(),
    getMessages: sinon.spy(),
    getAllGroupsForUser: sinon.spy(),
    getGroupMembers: sinon.spy(),
    leaveGroup: sinon.spy(),
    deleteGroup: sinon.spy(),
    deleteMember: sinon.spy(),
    match: {
      params: {
        groupId: '12345'
      }
    },
    allUserGroups: {
      userGroups: {

      }
    },
    groups: {
      userGroups: {

      }
    },
  }
};
