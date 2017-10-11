const postItInfoReducer = (state = {
  members: {
    postItMembers: {
    },
    meta: { count: 0, allLoaded: 0 }
  },
  groups: {
    postItGroups: {},
    meta: { count: 0, allLoaded: 0 }
  }
}, action) => {
  switch (action.type) {
    case 'GET_POST_IT_MEMBERS_SUCCESS':
      return { ...state,
        members: { ...state.members,
          meta: action.newState.members.meta,
          postItMembers: { ...state.members.postItMembers,
            ...action.newState.members.postItMembers } } };
    case 'GET_ALL_GROUPS_SUCCESS':
      return { ...state, ...action.newState };
    case 'SIGN_OUT':
      return {
        members: {
          postItMembers: {},
          meta: { count: 0, allLoaded: 0 }
        },
        groups: {
          postItGroups: {},
          meta: { count: 0, allLoaded: 0 }
        }
      };
    default:
      return state;
  }
};

export default postItInfoReducer;
