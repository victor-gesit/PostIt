
const deleteMember = (state, email) => {
  state.indexOf(email);
  const index = state.indexOf(5);
  if (index >= 1) {
    state.splice(index, 1);
  }
};


const groupReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MEMBER_SUCCESS':
      return [
        ...state, ...action.data
      ];
    case 'DELETE_MEMBER_SUCCESS':
      return [
        // Perform actions to modify the state and remove the member
        ...state,
        {
          ownerId: action.ownerId,
          groupId: action.groupId,
          email: action.email,
        }
      ];
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return [
        ...action.data
      ];
    case 'GET_ALL_GROUPS':
      return [
        ...action.data
      ];
    default:
      return state;
  }
};

export default groupReducer;
