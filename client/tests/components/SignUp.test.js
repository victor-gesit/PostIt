import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import '../../js/materialize';
import DefaultSignUp, { SignUp } from '../../components/views/SignUp.jsx';
import { signUpMock as mock } from '../mockData';

jest.mock('react-google-login');

describe('<SignUp/>', () => {
  it('renders the component successful', () => {
    const dispatch = sinon.spy();
    const subscribe = sinon.spy();
    const wrapper = mount(
        <DefaultSignUp
          { ...mock.props }
          store={{ getState: () => mock.props,
            dispatch,
            subscribe }}
        />
    );
  });
  it('calls the method to show a notification when a message is available', () => {
    const wrapper = mount(
        <SignUp {...mock.propsWithError} />
    );
    wrapper.instance().notificationSystem = {
      addNotification: sinon.spy()
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().showNotification('normal', 'Error message');
    expect(wrapper.instance()
      .notificationSystem.addNotification.called)
      .toEqual(true);
  });
  it('navigates to messageboard if the user is signed in', () => {
    const wrapper = shallow(<SignUp {...mock.signedIn} />);
    wrapper.instance().forceUpdate();
    wrapper.update();
    expect(mock.signedIn.history.push.calledWith('/messageboard')).toEqual(true);
  });
});
