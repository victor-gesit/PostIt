import sinon from 'sinon';

export default {
  groupListProps: {
    store: {
      getPostItMembers: sinon.spy(),
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
      }
    }
  },
  groupMemberProps: {
    memberDetails: {

    },
    creatorEmail: 'victorgesit@andela.com',
    userIsCreator: true
  }
};
