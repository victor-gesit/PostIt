import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import { PostMessage } from '../../components/views/PostMessage.jsx';

describe('<PostMessage/>', () => {
  const props = {
    apiError: {
      redirect: {
        yes: false,
        to: null
      }
    },
    messageInfo: {
      seenBy: []
    },
    getPostItMembers: sinon.spy(),
    getMessages: sinon.spy(),
    getAllGroupsForUser: sinon.spy(),
    getGroupMembers: sinon.spy(),
    leaveGroup: sinon.spy(),
    deleteGroup: sinon.spy(),
    deleteMember: sinon.spy(),
    match: {
      params: {
        groupId: '12345'
      }
    },
    allUserGroups: {
      userGroups: {

      }
    },
    groups: {
      userGroups: {

      }
    },
  };
  it('renders the component successfully', () => {
    const wrapper = shallow(
        <PostMessage {...props} />
    );
  });
  it('calls the action that makes an API call to remove a user from a group', () => {
    const wrapper = shallow(
        <PostMessage {...props} />
    );
    wrapper.instance().leaveGroup();
    expect(props.leaveGroup.calledOnce).toEqual(true);
  });
  it('calls the action that makes an API call to delete a group', () => {
    const wrapper = shallow(
        <PostMessage {...props} />
    );
    wrapper.instance().deleteGroup();
    expect(props.deleteGroup.calledOnce).toEqual(true);
  });
  it('calls the action that makes an API call to delete a user from a group', () => {
    const wrapper = shallow(
        <PostMessage {...props} />
    );
    wrapper.instance().deleteMember();
    expect(props.deleteMember.calledOnce).toEqual(true);
  });
});
