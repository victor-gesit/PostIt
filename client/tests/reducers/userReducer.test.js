import { Reducer } from 'redux-testkit';
import userReducer from '../../reducers/userReducer';
import { userReducerMock as mock } from '../mockData';

const initialState = {
  firstName: null,
  lastName: null,
  id: null,
  token: null,
  email: null,
  phone: null
};

const userInfo = {
  token: 'abracadabra',
  name: 'John Doe'
};

const actionSignIn = { type: 'SIGN_IN_SUCCESS',
  userDetails: {
    token: 'abracadabra',
    name: 'John Doe'
  }
};
const actionSignUp = { type: 'SIGN_UP_SUCCESS',
  userDetails: {
    token: 'abracadabra',
    name: 'John Doe'
  }
};

const actionSignOut = { type: 'SIGN_OUT' };

describe('authStateReducer', () => {
  it('should have an initial state', () => {
    expect(userReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(mock.initialState);
  });
  it('should not affect state', () => {
    Reducer(userReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(mock.initialState);
  });
  it('should update store with user details after sign in', () => {
    Reducer(userReducer).expect(mock.actionSignIn).toReturnState(mock.userInfo);
  });

  it('should update store with user details after sign up', () => {
    Reducer(userReducer).expect(mock.actionSignUp).toReturnState(mock.userInfo);
  });
  it('should reset state after a user signs out', () => {
    Reducer(userReducer).expect(mock.actionSignOut).toReturnState(mock.initialState);
  });
});
