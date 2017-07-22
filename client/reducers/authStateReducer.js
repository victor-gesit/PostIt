const authStateReducer = (state = {}, action) => {
  const authState = Object.assign({}, state);
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return Object.assign({}, state,
      { signedIn: true, message: action.message, redirect: true });
    case 'SIGN_UP_SUCCESS':
      return Object.assign({}, state,
      { signedIn: true, message: action.messsage, redirect: true });
    case 'SIGN_IN_ERROR':
      return Object.assign({}, state,
      { signedIn: false, message: action.messsage, redirect: false });
    case 'SIGN_UP_ERROR':
      return Object.assign({}, state,
      { signedIn: false, message: action.messsage, redirect: false });
    default:
      return authState;
  }
};

export default authStateReducer;
