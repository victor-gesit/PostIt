import utils from '../middlewares/utils';

const userGroupsReducer = (state = { meta: { count: 0, allLoaded: 0 },
  userGroups: {} }, action) => {
  switch (action.type) {
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return utils.getMembers(state, action.membersDBSnapshot,
      action.groupId);
    case 'SEARCH_GROUP_LIST_SUCCESS':
      return utils.searchGroup(state, action.searchResult, action.groupId);
    case 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS':
      return ({ ...state, ...action.newState });
    case 'DELETE_A_GROUP_SUCCESS':
      return utils.deleteGroup(state, action.groupId);
    case 'POST_MESSAGE_SUCCESS':
      return utils.postMessage(state, action.message, action.groupId);
    case 'NOTIFY':
      return utils.postMessage(state, action.newMessage, action.groupId);
    case 'ADD_MEMBER_SUCCESS':
      return utils.addMembers(state, action.addedMembers, action.groupId);
    case 'DELETE_GROUP_MEMBER_SUCCESS':
      return utils.deleteMember(state, action.deletedId, action.groupId);
    case 'GET_MESSAGES_SUCCESS':
      return utils.loadMessages(state, action.messagesDbSnapshot,
        action.groupId);
    case 'LEAVE_GROUP_SUCCESS':
      return utils.deleteGroup(state, action.groupId);
    case 'CREATE_GROUP_SUCCESS':
      return { ...state, ...action.newState };
    case 'SIGN_OUT':
      return { meta: { count: 0, allLoaded: 0 }, userGroups: {} };
    default:
      return state;
  }
};

export default userGroupsReducer;
