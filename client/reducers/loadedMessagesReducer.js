const loadedMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_MESSAGES': {
      const groupId = action.groupId;
      return Object.assign({}, state, { groupId });
    }
    case 'CREATE_GROUP_SUCCESS': {
      const groupId = action.data.createdGroup.id;
      return Object.assign({}, state, { groupId });
    }
    case 'DELETE_GROUP_SUCCESS': {
      const groupId = null;
      return Object.assign({}, state, groupId);
    }
    case 'LEAVE_GROUP_SUCCESS': {
      const groupId = null;
      return Object.assign({}, state, groupId);
    }
    case 'SIGN_OUT':
      return {
        groupId: null
      };
    default:
      return state;
  }
};

export default loadedMessagesReducer;
