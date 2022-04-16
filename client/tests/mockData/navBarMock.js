import sinon from 'sinon';

export default {
  props: {
    isCreator: true,
    store: {
      getPostItMembers: sinon.spy(),
      getGroupMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      signOut: sinon.spy(),
      deleteGroup: sinon.spy(),
      allUserGroups: {
        userGroups: {},
        meta: {
          count: 0
        }
      },
      match: {
        params: {
          groupId: '12345'
        },
        path: '/postmessage/:groupId'
      },
      groups: {
        userGroups: {}
      },
      history: { push: sinon.spy() },
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
  },
  messageboardPage: {
    isCreator: true,
    store: {
      getPostItMembers: sinon.spy(),
      getGroupMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      signOut: sinon.spy(),
      deleteGroup: sinon.spy(),
      allUserGroups: {
        userGroups: {},
        meta: {
          count: 0
        }
      },
      match: {
        params: {
          groupId: '12345'
        },
        path: '/messageboard'
      },
      groups: {
        userGroups: {}
      },
      history: { push: sinon.spy() },
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
