const deleteGroup = (state, action) => {
  const groupsState = [...state];
  const index = groupsState.indexOf(action.groupId);
  if (index >= 1) {
    state.splice(index, 1);
  }
  return state;
};

// Restructure Array data from DB into state object
const structureGroupsForAUser = (state, dbSnapshot) => {
  // Clear the state, to hold new groups for new page
  state = {
    meta: {},
    userGroups: {}
  };
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
// Restructure group members from db into state object
const structureUserGroupMembersFromDb = (state, dbSnapshot, groupId) => {
  const appState = Object.assign({}, state);
  for (let i = 0; i < dbSnapshot.length; i += 1) {
    appState[groupId].members[dbSnapshot[i].id] = dbSnapshot[i];
  }
  appState[groupId].members = dbSnapshot;
  return appState;
};
// Restructure group messages from db
const structureGroupMessagesFromDb = (state, newMessage, groupId) => {
  const appState = Object.assign({}, state);
  let groupMessages = appState[groupId].messages;
  groupMessages = [...groupMessages, newMessage];
  appState[groupId].messages = groupMessages;
};

// Restructure data received after adding member to group
const structureMembersAfterAddingNew = (state, newMembers, groupId) => {
  const appState = Object.assign({}, state);
  let groupMembers = appState[groupId].members;
  groupMembers = [...groupMembers, newMembers];
  appState[groupId].members = groupMembers;
};

// Restructure data after deleting a member
const structureStateAfterDeletingMember = (state, memberId, groupId) => {
  const appState = Object.assign({}, state);
  const groupMembers = appState[groupId].members;
  const index = groupMembers.indexOf(memberId);
  if (index >= 1) {
    groupMembers.splice(index, 1);
  }
  appState[groupId].members = groupMembers;
  return appState;
};
// Restructure data after loading group messages
const structureStateAfterLoadingMessages = (state, messages, groupId) => {
  const appState = Object.assign({}, state);
  appState[groupId].messages = messages;
};

const userGroupsReducer = (state = {}, action) => {
  const appState = Object.assign({}, state);
  switch (action.type) {
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return structureUserGroupMembersFromDb(appState, action.data, action.groupId);
    case 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS':
      return structureGroupsForAUser(state, action.data);
    case 'DELETE_A_GROUP':
      return deleteGroup(appState, action.groupId);
    case 'POST_MESSAGE_SUCCESS':
      return structureGroupMessagesFromDb(appState, action.data, action.groupId);
    case 'ADD_MEMBER_SUCCESS':
      return structureMembersAfterAddingNew(appState, action.data, action.groupId);
    case 'DELETE_GROUP_MEMBER_SUCCESS':
      return structureStateAfterDeletingMember(appState, action.memberId, action.groupId);
    case 'GET_MESSAGES_SUCCESS':
      return structureStateAfterLoadingMessages(appState, action.messages, action.groupId);
    default:
      return appState;
  }
};

export default userGroupsReducer;
