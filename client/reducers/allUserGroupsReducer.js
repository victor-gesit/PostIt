import _ from 'lodash';

// Get all groups a user belongs to
const getAllGroups = (appState, dbSnapshot) => {
  const groups = dbSnapshot.rows;
  const result = { userGroups: {}, meta: { count: dbSnapshot.count } };
  for (let i = 0; i < groups.length; i += 1) {
    result.userGroups[groups[i].id] = {};
    result.userGroups[groups[i].id].info = groups[i];
  }
  return result;
};

// Delete a group from State
const deleteGroup = (appState, groupId) => {
  const { userGroups } = appState;
  const keys = _.filter(Object.keys(userGroups), key => key !== groupId);
  return {
    userGroups: _.pick(userGroups, keys),
    meta: {
      count: appState.meta.count - 1
    }
  };
};

// Handle all the groups a user belongs to
const allUserGroupsReducer = (state = { meta: { count: 0 }, userGroups: {} }, action) => {
  switch (action.type) {
    case 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS':
      return getAllGroups(state, action.data);
    case 'DELETE_A_GROUP_SUCCESS':
      return deleteGroup(state, action.groupId);
    case 'LEAVE_GROUP_SUCCESS':
      return deleteGroup(state, action.groupId);
    case 'SIGN_OUT':
      return { meta: { count: 0 }, userGroups: {} };
    default:
      return state;
  }
};

export default allUserGroupsReducer;
