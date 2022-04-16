/* eslint-env browser */
const userReducer = (state = {
  firstName: null,
  lastName: null,
  id: null,
  token: null,
  email: null,
  phone: null
}, action) => {
  const userDetails = action.userDetails;
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      localStorage.setItem('token', userDetails.token);
      return userDetails;
    case 'SIGN_UP_SUCCESS':
      localStorage.setItem('token', userDetails.token);
      return userDetails;
    case 'VERIFY_TOKEN_SUCCESS':
      return userDetails;
    case 'SIGN_OUT':
      return {
        firstName: null,
        lastName: null,
        id: null,
        token: null,
        email: null,
        phone: null
      };
    default:
      return state;
  }
};

export default userReducer;
