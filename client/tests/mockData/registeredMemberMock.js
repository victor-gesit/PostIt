import sinon from 'sinon';

export default {
  props: {
    userInfo: {
      email: 'victorgesit@andela.com',
      id: '12345'
    },
    addMember: sinon.spy(),
    store: {
      signOut: sinon.spy(),
      appInfo: {
        userDetails: {
          id: 'meme',
          firstName: 'Me',
          lastName: 'You'
        }
      },
    }
  },
  creator: {
    userInfo: {
      email: 'victorgesit@andela.com',
      id: '12345'
    },
    addMember: sinon.spy(),
    store: {
      signOut: sinon.spy(),
      appInfo: {
        userDetails: {
          id: '12345',
          firstName: 'Me',
          lastName: 'You'
        }
      },
    }
  }
};
