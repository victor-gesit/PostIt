import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import { NavBar } from '../../../components/views/partials/NavBar.jsx';

describe('<NavBar/>', () => {
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
    const wrapper = mount(
      <StaticRouter>
        <NavBar {...props} />
      </StaticRouter>
    );
  });
});
