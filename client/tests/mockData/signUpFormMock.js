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
      googleLogin: sinon.spy(),
      signUp: sinon.spy(),
      appInfo: {
        authState: {
          message: 'Signed In'
        }
      },
      apiError: {
        message: 'No Error'
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
  propsWithError: {
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
      signUp: sinon.spy(),
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
  signedIn: {
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      deleteGroup: sinon.spy(),
      resetErrorLog: sinon.spy(),
      location: {
        state: {
          from: '/creategroup'
        }
      },
      signUp: sinon.spy(),
      appInfo: {
        authState: {
          signedIn: true,
          message: 'Signed In'
        }
      },
      apiError: {
        errored: false,
      },
      groups: {
        userGroups: {}
      },
      history: { push: sinon.spy().withArgs('/creategroup') },
      postItInfo: {
        members: {
          postItMembers: {

          }
        }
      }
    }
  },
  signedUp: {
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      deleteGroup: sinon.spy(),
      resetErrorLog: sinon.spy(),
      location: {
        state: {
        }
      },
      signUp: sinon.spy(),
      appInfo: {
        authState: {
          signedIn: true,
          message: 'Signed Up'
        }
      },
      apiError: {
        errored: false,
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
      }
    }
  }
};
