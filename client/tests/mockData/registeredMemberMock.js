import sinon from 'sinon';

export default {
  props: {
    userInfo: {
      email: 'victorgesit@andela.com',
      id: '12345'
    },
    store: {
      signOut: sinon.spy()
    }
  }
};
