import { Reducer } from 'redux-testkit';
import userGroupsReducer from '../../reducers/userGroupsReducer';

const initialState = { meta: { count: 0 }, userGroups: {} };
const groupMembers = {
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
};

const groupInfo = {
  userGroups: {
    abcde: {
      info: {
        id: 'abcde',
        name: 'First Group'
      }
    },
    bcdef: {
      info: {
        id: 'bcdef',
        name: 'Second Group'
      }
    }
  },
  meta: { count: 2 }
};

const leftGroup = {
  userGroups: {
    abcde: {
      info: {
        id: 'abcde',
        name: 'First Group'
      }
    }
  },
  meta: { count: 1 }
};

const messagePosted = {
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
};

const membersAdded = {
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
  },
  meta: {
    count: 0
  }
};

const messagesGotten = {
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
};

const memberDeleted = {
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
};

const groupCreated = {
  userGroups: {
    abcde: {
      messages: {},
      members: {},
      info: {
        id: 'abcde',
        name: 'New Group'
      }
    }
  },
  meta: {
    count: 1
  }
};

const actionMembersGotten = { type: 'GET_GROUP_MEMBERS_SUCCESS',
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
};
const actionAllGroupsGotten = { type: 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS',
  data: {
    rows: [{
      id: 'abcde',
      name: 'First Group'
    },
    {
      id: 'bcdef',
      name: 'Second Group'
    }],
    count: 2
  }
};
const actionMessagePosted = { type: 'POST_MESSAGE_SUCCESS',
  message: { id: 'mnop', text: 'I will be late', createdAt: '2017-09-10T22:10:35.792Z' },
  groupId: 'abcde'
};

const actionNewMemberAdded = { type: 'ADD_MEMBER_SUCCESS',
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
};
const actionGroupMemberDeleted = { type: 'DELETE_GROUP_MEMBER_SUCCESS',
  deletedId: '12345',
  groupId: 'abcde'
};
const actionMessagesGotten = { type: 'GET_MESSAGES_SUCCESS',
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
};
const actionLeftGroup = { type: 'LEAVE_GROUP_SUCCESS',
  groupId: 'bcdef'
};
const actionGroupCreated = { type: 'CREATE_GROUP_SUCCESS',
  data: {
    createdGroup: {
      id: 'abcde',
      name: 'New Group'
    }
  }
};
const actionNotificationReceived = { type: 'NOTIFY',
  newMessage: { id: 'mnop', text: 'I will be late', createdAt: '2017-09-10T22:10:35.792Z' },
  groupId: 'abcde'
};

const actionGroupDeleted = {
  type: 'DELETE_A_GROUP_SUCCESS',
  groupId: 'bcdef'
};

const actionSignOut = { type: 'SIGN_OUT' };

describe('authStateReducer', () => {
  it('should have an initial state', () => {
    expect(userGroupsReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(userGroupsReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });
  it('should set store with all members belonging to a group', () => {
    Reducer(userGroupsReducer).expect(actionMembersGotten)
      .toReturnState({ ...initialState, ...groupMembers });
  });
  it('should set store with info for all groups a user belongs to', () => {
    Reducer(userGroupsReducer).expect(actionAllGroupsGotten)
      .toReturnState({ ...initialState, ...groupInfo });
  });
  it('should set the store after a message is posted to a group', () => {
    Reducer(userGroupsReducer).expect(actionMessagePosted)
      .toReturnState({ ...initialState, ...messagePosted });
  });
  it('should set the store after a member has been added to a group', () => {
    Reducer(userGroupsReducer).expect(actionNewMemberAdded)
      .toReturnState({ ...initialState, ...membersAdded });
  });
  it('should set the store after a members has been deleted from a group', () => {
    Reducer(userGroupsReducer).withState(membersAdded)
      .expect(actionGroupMemberDeleted).toReturnState({ ...initialState, ...memberDeleted });
  });
  it('should set the store after messages for a group are gotten from API', () => {
    Reducer(userGroupsReducer)
      .expect(actionMessagesGotten).toReturnState({ ...initialState, ...messagesGotten });
  });
  it('should update the store after a user has left a group', () => {
    Reducer(userGroupsReducer).withState(groupInfo)
      .expect(actionLeftGroup).toReturnState({ ...initialState, ...leftGroup });
  });
  it('should update the store after a group has been created', () => {
    Reducer(userGroupsReducer)
      .expect(actionGroupCreated).toReturnState({ ...initialState, ...groupCreated });
  });
  it('should update the store after a notification has been received', () => {
    Reducer(userGroupsReducer)
      .expect(actionNotificationReceived).toReturnState({ ...initialState, ...messagePosted });
  });
  it('should update the store after a notification has been received', () => {
    Reducer(userGroupsReducer).withState(groupInfo)
      .expect(actionGroupDeleted).toReturnState({ ...initialState, ...leftGroup });
  });
  it('should reset state after a user signs out', () => {
    Reducer(userGroupsReducer).expect(actionSignOut).toReturnState(initialState);
  });
});
