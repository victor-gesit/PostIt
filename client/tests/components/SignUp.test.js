import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SignUp } from '../../components/views/SignUp.jsx';
import { signUpMock } from '../mockData';

describe('<SignUp/>', () => {
  it('renders the component successful', () => {
    const wrapper = shallow(
      <SignUp { ...signUpMock.props }/>
    );
  });
  it('calls the method to show a notification when a message is available', () => {
    const wrapper = shallow(
        <SignUp {...signUpMock.props} />
    );
    wrapper.instance().notificationSystem = {
      addNotification: sinon.spy()
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().showNotification('normal', 'Hello there');
    expect(wrapper.instance()
      .notificationSystem.addNotification.calledOnce)
      .toEqual(true);
  });
});
