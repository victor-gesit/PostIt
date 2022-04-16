import { Reducer } from 'redux-testkit';
import allUserGroupsReducer from '../../reducers/allUserGroupsReducer';
import { allUserGroupsReducerMock as mock } from '../mockData';

describe('allUserGroupsReducer', () => {
  it('should have an initial state', () => {
    expect(allUserGroupsReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(mock.initialState);
  });
  it('should not affect state', () => {
    Reducer(allUserGroupsReducer)
      .expect({ type: 'NOT_EXISTING' })
      .toReturnState(mock.initialState);
  });
  it('should get all groups a user belongs to', () => {
    Reducer(allUserGroupsReducer)
      .expect(mock.actionAllGroups)
      .toReturnState(mock.allGroups);
  });
  it('should delete a group', () => {
    Reducer(allUserGroupsReducer).withState(mock.allGroups)
      .expect(mock.actionDeleteGroup)
      .toReturnState(mock.groupDeleted);
  });
  it('should remove a user group a group', () => {
    Reducer(allUserGroupsReducer).withState(mock.allGroups)
      .expect(mock.actionLeaveGroup)
      .toReturnState(mock.groupDeleted);
  });
});
