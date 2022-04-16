import sinon from 'sinon';

export default {
  props: {
    groupDetails: {
      id: '12345'
    },
    store: {
      getMessages: sinon.spy(),
      getGroupsForUser: sinon.spy(),
      getGroupMembers: sinon.spy(),
      loadMessages: sinon.spy()
    }
  }
};
