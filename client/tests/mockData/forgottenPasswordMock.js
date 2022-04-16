import sinon from 'sinon';

export default {
  props: {
    leaveGroup: sinon.spy(),
    resetErrorLog: sinon.spy(),
    resetLoadingState: sinon.spy(),
    appInfo: {
      userDetails: {}
    },
    apiError: {
      errored: false,
      message: 'No message'
    }
  },
  propsWithError: {
    leaveGroup: sinon.spy(),
    resetErrorLog: sinon.spy(),
    recoverPassword: sinon.spy(),
    apiError: {
      errored: true,
      message: 'Error message'
    }
  },
  propsWithDataLoading: {
    dataLoading: true,
    leaveGroup: sinon.spy(),
    resetErrorLog: sinon.spy(),
    resetLoadingState: sinon.spy(),
    apiError: {
      errored: false,
      message: 'No message'
    }
  }
};
