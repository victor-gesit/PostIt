import { Reducer } from 'redux-testkit';
import indexReducer from '../../reducers/';

const initialState = {
  // Hold some groups (batch loading from db for pagination)
  groups: { meta: { count: 0 }, userGroups: {} },
  // This will contain all the groups and everything about each
  allUserGroups: { meta: { count: 0 }, userGroups: {} },
  // This indicates any error during queries to the API
  apiError: { errored: false, message: null, redirect: { yes: false, to: null } },
  appInfo: {
    userDetails: {
      firstName: null,
      lastName: null,
      id: null,
      token: null,
      email: null,
      phone: null
    },
    authState: { signedIn: false, message: null },
    loadedMessages: {
      groupId: null
    }
  },
  messageInfo: {
    seenBy: []
  },
  dataLoading: false,
  postItInfo: {
    members: {
      postItMembers: {
      },
      meta: { count: 0 }
    },
    groups: {
      postItGroups: {},
      meta: { count: 0 }
    }
  }
};

const actionSignOut = { type: 'SIGN_OUT' };

describe('authStateReducer', () => {
  it('should have an initial state', () => {
    expect(indexReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(indexReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });
  it('should reset state after a user signs out', () => {
    Reducer(indexReducer).expect(actionSignOut).toReturnState(initialState);
  });
});
