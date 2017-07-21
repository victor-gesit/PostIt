const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return action.userDetails;
    case 'SIGN_UP_SUCCESS':
      return action.userDetails;
    default:
      return state;
  }
};

export default userReducer;
