import { Reducer } from 'redux-testkit';
import messageInfoReducer from '../../reducers/messageInfoReducer';

const initialState = { seenBy: [] };
const messagesAreSeen = { seenBy: [{ name: 'Jane Doe', id: '12345' }] };

const actionSeenBy = { type: 'SEEN_BY_SUCCESS',
  data: {
    seenBy: [
      {
        name: 'Jane Doe',
        id: '12345'
      }
    ]
  }
};
const actionSignOut = { type: 'SIGN_OUT' };

describe('authStateReducer', () => {
  it('should have an initial state', () => {
    expect(messageInfoReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(messageInfoReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });
  it('should load state with those who have seen a message', () => {
    Reducer(messageInfoReducer).expect(actionSeenBy).toReturnState(messagesAreSeen);
  });
  it('should reset state after a user signs out', () => {
    Reducer(messageInfoReducer).expect(actionSignOut).toReturnState(initialState);
  });
});
