import { Reducer } from 'redux-testkit';
import errorReducer from '../../reducers/errorReducer';

const initialState = { errored: false, message: null, redirect: { yes: false, to: null } };

// const signedIn = { signedIn: true, message: 'Signed In' };
const signInError = { errored: true, redirect: { yes: false, to: null }, message: 'Auth error' };
const verifyTokenError = { errored: true,
  redirect: { yes: true, to: '/' },
  message: 'You have been away for a while. Please sign in again' };
const getGroupsError = { errored: true, redirect: { yes: true, to: '/' } };
const errorWithRedirect = { errored: true, redirect: { yes: true, to: '/messageboard' }, message: 'Error Message' };
const errorWithoutRedirect = { errored: true, redirect: { yes: false, to: null }, message: 'Error Message' };
const noErrorNoRedirect = { errored: false, redirect: { yes: false, to: null }, message: 'Success Message' };
const noErrorWithRedirect = { errored: false, redirect: { yes: true, to: '/messageboard' }, message: 'Success Message' };
const noErrorRedirectToPostMessage = { errored: false,
  redirect: { yes: true, to: '/#/postmessage/12345' },
  message: 'Success Message' };
const invalidAuthError = { errored: true, redirect: { yes: true, to: '/' }, message: 'Error Message' };

const actionSignInError = { type: 'SIGN_IN_ERROR', message: 'Auth error' };
const actionRecoverPasswordError = { type: 'RECOVER_PASSWORD_ERROR', message: 'Error Message' };
const actionRecoverPasswordSuccess = { type: 'RECOVER_PASSWORD_SUCCESS', message: 'Success Message' };
const actionVerifyTokenError = { type: 'VERIFY_TOKEN_ERROR',
  message: 'You have been away for a while. Please sign in again' };
const actionSignUpError = { type: 'SIGN_UP_ERROR', message: 'Auth error' };
const actionSignOut = { type: 'SIGN_OUT', message: null };
const actionGetGroups = { type: 'GET_ALL_GROUPS_FOR_A_USER_ERROR', message: 'Could not get groups' };
const actionGetMembersError = { type: 'ADD_MEMBER_ERROR', message: 'Error Message' };
const actionGetMembersSuccess = { type: 'ADD_MEMBER_SUCCESS', message: 'Success Message' };
const actionDeleteMemberError = { type: 'DELETE_GROUP_MEMBER_ERROR', message: 'Error Message' };
const actionDeleteMemberSuccess = { type: 'DELETE_GROUP_MEMBER_SUCCESS', message: 'Success Message' };
const actionDeleteGroupSuccess = { type: 'DELETE_A_GROUP_SUCCESS', message: 'Success Message' };
const actionLeaveGroupSuccess = { type: 'LEAVE_GROUP_SUCCESS', message: 'Success Message' };
const actionGetGroupMembersError = { type: 'GET_GROUP_MEMBERS_ERROR', message: 'Error Message' };
const actionGetGroupMembersSuccess = { type: 'GET_GROUP_MEMBERS_SUCCESS', message: 'Success Message' };
const actionGetAllGroupsErrors = { type: 'GET_ALL_GROUPS_ERROR', message: 'Error Message' };
const actionGetAllGroupsSuccess = { type: 'GET_ALL_GROUPS_SUCCESS', message: 'Success Message' };
const actionPostMessageError = { type: 'POST_MESSAGE_ERROR', message: 'Error Message' };
const actionPostMessageSuccess = { type: 'POST_MESSAGE_SUCCESS', message: 'Success Message' };
const actionGetMessagesError = { type: 'GET_MESSAGES_ERROR', message: 'Error Message' };
const actionCreateGroupError = { type: 'CREATE_GROUP_ERROR', message: 'Error Message' };
const actionCreateGroupSuccess = { type: 'CREATE_GROUP_SUCCESS',
  data: { createdGroup: { id: '12345' } },
  message: 'Success Message' };
const actionGetMessagesSuccess = { type: 'GET_MESSAGES_SUCCESS', message: 'Success Message' };
const actionResetErrorLog = { type: 'RESET_ERROR_LOG', message: 'Success Message' };
const actionLoadMessages = { type: 'LOAD_MESSAGES', groupId: '12345', message: 'Success Message' };
const actionResetRedirect = { type: 'RESET_REDIRECT_STATE', message: 'Success Message' };
const actionInvalidAuth = { type: 'INVALID_AUTH', message: 'Error Message' };

describe('errorReducer', () => {
  it('should have an initial state', () => {
    expect(errorReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(initialState);
  });
  it('should not affect state', () => {
    Reducer(errorReducer).expect({ type: 'UNREGISTERED' }).toReturnState(initialState);
  });
  it('should set an error message for failed sign in', () => {
    Reducer(errorReducer).expect(actionSignInError).toReturnState(signInError);
  });
  it('should set an error for invalid token', () => {
    Reducer(errorReducer).expect(actionVerifyTokenError).toReturnState(verifyTokenError);
  });
  it('should set an error message for failed signup ', () => {
    Reducer(errorReducer).expect(actionSignUpError).toReturnState(signInError);
  });
  it('should restore store to default state after sign out', () => {
    Reducer(errorReducer).expect(actionSignOut).toReturnState(initialState);
  });
  it('should thow an error when loading groups fails', () => {
    Reducer(errorReducer).expect(actionSignOut).toReturnState(initialState);
  });
  it('should throw an error message when getting groups fails', () => {
    Reducer(errorReducer).expect(actionGetGroups).toReturnState(getGroupsError);
  });
  it('should throw an error message when recovering password fails', () => {
    Reducer(errorReducer).expect(actionRecoverPasswordError).toReturnState(errorWithoutRedirect);
  });
  it('should throw no error when recovering password succeeds', () => {
    Reducer(errorReducer).expect(actionRecoverPasswordSuccess).toReturnState(noErrorNoRedirect);
  });
  it('should throw an error message when getting members of a group fails', () => {
    Reducer(errorReducer).expect(actionGetMembersError).toReturnState(errorWithoutRedirect);
  });
  it('should throw no error when loading group members succeeds', () => {
    Reducer(errorReducer).expect(actionGetMembersSuccess).toReturnState(noErrorNoRedirect);
  });
  it('should throw an error message when deleting a group member fails', () => {
    Reducer(errorReducer).expect(actionDeleteMemberError).toReturnState(errorWithoutRedirect);
  });
  it('should throw no error when a member is removed from a group successfully', () => {
    Reducer(errorReducer).expect(actionDeleteMemberSuccess).toReturnState(noErrorNoRedirect);
  });
  it('should throw no error when a group is successfully deleted', () => {
    Reducer(errorReducer).expect(actionDeleteGroupSuccess).toReturnState(noErrorWithRedirect);
  });
  it('should throw no error when leaving a group is successful', () => {
    Reducer(errorReducer).expect(actionLeaveGroupSuccess).toReturnState(noErrorWithRedirect);
  });
  it('should throw an error message when getting group members fails', () => {
    Reducer(errorReducer).expect(actionGetGroupMembersError).toReturnState(errorWithoutRedirect);
  });
  it('should throw no error message when getting group members is successful', () => {
    Reducer(errorReducer).expect(actionGetGroupMembersSuccess).toReturnState(noErrorNoRedirect);
  });
  it('should throw an error message when getting all groups a user belongs to fails', () => {
    Reducer(errorReducer).expect(actionGetAllGroupsErrors).toReturnState(errorWithoutRedirect);
  });
  it('should throw no error when getting groups for a user is successful', () => {
    Reducer(errorReducer).expect(actionGetAllGroupsSuccess).toReturnState(noErrorNoRedirect);
  });
  it('should throw an error message when posting messages to a group fails', () => {
    Reducer(errorReducer).expect(actionPostMessageError).toReturnState(errorWithoutRedirect);
  });
  it('should not redirect the page when posting to a group is succesfull', () => {
    Reducer(errorReducer).expect(actionPostMessageSuccess).toReturnState(noErrorNoRedirect);
  });
  it('should throw an error message when getting messages from a group is successfull', () => {
    Reducer(errorReducer).expect(actionGetMessagesError).toReturnState(errorWithRedirect);
  });
  it('should throw an error message when creating a group fails', () => {
    Reducer(errorReducer).expect(actionCreateGroupError).toReturnState(errorWithoutRedirect);
  });
  it('should throw no error message when creating a group is successfull', () => {
    Reducer(errorReducer).expect(actionCreateGroupSuccess)
      .toReturnState(noErrorRedirectToPostMessage);
  });
  it('should throw no error message when getting messages is successfull', () => {
    Reducer(errorReducer).expect(actionGetMessagesSuccess).toReturnState(noErrorNoRedirect);
  });
  it('should reset the state of the error log', () => {
    Reducer(errorReducer).expect(actionResetErrorLog).toReturnState(initialState);
  });
  it('should redirect to the post message page when loading messages is successful', () => {
    Reducer(errorReducer).expect(actionLoadMessages).toReturnState(noErrorRedirectToPostMessage);
  });
  it('should redirect to the post message page when loading messages is successful', () => {
    Reducer(errorReducer).expect(actionResetRedirect).toReturnState(initialState);
  });
  it('should redirect to the post message page when loading messages is successful', () => {
    Reducer(errorReducer).expect(actionInvalidAuth).toReturnState(invalidAuthError);
  });
});
