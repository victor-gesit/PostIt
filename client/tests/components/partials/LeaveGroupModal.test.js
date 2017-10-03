import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import LeaveGroupModal from '../../../components/views/partials/LeaveGroupModal.jsx';

describe('<LeaveGroupModal/>', () => {
  const props = {
    leaveGroup: sinon.spy()
  };
  it('calls the leaveGroup method on button click', () => {
    const wrapper = mount(<LeaveGroupModal {...props} />);
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#leaveGroupButton').simulate('click');
    expect(props.leaveGroup.calledOnce).toEqual(true);
  });
});
