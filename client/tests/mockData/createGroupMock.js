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
    resetRedirect: sinon.spy(),
    createGroup: sinon.spy(),
    getPostItMembers: sinon.spy(),
    getAllGroupsForUser: sinon.spy(),
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
    resetErrorLog: sinon.spy(),
    getPostItMembers: sinon.spy(),
    getAllGroupsForUser: sinon.spy(),
  }
};
