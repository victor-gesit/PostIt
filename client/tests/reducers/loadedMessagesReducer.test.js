import { Reducer } from 'redux-testkit';
import loadedMessagesReducer from '../../reducers/loadedMessagesReducer';

const initialState = { groupId: null };
const messagesLoaded = { groupId: '12345' };
const groupCreated = { groupId: '12345' };

const actionLoadMessages = { type: 'LOAD_MESSAGES', groupId: '12345' };
const actionCreateGroup = { type: 'CREATE_GROUP_SUCCESS', data: { createdGroup: { id: '12345' } } };
const actionDeleteGroup = { type: 'DELETE_GROUP_SUCCESS' };
const actionLeaveGroup = { type: 'LEAVE_GROUP_SUCCESS' };
const actionSignOut = { type: 'SIGN_OUT' };

describe('authStateReducer', () => {
  it('should have an initial state', () => {
    expect(loadedMessagesReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(loadedMessagesReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });
  it('should load messages into the store', () => {
    Reducer(loadedMessagesReducer).expect(actionLoadMessages).toReturnState(messagesLoaded);
  });
  it('should set store with id of created group after a group is created', () => {
    Reducer(loadedMessagesReducer).expect(actionCreateGroup).toReturnState(groupCreated);
  });
  it('should reset state after group is deleted', () => {
    Reducer(loadedMessagesReducer).expect(actionDeleteGroup).toReturnState(initialState);
  });
  it('should reset state after a user leaves a group', () => {
    Reducer(loadedMessagesReducer).expect(actionLeaveGroup).toReturnState(initialState);
  });
  it('should reset state after a user signs out', () => {
    Reducer(loadedMessagesReducer).expect(actionSignOut).toReturnState(initialState);
  });
});
