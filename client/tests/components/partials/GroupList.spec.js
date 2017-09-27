import React from 'react';
import { shallow, mount} from 'enzyme';
import sinon from 'sinon';
import GroupList, { GroupMembers, GroupMember } from '../../../components/views/partials/GroupList.jsx';

describe('<GroupList/>', () => {
  const props = {
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
  };
  it('makes calls the method for getting all the registered members on PostIt', () => {
    const wrapper = mount(<GroupList {...props} />);
  });
});

describe('<GroupMember/>', () => {
  const props = {
    memberDetails: {

    },
    creatorEmail: 'victorgesit@andela.com',
    userIsCreator: true
  };
  it('renders the component', () => {
    const wrapper = mount(<GroupMember {...props} />);
  });
});
