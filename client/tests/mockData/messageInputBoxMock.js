import sinon from 'sinon';

export default {
  props: {
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      notify: sinon.spy(),
      postMessage: sinon.spy(),
      match: {
        params: {
          groupId: '12345'
        }
      },
      groups: {
        userGroups: {
          12345: {
            members: {}
          }
        }
      },
      history: [],
      postItInfo: {
        members: {
          postItMembers: {

          }
        }
      }
    },
    socket: {
      on: (action, cb) => { cb(); },
      emit: () => {}
    },
  }
};
