import sinon from 'sinon';

export default {
  props: {
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
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

          },
          meta: {
            count: 1
          }
        }
      }
    }
  }
};
