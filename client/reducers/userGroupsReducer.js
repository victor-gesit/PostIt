import _ from 'lodash';

// Delete a group from State
const deleteGroup = (state, groupId) => {
  const { userGroups } = state;
  const keys = _.filter(Object.keys(userGroups), key => key !== groupId);
  return {
    userGroups: _.pick(userGroups, keys),
    meta: {
      count: state.meta.count - 1
    }
  };
};

// Create a group
const createGroup = (state, data) => {
  const createdGroup = data.createdGroup;
  const newState = { meta: { count: 0 }, userGroups: {} };
  const userGroups = newState.userGroups;
  userGroups[createdGroup.id] = {};
  userGroups[createdGroup.id].info = createdGroup;
  userGroups[createdGroup.id].messages = {};
  userGroups[createdGroup.id].members = {};
  newState.userGroups = userGroups;
  newState.meta.count += 1;
  return { ...state, ...newState };
};

// Load groups a user belongs to
const getGroups = (state, dbSnapshot) => {
  // Clear the state, to hold new groups for new page
  const appState = { meta: {}, userGroups: {} };
  const groups = dbSnapshot.rows;
  for (let i = 0; i < groups.length; i += 1) {
    const groupId = groups[i].id;
    appState.userGroups[groupId] = appState.userGroups[groupId] || {};
    appState.userGroups[groupId].info = groups[i];
  }
  appState.meta.count = dbSnapshot.count;
  const result = { ...state, ...appState };
  return result;
};
// Load members for a group
const getMembers = (state, dbSnapshot, groupId) => {
  const groupMembers = dbSnapshot.rows;
  const appState = { meta: { count: dbSnapshot.count }, userGroups: {} };
  for (let i = 0; i < groupMembers.length; i += 1) {
    const userId = groupMembers[i].id;
    // Initialize state with empty object if group data hasn't been loaded in the past
    appState.userGroups[groupId] = appState.userGroups[groupId] || {};
    appState.userGroups[groupId].members = appState.userGroups[groupId].members || {};
    appState.userGroups[groupId].members[userId] = groupMembers[i];
  }
  const group = state.userGroups[groupId] || {};
  const groupMessages = group.messages || {};
  const groupInfo = group.info || {};
  appState.userGroups[groupId].messages = groupMessages;
  appState.userGroups[groupId].info = groupInfo || {};
  const result = { ...state, ...appState };
  return result;
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
  const formattedTime = `${month} ${day}, ${year}, at ${hour}:${minutes}`;
  callback(formattedTime);
};
// Post a message to a group
const postMessage = (state, newMessage, groupId) => {
  const newState = { meta: { count: 0 }, userGroups: {} };
  // Initialize the fields with empty objects and array if they had no previous content
  const group = state.userGroups[groupId] || {};
  newState.userGroups[groupId] = group;
  const groupInfo = group.info || {};
  const groupMembers = group.members || {};
  newState.userGroups[groupId].messages = group.messages || {};
  newState.userGroups[groupId].members = groupMembers;
  newState.userGroups[groupId].info = groupInfo;
  const groupMessages = newState.userGroups[groupId].messages;
  // Format the time stamp of new message
  getTimeStamp(newMessage.createdAt, (formattedTime) => {
    newMessage.createdAt = `Sent ${formattedTime}`;
    groupMessages[newMessage.id] = newMessage;
    newState.userGroups[groupId].messages = groupMessages;
  });
  return { ...state, ...newState };
};

// Add a member to a group
const addMembers = (state, newMembers, groupId) => {
  const newState = { meta: { count: 0 }, userGroups: {} };
  const group = state.userGroups[groupId] || {};
  const groupMembers = group.members || {};
  newMembers.map((newMember) => {
    const userId = newMember.id;
    groupMembers[userId] = newMember;
  });
  newState.userGroups[groupId] = group;
  newState.userGroups[groupId].info = group.info || {};
  newState.userGroups[groupId].messages = group.messages || {};
  newState.userGroups[groupId].members = groupMembers;
  return { ...state, ...newState };
};

// Delete a group member
const deleteMember = (state, deletedId, groupId) => {
  const { members } = state.userGroups[groupId] || {};
  const group = state.userGroups[groupId] || {};
  const groupInfo = group.info || {};
  const groupMessages = group.messages || {};

  const keys = _.filter(Object.keys(members), key => key !== deletedId);
  const remainingMembers = _.pick(members, keys);
  const newState = {
    userGroups: {
      [groupId]: {
        info: groupInfo,
        messages: groupMessages,
        members: remainingMembers
      }
    }
  };

  return { ...state, ...newState };
};
// Load message into a group
const loadMessages = (state, messagesDbSnapshot, groupId) => {
  const messages = messagesDbSnapshot.rows;
  const newState = { meta: { count: 0 }, userGroups: {} };
  const messagesObject = {};
  messages.map((message, index) => {
    getTimeStamp(message.createdAt, (formattedTime) => {
      messages[index].createdAt = `Sent ${formattedTime}`;
    });
  });
  for (let i = 0; i < messages.length; i += 1) {
    messagesObject[messages[i].id] = messages[i];
  }
  // const appState = Object.assign({}, state);
  // Load the group with empty data if it has no data in store
  newState.userGroups[groupId] = state.userGroups[groupId] || {};
  newState.userGroups[groupId].messages = messagesObject;
  return { ...state, ...newState };
};

const userGroupsReducer = (state = { meta: { count: 0 }, userGroups: {} }, action) => {
  switch (action.type) {
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return getMembers(state, action.membersDBSnapshot, action.groupId);
    case 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS':
      return getGroups(state, action.data);
    case 'DELETE_A_GROUP_SUCCESS':
      return deleteGroup(state, action.groupId);
    case 'POST_MESSAGE_SUCCESS':
      return postMessage(state, action.message, action.groupId);
    case 'NOTIFY':
      return postMessage(state, action.newMessage, action.groupId);
    case 'ADD_MEMBER_SUCCESS':
      return addMembers(state, action.addedMembers, action.groupId);
    case 'DELETE_GROUP_MEMBER_SUCCESS':
      return deleteMember(state, action.deletedId, action.groupId);
    case 'GET_MESSAGES_SUCCESS':
      return loadMessages(state, action.messagesDbSnapshot, action.groupId);
    case 'LEAVE_GROUP_SUCCESS':
      return deleteGroup(state, action.groupId);
    case 'CREATE_GROUP_SUCCESS':
      return createGroup(state, action.data);
    case 'SIGN_OUT':
      return { meta: { count: 0 }, userGroups: {} };
    default:
      return state;
  }
};

export default userGroupsReducer;
