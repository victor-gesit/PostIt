const structurePostItMembersFromDb = (state, allMembers) => {
  const appState = Object.assign({}, state);
  for (let i = 0; i < allMembers.length; i += 1) {
    appState.members[allMembers[i].id] = allMembers[i];
  }
  return appState;
};

const structurePostitGroupsFromDb = (state, allGroups) => {
  const appState = Object.assign({}, state);
  for (let i = 0; i < allGroups.length; i += 1) {
    appState.groups[allGroups[i].id] = allGroups[i];
  }
  return appState;
};

const postItInfoReducer = (state = {}, action) => {
  const appState = Object.assign({}, state);
  switch (action.type) {
    case 'GET_POSTIT_MEMBERS_SUCCESS':
      return structurePostItMembersFromDb(appState, action.postItUsers);
    case 'GET_ALL_GROUPS_SUCCESS':
      return structurePostitGroupsFromDb(state, action.postItGroups);
    default:
      return appState;
  }
};

export default postItInfoReducer;
