export default {
  initialState: { meta: { count: 0, allLoaded: 0 }, userGroups: {} },
  groupsFromApi: {
    rows: [{
      id: '12345',
      title: 'First Group'
    },
    {
      id: '23456',
      title: 'Second Group'
    }
    ],
    count: 2
  },
  allGroups: {
    userGroups: {
      12345: {
        id: '12345',
        title: 'First Group'
      },
      23456: {
        id: '23456',
        title: 'Second Group'
      }
    },
    meta: {
      count: 2,
      allLoaded: 0
    }
  },
  groupDeleted: {
    userGroups: {
      12345: {
        id: '12345',
        title: 'First Group'
      }
    },
    meta: {
      count: 1
    }
  },
  actionAllGroups: { type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS',
    newState: {
      meta: {
        count: 2,
        allLoaded: 0
      },
      userGroups: {
        12345: {
          id: '12345',
          title: 'First Group'
        },
        23456: {
          id: '23456',
          title: 'Second Group'
        }
      }
    } },
  actionDeleteGroup: { type: 'DELETE_A_GROUP_SUCCESS', groupId: '23456' },
  actionLeaveGroup: { type: 'LEAVE_GROUP_SUCCESS', groupId: '23456' }
};
