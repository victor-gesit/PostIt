export default {
  newUser: {
    firstName: 'Taiwo',
    lastName: 'Okonkwo',
    email: 'taiwok@yahoo.com',
    phone: '08031234567',
    password: 'taiwookonkwo'
  },
  newUser2: {
    firstName: 'Sani',
    lastName: 'Adeleke',
    phone: '07031234567',
    email: 'saniadeleke@gmail.com',
    password: 'saniadeleke'
  },
  newUser3: {
    firstName: 'James',
    lastName: 'Janet',
    phone: '09031234567',
    email: 'jamesjanet@github.com',
    password: 'jamesjanet'
  },
  newGroup: {
    createdBy: 'Jane Doe',
    title: 'A Test Group',
    description: 'This group is created to test the Group model'
  },
  newGroup2: {
    createdBy: 'John Doe',
    title: 'Another test Group',
    description: 'This group is for sharing random thoughts'
  },
  newGroupForRoutes: {
    title: 'Another Test Group',
    description: 'This group is created to test the Group model, for the third time',
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
    isComment: 'true'
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

