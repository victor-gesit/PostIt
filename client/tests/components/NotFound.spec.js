import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import { NotFound } from '../../components/views/NotFound.jsx';

describe('<NotFound/>', () => {
  const props = {
    allUserGroups: {

    },
    match: {
      params: {
        groupId: '12345'
      }
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
        <NotFound {...props} />
      </StaticRouter>
    );
  });
});
