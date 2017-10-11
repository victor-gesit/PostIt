import sinon from 'sinon';

export default {
  leaveGroup: sinon.spy(),
  resetLoadingState: sinon.spy(),
  resetErrorLog: sinon.spy(),
  resetPassword: sinon.spy(),
  history: { push: sinon.spy() },
  match: {
    params: {
      token: 'nekot'
    }
  },
  appInfo: {
    authState: {
      signedIn: false
    }
  },
  apiError: {
    message: 'Error Message'
  }
};
