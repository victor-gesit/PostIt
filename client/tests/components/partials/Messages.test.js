import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Messages, { Message } from '../../../components/views/partials/Messages.jsx';
import { messagesMock, messageMock } from '../../mockData';

describe('<Messages/>', () => {
  it('renders the component', () => {
    const wrapper = mount(<Messages {...messagesMock.props} />);
  });
  it('calls componentWillReceiveProps to call socket method when message is posted', () => {
    const wrapper = shallow(<Messages {...messagesMock.props} />);
    wrapper.instance().bodyRef = {
      scrollIntoView: () => {}
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    // Trigger componentWillReceiveProps
    wrapper.setProps({ ...messagesMock.propsAfterUpdate });
  });
  it('calls componentWillReceiveProps if user is in same group', () => {
    const wrapper = shallow(<Messages {...messagesMock.props} />);
    wrapper.instance().bodyRef = {
      scrollIntoView: () => {}
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    // Trigger componentWillReceiveProps
    wrapper.setProps({ ...messagesMock.props });
  });
  it('renders the component even if there are no messages', () => {
    messagesMock.props.store.groups.userGroups['12345'].messages = {};
    const wrapper = mount(<Messages {...messagesMock.props} />);
  });
});

describe('<Message/>', () => {
  it('renders a message with a priority of normal', () => {
    const wrapper = mount(<Message {...messageMock.defaultProps} />);
  });
  it('renders a message with a priority of urgent', () => {
    const wrapper = mount(<Message {...messageMock.urgentMessage} />);
  });
  it('renders a message with a priority of critical', () => {
    const wrapper = mount(<Message {...messageMock.criticalMessage} />);
  });
  it('renders a default priority if one is not specified', () => {
    const wrapper = mount(<Message {...messageMock.noPrioritySpecified} />);
  });
  it('renders a message with different indentation if the user sent it', () => {
    const wrapper = mount(<Message {...messageMock.selfSentMessage} />);
  });
});
