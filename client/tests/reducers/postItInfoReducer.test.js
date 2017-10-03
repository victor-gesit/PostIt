import { Reducer } from 'redux-testkit';
import postItInfoReducer from '../../reducers/postItInfoReducer';

const initialState = {
  members: {
    postItMembers: {
    },
    meta: { count: 0 }
  },
  groups: {
    postItGroups: {},
    meta: { count: 0 }
  }
};
const postItMembers = {
  members: {
    postItMembers: {
      12345: {
        id: '12345',
        name: 'First Member'
      },
      23456: {
        id: '23456',
        name: 'Second Member'
      }
    },
    meta: { count: 2 }
  }
};

const postItGroups = {
  groups: {
    postItGroups: {
      abcde: {
        id: 'abcde',
        name: 'First Group'
      },
      bcdef: {
        id: 'bcdef',
        name: 'Second Group'
      }
    },
    meta: { count: 2 }
  }
};

const actionMembersGotten = { type: 'GET_POST_IT_MEMBERS_SUCCESS',
  dbSnapShot: {
    rows: [{
      id: '12345',
      name: 'First Member'
    },
    {
      id: '23456',
      name: 'Second Member'
    }],
    count: 2
  }
};
const actionAllGroupsGotten = { type: 'GET_ALL_GROUPS_SUCCESS',
  postItGroups: {
    rows: [{
      id: 'abcde',
      name: 'First Group'
    },
    {
      id: 'bcdef',
      name: 'Second Group'
    }],
    count: 2
  }
};
const actionSignOut = { type: 'SIGN_OUT' };

describe('authStateReducer', () => {
  it('should have an initial state', () => {
    expect(postItInfoReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(postItInfoReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });
  it('should set store with all members registered on the application', () => {
    Reducer(postItInfoReducer).expect(actionMembersGotten).toReturnState({ ...initialState, ...postItMembers });
  });
  it('should set store with the list of all the groups on the application', () => {
    Reducer(postItInfoReducer).expect(actionAllGroupsGotten).toReturnState({ ...initialState, ...postItGroups });
  });
  it('should reset state after a user signs out', () => {
    Reducer(postItInfoReducer).expect(actionSignOut).toReturnState(initialState);
  });
});
