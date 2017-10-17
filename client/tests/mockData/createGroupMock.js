import sinon from 'sinon';

export default {
  props: {
    allUserGroups: {
      userGroups: {

      },
      meta: {
        count: 0
      }
    },
    apiError: {
      redirect: {

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
    postItInfo: {
      members: {
        postItMembers: {
          mnopq: {
            id: 'mnopq'
          }
        },
        meta: {
          count: 3,
          allLoaded: 0
        }
      }
    },
    resetRedirect: sinon.spy(),
    createGroup: sinon.spy(),
    getPostItMembers: sinon.spy(),
    getGroupsForUser: sinon.spy(),
  },
  propsWithError: {
    allUserGroups: {
      userGroups: {

      }
    },
    apiError: {
      message: 'An Error Occured',
      redirect: {
        yes: false
      }
    },
    match: {
      params: {
        groupId: '12345'
      }
    },
    postItInfo: {
      members: {
        postItMembers: {
          mnopq: {
            id: 'mnopq'
          }
        },
        meta: {
          count: 0
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
    resetErrorLog: sinon.spy(),
    getPostItMembers: sinon.spy(),
    getGroupsForUser: sinon.spy(),
  }
};
