import { Reducer } from 'redux-testkit';
import userGroupsReducer from '../../reducers/userGroupsReducer';
import { userGroupsReducerMock as mock } from '../mockData';

describe('userGroupsReducer', () => {
  it('should have an initial state', () => {
    expect(userGroupsReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(mock.initialState);
  });
  it('should not affect state', () => {
    Reducer(userGroupsReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(mock.initialState);
  });
  it('should set store with all members belonging to a group', () => {
    Reducer(userGroupsReducer).expect(mock.actionMembersGotten)
      .toReturnState({ ...mock.initialState, ...mock.groupMembers });
  });
  it('should set store with info for all groups a user belongs to', () => {
    Reducer(userGroupsReducer).expect(mock.actionAllGroupsGotten)
      .toReturnState({ ...mock.initialState, ...mock.groupInfo });
  });
  it('should set the store after a message is posted to a group', () => {
    Reducer(userGroupsReducer).expect(mock.actionMessagePosted)
      .toReturnState({ ...mock.initialState, ...mock.messagePosted });
  });
  it('should set the store after a member has been added to a group', () => {
    Reducer(userGroupsReducer).expect(mock.actionNewMemberAdded)
      .toReturnState({ ...mock.initialState, ...mock.membersAdded });
  });
  it('should set the store after a member has been deleted from a group', () => {
    Reducer(userGroupsReducer).withState(mock.membersAdded)
      .expect(mock.actionGroupMemberDeleted)
      .toReturnState({ ...mock.memberDeleted });
  });
  it('should set the store after messages for a group are gotten from API', () => {
    Reducer(userGroupsReducer)
      .expect(mock.actionMessagesGotten)
      .toReturnState({ ...mock.initialState, ...mock.messagesGotten });
  });
  it('should update the store after a user has left a group', () => {
    Reducer(userGroupsReducer).withState(mock.groupInfo)
      .expect(mock.actionLeftGroup)
      .toReturnState({ ...mock.initialState, ...mock.leftGroup });
  });
  it('should update the store after a group has been created', () => {
    Reducer(userGroupsReducer)
      .expect(mock.actionGroupCreated)
      .toReturnState({ ...mock.groupCreated });
  });
  it('should update the store after a notification has been received', () => {
    Reducer(userGroupsReducer)
      .expect(mock.actionNotificationReceived)
      .toReturnState({ ...mock.initialState, ...mock.messagePosted });
  });
  it('should update the store after a notification has been received', () => {
    Reducer(userGroupsReducer).withState(mock.groupInfo)
      .expect(mock.actionGroupDeleted)
      .toReturnState({ ...mock.initialState, ...mock.leftGroup });
  });
  it('should reset state after a user signs out', () => {
    Reducer(userGroupsReducer)
    .expect(mock.actionSignOut).toReturnState(mock.initialState);
  });
});
