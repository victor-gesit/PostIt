export default {
  initialState: { meta: { count: 0, allLoaded: 0 }, userGroups: {} },
  groupMembers: {
    userGroups: {
      abcde: {
        members: {
          12345: {
            id: '12345',
            name: 'First Member'
          },
          23456: {
            id: '23456',
            name: 'Second Member'
          }
        },
        info: {},
        messages: {}
      }
    },
    meta: { count: 2 }
  },

  groupInfo: {
    userGroups: {
      abcde: {
        id: 'abcde',
        name: 'First Group'
      },
      bcdef: {
        id: 'bcdef',
        name: 'Second Group'
      }
    },
    meta: { count: 2, allLoaded: 2 }
  },

  leftGroup: {
    userGroups: {
      abcde: {
        id: 'abcde',
        name: 'First Group'
      }
    },
    meta: { count: 1 }
  },

  messagePosted: {
    userGroups: {
      abcde: {
        messages: {
          mnop: {
            id: 'mnop',
            text: 'I will be late',
            createdAt: 'Sent September 10, 2017, at 23:10',
          }
        },
        info: {},
        members: {}
      }
    }
  },

  membersAdded: {
    userGroups: {
      abcde: {
        messages: {},
        info: {},
        members: {
          12345: {
            id: '12345',
            name: 'John Doe'
          },
          23456: {
            id: '23456',
            name: 'Jane Doe'
          }
        }
      }
    }
  },

  messagesGotten: {
    userGroups: {
      abcde: {
        messages: {
          mnop: {
            id: 'mnop',
            text: 'I will be late',
            createdAt: 'Sent September 10, 2017, at 23:10',
          },
          nopq: {
            id: 'nopq',
            text: 'Me too',
            createdAt: 'Sent September 10, 2017, at 23:10',
          }
        }
      }
    }
  },

  memberDeleted: {
    userGroups: {
      abcde: {
        messages: {},
        info: {},
        members: {
          23456: {
            id: '23456',
            name: 'Jane Doe'
          }
        }
      }
    }
  },

  groupCreated: {
    userGroups: {
      abcde: {
        id: 'abcde',
        name: 'New Group'
      }
    },
    meta: {
      count: 0,
      allLoaded: 0
    }
  },

  actionMembersGotten: { type: 'GET_GROUP_MEMBERS_SUCCESS',
    membersDBSnapshot: {
      rows: [{
        id: '12345',
        name: 'First Member'
      },
      {
        id: '23456',
        name: 'Second Member'
      }],
      count: 2
    },
    groupId: 'abcde'
  },
  actionAllGroupsGotten: { type: 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS',
    newState: {
      meta: { count: 2, allLoaded: 2 },
      userGroups: {
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
  actionMessagePosted: { type: 'POST_MESSAGE_SUCCESS',
    message: { id: 'mnop', text: 'I will be late', createdAt: '2017-09-10T22:10:35.792Z' },
    groupId: 'abcde'
  },

  actionNewMemberAdded: { type: 'ADD_MEMBER_SUCCESS',
    addedMembers: [
      {
        id: '12345',
        name: 'John Doe'
      },
      {
        id: '23456',
        name: 'Jane Doe'
      }
    ],
    groupId: 'abcde'
  },
  actionGroupMemberDeleted: { type: 'DELETE_GROUP_MEMBER_SUCCESS',
    deletedId: '12345',
    groupId: 'abcde'
  },
  actionMessagesGotten: { type: 'GET_MESSAGES_SUCCESS',
    messagesDbSnapshot: {
      rows: [{
        id: 'mnop',
        text: 'I will be late',
        createdAt: '2017-09-10T22:10:35.792Z',
      },
      {
        id: 'nopq',
        text: 'Me too',
        createdAt: '2017-09-10T22:10:35.792Z',
      }],
      count: 2
    },
    groupId: 'abcde'
  },
  actionLeftGroup: { type: 'LEAVE_GROUP_SUCCESS',
    groupId: 'bcdef'
  },
  actionGroupCreated: { type: 'CREATE_GROUP_SUCCESS',
    newState: {
      meta: { count: 0, allLoaded: 0 },
      userGroups: {
        abcde: {
          id: 'abcde',
          name: 'New Group'
        }
      }
    }
  },
  actionNotificationReceived: { type: 'NOTIFY',
    newMessage: { id: 'mnop', text: 'I will be late', createdAt: '2017-09-10T22:10:35.792Z' },
    groupId: 'abcde'
  },

  actionGroupDeleted: {
    type: 'DELETE_A_GROUP_SUCCESS',
    groupId: 'bcdef'
  },

  actionSignOut: { type: 'SIGN_OUT' },
};
