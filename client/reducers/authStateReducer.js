const authStateReducer = (state = { signedIn: false, message: null },
  action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return { signedIn: true, message: action.message };
    case 'SIGN_UP_SUCCESS':
      return { signedIn: true, message: action.message };
    case 'VERIFY_TOKEN_SUCCESS':
      return { signedIn: true, message: action.message };
    case 'SIGN_IN_ERROR':
      return { signedIn: false, message: action.message };
    case 'SIGN_UP_ERROR':
      return { signedIn: false, message: action.message };
    case 'VERIFY_TOKEN_ERROR':
      return { signedIn: false, message: action.message };
    case 'SIGN_OUT':
      return { signedIn: false, message: null };
    default:
      return state;
  }
};

export default authStateReducer;
