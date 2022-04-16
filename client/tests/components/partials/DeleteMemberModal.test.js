import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import DeleteMemberModal from '../../../components/views/partials/DeleteMemberModal.jsx';

describe('<DeleteMemberModal/>', () => {
  const props = {
    deleteMember: sinon.spy()
  };
  it('calls the deleteMember method on button click', () => {
    const wrapper = mount(<DeleteMemberModal {...props} />);
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#deleteMemberButton').simulate('click');
    expect(props.deleteMember.calledOnce).toEqual(true);
  });
});
