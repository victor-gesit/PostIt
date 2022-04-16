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
            12345: {
              id: '12345'
            }
          },
          meta: {
            count: 0,
            allLoaded: 0
          }
        }
      }
    }
  },
  propsForLoadMore: {
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
            12345: {
              id: '12345'
            }
          },
          meta: {
            count: 1,
            allLoaded: 0
          }
        }
      }
    }
  }
};
