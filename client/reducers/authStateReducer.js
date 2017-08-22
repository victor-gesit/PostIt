const authStateReducer = (state = {}, action) => {
  const authState = Object.assign({}, state);
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return Object.assign({}, state,
      { signedIn: true, message: action.message });
    case 'SIGN_UP_SUCCESS':
      return Object.assign({}, state,
      { signedIn: true, message: action.messsage });
    case 'VERIFY_TOKEN_SUCCESS':
      return Object.assign({}, state,
      { signedIn: true, message: action.message });
    case 'SIGN_IN_ERROR':
      return Object.assign({}, state,
      { signedIn: false, message: action.message });
    case 'SIGN_UP_ERROR':
      return Object.assign({}, state,
      { signedIn: false, message: action.message });
    case 'VERIFY_TOKEN_ERROR':
      return Object.assign({}, state,
      { signedIn: false, message: action.message });
    case 'SIGN_OUT':
      return { signedIn: false, message: null };
    default:
      return authState;
  }
};

export default authStateReducer;
