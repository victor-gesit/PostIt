import sinon from 'sinon';

export default {
  groupListProps: {
    store: {
      getPostItMembers: sinon.spy(),
      searchGroup: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      match: {
        params: {
          groupId: '12345'
        }
      },
      groups: {
        userGroups: {
          12345: {
            members: {}
          }
        }
      },
      allUserGroups: {
        userGroups: {
          12345: {
            info: {
              title: 'A Group'
            }
          }
        }
      },
      history: [],
      postItInfo: {
        members: {
          postItMembers: {

          }
        }
      },
      appInfo: {
        userDetails: {
          id: 'meme',
          firstName: 'Me',
          lastName: 'You'
        }
      }
    }
  },
  groupMemberProps: {
    memberDetails: {
      email: 'victorgesit@andela.com'
    },
    creatorEmail: 'victorgesit@andela.com',
    userIsCreator: true
  },
  groupMemberNotCreator: {
    memberDetails: {
      email: 'notcreator@me.com'
    },
    creatorEmail: 'victorgesit@andela.com',
    userIsCreator: false
  },
  groupMembersProps: {
    groupMembers: {
      12345: {
        id: '12345'
      }
    },
  }
};
