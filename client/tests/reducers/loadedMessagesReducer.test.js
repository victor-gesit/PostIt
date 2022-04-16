import { Reducer } from 'redux-testkit';
import loadedMessagesReducer from '../../reducers/loadedMessagesReducer';
import { loadedMessagesReducerMock as mock } from '../mockData';

describe('loadedMessagesReducer', () => {
  it('should have an initial state', () => {
    expect(loadedMessagesReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(mock.initialState);
  });
  it('should not affect state', () => {
    Reducer(loadedMessagesReducer).expect({ type: 'NOT_EXISTING' })
      .toReturnState(mock.initialState);
  });
  it('should load messages into the store', () => {
    Reducer(loadedMessagesReducer).expect(mock.actionLoadMessages)
      .toReturnState(mock.messagesLoaded);
  });
  it('should set store with id of created group after a group is created', () => {
    Reducer(loadedMessagesReducer).expect(mock.actionCreateGroup)
      .toReturnState(mock.groupCreated);
  });
  it('should reset state after group is deleted', () => {
    Reducer(loadedMessagesReducer).expect(mock.actionDeleteGroup)
      .toReturnState(mock.initialState);
  });
  it('should reset state after a user leaves a group', () => {
    Reducer(loadedMessagesReducer).expect(mock.actionLeaveGroup)
      .toReturnState(mock.initialState);
  });
  it('should reset state after a user signs out', () => {
    Reducer(loadedMessagesReducer).expect(mock.actionSignOut)
      .toReturnState(mock.initialState);
  });
});
