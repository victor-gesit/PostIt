import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import DefaultSignUpForm, { SignUpForm } from '../../../components/views/partials/SignUpForm.jsx';
import { signUpFormMock as mock } from '../../mockData';

jest.mock('react-google-login');

describe('<SignUpForm/>', () => {
  it('mounts the component successully', () => {
    const wrapper = mount(<DefaultSignUpForm {...mock.props} />);
  });
  it('calls a the signUp method on button click', () => {
    const wrapper = shallow(<SignUpForm {...mock.props} />);
    const stub = sinon.stub(wrapper.instance(), 'signUp');
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#signUpButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('it calls the showNotification component method when an error occurs', () => {
    const wrapper = shallow(<SignUpForm {...mock.propsWithError} />);
    const stub = sinon.stub(wrapper.instance(), 'showNotification');
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().firstName = { value: 'Victor' };
    wrapper.instance().lastName = { value: 'Gesit' };
    wrapper.instance().email = { value: 'victorgesit@andela.com' };
    wrapper.instance().password = { value: 'password' };
    wrapper.instance().phone = { value: '080123456789' };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#signUpButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('it calls the method to enable a button if the form is validated', () => {
    const wrapper = shallow(<SignUpForm {...mock.propsWithError} />);
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().setState = sinon.spy().withArgs(true);
    wrapper.instance().firstName = { value: 'Victor' };
    wrapper.instance().lastName = { value: 'Gesit' };
    wrapper.instance().email = { value: 'victorgesit@andela.com' };
    wrapper.instance().password = { value: 'password' };
    wrapper.instance().phone = { value: '080123456789' };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().enterText();
    expect(wrapper.instance().setState.withArgs(true).called).toEqual(true);
  });
  it('it calls the googleLogin method if the user grants permission', () => {
    const wrapper = mount(<SignUpForm {...mock.props} />);
    wrapper.instance().googleLogin({ profileObj: {} });
    expect(mock.props.store.googleLogin.called).toEqual(true);
  });
  it('it returns the user back to the previous page if the user is signed in', () => {
    const wrapper = shallow(<SignUpForm {...mock.signedIn} />);
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.setProps({});
    wrapper.instance().forceUpdate();
    wrapper.update();
    expect(mock.signedIn.store.history.push.withArgs('/creategroup').called).toEqual(true);
  });
  it('it sends the user back to the message board after signup', () => {
    const wrapper = shallow(<SignUpForm {...mock.signedUp} />);
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.setProps({});
    wrapper.instance().forceUpdate();
    wrapper.update();
    expect(mock.signedIn.store.history.push.withArgs('/creategroup').called).toEqual(true);
  });
});
