const errorReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MEMBER_ERROR':
      return [
        ...state,
        // The new member details come here
        /*
        {
          email: action.email,
          groupId: action.groupId,
          adderId: action.adderId,
        }
        */
      ];
    case 'DELETE_MEMBER_ERROR':
      return [
        // Perform actions to modify the state and remove the member
        ...state,
        {
          ownerId: action.ownerId,
          groupId: action.groupId,
          email: action.email,
        }
      ];
    case 'GET_GROUP_MEMBERS_ERROR':
      return [
        // The gotten group members go here

        // ...state,
        // {
        //   groupId: action.groupId,
        // }
      ];
    case 'GET_ALL_GROUPS_ERROR':
      return [
        // The gotten group goes here
        
        // ...state,
        // {
        //   groupId: action.groupId,
        // }
      ];
    case 'POST_MESSAGE_ERROR':
      return [
        ...state,
        {
          // message: action.message,
          // priority: action.priority,
          // isComment: action.isComment,
          // senderId: action.senderId
          
          // New message is put here
        }
      ];
    case 'GET_MESSAGES_ERROR':
      return [
      //   ...state,
      //   {
      //     groupId: action.groupId,
      //   }

      // G
      ];
    default:
      return state;
  }
};

export default errorReducer;
