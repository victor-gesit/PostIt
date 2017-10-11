export default {
  initialState: {
    firstName: null,
    lastName: null,
    id: null,
    token: null,
    email: null,
    phone: null
  },

  userInfo: {
    token: 'abracadabra',
    name: 'John Doe'
  },

  actionSignIn: { type: 'SIGN_IN_SUCCESS',
    userDetails: {
      token: 'abracadabra',
      name: 'John Doe'
    }
  },
  actionSignUp: { type: 'SIGN_UP_SUCCESS',
    userDetails: {
      token: 'abracadabra',
      name: 'John Doe'
    }
  },

  actionSignOut: { type: 'SIGN_OUT' },
};
