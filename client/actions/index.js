export const signIn = (email, password) => {
  return {
    type: 'SIGN_IN',
    email,
    password
  };
};

export const signUp = (firstName, lastName, email, password, phone) => {
  return {
    type: 'SIGN_UP',
    firstName,
    lastName,
    email,
    password,
    phone
  };
};

export const postMessage = (senderId, body, priority, isComment, token) => {
  return {
    type: 'POST_MESSAGE',
    body,
    priority,
    isComment,
    senderId,
    token
  };
};

export const addUser = (email, groupId, adderId, token) => {
  return {
    type: 'ADD_MEMBER',
    email,
    groupId,
    adderId,
    token
  };
};

export const deleteGroup = (ownerId, groupId, token) => {
  return {
    type: 'DELETE_GROUP',
    ownerId,
    groupId,
    token
  };
};

export const createGroup = (creatorId, title, description, initialMembers, token) => {
  return {
    type: 'CREATE_GROUP',
    creatorId,
    title,
    description,
    initialMembers,
    token
  };
};

export const getMessages = (groupId, offset, limit, token) => {
  return {
    type: 'GET_MESSAGES',
    groupId,
    offset,
    limit,
    token
  };
};

export const getGroupMembers = (groupId, offset, limit, token) => {
  return {
    type: 'GET_GROUP_MEMBERS',
    groupId,
    offset,
    limit,
    token
  };
};

export const getPostItMembers = (token) => {
  return {
    type: 'GET_POST_IT_MEMBERS',
    token
  };
};

export const getAllGroups = (offset, limit, token) => {
  return {
    type: 'GET_ALL_GROUPS',
    offset,
    limit,
    token
  };
};

export const getGroupsForUser = (userId, offset, limit, token) => {
  return {
    type: 'GET_ALL_GROUPS_FOR_A_USER',
    userId,
    offset,
    limit,
    token
  };
};

export const getAllGroupsForUser = (userId, token) => {
  return {
    type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE',
    userId,
    token
  };
};

export const deleteMember = (ownerId, idToDelete, groupId, token) => {
  return {
    type: 'DELETE_MEMBER',
    ownerId,
    idToDelete,
    groupId,
    token
  };
};

export const loadChat = (groupId) => {
  return {
    type: 'LOAD_CHAT',
    groupId
  };
};

export const resetErrorLog = () => {
  return {
    type: 'RESET_ERROR_LOG',
  };
};

export const resetRedirect = () => {
  return {
    type: 'RESET_REDIRECT_STATE'
  };
};

