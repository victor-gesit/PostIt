import { Reducer } from 'redux-testkit';
import errorReducer from '../../reducers/errorReducer';
import { errorReducerMock as mock } from '../mockData';

describe('errorReducer', () => {
  it('should have an initial state', () => {
    expect(errorReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(mock.initialState);
  });
  it('should not affect state', () => {
    Reducer(errorReducer).expect({ type: 'UNREGISTERED' })
      .toReturnState(mock.initialState);
  });
  it('should set an error message for failed sign in', () => {
    Reducer(errorReducer).expect(mock.actionSignInError)
      .toReturnState(mock.signInError);
  });
  it('should set an error for invalid token', () => {
    Reducer(errorReducer).expect(mock.actionVerifyTokenError)
      .toReturnState(mock.verifyTokenError);
  });
  it('should set an error message for failed signup ', () => {
    Reducer(errorReducer).expect(mock.actionSignUpError)
      .toReturnState(mock.signInError);
  });
  it('should restore store to default state after sign out', () => {
    Reducer(errorReducer).expect(mock.actionSignOut)
      .toReturnState(mock.initialState);
  });
  it('should thow an error when loading groups fails', () => {
    Reducer(errorReducer).expect(mock.actionSignOut)
      .toReturnState(mock.initialState);
  });
  it('should throw an error message when getting groups fails', () => {
    Reducer(errorReducer).expect(mock.actionGetGroups)
      .toReturnState(mock.getGroupsError);
  });
  it('should throw an error message when recovering password fails', () => {
    Reducer(errorReducer).expect(mock.actionRecoverPasswordError)
      .toReturnState(mock.errorWithoutRedirect);
  });
  it('should throw no error when recovering password succeeds', () => {
    Reducer(errorReducer).expect(mock.actionRecoverPasswordSuccess)
      .toReturnState(mock.noErrorNoRedirect);
  });
  it('should throw an error message when getting members of a group fails', () => {
    Reducer(errorReducer).expect(mock.actionGetMembersError)
      .toReturnState(mock.errorWithoutRedirect);
  });
  it('should throw no error when loading group members succeeds', () => {
    Reducer(errorReducer).expect(mock.actionGetMembersSuccess)
      .toReturnState(mock.noErrorNoRedirect);
  });
  it('should throw an error message when deleting a group member fails', () => {
    Reducer(errorReducer).expect(mock.actionDeleteMemberError)
      .toReturnState(mock.errorWithoutRedirect);
  });
  it('should throw no error when a member is removed from a group successfully', () => {
    Reducer(errorReducer).expect(mock.actionDeleteMemberSuccess)
      .toReturnState(mock.noErrorNoRedirect);
  });
  it('should throw no error when a group is successfully deleted', () => {
    Reducer(errorReducer).expect(mock.actionDeleteGroupSuccess)
      .toReturnState(mock.noErrorWithRedirect);
  });
  it('should throw no error when leaving a group is successful', () => {
    Reducer(errorReducer).expect(mock.actionLeaveGroupSuccess)
      .toReturnState(mock.noErrorWithRedirect);
  });
  it('should throw an error message when getting group members fails', () => {
    Reducer(errorReducer).expect(mock.actionGetGroupMembersError)
      .toReturnState(mock.errorWithoutRedirect);
  });
  it('should throw no error message when getting group members is successful', () => {
    Reducer(errorReducer).expect(mock.actionGetGroupMembersSuccess)
      .toReturnState(mock.noErrorNoRedirect);
  });
  it('should throw an error message when getting all groups a user belongs to fails', () => {
    Reducer(errorReducer).expect(mock.actionGetAllGroupsErrors)
      .toReturnState(mock.errorWithoutRedirect);
  });
  it('should throw no error when getting groups for a user is successful', () => {
    Reducer(errorReducer).expect(mock.actionGetAllGroupsSuccess)
      .toReturnState(mock.noErrorNoRedirect);
  });
  it('should throw an error message when posting messages to a group fails', () => {
    Reducer(errorReducer).expect(mock.actionPostMessageError)
      .toReturnState(mock.errorWithoutRedirect);
  });
  it('should not redirect the page when posting to a group is succesfull', () => {
    Reducer(errorReducer).expect(mock.actionPostMessageSuccess)
      .toReturnState(mock.noErrorNoRedirect);
  });
  it('should throw an error message when getting messages from a group is successfull', () => {
    Reducer(errorReducer).expect(mock.actionGetMessagesError)
      .toReturnState(mock.errorWithRedirect);
  });
  it('should throw an error message when creating a group fails', () => {
    Reducer(errorReducer).expect(mock.actionCreateGroupError)
      .toReturnState(mock.errorWithoutRedirect);
  });
  it('should throw no error message when creating a group is successfull', () => {
    Reducer(errorReducer).expect(mock.actionCreateGroupSuccess)
      .toReturnState(mock.noErrorRedirectToPostMessage);
  });
  it('should throw no error message when getting messages is successfull', () => {
    Reducer(errorReducer).expect(mock.actionGetMessagesSuccess)
      .toReturnState(mock.noErrorNoRedirect);
  });
  it('should reset the state of the error log', () => {
    Reducer(errorReducer).expect(mock.actionResetErrorLog)
      .toReturnState(mock.initialState);
  });
  it('should redirect to the post message page when loading messages is successful', () => {
    Reducer(errorReducer).expect(mock.actionLoadMessages)
      .toReturnState(mock.noErrorRedirectToPostMessage);
  });
  it('should redirect to the post message page when loading messages is successful', () => {
    Reducer(errorReducer).expect(mock.actionResetRedirect)
      .toReturnState(mock.initialState);
  });
  it('should redirect to the post message page when loading messages is successful', () => {
    Reducer(errorReducer).expect(mock.actionInvalidAuth)
      .toReturnState(mock.invalidAuthError);
  });
});
