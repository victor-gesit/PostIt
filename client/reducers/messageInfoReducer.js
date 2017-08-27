/* eslint-env browser */
const messageInfoReducer = (state = {}, action) => {
  const data = action.data;
  switch (action.type) {
    case 'SEEN_BY_SUCCESS':
      return data;
    case 'SIGN_OUT':
      return {
        seenBy: []
      };
    default:
      return state;
  }
};

export default messageInfoReducer;
