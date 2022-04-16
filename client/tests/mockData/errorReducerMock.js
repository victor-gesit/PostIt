export default {
  initialState: { errored: false,
    message: null,
    redirect: { yes: false, to: null } },

  // signedIn: { signedIn: true, message: 'Signed In' },
  signInError: { errored: true, redirect: { yes: false, to: null }, message: 'Auth error' },
  verifyTokenError: { errored: true,
    redirect: { yes: true, to: '/' },
    message: 'You have been away for a while. Please sign in again' },
  getGroupsError: { errored: true,
    redirect: { yes: true, to: '/' } },
  errorWithRedirect: { errored: true,
    redirect: { yes: true, to: '/messageboard' },
    message: 'Error Message' },
  errorWithoutRedirect: { errored: true,
    redirect: { yes: false, to: null },
    message: 'Error Message' },
  noErrorNoRedirect: { errored: false,
    redirect: { yes: false, to: null },
    message: 'Success Message' },
  noErrorWithRedirect: { errored: false,
    redirect: { yes: true, to: '/messageboard' },
    message: 'Success Message' },
  noErrorRedirectToPostMessage: { errored: false,
    redirect: { yes: true, to: '/#/postmessage/12345' },
    message: 'Success Message' },
  invalidAuthError: { errored: true,
    redirect: { yes: true, to: '/' },
    message: 'Error Message' },

  actionSignInError: { type: 'SIGN_IN_ERROR',
    message: 'Auth error' },
  actionRecoverPasswordError: { type: 'RECOVER_PASSWORD_ERROR',
    message: 'Error Message' },
  actionRecoverPasswordSuccess: { type: 'RECOVER_PASSWORD_SUCCESS',
    message: 'Success Message' },
  actionVerifyTokenError: { type: 'VERIFY_TOKEN_ERROR',
    message: 'You have been away for a while. Please sign in again' },
  actionSignUpError: { type: 'SIGN_UP_ERROR',
    message: 'Auth error' },
  actionSignOut: { type: 'SIGN_OUT', message: null },
  actionGetGroups: { type: 'GET_ALL_GROUPS_FOR_A_USER_ERROR',
    message: 'Could not get groups' },
  actionGetMembersError: { type: 'ADD_MEMBER_ERROR',
    message: 'Error Message' },
  actionGetMembersSuccess: { type: 'ADD_MEMBER_SUCCESS',
    message: 'Success Message' },
  actionDeleteMemberError: { type: 'DELETE_GROUP_MEMBER_ERROR',
    message: 'Error Message' },
  actionDeleteMemberSuccess: { type: 'DELETE_GROUP_MEMBER_SUCCESS',
    message: 'Success Message' },
  actionDeleteGroupSuccess: { type: 'DELETE_A_GROUP_SUCCESS',
    message: 'Success Message' },
  actionLeaveGroupSuccess: { type: 'LEAVE_GROUP_SUCCESS',
    message: 'Success Message' },
  actionGetGroupMembersError: { type: 'GET_GROUP_MEMBERS_ERROR',
    message: 'Error Message' },
  actionGetGroupMembersSuccess: { type: 'GET_GROUP_MEMBERS_SUCCESS',
    message: 'Success Message' },
  actionGetAllGroupsErrors: { type: 'GET_ALL_GROUPS_ERROR',
    message: 'Error Message' },
  actionGetAllGroupsSuccess: { type: 'GET_ALL_GROUPS_SUCCESS',
    message: 'Success Message' },
  actionPostMessageError: { type: 'POST_MESSAGE_ERROR',
    message: 'Error Message' },
  actionPostMessageSuccess: { type: 'POST_MESSAGE_SUCCESS',
    message: 'Success Message' },
  actionGetMessagesError: { type: 'GET_MESSAGES_ERROR',
    message: 'Error Message' },
  actionCreateGroupError: { type: 'CREATE_GROUP_ERROR',
    message: 'Error Message' },
  actionCreateGroupSuccess: { type: 'CREATE_GROUP_SUCCESS',
    data: { createdGroup: { id: '12345' } },
    message: 'Success Message' },
  actionGetMessagesSuccess: { type: 'GET_MESSAGES_SUCCESS',
    message: 'Success Message' },
  actionResetErrorLog: { type: 'RESET_ERROR_LOG',
    message: 'Success Message' },
  actionLoadMessages: { type: 'LOAD_MESSAGES',
    groupId: '12345',
    message: 'Success Message' },
  actionResetRedirect: { type: 'RESET_REDIRECT_STATE',
    message: 'Success Message' },
  actionInvalidAuth: { type: 'INVALID_AUTH',
    message: 'Error Message' },
};
