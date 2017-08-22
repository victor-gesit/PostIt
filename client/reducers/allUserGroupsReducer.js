// Get all groups a user belongs to
const getAllGroups = (state, dbSnapshot) => {
  // Clear the state, to hold new groups for new page
  const appState = Object.assign({}, state);
  const groups = dbSnapshot.rows;
  for (let i = 0; i < groups.length; i += 1) {
    const groupId = groups[i].id;
    appState.userGroups[groupId] = {};
    appState.userGroups[groupId].info = groups[i];
  }
  appState.meta.count = dbSnapshot.count;
  return appState;
};

// Delete a group from State
const deleteGroup = (state, groupId) => {
  const appState = Object.assign({}, state);
  const userGroups = appState.userGroups;
  delete userGroups[groupId];
  appState.userGroups = userGroups;
  return appState;
};

// Handle all the groups a user belongs to
const allUserGroupsReducer = (state = {}, action) => {
  const appState = Object.assign({}, state);
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
      return appState;
  }
};

export default allUserGroupsReducer;
