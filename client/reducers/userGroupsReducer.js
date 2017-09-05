// Delete a group from State
const deleteGroup = (state, groupId) => {
  const appState = Object.assign({}, state);
  const userGroups = appState.userGroups;
  delete userGroups[groupId];
  appState.userGroups = userGroups;
  appState.meta.count -= 1;
  return appState;
};

// Create a group
const createGroup = (state, data) => {
  const createdGroup = data.createdGroup;
  const appState = Object.assign({}, state);
  const userGroups = appState.userGroups;
  userGroups[createdGroup.id] = {};
  userGroups[createdGroup.id].info = createdGroup;
  appState.userGroups = userGroups;
  appState.meta.count += 1;
  return appState;
};

// Load groups a user belongs to
const getGroups = (state, dbSnapshot) => {
  // Clear the state, to hold new groups for new page
  state = {
    meta: {},
    userGroups: {}
  };
  const appState = Object.assign({}, state);
  const groups = dbSnapshot.rows;
  for (let i = 0; i < groups.length; i += 1) {
    const groupId = groups[i].id;
    appState.userGroups[groupId] = appState.userGroups[groupId] || {};
    appState.userGroups[groupId].info = groups[i];
  }
  appState.meta.count = dbSnapshot.count;
  return appState;
};
// Load members for a group
const getMembers = (state, dbSnapshot, groupId) => {
  const groupMembers = dbSnapshot.rows;
  const appState = Object.assign({}, state);
  for (let i = 0; i < groupMembers.length; i += 1) {
    const userId = groupMembers[i].id;
    // Initialize state with empty object if group data hasn't been loaded in the past
    appState.userGroups[groupId] = appState.userGroups[groupId] || {};
    appState.userGroups[groupId].members = appState.userGroups[groupId].members || {};
    appState.userGroups[groupId].members[userId] = groupMembers[i];
  }
  return appState;
};
// Create time stamp for messages
const getTimeStamp = (timeStamp, callback) => {
  const date = new Date(timeStamp);
  const months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const minutesUnformatted = date.getMinutes();
  const minutes = minutesUnformatted < 10 ? `0${minutesUnformatted}` : minutesUnformatted;
  // const minute = timeStamp.slice(14, 16);
  const formattedTime = `${month} ${day}, ${year}, at ${hour}:${minutes}`;
  callback(formattedTime);
};
// Post a message to a group
const postMessage = (state, newMessage, groupId) => {
  const appState = Object.assign({}, state);
  // Initialize the fields with empty objects and array if they had no previous content
  appState.userGroups[groupId] = appState.userGroups[groupId] || {};
  appState.userGroups[groupId].messages = appState.userGroups[groupId].messages || {};
  const groupMessages = appState.userGroups[groupId].messages;
  // Format the time stamp of new message
  getTimeStamp(newMessage.createdAt, (formattedTime) => {
    newMessage.createdAt = `Sent ${formattedTime}`;
    groupMessages[newMessage.id] = newMessage;
    appState.userGroups[groupId].messages = groupMessages;
  });
  return appState;
};

// Add a member to a group
const addMembers = (state, newMembers, groupId) => {
  const appState = Object.assign({}, state);
  const groupMembers = appState.userGroups[groupId].members;
  newMembers.map((newMember) => {
    const userId = newMember.id;
    groupMembers[userId] = newMember;
  });
  appState.userGroups[groupId].members = groupMembers;
  return appState;
};

// Delete a group member
const deleteMember = (state, deletedId, groupId) => {
  const appState = Object.assign({}, state);
  const groupMembers = appState.userGroups[groupId].members;
  delete groupMembers[deletedId];
  appState.userGroups[groupId].members = groupMembers;
  return appState;
};
// Load message into a group
const loadMessages = (state, messagesDbSnapshot, groupId) => {
  const messages = messagesDbSnapshot.rows;
  const messagesObject = {};
  messages.map((message, index) => {
    getTimeStamp(message.createdAt, (formattedTime) => {
      messages[index].createdAt = `Sent ${formattedTime}`;
    });
  });
  for (let i = 0; i < messages.length; i += 1) {
    messagesObject[messages[i].id] = messages[i];
  }
  const appState = Object.assign({}, state);
  // Load the group with empty data if it has no data in store
  appState.userGroups[groupId] = appState.userGroups[groupId] || {};
  appState.userGroups[groupId].messages = messagesObject;
  return appState;
};

const userGroupsReducer = (state = {}, action) => {
  const appState = Object.assign({}, state);
  switch (action.type) {
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return getMembers(appState, action.membersDBSnapshot, action.groupId);
    case 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS':
      return getGroups(state, action.data);
    case 'DELETE_A_GROUP':
      return deleteGroup(appState, action.groupId);
    case 'POST_MESSAGE_SUCCESS':
      return postMessage(appState, action.message, action.groupId);
    case 'NOTIFY':
      return postMessage(appState, action.newMessage, action.groupId);
    case 'ADD_MEMBER_SUCCESS':
      return addMembers(appState, action.addedMembers, action.groupId);
    case 'DELETE_GROUP_MEMBER_SUCCESS':
      return deleteMember(appState, action.deletedId, action.groupId);
    case 'GET_MESSAGES_SUCCESS':
      return loadMessages(appState, action.messagesDbSnapshot, action.groupId);
    case 'LEAVE_GROUP_SUCCESS':
      return deleteGroup(appState, action.groupId);
    case 'CREATE_GROUP_SUCCESS':
      return createGroup(appState, action.data);
    case 'SIGN_OUT':
      return { meta: { count: 0 }, userGroups: {} };
    default:
      return appState;
  }
};

export default userGroupsReducer;
