import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import GroupDeleteModal from '../../../components/views/partials/GroupDeleteModal.jsx';

describe('<GroupDeleteModal/>', () => {
  const props = {
    deleteGroup: sinon.spy()
  };
  it('calls the deleteGroup method on button click', () => {
    const wrapper = mount(<GroupDeleteModal {...props} />);
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#deleteGroupButton').simulate('click');
    expect(props.deleteGroup.calledOnce).toEqual(true);
  });
});
