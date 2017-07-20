const loading = (state = false, action) => {
  switch (action.type) {
    case 'POST_MESSAGE': return true;
    case 'POST_MESSAGE_ERROR': return false;
    case 'POST_MESSAGE_SUCCESS': return false;

    case 'ADD_USER': return true;
    case 'ADD_USER_ERROR': return false;
    case 'ADD_USER_SUCCESS': return false;

    case 'DELETE_GROUP': return true;
    case 'ADD_GROUP_ERROR': return false;
    case 'ADD_GROUP_SUCCESS': return false;

    case 'CREATE_GROUP': return true;
    case 'CREATE_GROUP_ERROR': return false;
    case 'CREATE_GROUP_SUCCESS': return false;

    case 'GET_MESSAGES': return true;
    case 'GET_MESSAGES_ERROR': return false;
    case 'GET_MESSAGES_SUCCESS': return false;

    case 'GET_GROUP_MEMBERS': return true;
    case 'GET_GROUP_MEMBERS_ERROR': return true;
    case 'GET_GROUP_MEMBERS_SUCCESS': return true;

    case 'GET_POST_IT_MEMBERS': return true;
    case 'GET_POST_IT_MEMBERS_ERROR': return false;
    case 'GET_POST_IT_MEMBERS_SUCCESS': return false;

    case 'GET_ALL_GROUPS': return true;
    case 'GET_ALL_GROUPS_ERROR': return false;
    case 'GET_ALL_GROUPS_SUCCESS': return false;

    case 'DELETE_MEMBER': return true;
    case 'DELETE_MEMBER_ERROR': return false;
    case 'DELETE_MEMBER_SUCCESS': return false;

    default: return state;
  }
};

export default loading;
