import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import '../../js/materialize';
import DefaultCreatGroup, { CreateGroup, RegisteredMember } from '../../components/views/CreateGroup.jsx';
import { createGroupMock as mock, registeredMemberMock as memberMock } from '../mockData';

jest.mock('react-router-dom');
describe('<CreateGroup/>', () => {
  it('renders the connected component', () => {
    const dispatch = sinon.spy();
    const subscribe = sinon.spy();
    const wrapper = mount(
        <DefaultCreatGroup
        store={{ getState: () => mock.props,
          dispatch,
          subscribe }}
        {...mock.props}
        />
    );
  });
  it('calls createGroup method on button click', () => {
    const wrapper = shallow(
      <CreateGroup { ...mock.props }/>
    );
    const stub = sinon.stub(wrapper.instance(), 'createGroup');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#createGroupButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('redirects to the group messages page when the store is set to redirect', () => {
    mock.props.apiError.redirect.yes = true;
    const wrapper = shallow(<CreateGroup { ...mock.props }/>);
    // Force a call to componentWillUpdate
    wrapper.setProps({ });
    wrapper.instance().forceUpdate();
    wrapper.update();
    expect(mock.props.resetRedirect.calledOnce).toEqual(true);
  });
  it('calls switchTab method on button click', () => {
    const wrapper = mount(
      <CreateGroup { ...mock.props }/>
    );
    const stub = sinon.stub(wrapper.instance(), 'switchTab');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#defaultTab').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('adds an email to the list of users to be added to the new group on method call', () => {
    const wrapper = shallow(
      <CreateGroup { ...mock.props }/>
    );
    wrapper.instance().addMember(true, 'victorgesit@andela.com');
    expect(wrapper.instance().selectedMembers[0]).toEqual('victorgesit@andela.com');
  });
  it('removes an email to the list of users to be added when checkbox is unchecked', () => {
    const wrapper = shallow(
      <CreateGroup { ...mock.props }/>
    );
    wrapper.instance().selectedMembers.push('victorgesit@andela.com');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().addMember(false, 'victorgesit@andela.com');
    expect(wrapper.instance().selectedMembers.indexOf('victorgesit@andela.com')).toEqual(-1);
  });
  it('can call switchTab method', () => {
    const wrapper = shallow(
      <CreateGroup { ...mock.props }/>
    );
    wrapper.instance().refs = {
      members: {
        style: {
          display: 'in-line'
        }
      },
      info: {
        style: {
          display: 'in-line'
        }
      },
      'add-members': {
        className: 'active'
      }
    };
    wrapper.instance().switchTab('add-members', 'members');
  });
  it('can call createGroup method that makes API call to create the group', () => {
    const wrapper = shallow(
      <CreateGroup { ...mock.props }/>
    );
    wrapper.instance().title = {
      value: 'Group Title',
    };
    wrapper.instance().description = { value: 'Group Description' };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().createGroup();
  });
  it('calls the method to display a notification when one exists', () => {
    const wrapper = shallow(
      <CreateGroup { ...mock.propsWithError }/>
    );
    const stub = sinon.stub(wrapper.instance(), 'showNotification');
    wrapper.instance().notificationSystem = {
      addNotification: sinon.spy()
    };
    // Force a call to componentWillUpdate
    wrapper.setProps({ });
    wrapper.instance().forceUpdate();
    wrapper.update();
    expect(stub.called).toEqual(true);
  });
  it('calls the action to load more users, when button is clicked', () => {
    const wrapper = shallow(<CreateGroup {...mock.props} />);
    wrapper.instance().notificationSystem = {
      addNotification: sinon.spy()
    };
    wrapper.update();
    wrapper.instance().showNotification();
    expect(wrapper.instance().notificationSystem
      .addNotification.called).toEqual(true);
  });
  it('calls the loadMore component method when the load more button is clicked', () => {
    const wrapper = shallow(<CreateGroup {...mock.props} />);
    const stub = sinon.stub(wrapper.instance(), 'loadMore');
    wrapper.setProps({});
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#loadMoreButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the action to load more users, when button is clicked', () => {
    const wrapper = shallow(<CreateGroup {...mock.props} />);
    wrapper.instance().loadMore();
    expect(mock.props.getPostItMembers.called).toEqual(true);
  });
  it('calls the method to enable button, when button is clicked', () => {
    const wrapper = shallow(<CreateGroup {...mock.props} />);
    wrapper.instance().title = { value: 'Group Title' };
    wrapper.instance().description = { value: 'Group Description' };
    wrapper.instance().setState = sinon.spy();
    wrapper.update();
    wrapper.instance().enterText();
    expect(wrapper.instance().setState.called).toEqual(true);
  });
});

describe('<RegisteredMember/>', () => {
  it('renders the component', () => {
    const wrapper = mount(
      <RegisteredMember { ...memberMock.props }/>
    );
  });
  it('calls method to add a user to the new group on button click', () => {
    const wrapper = mount(
      <RegisteredMember { ...memberMock.props }/>
    );
    const stub = sinon.stub(wrapper.instance(), 'addOrRemove');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#victorgesit@andela.com').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the parent method to add members, when button is clicked', () => {
    const wrapper = shallow(<RegisteredMember {...memberMock.props} />);
    wrapper.instance().addOrRemove();
    expect(memberMock.props.addMember.called).toEqual(true);
  });
  it('renders a user as already added to the group, if the user is the creator', () => {
    const wrapper = shallow(<RegisteredMember {...memberMock.creator} />);
    expect(wrapper.find('#victorgesit@andela.com').node.props.checked).toEqual(true);
  });
});
