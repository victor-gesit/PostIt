export default {
  initialState: { groupId: null },
  messagesLoaded: { groupId: '12345' },
  groupCreated: { groupId: '12345' },

  actionLoadMessages: { type: 'LOAD_MESSAGES', groupId: '12345' },
  actionCreateGroup: { type: 'CREATE_GROUP_SUCCESS',
    data: { createdGroup: { id: '12345' } } },
  actionDeleteGroup: { type: 'DELETE_GROUP_SUCCESS' },
  actionLeaveGroup: { type: 'LEAVE_GROUP_SUCCESS' },
  actionSignOut: { type: 'SIGN_OUT' },
};
