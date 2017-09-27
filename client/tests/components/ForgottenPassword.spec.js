import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { ForgottenPassword } from '../../components/views/ForgottenPassword.jsx';
import Spinner from '../../components/views/partials/Spinner.jsx';

describe('<ForgottenPassword/>', () => {
  const props = {
    leaveGroup: sinon.spy(),
    resetErrorLog: sinon.spy(),
    resetLoadingState: sinon.spy(),
    apiError: {
      errored: false,
      message: 'No message'
    }
  };
  it('renders the component', () => {
    const wrapper = mount(<ForgottenPassword {...props} />);
  });
  it('it calls the recoverPassword component method when a button is clicked', () => {
    const wrapper = shallow(<ForgottenPassword {...props} />);
    const stub = sinon.stub(wrapper.instance(), 'recoverPassword');
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#submitButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('it calls the showNotification component method when an error occurs', () => {
    const propsWithError = {
      leaveGroup: sinon.spy(),
      resetErrorLog: sinon.spy(),
      recoverPassword: sinon.spy(),
      apiError: {
        errored: true,
        message: 'Error message'
      }
    };
    const wrapper = shallow(<ForgottenPassword {...propsWithError} />);
    const stub = sinon.stub(wrapper.instance(), 'showNotification');
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().email = {
      value: 'victorgesit@andela.com'
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#submitButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('renders a <Spinner /> component when data is loading from API call', () => {
    const propsWithDataLoading = {
      dataLoading: true,
      leaveGroup: sinon.spy(),
      resetErrorLog: sinon.spy(),
      resetLoadingState: sinon.spy(),
      apiError: {
        errored: false,
        message: 'No message'
      }
    };
    const wrapper = shallow(<ForgottenPassword {...propsWithDataLoading} />);
    expect(wrapper.find(Spinner).length).toEqual(1);
  });
});
