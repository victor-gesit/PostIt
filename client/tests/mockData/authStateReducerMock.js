export default {
  initialState: { signedIn: false, message: null },
  signedIn: { signedIn: true, message: 'Signed In' },
  signInError: { signedIn: false, message: 'Auth error' },
  actionSignIn: { type: 'SIGN_IN_SUCCESS', message: 'Signed In' },
  actionSignUp: { type: 'SIGN_UP_SUCCESS', message: 'Signed In' },
  actionVerifyToken: { type: 'VERIFY_TOKEN_SUCCESS', message: 'Signed In' },
  actionSignInError: { type: 'SIGN_IN_ERROR', message: 'Auth error' },
  actionVerifyTokenError: { type: 'VERIFY_TOKEN_ERROR', message: 'Auth error' },
  actionSignUpError: { type: 'SIGN_UP_ERROR', message: 'Auth error' },
};
