const authStateReducer = (state = {}, action) => {
  const authState = Object.assign({}, state);
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return Object.assign({}, state,
      { signedIn: true, message: action.message });
    case 'SIGN_UP_SUCCESS':
      return Object.assign({}, state,
      { signedIn: true, message: action.messsage });
    case 'SIGN_IN_ERROR':
      return Object.assign({}, state,
      { signedIn: false, message: action.messsage });
    case 'SIGN_UP_ERROR':
      return Object.assign({}, state,
      { signedIn: false, message: action.messsage });
    default:
      return authState;
  }
};

export default authStateReducer;
