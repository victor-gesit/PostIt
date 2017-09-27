import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Messages, { Message } from '../../../components/views/partials/Messages.jsx';

describe('<Messages/>', () => {
  const props = {
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      notify: sinon.spy(),
      postMessage: sinon.spy(),
      match: {
        params: {
          groupId: '12345'
        }
      },
      groups: {
        userGroups: {
          12345: {
            members: {},
            messages: {
              mnop: {

              }
            }
          }
        }
      },
      history: [],
      postItInfo: {
        members: {
          postItMembers: {

          }
        }
      }
    },
    socket: {
      on: () => {},
      emit: () => {}
    },
  };
  it('renders the component', () => {
    const wrapper = mount(<Messages {...props} />);
  });
  it('calls componentWillReceiveProps to call socket method when message is posted', () => {
    const wrapper = shallow(<Messages {...props} />);
    wrapper.instance().bodyRef = {
      scrollIntoView: () => {}
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    // Trigger componentWillReceiveProps
    wrapper.setProps({ socket: {} });
  });
});

describe('<Message/>', () => {
  it('renders a message with a priority of normal', () => {
    const props = {
      messageDetails: {
        priority: 'normal',
        isComment: true,
        id: 'abcde',
        senderId: '23456',
        body: 'New Message',
        createdAt: 'Thursday, 20th January'
      },
      userId: '12345'
    };
    const wrapper = mount(<Message {...props} />);
  });
  it('renders a message with a priority of urgent', () => {
    const props = {
      messageDetails: {
        priority: 'urgent',
        isComment: true,
        id: 'abcde',
        senderId: '23456',
        body: 'New Message',
        createdAt: 'Thursday, 20th January'
      },
      userId: '12345'
    };
    const wrapper = mount(<Message {...props} />);
  });
  it('renders a message with a priority of critical', () => {
    const props = {
      messageDetails: {
        priority: 'critical',
        isComment: true,
        id: 'abcde',
        senderId: '23456',
        body: 'New Message',
        createdAt: 'Thursday, 20th January'
      },
      userId: '12345'
    };
    const wrapper = mount(<Message {...props} />);
  });
  it('renders a default priority if one is not specified', () => {
    const props = {
      messageDetails: {
        priority: 'unregistered',
        isComment: true,
        id: 'abcde',
        senderId: '23456',
        body: 'New Message',
        createdAt: 'Thursday, 20th January'
      },
      userId: '12345'
    };
    const wrapper = mount(<Message {...props} />);
  });
  it('renders a message with different indentation if the user sent it', () => {
    const props = {
      messageDetails: {
        priority: 'critical',
        isComment: true,
        id: 'abcde',
        senderId: '12345',
        body: 'New Message',
        createdAt: 'Thursday, 20th January'
      },
      userId: '12345'
    };
    const wrapper = mount(<Message {...props} />);
  });
});
