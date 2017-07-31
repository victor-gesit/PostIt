// Restructure Array data from DB into state object
const structureAllGroupsForAUser = (state, dbSnapshot) => {
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

// Handle all the groups a user belongs to
const allUserGroupsReducer = (state = {}, action) => {
  const appState = Object.assign({}, state);
  switch (action.type) {
    case 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS':
      return structureAllGroupsForAUser(state, action.data);
    default:
      return appState;
  }
};

export default allUserGroupsReducer;
