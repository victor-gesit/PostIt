export default {
  initialState: { seenBy: [] },
  messagesAreSeen: { seenBy: [{ name: 'Jane Doe', id: '12345' }] },
  actionSeenBy: { type: 'SEEN_BY_SUCCESS',
    data: {
      seenBy: [
        {
          name: 'Jane Doe',
          id: '12345'
        }
      ]
    }
  },
  actionSignOut: { type: 'SIGN_OUT' },
};
