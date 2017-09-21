import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { SignInForm } from '../../../components/views/partials/SignInForm.jsx';

describe('<SignInForm/>', () => {
  const props = {
    allUserGroups: {

    },
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      deleteGroup: sinon.spy(),
      match: {
        params: {
          groupId: '12345'
        }
      },
      groups: {
        userGroups: {}
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
  it('calls the leaveGroup method on button click', () => {
    const wrapper = mount(<SignInForm {...props} />);
  });
});
