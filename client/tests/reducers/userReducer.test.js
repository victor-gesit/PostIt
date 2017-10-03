import { Reducer } from 'redux-testkit';
import userReducer from '../../reducers/userReducer';

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
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(userReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });
  it('should update store with user details after sign in', () => {
    Reducer(userReducer).expect(actionSignIn).toReturnState(userInfo);
  });

  it('should update store with user details after sign up', () => {
    Reducer(userReducer).expect(actionSignUp).toReturnState(userInfo);
  });
  it('should reset state after a user signs out', () => {
    Reducer(userReducer).expect(actionSignOut).toReturnState(initialState);
  });
});
