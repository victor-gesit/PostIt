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

export const postMessage = (groupId, body,
  priority, isComment, token) =>
  ({
    type: 'POST_MESSAGE',
    body,
    priority,
    isComment,
    groupId,
    token
  });

export const addUser = (email, groupId, token) =>
  ({
    type: 'ADD_MEMBER',
    email,
    groupId,
    token
  });

export const deleteGroup = (groupId, token) =>
  ({
    type: 'DELETE_A_GROUP',
    groupId,
    token
  });

export const createGroup = (title,
  description, initialMembers, token) =>
  ({
    type: 'CREATE_GROUP',
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

export const getPostItMembers = (token, offset = 0, limit = 6) =>
  ({
    type: 'GET_POST_IT_MEMBERS',
    token,
    offset,
    limit
  });

export const getAllGroups = (offset, limit, token) =>
  ({
    type: 'GET_ALL_GROUPS',
    offset,
    limit,
    token
  });

export const getGroupsForUser = (token, offset = 0, limit = 6) =>
  ({
    type: 'GET_ALL_GROUPS_FOR_A_USER',
    offset,
    limit,
    token
  });

export const getAllGroupsForUser = (token, offset = 0) =>
  ({
    type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE',
    token,
    offset
  });
export const deleteMember = (idToDelete, groupId, token) =>
  ({
    type: 'DELETE_GROUP_MEMBER',
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

export const searchGroup = (token, groupId, searchQuery, limit, offset = 0) =>
  ({
    type: 'SEARCH_GROUP_LIST',
    groupId,
    searchQuery,
    offset,
    limit,
    token
  });
