const userReducer = (state = {}, action) => {
  const userDetails = action.userDetails;
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return Object.assign({}, userDetails);
    case 'SIGN_UP_SUCCESS':
      return action.userDetails;
    default:
      return state;
  }
};

export default userReducer;
