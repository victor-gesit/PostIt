import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import ForgottenPasswordDefault, { ForgottenPassword } from '../../components/views/ForgottenPassword.jsx';
import Spinner from '../../components/views/partials/Spinner.jsx';
import { forgottenPasswordMock as mock } from '../mockData';

jest.mock('react-router-dom');

describe('<ForgottenPassword/>', () => {
  it('renders the component', () => {
    const dispatch = sinon.spy();
    const subscribe = sinon.spy();
    const wrapper = mount(<ForgottenPasswordDefault
    {...mock.props}
    store={{ getState: () => mock.props,
      dispatch,
      subscribe }}
    />);
  });
  it('it calls the recoverPassword component method when a button is clicked', () => {
    const wrapper = shallow(<ForgottenPassword {...mock.props} />);
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
    const wrapper = shallow(<ForgottenPassword {...mock.propsWithError} />);
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
    const wrapper = shallow(<ForgottenPassword
      {...mock.propsWithDataLoading}
      />);
    expect(wrapper.find(Spinner).length).toEqual(1);
  });
});
