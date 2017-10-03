import _ from 'lodash';

const methods =  {
  // Delete a group from State
  deleteGroup: (appState, groupId) => {
    const { userGroups } = appState;
    const keys = _.filter(Object.keys(userGroups), key => key !== groupId);
    const newState = {
      userGroups: _.pick(userGroups, keys),
      meta: {
        count: appState.meta.count - 1
      }
    };
    return newState;
  },
  // Create time stamp for messages
  getTimeStamp: (timeStamp, callback) => {
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
  },
  // Get all groups a user belongs to
  getAllGroups: (dbSnapshot, done) => {
    const groups = dbSnapshot.rows;
    const result = { userGroups: {}, meta: { count: dbSnapshot.count } };
    groups.forEach((group) => {
      result.userGroups[group.id] = {};
      result.userGroups[group.id].info = group;
    });
    done(null, result);
  },
  // Method to get registered postit members
  getPostItMembers: (dbSnapshot, done) => {
    const newState = { members: { postItMembers: { }, meta: { count: 0 } } };
    const membersRows = dbSnapshot.rows;
    membersRows.forEach((member) => {
      newState.members.postItMembers[member.id] = member;
    });
    newState.members.meta.count = dbSnapshot.count;
    newState.members.meta.previousOffset = dbSnapshot.offset;
    newState.members.meta.allLoaded = dbSnapshot.allLoaded;
    done(null, newState);
  },
  // Get groups on PostIt
  getAllPostItGroups: (dbSnapshot, done) => {
    const newState = { groups: { postItGroups: { }, meta: { count: 0 } } };
    const groupRows = dbSnapshot.rows;
    groupRows.forEach((group) => {
      newState.groups.postItGroups[group.id] = group;
    });

    newState.groups.meta.count = dbSnapshot.count;
    done(null, newState);
  },
  // Create a group
  createGroup: (apiCallResult, done) => {
    const createdGroup = apiCallResult.createdGroup;
    const newState = { meta: { count: 0 }, userGroups: {} };
    const userGroups = newState.userGroups;
    userGroups[createdGroup.id] = {};
    userGroups[createdGroup.id].info = createdGroup;
    userGroups[createdGroup.id].messages = {};
    userGroups[createdGroup.id].members = {};
    newState.userGroups = userGroups;
    newState.meta.count += 1;
    done(null, newState, createdGroup);
  },
  // Load groups a user belongs to
  getGroups: (dbSnapshot, done) => {
    // Clear the state, to hold new groups for new page
    const appState = { meta: {}, userGroups: {} };
    const groups = dbSnapshot.rows;
    groups.forEach((group) => {
      appState.userGroups[group.id] = appState.userGroups[group.id] || {};
      appState.userGroups[group.id].info = group;
    });
    appState.meta.count = dbSnapshot.count;
    done(null, appState);
  },
  // Load members for a group
  getMembers: (state, dbSnapshot, groupId) => {
    const groupMembers = dbSnapshot.rows;
    // Initialize state with empty object if group data hasn't been loaded in the past
    const appState = { meta: { count: dbSnapshot.count }, userGroups: {} };
    appState.userGroups[groupId] = appState.userGroups[groupId] || {};
    appState.userGroups[groupId].members =
      appState.userGroups[groupId].members || {};
    groupMembers.forEach((member) => {
      appState.userGroups[groupId].members[member.id] = member;
    });
    const group = state.userGroups[groupId] || {};
    const groupMessages = group.messages || {};
    const groupInfo = group.info || {};
    appState.userGroups[groupId].messages = groupMessages;
    appState.userGroups[groupId].info = groupInfo || {};
    const result = { ...state, ...appState };
    return result;
  },
  // Post a message to a group
  postMessage: (state, newMessage, groupId) => {
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
    methods.getTimeStamp(newMessage.createdAt, (formattedTime) => {
      newMessage.createdAt = `Sent ${formattedTime}`;
      groupMessages[newMessage.id] = newMessage;
      newState.userGroups[groupId].messages = groupMessages;
    });
    return { ...state, ...newState };
  },
  // Add a member to a group
  addMembers: (state, newMembers, groupId) => {
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
  },
  // Delete a group member
  deleteMember: (state, deletedId, groupId) => {
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
  },
  // Load message into a group
  loadMessages: (state, messagesDbSnapshot, groupId) => {
    const messages = messagesDbSnapshot.rows;
    const newState = { meta: { count: 0 }, userGroups: {} };
    const messagesObject = {};
    messages.map((message, index) => {
      methods.getTimeStamp(message.createdAt, (formattedTime) => {
        messages[index].createdAt = `Sent ${formattedTime}`;
      });
    });
    messages.forEach((message) => {
      messagesObject[message.id] = message;
    });
    // Load the group with empty data if it has no data in store
    newState.userGroups[groupId] = state.userGroups[groupId] || {};
    newState.userGroups[groupId].messages = messagesObject;
    return { ...state, ...newState };
  },
  // Search a group
  searchGroup: (state, searchResult, groupId) => {
    const groupMembers = searchResult.rows;
    const appState = { meta: { count: searchResult.count }, userGroups: {} };
    // Initialize state with empty object if group data hasn't been loaded in the past
    appState.userGroups[groupId] = appState.userGroups[groupId] || {};
    appState.userGroups[groupId].members = appState.userGroups[groupId].members || {};
    groupMembers.forEach((member) => {
      appState.userGroups[groupId].members[member.id] = member;
    });
    const group = state.userGroups[groupId] || {};
    const groupMessages = group.messages || {};
    const groupInfo = group.info || {};
    appState.userGroups[groupId] = appState.userGroups[groupId] || {};
    appState.userGroups[groupId].messages = groupMessages;
    appState.userGroups[groupId].info = groupInfo || {};
    const result = { ...state, ...appState };
    return result;
  }
};

export default methods;