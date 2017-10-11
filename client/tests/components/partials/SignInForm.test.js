import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { SignInForm } from '../../../components/views/partials/SignInForm.jsx';
import { signInFormMock as mock } from '../../mockData';

describe('<SignInForm/>', () => {
  it('calls the leaveGroup method on button click', () => {
    const wrapper = shallow(<SignInForm {...mock.props} />);
  });
  it('calls a the signIn method on button click', () => {
    const wrapper = shallow(<SignInForm {...mock.props} />);
    const stub = sinon.stub(wrapper.instance(), 'signIn');
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#signInButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('it calls the showNotification component method when an error occurs', () => {
    const wrapper = shallow(<SignInForm {...mock.propsWithError} />);
    const stub = sinon.stub(wrapper.instance(), 'showNotification');
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().email = {
      value: 'victorgesit@andela.com'
    };
    wrapper.instance().password = {
      value: 'password'
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#signInButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
});
