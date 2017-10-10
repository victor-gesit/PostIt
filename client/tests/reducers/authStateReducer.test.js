import { Reducer } from 'redux-testkit';
import authStateReducer from '../../reducers/authStateReducer';
import { authStateReducerMock as mock } from '../mockData';

describe('authStateReducer', () => {
  it('should have an initial state', () => {
    expect(authStateReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(mock.initialState);
  });
  it('should not affect state', () => {
    Reducer(authStateReducer).expect({ type: 'NOT_EXISTING' })
    .toReturnState(mock.initialState);
  });
  it('should sign a user in', () => {
    Reducer(authStateReducer).expect(mock.actionSignIn)
    .toReturnState(mock.signedIn);
  });
  it('should sign a user in after sign up', () => {
    Reducer(authStateReducer).expect(mock.actionSignUp)
      .toReturnState(mock.signedIn);
  });
  it('should sign a user in if they have valid token', () => {
    Reducer(authStateReducer).expect(mock.actionVerifyToken)
      .toReturnState(mock.signedIn);
  });
  it('should sign a user in if they have valid token', () => {
    Reducer(authStateReducer).expect(mock.actionSignInError)
      .toReturnState(mock.signInError);
  });
  it('should sign a user in if they have valid token', () => {
    Reducer(authStateReducer).expect(mock.actionVerifyTokenError)
      .toReturnState(mock.signInError);
  });
  it('should sign a user in if they have valid token', () => {
    Reducer(authStateReducer).expect(mock.actionSignUpError)
      .toReturnState(mock.signInError);
  });
});
