const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_ERROR':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      };
    case 'SIGN_IN_SUCCESS':
      return {
        message: null,
        redirect: {
          yes: true,
          to: '/messageboard'
        },
        errored: false
      };
    case 'SIGN_UP_ERROR':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      };
    case 'ADD_MEMBER_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      });
    case 'ADD_MEMBER_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      });
    case 'DELETE_MEMBER_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      });
    case 'DELETE_MEMBER_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      });
    case 'DELETE_A_GROUP_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: true,
          to: '/messageboard'
        },
        errored: false
      });
    case 'GET_GROUP_MEMBERS_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      });
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      });
    case 'GET_ALL_GROUPS_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      });
    case 'GET_ALL_GROUPS_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      });
    case 'POST_MESSAGE_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      });
    case 'POST_MESSAGE_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      });
    case 'GET_MESSAGES_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: true,
          to: '/messageboard'
        },
        errored: true
      });
    case 'INVALID_AUTH':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: true,
          to: '/'
        }
      });
    case 'CREATE_GROUP_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      });
    case 'CREATE_GROUP_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: true,
          to: '/postmessage'
        },
        errored: false
      });
    case 'GET_MESSAGES_SUCCESS':
      return Object.assign({}, state, {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      });
    case 'RESET_ERROR_LOG':
      return Object.assign({}, state, {
        message: null,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      });
    case 'LOAD_MESSAGES':
      return Object.assign({}, state, {
        message: null,
        redirect: {
          yes: true,
          to: '/postmessage'
        }
      });
    case 'RESET_REDIRECT_STATE':
      return Object.assign({}, state, {
        message: null,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      });
    case 'VERIFY_TOKEN_ERROR':
      return Object.assign({}, state, {
        message: 'You have been away for a while. Please sign in again',
        redirect: {
          yes: true,
          to: '/'
        }
      });
    case 'GET_ALL_GROUPS_FOR_A_USER_ERROR':
      return Object.assign({}, state, {
        redirect: {
          yes: true,
          to: '/'
        }
      });
    default:
      return state;
  }
};

export default errorReducer;
