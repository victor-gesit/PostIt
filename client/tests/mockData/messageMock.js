export default {
  defaultProps: {
    messageDetails: {
      priority: 'normal',
      isComment: true,
      id: 'abcde',
      senderId: '23456',
      body: 'New Message',
      createdAt: 'Thursday, 20th January'
    },
    userId: '12345'
  },
  urgentMessage: {
    messageDetails: {
      priority: 'urgent',
      isComment: true,
      id: 'abcde',
      senderId: '23456',
      body: 'New Message',
      createdAt: 'Thursday, 20th January'
    },
    userId: '12345'
  },
  criticalMessage: {
    messageDetails: {
      priority: 'critical',
      isComment: true,
      id: 'abcde',
      senderId: '23456',
      body: 'New Message',
      createdAt: 'Thursday, 20th January'
    },
    userId: '12345'
  },
  noPrioritySpecified: {
    messageDetails: {
      priority: 'unregistered',
      isComment: true,
      id: 'abcde',
      senderId: '23456',
      body: 'New Message',
      createdAt: 'Thursday, 20th January'
    },
    userId: '12345'
  },
  selfSentMessage: {
    messageDetails: {
      priority: 'critical',
      isComment: true,
      id: 'abcde',
      senderId: '12345',
      body: 'New Message',
      createdAt: 'Thursday, 20th January'
    },
    userId: '12345'
  },
};
