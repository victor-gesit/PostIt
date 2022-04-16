import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import AddMemberModal, { RegisteredMember } from '../../../components/views/partials/AddMemberModal.jsx';
import { addMemberModalMock as mock } from '../../mockData';

describe('<AddMemberModal/>', () => {
  it('makes calls the method for getting all the registered members on PostIt', () => {
    const wrapper = mount(<AddMemberModal {...mock.props} />);
    expect(mock.props.store.getPostItMembers.calledOnce).toEqual(true);
  });
  it('calls the addMembers method on button click', () => {
    const wrapper = mount(<AddMemberModal {...mock.props} />);
    const stub = sinon.stub(wrapper.instance(), 'addNewMembers');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#addMembersButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('has it\'s addMember method add an email to the array of the emails to be added to group', () => {
    const wrapper = mount(<AddMemberModal {...mock.props} />);
    wrapper.instance().addMember(true, 'victorgesit@andela.com');
    expect(wrapper.instance().selectedMembers[0]).toEqual('victorgesit@andela.com');
  });
  it('has it\'s addMember method remove an email to the array of the emails to be added to group', () => {
    const wrapper = mount(<AddMemberModal {...mock.props} />);
    wrapper.instance().selectedMembers.push('victorgesit@andela.com');
    wrapper.instance().addMember(false, 'victorgesit@andela.com');
    expect(wrapper.instance().selectedMembers.indexOf('victorgesit@andela.com')).toEqual(-1);
  });
  it('has it\'s addNewMembers method call the action that makes an API call to add new members', () => {
    const wrapper = mount(<AddMemberModal {...mock.props} />);
    wrapper.instance().selectedMembers.push('victorgesit@andela.com');
    wrapper.instance().addNewMembers();
    expect(mock.props.store.addUser.calledOnce).toEqual(true);
  });
  it('calls the loadMore component method when the load more button is clicked', () => {
    const wrapper = shallow(<AddMemberModal {...mock.propsForLoadMore} />);
    const stub = sinon.stub(wrapper.instance(), 'loadMore');
    wrapper.setProps({});
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#loadMoreButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the action to load more users, when button is clicked', () => {
    const wrapper = shallow(<AddMemberModal {...mock.props} />);
    wrapper.instance().loadMore();
    expect(mock.props.store.getPostItMembers.called).toEqual(true);
  });
});

describe('<RegisteredMember/>', () => {
  const props = {
    userInfo: {
    },
    addMember: sinon.spy(),
  };
  it('calls the addOrRemove method on button click', () => {
    const wrapper = mount(<RegisteredMember {...props} />);
    const stub = sinon.stub(wrapper.instance(), 'addOrRemove');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('.userCheckbox').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the addMember method when the button that calls addOrRemove() is clicked', () => {
    const wrapper = mount(<RegisteredMember {...props} />);
    wrapper.instance().addOrRemove();
    expect(props.addMember.calledOnce).toEqual(true);
  });
});
