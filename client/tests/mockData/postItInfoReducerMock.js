export default {
  initialState: {
    members: {
      postItMembers: {
      },
      meta: { count: 0, allLoaded: 0 }
    },
    groups: {
      postItGroups: {},
      meta: { count: 0, allLoaded: 0 }
    }
  },
  postItMembers: {
    members: {
      postItMembers: {
        12345: {
          id: '12345',
          name: 'First Member'
        },
        23456: {
          id: '23456',
          name: 'Second Member'
        }
      },
      meta: { count: 2, allLoaded: 2 }
    }
  },
  postItGroups: {
    groups: {
      abcde: {
        id: 'abcde',
        name: 'First Group'
      },
      bcdef: {
        id: 'bcdef',
        name: 'Second Group'
      }
    }
  },
  actionMembersGotten: { type: 'GET_POST_IT_MEMBERS_SUCCESS',
    newState: {
      members: {
        postItMembers: {
          12345: {
            id: '12345',
            name: 'First Member'
          },
          23456: {
            id: '23456',
            name: 'Second Member'
          }
        },
        meta: {
          count: 2,
          allLoaded: 2
        }
      }
    }
  },
  actionAllGroupsGotten: { type: 'GET_ALL_GROUPS_SUCCESS',
    newState: {
      groups: {
        abcde: {
          id: 'abcde',
          name: 'First Group'
        },
        bcdef: {
          id: 'bcdef',
          name: 'Second Group'
        }
      }
    }
  },
  actionSignOut: { type: 'SIGN_OUT' },
};
