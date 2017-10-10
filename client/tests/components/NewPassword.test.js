import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { NewPassword } from '../../components/views/NewPassword.jsx';

describe('<NewPassword/>', () => {
  const props = {
    leaveGroup: sinon.spy()
  };
  it('calls the leaveGroup method on button click', () => {
    const wrapper = shallow(<NewPassword {...props} />);
  });
});
