import { Reducer } from 'redux-testkit';
import messageInfoReducer from '../../reducers/messageInfoReducer';
import { messageInfoReducerMock as mock } from '../mockData';

describe('messageInfoReducer', () => {
  it('should have an initial state', () => {
    expect(messageInfoReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(mock.initialState);
  });
  it('should not affect state', () => {
    Reducer(messageInfoReducer).expect({ type: 'NOT_EXISTING' })
      .toReturnState(mock.initialState);
  });
  it('should load state with those who have seen a message', () => {
    Reducer(messageInfoReducer).expect(mock.actionSeenBy)
      .toReturnState(mock.messagesAreSeen);
  });
  it('should reset state after a user signs out', () => {
    Reducer(messageInfoReducer).expect(mock.actionSignOut)
      .toReturnState(mock.initialState);
  });
});
