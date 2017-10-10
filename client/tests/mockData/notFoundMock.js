import sinon from 'sinon';

export default {
  props: {
    allUserGroups: {

    },
    match: {
      params: {
        groupId: '12345'
      }
    },
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      deleteGroup: sinon.spy(),
      match: {
        params: {
          groupId: '12345'
        }
      },
      groups: {
        userGroups: {}
      },
      history: [],
      postItInfo: {
        members: {
          postItMembers: {

          }
        }
      }
    }
  }
};
