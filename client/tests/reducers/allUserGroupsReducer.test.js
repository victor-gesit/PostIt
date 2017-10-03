import { Reducer } from 'redux-testkit';
import allUserGroupsReducer from '../../reducers/allUserGroupsReducer';

const initialState = { meta: { count: 0 }, userGroups: {} };
const groupsFromApi = {
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
};
const allGroups = {
  userGroups: {
    12345: {
      info: {
        id: '12345',
        title: 'First Group'
      }
    },
    23456: {
      info: {
        id: '23456',
        title: 'Second Group'
      }
    }
  },
  meta: {
    count: 2
  }
};
const groupDeleted = {
  userGroups: {
    12345: {
      info: {
        id: '12345',
        title: 'First Group'
      }
    }
  },
  meta: {
    count: 1
  }
};
const actionAllGroups = { type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS', data: groupsFromApi };
const actionDeleteGroup = { type: 'DELETE_A_GROUP_SUCCESS', groupId: '23456' };
const actionLeaveGroup = { type: 'LEAVE_GROUP_SUCCESS', groupId: '23456' };
describe('allUserGroupsReducer', () => {
  it('should have an initial state', () => {
    expect(allUserGroupsReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(allUserGroupsReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });
  it('should get all groups a user belongs to', () => {
    Reducer(allUserGroupsReducer).expect(actionAllGroups).toReturnState(allGroups);
  });
  it('should delete a group', () => {
    Reducer(allUserGroupsReducer).withState(allGroups).expect(actionDeleteGroup).toReturnState(groupDeleted);
  });
  it('should remove a user group a group', () => {
    Reducer(allUserGroupsReducer).withState(allGroups).expect(actionLeaveGroup).toReturnState(groupDeleted);
  });
});
