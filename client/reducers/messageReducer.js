const messages = (state = [], action) => {
  switch (action.tytpe) {
    case 'POST_MESSAGE_SUCCESS':
      return [
        ...state,
        action.data
      ];
    case 'GET_MESSAGES_SUCCESS':
      return [
        ...action.data
      ];
    default:
      return state;
  }
};

export default messages;
