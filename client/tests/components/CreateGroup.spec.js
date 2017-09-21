import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import { CreateGroup } from '../../components/views/CreateGroup.jsx';

describe('<CreateGroup/>', () => {
  const props = {
    allUserGroups: {

    },
    match: {
      params: {
        groupId: '12345'
      }
    },
    getPostItMembers: sinon.spy(),
    getAllGroupsForUser: sinon.spy(),
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
        <CreateGroup {...props} />
      </StaticRouter>
    );
  });
});
