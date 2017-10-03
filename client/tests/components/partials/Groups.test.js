import React from 'react';
import { mount, shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import Groups, { UserGroup } from '../../../components/views/partials/Groups.jsx';
import Spinner from '../../../components/views/partials/Spinner.jsx';

describe('<Groups/>', () => {
  it('should render the UserGroup component when a user belongs to a group', () => {
    const props = {
      allUserGroups: {
        12345: {},
      },
      getMessages: sinon.spy(),
      getAllGroupsForUser: sinon.spy(),
      getGroupMembers: sinon.spy(),
      loadMessages: sinon.spy()
    };
    const wrapper = shallow(
        <Groups {...props} />
    );
    expect(wrapper.find(UserGroup).length).toEqual(1);
  });
});

describe('<UserGroup/>', () => {
  const props = {
    groupDetails: {
      id: '12345'
    },
    store: {
      getMessages: sinon.spy(),
      getAllGroupsForUser: sinon.spy(),
      getGroupMembers: sinon.spy(),
      loadMessages: sinon.spy()
    }
  };
  it('calls component method to load messages and members of a group', () => {
    const wrapper = shallow(
        <UserGroup { ...props } />
    );
    const stub = sinon.stub(wrapper.instance(), 'loadMessagesAndMembers');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find(Link).simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls method to dispatch a call to API to get all groups a user belongs to', () => {
    const wrapper = shallow(
        <UserGroup { ...props } />
    );
    wrapper.instance().loadMessagesAndMembers({ target: { id: '12345' } });
    expect(props.store.getMessages.calledOnce).toEqual(true);
  });
});
