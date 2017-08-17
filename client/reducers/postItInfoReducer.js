// Method to get registered postit members
const getPostItMembers = (state, dbSnapshot) => {
  const appState = Object.assign({}, state);
  const membersRows = dbSnapshot.rows;
  for (let i = 0; i < membersRows.length; i += 1) {
    const userId = membersRows[i].id;
    appState.members.postItMembers[userId] = membersRows[i];
  }
  appState.members.meta.count = dbSnapshot.count;
  return appState;
};

// Get groups on PostIt
const getAllPostItGroups = (state, dbSnapshot) => {
  const appState = Object.assign({}, state);
  const groupRows = dbSnapshot.rows;
  for (let i = 0; i < groupRows.length; i += 1) {
    const groupId = groupRows[i].id;
    appState.groups.postItMembers[groupId] = groupRows[i];
  }
  appState.groups.meta.count = dbSnapshot.count;
  return appState;
};

const postItInfoReducer = (state = {}, action) => {
  const appState = Object.assign({}, state);
  switch (action.type) {
    case 'GET_POST_IT_MEMBERS_SUCCESS':
      return getPostItMembers(appState, action.dbSnapShot);
    case 'GET_ALL_GROUPS_SUCCESS':
      return getAllPostItGroups(state, action.postItGroups);
    default:
      return appState;
  }
};

export default postItInfoReducer;
