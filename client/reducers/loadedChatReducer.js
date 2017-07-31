const loadedChatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_CHAT': {
      const groupId = action.groupId;
      return Object.assign({}, state, { groupId });
    }
    default:
      return state;
  }
};

export default loadedChatReducer;
