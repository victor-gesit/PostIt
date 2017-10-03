import methods from '../services/functions/storeMethods';

const userGroupsReducer = (state = { meta: { count: 0 }, userGroups: {} }, action) => {
  switch (action.type) {
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return methods.getMembers(state, action.membersDBSnapshot, action.groupId);
    case 'SEARCH_GROUP_LIST_SUCCESS':
      return methods.searchGroup(state, action.searchResult, action.groupId);
    case 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS':
      return ({ ...state, ...action.newState });
    case 'DELETE_A_GROUP_SUCCESS':
      return methods.deleteGroup(state, action.groupId);
    case 'POST_MESSAGE_SUCCESS':
      return methods.postMessage(state, action.message, action.groupId);
    case 'NOTIFY':
      return methods.postMessage(state, action.newMessage, action.groupId);
    case 'ADD_MEMBER_SUCCESS':
      return methods.addMembers(state, action.addedMembers, action.groupId);
    case 'DELETE_GROUP_MEMBER_SUCCESS':
      return methods.deleteMember(state, action.deletedId, action.groupId);
    case 'GET_MESSAGES_SUCCESS':
      return methods.loadMessages(state, action.messagesDbSnapshot, action.groupId);
    case 'LEAVE_GROUP_SUCCESS':
      return methods.deleteGroup(state, action.groupId);
    case 'CREATE_GROUP_SUCCESS':
      return { ...state, ...action.newState };
    case 'SIGN_OUT':
      return { meta: { count: 0 }, userGroups: {} };
    default:
      return state;
  }
};

export default userGroupsReducer;
