const loading = (state = false, action) => {
  switch (action.type) {
    case 'SIGN_IN': return true;
    case 'SIGN_IN_SUCCESS': return false;
    case 'SIGN_IN_ERROR': return false;

    case 'SIGN_UP': return true;
    case 'SIGN_UP_SUCCESS': return false;
    case 'SIGN_UP_ERROR': return false;

    case 'POST_MESSAGE': return true;
    case 'POST_MESSAGE_ERROR': return false;
    case 'POST_MESSAGE_SUCCESS': return false;

    case 'ADD_MEMBER': return true;
    case 'ADD_MEMBER_ERROR': return false;
    case 'ADD_MEMBER_SUCCESS': return false;

    case 'CREATE_GROUP': return true;
    case 'CREATE_GROUP_ERROR': return false;
    case 'CREATE_GROUP_SUCCESS': return false;

    case 'GET_MESSAGES': return true;
    case 'GET_MESSAGES_ERROR': return false;
    case 'GET_MESSAGES_SUCCESS': return false;

    case 'GET_GROUP_MEMBERS': return true;
    case 'GET_GROUP_MEMBERS_ERROR': return false;
    case 'GET_GROUP_MEMBERS_SUCCESS': return false;

    case 'GET_POST_IT_MEMBERS': return true;
    case 'GET_POST_IT_MEMBERS_ERROR': return false;
    case 'GET_POST_IT_MEMBERS_SUCCESS': return false;

    case 'GET_ALL_GROUPS_FOR_A_USER': return true;
    case 'GET_ALL_GROUPS_FOR_A_USER_ERROR': return false;
    case 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS': return false;

    case 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE': return true;
    case 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_ERROR': return false;
    case 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS': return false;

    case 'GET_ALL_GROUPS': return true;
    case 'GET_ALL_GROUPS_ERROR': return false;
    case 'GET_ALL_GROUPS_SUCCESS': return false;

    case 'DELETE_GROUP_MEMBER': return true;
    case 'DELETE_GROUP_MEMBER_ERROR': return false;
    case 'DELETE_GROUP_MEMBER_SUCCESS': return false;

    case 'LEAVE_GROUP': return true;
    case 'LEAVE_GROUP_ERROR': return false;
    case 'LEAVE_GROUP_SUCCESS': return false;

    case 'VERIFY_TOKEN': return true;
    case 'VERIFY_TOKEN_ERROR': return false;
    case 'VERIFY_TOKEN_SUCCESS': return false;

    case 'SIGN_OUT': return false;

    case 'RESET_LOADING_STATE': return false;

    case 'RECOVER_PASSWORD': return true;
    case 'RECOVER_PASSWORD_ERROR': return false;
    case 'RECOVER_PASSWORD_SUCCESS': return false;

    case 'SEEN_BY': return true;
    case 'SEEN_BY_ERROR': return false;
    case 'SEEN_BY_SUCCESS': return false;

    case 'RESET_PASSWORD': return true;

    default: return state;
  }
};

export default loading;
