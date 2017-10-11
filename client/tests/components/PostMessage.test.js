import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import ConnectedPostMessageComponent, { PostMessage } from '../../components/views/PostMessage.jsx';
import { postMessageMock as mock } from '../mockData';

describe('<PostMessage/>', () => {
  it('renders the component successfully', () => {
    const wrapper = mount(
      <StaticRouter>
        <PostMessage {...mock.props} />
      </StaticRouter>
    );
  });
  it('calls the action that makes an API call to remove a user from a group', () => {
    const wrapper = shallow(
        <PostMessage {...mock.props} />
    );
    wrapper.instance().leaveGroup();
    expect(mock.props.leaveGroup.calledOnce).toEqual(true);
  });
  it('calls the action that makes an API call to delete a group', () => {
    const wrapper = shallow(
        <PostMessage {...mock.props} />
    );
    wrapper.instance().deleteGroup();
    expect(mock.props.deleteGroup.calledOnce).toEqual(true);
  });
  it('calls the action that makes an API call to delete a user from a group', () => {
    const wrapper = shallow(
        <PostMessage {...mock.props} />
    );
    wrapper.instance().deleteMember();
    expect(mock.props.deleteMember.calledOnce).toEqual(true);
  });
  it('calls componentWillUnmount when component unmounts, to close the group', () => {
    const wrapper = shallow(
        <PostMessage {...mock.props} />
    );
    wrapper.unmount();
  });
  it('mounts the connected component', () => {
    const dispatch = sinon.spy();
    const subscribe = sinon.spy();
    const wrapper = shallow(
        <ConnectedPostMessageComponent {...mock.props}
          store={{ getState: () => mock.props,
            dispatch,
            subscribe }}
        />
    );
  });
});
