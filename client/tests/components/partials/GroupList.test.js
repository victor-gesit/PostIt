import React from 'react';
import { mount } from 'enzyme';
import GroupList, { GroupMember } from '../../../components/views/partials/GroupList.jsx';
import { groupListMock as mock } from '../../mockData';


describe('<GroupList/>', () => {
  it('makes calls the method for getting all the registered members on PostIt', () => {
    const wrapper = mount(<GroupList {...mock.groupListProps} />);
  });
});

describe('<GroupMember/>', () => {
  it('renders the component', () => {
    const wrapper = mount(<GroupMember {...mock.groupMemberProps} />);
  });
});
