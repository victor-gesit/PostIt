import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { PostMessage } from '../../components/views/PostMessage.jsx';

describe('<PostMessage/>', () => {
  const props = {
    apiError: {
      redirect: {
        yes: false,
        to: null
      }
    },
    match: {
      params: {
        groupId: '12345'
      }
    },
    allUserGroups: {
      userGroups: {

      }
    },
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      signOut: sinon.spy(),
      deleteGroup: sinon.spy(),
      seenBy: sinon.spy(),
      deleteMember: sinon.spy(),
      leaveGroup: sinon.spy(),
      dataLoading: false,
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
    const wrapper = mount(<PostMessage {...props} />);
  });
});
