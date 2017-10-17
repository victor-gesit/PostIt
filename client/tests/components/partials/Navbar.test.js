import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { NavBar } from '../../../components/views/partials/NavBar.jsx';
import { navBarMock as mock } from '../../mockData';

jest.mock('react-router-dom');

describe('<NavBar/>', () => {
  it('mounts the NavBar component successfully', () => {
    const wrapper = shallow(
        <NavBar {...mock.props} />
    );
    expect(wrapper.find('#linkToMessageBoard').length).toEqual(1);
  });
  it('calls the method to sign out a user when the sign out button is clicked', () => {
    const wrapper = shallow(<NavBar {...mock.props} />);
    wrapper.instance().signOut();
    expect(mock.props.store.signOut.called).toEqual(true);
  });
  it('calls the signOut component method when the sign out button is clicked', () => {
    const wrapper = shallow(<NavBar {...mock.props} />);
    const stub = sinon.stub(wrapper.instance(), 'signOut');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#signOutButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the action to sign out a user, when button is clicked', () => {
    const wrapper = shallow(<NavBar {...mock.props} />);
    wrapper.instance().signOut();
    expect(mock.props.store.signOut.called).toEqual(true);
  });
  it('calls the method to get members of a group, when a link is clicked', () => {
    const wrapper = shallow(<NavBar {...mock.props} />);
    wrapper.find('#getMembersButton').simulate('click');
    expect(mock.props.store.getGroupMembers.called).toEqual(true);
  });

  it('does not display a link to the messageboard when the user is on the messageboard', () => {
    const wrapper = shallow(<NavBar {...mock.messageboardPage} />);
    wrapper.find('#linkToMessageBoard');
    expect(wrapper.find('#linkToMessageBoard').length).toEqual(0);
  });
});
