const loadedChatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_CHAT': {
      const groupId = action.groupId;
      return Object.assign({}, state, { groupId });
    }
    case 'CREATE_GROUP_SUCCESS': {
      const groupId = action.data.createdGroup.id;
      return Object.assign({}, state, { groupId });
    }
    case 'DELETE_GROUP_SUCCESS': {
      const groupId = '';
      return Object.assign({}, state, groupId);
    }
    default:
      return state;
  }
};

export default loadedChatReducer;
