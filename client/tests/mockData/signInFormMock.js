import sinon from 'sinon';

export default {
  props: {
    allUserGroups: {

    },
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      deleteGroup: sinon.spy(),
      resetErrorLog: sinon.spy(),
      location: {
        state: {
          from: '/'
        }
      },
      appInfo: {
        authState: {
          signedIn: true,
          message: 'Signed In'
        }
      },
      apiError: {
        message: 'No Error'
      },
      groups: {
        userGroups: {}
      },
      history: { push: sinon.spy() },
      googleLogin: sinon.spy(),
      postItInfo: {
        members: {
          postItMembers: {

          }
        }
      }
    }
  },
  propsWithError: {
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      deleteGroup: sinon.spy(),
      resetErrorLog: sinon.spy(),
      location: {
      },
      signIn: sinon.spy(),
      appInfo: {
        authState: {
          message: 'Signed In'
        }
      },
      apiError: {
        errored: true,
        message: 'Error message'
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
  },
  propsWithDataLoading: {
    allUserGroups: {

    },
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      deleteGroup: sinon.spy(),
      resetErrorLog: sinon.spy(),
      location: {
        state: {
          from: '/'
        }
      },
      dataLoading: true,
      appInfo: {
        authState: {
          signedIn: true,
          message: 'Signed In'
        }
      },
      apiError: {
        message: 'No Error'
      },
      groups: {
        userGroups: {}
      },
      googleLogin: sinon.spy(),
      history: { push: sinon.spy() },
      postItInfo: {
        members: {
          postItMembers: {

          }
        }
      }
    }
  },
};
