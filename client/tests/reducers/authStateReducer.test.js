import { Reducer } from 'redux-testkit';
import authStateReducer from '../../reducers/authStateReducer';

const initialState = { signedIn: false, message: null };
const signedIn = { signedIn: true, message: 'Signed In' };
const signInError = { signedIn: false, message: 'Auth error' };
const actionSignIn = { type: 'SIGN_IN_SUCCESS', message: 'Signed In' };
const actionSignUp = { type: 'SIGN_UP_SUCCESS', message: 'Signed In' };
const actionVerifyToken = { type: 'VERIFY_TOKEN_SUCCESS', message: 'Signed In' };
const actionSignInError = { type: 'SIGN_IN_ERROR', message: 'Auth error' };
const actionVerifyTokenError = { type: 'VERIFY_TOKEN_ERROR', message: 'Auth error' };
const actionSignUpError = { type: 'SIGN_UP_ERROR', message: 'Auth error' };

describe('authStateReducer', () => {
  it('should have an initial state', () => {
    expect(authStateReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(authStateReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });
  it('should sign a user in', () => {
    Reducer(authStateReducer).expect(actionSignIn).toReturnState(signedIn);
  });
  it('should sign a user in after sign up', () => {
    Reducer(authStateReducer).expect(actionSignUp).toReturnState(signedIn);
  });
  it('should sign a user in if they have valid token', () => {
    Reducer(authStateReducer).expect(actionVerifyToken).toReturnState(signedIn);
  });
  it('should sign a user in if they have valid token', () => {
    Reducer(authStateReducer).expect(actionSignInError).toReturnState(signInError);
  });
  it('should sign a user in if they have valid token', () => {
    Reducer(authStateReducer).expect(actionVerifyTokenError).toReturnState(signInError);
  });
  it('should sign a user in if they have valid token', () => {
    Reducer(authStateReducer).expect(actionSignUpError).toReturnState(signInError);
  });
});
