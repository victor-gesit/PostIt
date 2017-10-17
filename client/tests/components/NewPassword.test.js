import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import '../../js/materialize';
import { NewPassword } from '../../components/views/NewPassword.jsx';
import { newPasswordMock as mock } from '../mockData';

describe('<NewPassword/>', () => {
  it('renders the component successfully', () => {
    const wrapper = mount(<NewPassword {...mock} />);
  });
  it('it calls the showNotification component method when an error occurs', () => {
    const shallowWrapper = shallow(<NewPassword {...mock} />);
    const stub = sinon.stub(shallowWrapper.instance(), 'showNotification');
    shallowWrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    shallowWrapper.instance().password = { value: 'password' };
    shallowWrapper.instance().forceUpdate();
    shallowWrapper.update();
    shallowWrapper.find('#submitButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the method to reset password when a button is clicked', () => {
    const shallowWrapper = shallow(<NewPassword {...mock} />);
    const stub = sinon.stub(shallowWrapper.instance(), 'resetPassword');
    shallowWrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    shallowWrapper.instance().password = { value: 'password' };
    shallowWrapper.instance().forceUpdate();
    shallowWrapper.update();
    shallowWrapper.find('#submitButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the method to check password equality when new password is typed', () => {
    const shallowWrapper = shallow(<NewPassword { ...mock } />);
    const stub = sinon.stub(shallowWrapper.instance(), 'enterText');
    shallowWrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    shallowWrapper.instance().password = { value: 'password' };
    shallowWrapper.instance().forceUpdate();
    shallowWrapper.update();
    shallowWrapper.instance().enterText();
    expect(stub.called).toEqual(true);
  });
  it('navigates to message board if signed in, which happens if password reset is successful', () => {
    mock.appInfo.authState.signedIn = true;
    const shallowWrapper = shallow(<NewPassword { ...mock } />);
    shallowWrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    shallowWrapper.instance().password = { value: 'password' };
    shallowWrapper.instance().forceUpdate();
    shallowWrapper.update();
    expect(mock.history.push.calledOnce).toEqual(true);
  });
  it('calls method to enable submit button if password length > 7, and equals value confirmPassword field', () => {
    mock.appInfo.authState.signedIn = true;
    const shallowWrapper = shallow(<NewPassword { ...mock } />);
    const stub = sinon.stub(shallowWrapper.instance(), 'setState');
    shallowWrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    shallowWrapper.instance().password = { value: 'newPassword' };
    shallowWrapper.instance().confirmPassword = { value: 'newPassword' };
    shallowWrapper.instance().forceUpdate();
    shallowWrapper.update();
    shallowWrapper.instance().enterText();
    expect(stub.called).toEqual(true);
  });
});
