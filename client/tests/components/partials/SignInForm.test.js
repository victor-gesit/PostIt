import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { SignInForm } from '../../../components/views/partials/SignInForm.jsx';
import { signInFormMock as mock } from '../../mockData';
import { Spinner } from '../../../components/views/partials/Spinner.jsx';

jest.mock('react-google-login');

describe('<SignInForm/>', () => {
  it('mounts the component successfully', () => {
    const wrapper = mount(<SignInForm {...mock.props} />);
  });
  it('renders a spinner when data is loading from the API', () => {
    const wrapper = shallow(<SignInForm { ...mock.propsWithDataLoading }/>);
    expect(wrapper.find(Spinner).length).toEqual(1);
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
  it('calls the showNotification component method when an error occurs', () => {
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
  it('navigates to messageboard if the user is signed in', () => {
    mock.props.store.appInfo.authState.signedIn = true;
    mock.props.store.appInfo.authState.message = null;
    mock.props.store.location.state.from = null;
    const wrapper = shallow(<SignInForm {...mock.props} />);
    wrapper.instance().forceUpdate();
    wrapper.update();
    expect(mock.props.store.history.push.calledWith('/messageboard')).toEqual(true);
  });
  it('it calls the method to enable a button if the form is validated', () => {
    const wrapper = shallow(<SignInForm {...mock.propsWithError} />);
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().setState = sinon.spy().withArgs(true);
    wrapper.instance().email = { value: 'victorgesit@andela.com' };
    wrapper.instance().password = { value: 'password' };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().enterText();
    expect(wrapper.instance().setState.withArgs(true).called).toEqual(true);
  });
  it('it calls the googleLogin method if the user grants permission', () => {
    const wrapper = mount(<SignInForm {...mock.props} />);
    wrapper.instance().googleLogin({ profileObj: {} });
    expect(mock.props.store.googleLogin.called).toEqual(true);
  });
});
