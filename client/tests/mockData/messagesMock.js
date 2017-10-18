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
            members: {},
            messages: {
              mnop: {

              }
            }
          }
        }
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
      },
    },
    socket: {
      emit: sinon.spy()
    },
  },
  propsAfterUpdate: {
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      notify: sinon.spy(),
      postMessage: sinon.spy(),
      match: {
        params: {
          groupId: '54321'
        }
      },
      groups: {
        userGroups: {
          12345: {
            members: {},
            messages: {
            }
          }
        }
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
      },
    },
    socket: {
      emit: sinon.spy()
    },
  }
};
