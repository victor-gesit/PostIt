const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_ERROR':
      return {
        errored: true,
        redirect: false,
        message: action.message
      };
    case 'SIGN_UP_ERROR':
      return {
        errored: true,
        redirect: false,
        message: action.message
      };
    case 'ADD_MEMBER_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: true
      });
    case 'ADD_MEMBER_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: true,
        errored: false
      });
    case 'DELETE_MEMBER_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: true
      });
    case 'DELETE_MEMBER_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: false
      });
    case 'DELETE_A_GROUP_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: true,
        errored: false
      });
    case 'GET_GROUP_MEMBERS_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: true
      });
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: false
      });
    case 'GET_ALL_GROUPS_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: true
      });
    case 'GET_ALL_GROUPS_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: false
      });
    case 'POST_MESSAGE_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: true
      });
    case 'POST_MESSAGE_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: false
      });
    case 'GET_MESSAGES_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: true
      });
    case 'CREATE_GROUP_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: true
      });
    case 'CREATE_GROUP_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: true,
        errored: false
      });
    case 'GET_MESSAGES_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: false,
        errored: false
      });
    case 'RESET_ERROR_LOG':
      return Object.assign({}, state, {
        message: null,
        redirect: false,
        errored: false
      });
    case 'RESET_REDIRECT_STATE':
      return Object.assign({}, state, {
        message: null,
        redirect: false,
        errored: false
      });
    default:
      return state;
  }
};

export default errorReducer;
