import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import MessageInputBox from '../../../components/views/partials/MessageInputBox.jsx';
import { messageInputBoxMock as mock } from '../../mockData';

describe('<MessageInputBox/>', () => {
  it('calls a the setPriority method on button click', () => {
    const wrapper = mount(<MessageInputBox {...mock.props} />);
    const stub = sinon.stub(wrapper.instance(), 'setPriority');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#normal').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls a the sendMessage method on button click', () => {
    const wrapper = mount(<MessageInputBox {...mock.props} />);
    const stub = sinon.stub(wrapper.instance(), 'sendMessage');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('.btn').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the method that makes the API call when the sendMessage button is clicked', () => {
    const wrapper = mount(<MessageInputBox {...mock.props} />);
    wrapper.instance().postBody.value = 'Test Post';
    wrapper.instance().sendMessage();
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('.btn').simulate('click');
    expect(mock.props.store.postMessage.calledOnce).toEqual(true);
  });
  it('calls the method that makes the API call when the sendMessage button is clicked to send a comment', () => {
    const wrapper = mount(<MessageInputBox {...mock.props} />);
    wrapper.instance().state.value = 'Test Post';
    // Set the priority to comment
    wrapper.instance().setPriority({ target: { id: 'comment' } });
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('.btn').simulate('click');
    expect(mock.props.store.postMessage.calledOnce).toEqual(true);
  });
});

