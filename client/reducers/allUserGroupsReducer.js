import utils from '../middlewares/utils';

// Handle all the groups a user belongs to
const allUserGroupsReducer = (state = { meta: { count: 0, allLoaded: 0 },
  userGroups: {} }, action) => {
  switch (action.type) {
    case 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS':
    case 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS':
      return { ...state,
        meta: action.newState.meta,
        userGroups: { ...state.userGroups, ...action.newState.userGroups } };
    case 'DELETE_A_GROUP_SUCCESS':
      return utils.deleteGroup(state, action.groupId);
    case 'LEAVE_GROUP_SUCCESS':
      return utils.deleteGroup(state, action.groupId);
    case 'SIGN_OUT':
      return { meta: { count: 0, allLoaded: 0 }, userGroups: {} };
    default:
      return state;
  }
};

export default allUserGroupsReducer;
