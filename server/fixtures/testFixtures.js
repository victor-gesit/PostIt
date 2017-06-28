export default {
  newUser: {
    firstName: 'Taiwo',
    lastName: 'Okonkwo',
    email: 'taiwok@yahoo.com',
    password: 'taiwookonkwo'
  },
  newUser2: {
    firstName: 'Sani',
    lastName: 'Adeleke',
    email: 'saniadeleke@gmail.com',
    password: 'saniadeleke'
  },
  newUser3: {
    firstName: 'James',
    lastName: 'Janet',
    email: 'jamesjanet@github.com',
    password: 'jamesjanet'
  },
  newGroup: {
    createdBy: 'Jane Doe',
    title: 'A Test Group',
    description: 'This group is created to test the Group model'
  },
  newGroupForRoutes: {
    title: 'A Test Group',
    description: 'This group is created to test the Group model',
    userId: null
  },
  newMessage: {
    sentBy: 'John Smith',
    body: 'All team members are to submit their work this morning',
    isComment: false
  },
  newMessageForRoute: {
    sender: 'John Smith',
    message: 'All team members are to submit their work this afternoon',
    isComment: 'comment'
  },
  registeredUser: {
    email: 'taiwok@yahoo.com',
    password: 'taiwookonkwo'
  },
  userWithIncorrectPassword: {
    email: 'taiwok@yahoo.com',
    password: 'forgotten'
  },
  newUserWithMissingData: {
    firstName: 'Taiwo',
    lastName: 'Okonkwo',
    email: 'taiwok@yahoo.com'
    // Missing password
  },
  newGroupWithSingleMember: {
    createdBy: 'Jane Doe',
    title: 'Three is a Crowd',
    description: 'A group with just creator an one extra person',
    initialMembers: 'jamesjanet@github.com'
  },
  newGroupWithMultipleMembers: {
    createdBy: 'Jane Doe',
    title: 'We are here',
    description: 'A large group',
    initialMembers: ['jamesjanet@github.com', 'saniadeleke@gmail.com']
  },

};

