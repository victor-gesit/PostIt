import React from 'react';
import { mount, shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import Groups, { UserGroup } from '../../../components/views/partials/Groups.jsx';
import Spinner from '../../../components/views/partials/Spinner.jsx';
import { groupsMock, userGroupMock } from '../../mockData';

describe('<Groups/>', () => {
  it('should render the UserGroup component when a user belongs to a group', () => {
    const wrapper = shallow(
        <Groups {...groupsMock.props} />
    );
    expect(wrapper.find(UserGroup).length).toEqual(1);
  });
  it('calls the loadMore component method when the load more button is clicked', () => {
    const wrapper = shallow(<Groups {...groupsMock.props} />);
    const stub = sinon.stub(wrapper.instance(), 'loadMore');
    wrapper.setProps({});
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#loadMoreButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the action to load more users, when button is clicked', () => {
    const wrapper = shallow(<Groups {...groupsMock.props} />);
    wrapper.instance().loadMore();
    expect(groupsMock.props.store.getAllGroupsForUser.called).toEqual(true);
  });
});

describe('<UserGroup/>', () => {
  it('calls component method to load messages and members of a group', () => {
    const wrapper = shallow(
        <UserGroup { ...userGroupMock.props } />
    );
    const stub = sinon.stub(wrapper.instance(), 'loadMessagesAndMembers');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find(Link).simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls method to dispatch a call to API to get all groups a user belongs to', () => {
    const wrapper = shallow(
        <UserGroup { ...userGroupMock.props } />
    );
    wrapper.instance().loadMessagesAndMembers({ target: { id: '12345' } });
    expect(userGroupMock.props.store.getMessages.calledOnce).toEqual(true);
  });
});
