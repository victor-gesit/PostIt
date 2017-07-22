const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_ERROR':
      return {
        errored: true,
        message: action.message
      };
    case 'ADD_MEMBER_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        errored: true
      });
    case 'ADD_MEMBER_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        errored: false
      });
    case 'DELETE_MEMBER_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        errored: true
      });
    case 'DELETE_MEMBER_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        errored: false
      });
    case 'GET_GROUP_MEMBERS_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        errored: true
      });
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        errored: false
      });
    case 'GET_ALL_GROUPS_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        errored: true
      });
    case 'GET_ALL_GROUPS_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        errored: true
      });
    case 'POST_MESSAGE_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        errored: true
      });
    case 'POST_MESSAGE_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        errored: false
      });
    case 'GET_MESSAGES_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        errored: true
      });
    case 'GET_MESSAGES_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        errored: false
      });
    case 'RESET_ERROR_LOG':
      return Object.assign({}, state, {
        message: null,
        errored: false
      });
    default:
      return state;
  }
};

export default errorReducer;
