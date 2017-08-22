/* eslint-env browser */
const userReducer = (state = {}, action) => {
  const userDetails = action.userDetails;
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      localStorage.setItem('token', userDetails.token);
      return Object.assign({}, userDetails);
    case 'SIGN_UP_SUCCESS':
      localStorage.setItem('token', userDetails.token);
      return Object.assign({}, userDetails);
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
