const structurePostItMembersFromDb = (state, allMembers) => {
  const appState = Object.assign({}, state);
  for (let i = 0; i < allMembers.length; i += 1) {
    appState[allMembers[i].id] = allMembers[i];
  }
  return appState;
};

const structurePostitGroupsFromDb = (state, allGroups) => {
  const appState = Object.assign({}, state);
  for (let i = 0; i < allGroups.length; i += 1) {
    appState[allGroups[i].id] = allGroups[i];
  }
  return appState;
};

const appInfoReducer = (state = {}, action) => {
  const appState = Object.assign({}, state);
  switch (action.type) {
    case 'GET_POSTIT_MEMBERS_SUCCESS':
      return structurePostItMembersFromDb(appState, action.data);
    case 'GET_ALL_GROUPS_SUCCESS':
      return structurePostitGroupsFromDb(state, action.data);
    default:
      return appState;
  }
};

export default appInfoReducer;
