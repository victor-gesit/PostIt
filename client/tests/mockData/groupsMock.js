import sinon from 'sinon';

export default {
  props: {
    store: {
      allUserGroups: {
        userGroups: {
          12345: {},
        },
        meta: {
          count: 1
        }
      },
      getMessages: sinon.spy(),
      getAllGroupsForUser: sinon.spy(),
      getGroupMembers: sinon.spy(),
      loadMessages: sinon.spy()
    }
  }
};
