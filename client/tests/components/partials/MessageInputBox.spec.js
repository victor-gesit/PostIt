import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import MessageInputBox from '../../../components/views/partials/MessageInputBox.jsx';

describe('<MessageInputBox/>', () => {
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
            members: {}
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
  it('calls a the setPriority method on button click', () => {
    const wrapper = mount(<MessageInputBox {...props} />);
    const stub = sinon.stub(wrapper.instance(), 'setPriority');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#normal').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls a the sendMessage method on button click', () => {
    const wrapper = mount(<MessageInputBox {...props} />);
    const stub = sinon.stub(wrapper.instance(), 'sendMessage');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('.btn').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the method that makes the API call when the sendMessage button is clicked', () => {
    const wrapper = mount(<MessageInputBox {...props} />);
    wrapper.instance().postBody.value = 'Test Post';
    wrapper.instance().sendMessage();
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('.btn').simulate('click');
    expect(props.store.postMessage.calledOnce).toEqual(true);
  });
  it('calls the method that makes the API call when the sendMessage button is clicked to send a comment', () => {
    const wrapper = mount(<MessageInputBox {...props} />);
    wrapper.instance().state.value = 'Test Post';
    // Set the priority to comment
    wrapper.instance().setPriority({ target: { id: 'comment' } });
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('.btn').simulate('click');
    expect(props.store.postMessage.calledOnce).toEqual(true);
  });
});

