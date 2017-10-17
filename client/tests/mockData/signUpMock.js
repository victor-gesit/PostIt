import sinon from 'sinon';

export default {
  props: {
    resetLoadingState: sinon.spy(),
    appInfo: {
      authState: {
        signedIn: true
      }
    },
    location: {
      state: { from: null }
    },
    apiError: {
      message: 'Signed In'
    },
    history: []
  },
  propsWithError: {
    resetLoadingState: sinon.spy(),
    resetErrorLog: sinon.spy(),
    appInfo: {
      authState: {
        signedIn: false,
        message: 'Error Message'
      }
    },
    location: {
      state: { from: null }
    },
    apiError: {
      message: 'Not signed In'
    },
    history: []
  },
  signedIn: {
    resetLoadingState: sinon.spy(),
    resetErrorLog: sinon.spy(),
    appInfo: {
      authState: {
        signedIn: true,
      }
    },
    location: {
      state: { from: null }
    },
    apiError: {
      message: 'Signed In'
    },
    history: { push: sinon.spy() }
  }
};
