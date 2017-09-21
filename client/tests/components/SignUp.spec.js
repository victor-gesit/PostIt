import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { SignUp } from '../../components/views/SignUp.jsx';

describe('<SignUp/>', () => {
  const props = {
    leaveGroup: sinon.spy()
  };
  it('calls the leaveGroup method on button click', () => {
    const wrapper = mount(<SignUp {...props} />);
  });
});
