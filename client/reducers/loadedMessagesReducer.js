const loadedMessagesReducer = (state = { groupId: null }, action) => {
  switch (action.type) {
    case 'LOAD_MESSAGES': {
      const groupId = action.groupId;
      return {
        groupId
      };
    }
    case 'CREATE_GROUP_SUCCESS': {
      const groupId = action.data.createdGroup.id;
      return {
        groupId
      };
    }
    case 'DELETE_GROUP_SUCCESS': {
      const groupId = null;
      return {
        groupId
      };
    }
    case 'LEAVE_GROUP_SUCCESS': {
      const groupId = null;
      return {
        groupId
      };
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
