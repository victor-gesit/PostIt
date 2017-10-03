export const signIn = (email, password) =>
  ({
    type: 'SIGN_IN',
    email,
    password
  });


export const signUp = (firstName, lastName, email, password, phone) =>
  ({
    type: 'SIGN_UP',
    firstName,
    lastName,
    email,
    password,
    phone
  });

export const postMessage = (senderId, groupId, body, priority, isComment, token) =>
  ({
    type: 'POST_MESSAGE',
    body,
    priority,
    isComment,
    senderId,
    groupId,
    token
  });

export const addUser = (email, groupId, adderId, token) =>
  ({
    type: 'ADD_MEMBER',
    email,
    groupId,
    adderId,
    token
  });

export const deleteGroup = (ownerId, groupId, token) =>
  ({
    type: 'DELETE_A_GROUP',
    ownerId,
    groupId,
    token
  });

export const createGroup = (creatorId, title, description, initialMembers, token) =>
  ({
    type: 'CREATE_GROUP',
    creatorId,
    title,
    description,
    initialMembers,
    token
  });

export const getMessages = (groupId, token) =>
  ({
    type: 'GET_MESSAGES',
    groupId,
    token
  });

export const getGroupMembers = (groupId, token) =>
  ({
    type: 'GET_GROUP_MEMBERS',
    groupId,
    token
  });

export const getPostItMembers = (token, offset, limit) => {
  offset = offset || 0;
  limit = limit || 6;
  return {
    type: 'GET_POST_IT_MEMBERS',
    token,
    offset,
    limit
  };
};

export const getAllGroups = (offset, limit, token) =>
  ({
    type: 'GET_ALL_GROUPS',
    offset,
    limit,
    token
  });

export const getGroupsForUser = (userId, offset, limit, token) =>
  ({
    type: 'GET_ALL_GROUPS_FOR_A_USER',
    userId,
    offset,
    limit,
    token
  });

export const getAllGroupsForUser = (userId, token) =>
  ({
    type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE',
    userId,
    token
  });

export const deleteMember = (ownerId, idToDelete, groupId, token) =>
  ({
    type: 'DELETE_GROUP_MEMBER',
    ownerId,
    idToDelete,
    groupId,
    token
  });

export const loadMessages = groupId =>
  ({
    type: 'LOAD_MESSAGES',
    groupId
  });

export const seenBy = (messageId, token) =>
  ({
    type: 'SEEN_BY',
    messageId,
    token
  });

export const resetErrorLog = () =>
  ({
    type: 'RESET_ERROR_LOG',
  });

export const resetRedirect = () =>
  ({
    type: 'RESET_REDIRECT_STATE'
  });

export const resetLoadingState = () =>
  ({
    type: 'RESET_LOADING_STATE'
  });

export const signOut = () =>
  ({
    type: 'SIGN_OUT',
  });

export const verifyToken = token =>
  ({
    type: 'VERIFY_TOKEN',
    token
  });

export const leaveGroup = (token, groupId) =>
  ({
    type: 'LEAVE_GROUP',
    token,
    groupId
  });

export const notify = (newMessage, groupId) =>
  ({
    type: 'NOTIFY',
    newMessage,
    groupId
  });

export const googleLogin = userDetails =>
  ({
    type: 'GOOGLE_LOGIN',
    userDetails
  });

export const recoverPassword = email =>
  ({
    type: 'RECOVER_PASSWORD',
    email
  });

export const resetPassword = (password, token) =>
  ({
    type: 'RESET_PASSWORD',
    password,
    token
  });

export const searchGroup = (token, groupId, searchQuery, offset, limit) => {
  offset = offset || 0;
  return {
    type: 'SEARCH_GROUP_LIST',
    groupId,
    searchQuery,
    offset,
    limit,
    token
  };
};
