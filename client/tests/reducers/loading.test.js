import { Reducer } from 'redux-testkit';
import loadingReducer from '../../reducers/loading';
import { signIn, signUp,
  addUser, postMessage, createGroup, getMessages,
  getGroupMembers, getPostItMembers, getAllGroupsForUser,
  getGroupsForUser, getAllGroups, deleteMember, leaveGroup, verifyToken,
  resetLoadingState, recoverPassword, seenBy, resetPassword, signOut } from '../../actions';

const initialState = false;

describe('loadingReducer', () => {
  it('should have an initial state', () => {
    expect(loadingReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(loadingReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should return true when an API call is made to sign a user in', () => {
    Reducer(loadingReducer).expect(signIn()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'SIGN_IN_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'SIGN_IN_ERROR' }).toReturnState(false);
  });

  it('should return true when an API call is made to sign a user up', () => {
    Reducer(loadingReducer).expect(signUp()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'SIGN_UP_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'SIGN_UP_ERROR' }).toReturnState(false);
  });

  it('should return true when an API call is made to add a user to a group', () => {
    Reducer(loadingReducer).expect(addUser()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'ADD_MEMBER_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'ADD_MEMBER_ERROR' }).toReturnState(false);
  });

  it('should return true when posting a message', () => {
    Reducer(loadingReducer).expect(postMessage()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'POST_MESSAGE_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'POST_MESSAGE_ERROR' }).toReturnState(false);
  });


  it('should return true when making an API call to delete a group member', () => {
    Reducer(loadingReducer).expect(deleteMember()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'DELETE_GROUP_MEMBER_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'DELETE_GROUP_MEMBER_ERROR' }).toReturnState(false);
  });


  it('should return true when creating a group', () => {
    Reducer(loadingReducer).expect(createGroup()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'CREATE_GROUP_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'CREATE_GROUP_ERROR' }).toReturnState(false);
  });


  it('should return true when getting messages from API', () => {
    Reducer(loadingReducer).expect(getMessages()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_MESSAGES_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_MESSAGES_ERROR' }).toReturnState(false);
  });


  it('should return true when getting group members from API', () => {
    Reducer(loadingReducer).expect(getGroupMembers()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_GROUP_MEMBERS_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_GROUP_MEMBERS_ERROR' }).toReturnState(false);
  });

  it('should return true when getting all members on PostIt from API', () => {
    Reducer(loadingReducer).expect(getPostItMembers()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_POST_IT_MEMBERS_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_POST_IT_MEMBERS_ERROR' }).toReturnState(false);
  });

  it('should return true when getting all groups a user belongs to', () => {
    Reducer(loadingReducer).expect(getAllGroupsForUser()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_ERROR' }).toReturnState(false);
  });


  it('should return true when getting a certain number of groups for a user', () => {
    Reducer(loadingReducer).expect(getGroupsForUser()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_ALL_GROUPS_FOR_A_USER_ERROR' }).toReturnState(false);
  });


  it('should return when getting all groups on PostIt', () => {
    Reducer(loadingReducer).expect(getAllGroups()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_ALL_GROUPS_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'GET_ALL_GROUPS_ERROR' }).toReturnState(false);
  });

  it('should return when a request to leave group is sent to API', () => {
    Reducer(loadingReducer).expect(leaveGroup()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'LEAVE_GROUP_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'LEAVE_GROUP_ERROR' }).toReturnState(false);
  });


  it('should return true when an API call is made to verify a token', () => {
    Reducer(loadingReducer).expect(verifyToken()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'VERIFY_TOKEN_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'VERIFY_TOKEN_ERROR' }).toReturnState(false);
  });


  it('should return false when a reset of the state is requested', () => {
    Reducer(loadingReducer).expect(resetLoadingState()).toReturnState(false);
  });

  it('should return true when an API request is sent to recover password', () => {
    Reducer(loadingReducer).expect(recoverPassword()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'RECOVER_PASSWORD_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'RECOVER_PASSWORD_ERROR' }).toReturnState(false);
  });

  it('should return true when an API request is made to load who has seen a message', () => {
    Reducer(loadingReducer).expect(seenBy()).toReturnState(true);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'SEEN_BY_SUCCESS' }).toReturnState(false);
  });
  it('should reset state after the API call', () => {
    Reducer(loadingReducer).expect({ type: 'SEEN_BY_ERROR' }).toReturnState(false);
  });

  it('should return true when an API request is made to reset password', () => {
    Reducer(loadingReducer).expect(resetPassword()).toReturnState(true);
  });
  it('should reset the store when user signs out', () => {
    Reducer(loadingReducer).expect(signOut()).toReturnState(false);
  });
});
