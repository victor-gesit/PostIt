const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_ERROR':
      return {
        errored: true,
        message: action.message
      };
    case 'SIGN_UP_ERROR':
      return {
        errored: true,
        message: action.message
      };
    case 'ADD_MEMBER_ERROR':
      return {
        errored: true,
        message: action.message
      };
    case 'DELETE_MEMBER_ERROR':
      return {
        errored: true,
        message: action.message
      };
    case 'GET_GROUP_MEMBERS_ERROR':
      return {
        errored: true,
        message: action.message
      };
    case 'GET_ALL_GROUPS_ERROR':
      return {
        errored: true,
        message: action.message
      };
    case 'POST_MESSAGE_ERROR':
      return {
        errored: true,
        message: action.message
      };
    case 'GET_MESSAGES_ERROR':
      return {
        errored: true,
        message: action.message
      };
    default:
      return state;
  }
};

export default errorReducer;
