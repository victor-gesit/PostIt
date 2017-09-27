import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import { SignUp } from '../../components/views/SignUp.jsx';

describe('<SignUp/>', () => {
  const props = {
    appInfo: {
      authState: {
        signedIn: true
      }
    },
    apiError: {
      message: 'Signed In'
    },
    history: []
  };
  it('renders the component successful', () => {
    const wrapper = shallow(
      <SignUp { ...props }/>
    );
  });
  it('calls the method to show a notification when a message is available', () => {
    const wrapper = shallow(
        <SignUp {...props} />
    );
    wrapper.instance().notificationSystem = {
      addNotification: sinon.spy()
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().showNotification('normal', 'Hello there');
    expect(wrapper.instance().notificationSystem.addNotification.calledOnce).toEqual(true);
  });
});
