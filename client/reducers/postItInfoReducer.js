// Method to get registered postit members
const getPostItMembers = (state, dbSnapshot) => {
  const newState = { members: { postItMembers: { }, meta: { count: 0 } } };
  const membersRows = dbSnapshot.rows;
  for (let i = 0; i < membersRows.length; i += 1) {
    const userId = membersRows[i].id;
    newState.members.postItMembers[userId] = membersRows[i];
  }

  newState.members.meta.count = dbSnapshot.count;
  return { ...state, ...newState };
};

// Get groups on PostIt
const getAllPostItGroups = (state, dbSnapshot) => {
  const newState = { groups: { postItGroups: { }, meta: { count: 0 } } };
  const groupRows = dbSnapshot.rows;
  for (let i = 0; i < groupRows.length; i += 1) {
    const userId = groupRows[i].id;
    newState.groups.postItGroups[userId] = groupRows[i];
  }

  newState.groups.meta.count = dbSnapshot.count;
  return { ...state, ...newState };
};

const postItInfoReducer = (state = {
  members: {
    postItMembers: {
    },
    meta: { count: 0 }
  },
  groups: {
    postItGroups: {},
    meta: { count: 0 }
  }
}, action) => {
  switch (action.type) {
    case 'GET_POST_IT_MEMBERS_SUCCESS':
      return getPostItMembers(state, action.dbSnapShot);
    case 'GET_ALL_GROUPS_SUCCESS':
      return getAllPostItGroups(state, action.postItGroups);
    case 'SIGN_OUT':
      return {
        members: {
          postItMembers: {},
          meta: { count: 0 }
        },
        groups: {
          postItGroups: {},
          meta: { count: 0 }
        }
      };
    default:
      return state;
  }
};

export default postItInfoReducer;
