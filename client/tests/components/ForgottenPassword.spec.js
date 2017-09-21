import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { ForgottenPassword } from '../../components/views/ForgottenPassword.jsx';

describe('<ForgottenPassword/>', () => {
  const props = {
    leaveGroup: sinon.spy()
  };
  it('calls the leaveGroup method on button click', () => {
    const wrapper = mount(<ForgottenPassword {...props} />);
  });
});
