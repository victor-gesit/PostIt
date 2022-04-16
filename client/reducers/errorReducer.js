/* eslint-env browser */
const errorReducer = (state = { errored: false,
  message: null,
  redirect: { yes: false, to: null } }, action) => {
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
    case 'RECOVER_PASSWORD_ERROR':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      };
    case 'RECOVER_PASSWORD_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
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
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      };
    case 'ADD_MEMBER_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      };
    case 'DELETE_GROUP_MEMBER_ERROR':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      };
    case 'DELETE_GROUP_MEMBER_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      };
    case 'DELETE_A_GROUP_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: true,
          to: '/messageboard'
        },
        errored: false
      };
    case 'LEAVE_GROUP_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: true,
          to: '/messageboard'
        },
        errored: false
      };
    case 'GET_GROUP_MEMBERS_ERROR':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      };
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      };
    case 'GET_ALL_GROUPS_ERROR':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      };
    case 'GET_ALL_GROUPS_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      };
    case 'POST_MESSAGE_ERROR':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      };
    case 'POST_MESSAGE_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      };
    case 'GET_MESSAGES_ERROR':
      return {
        message: action.message,
        redirect: {
          yes: true,
          to: '/messageboard'
        },
        errored: true
      };
    case 'INVALID_GROUP_ID':
      return {
        message: action.message,
        redirect: {
          yes: true,
          to: '/notfound'
        },
        errored: true
      };
    case 'INVALID_AUTH':
      return {
        message: action.message,
        redirect: {
          yes: true,
          to: '/'
        },
        errored: true
      };
    case 'CREATE_GROUP_ERROR':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: true
      };
    case 'CREATE_GROUP_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: true,
          to: `/#/postmessage/${action.data.createdGroup.id}`
        },
        errored: false
      };
    case 'GET_MESSAGES_SUCCESS':
      return {
        message: action.message,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      };
    case 'RESET_ERROR_LOG':
      return {
        message: null,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      };
    case 'LOAD_MESSAGES':
      return {
        message: action.message,
        redirect: {
          yes: true,
          to: `/#/postmessage/${action.groupId}`
        },
        errored: false
      };
    case 'RESET_REDIRECT_STATE':
      return {
        message: null,
        redirect: {
          yes: false,
          to: null
        },
        errored: false
      };
    case 'VERIFY_TOKEN_ERROR':
      localStorage.removeItem('token');
      return {
        errored: true,
        message: 'You have been away for a while. Please sign in again',
        redirect: {
          yes: true,
          to: '/'
        }
      };
    case 'GET_ALL_GROUPS_FOR_A_USER_ERROR':
      return {
        errored: true,
        redirect: {
          yes: true,
          to: '/'
        }
      };
    case 'SIGN_OUT':
      return {
        errored: false,
        message: null,
        redirect: {
          yes: false,
          to: null }
      };
    default:
      return state;
  }
};

export default errorReducer;
