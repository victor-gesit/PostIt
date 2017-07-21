export const signIn = (email, password) => {
  console.log(email);
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

export const postMessage = (senderId, message, priority, isComment) => {
  return {
    type: 'POST_MESSAGE',
    message,
    priority,
    isComment,
    senderId,
  };
};

export const addUser = (email, groupId, adderId) => {
  return {
    type: 'ADD_MEMBER',
    email,
    groupId,
    adderId,
  };
};

export const deleteGroup = (ownerId, groupId) => {
  return {
    type: 'DELETE_GROUP',
    ownerId,
    groupId
  };
};

export const createGroup = (userId, title, description, initialMembers) => {
  return {
    type: 'CREATE_GROUP',
    userId,
    title,
    description,
    initialMembers
  };
};

export const getMessages = (groupId) => {
  return {
    type: 'GET_MESSAGES',
    groupId
  };
};

export const getGroupMembers = (groupId) => {
  return {
    type: 'GET_GROUP_MEMBERS',
    groupId
  };
};

export const getPostItMembers = () => {
  return {
    type: 'GET_POST_IT_MEMBERS',
  };
};

export const getAllGroups = () => {
  return {
    type: 'GET_ALL_GROUPS'
  };
};

export const deleteMember = (ownerId, email, groupId) => {
  return {
    type: 'DELETE_MEMBER',
    ownerId,
    email,
    groupId
  };
};
