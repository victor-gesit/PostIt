import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import GroupList, { GroupMember, GroupMembers } from '../../../components/views/partials/GroupList.jsx';
import { groupListMock as mock } from '../../mockData';


describe('<GroupList/>', () => {
  it('makes calls the method for getting all the registered members on PostIt', () => {
    const wrapper = mount(<GroupList {...mock.groupListProps} />);
  });
  it('calls the searchGroup component method when text is entered is clicked', () => {
    const wrapper = shallow(<GroupList {...mock.groupListProps} />);
    const stub = sinon.stub(wrapper.instance(), 'searchGroup');
    wrapper.setProps({});
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#searchGroupInput').simulate('keyUp', { key: 'e', keyCode: 86, which: 86 });
    expect(stub.called).toEqual(true);
  });
  it('calls the action to load more users, when button is clicked', () => {
    const wrapper = shallow(<GroupList {...mock.groupListProps} />);
    wrapper.instance().searchTerm = { value: 'searchTerm' };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().searchGroup();
    expect(mock.groupListProps.store.searchGroup.called).toEqual(true);
  });
});

describe('<GroupMember/>', () => {
  it('renders the <GroupMember/> component successfully', () => {
    const wrapper = mount(<GroupMember {...mock.groupMemberProps} />);
  });
  it('renders the <GroupMember/> component if user is not group creator', () => {
    const wrapper = mount(<GroupMember {...mock.groupMemberNotCreator} />);
  });

  it('renders the <GroupMember/> component if user is group creator', () => {
    mock.groupMemberNotCreator.userIsCreator = true;
    const wrapper = mount(<GroupMember {...mock.groupMemberNotCreator} />);
  });
});

describe('<GroupMembers/>', () => {
  it('renders the component successfully', () => {
    const wrapper = mount(<GroupMembers {...mock.groupMembersProps} />);
  });
});
