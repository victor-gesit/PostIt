const authStateReducer = (state = {}, action) => {
  const authState = Object.assign({}, state);
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return Object.assign({}, state, { signedIn: true, redirect: true });
    case 'SIGN_UP_SUCCESS':
      return Object.assign({}, state, { signedIn: true, redirect: true });
    case 'SIGN_IN_FAILURE':
      return Object.assign({}, state, { signedIn: false, redirect: false });
    case 'SIGN_UP_FAILURE':
      return Object.assign({}, state, { signedIn: false, redirect: false });
    default:
      return authState;
  }
};

export default authStateReducer;
