import sinon from 'sinon';

export default {
  props: {
    allUserGroups: {
      userGroups: {
        12345: {
          info: {
            id: '12345',
            title: 'A Group'
          }
        }
      },
      meta: {
        count: 0
      }
    },
    appInfo: {
      userDetails: {
        id: 'meme',
        firstName: 'Me',
        lastName: 'You'
      }
    },
    match: {
      params: {
        groupId: '12345'
      }
    },
    resetLoadingState: sinon.spy(),
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
      },
      appInfo: {
        userDetails: {
          id: 'meme',
          firstName: 'Me',
          lastName: 'You'
        }
      }
    }
  }
};
