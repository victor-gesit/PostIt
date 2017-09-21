import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import AddMemberModal, { RegisteredMember } from '../../../components/views/partials/AddMemberModal.jsx';

describe('<AddMemberModal/>', () => {
  const props = {
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      match: {
        params: {
          groupId: '12345'
        }
      },
      groups: {
        userGroups: {}
      },
      history: [],
      postItInfo: {
        members: {
          postItMembers: {

          }
        }
      }
    }
  };
  it('makes calls the method for getting all the registered members on PostIt', () => {
    const wrapper = mount(<AddMemberModal {...props} />);
    expect(props.store.getPostItMembers.calledOnce).toEqual(true);
  });
  it('calls a the addMembers method on button click', () => {
    const wrapper = mount(<AddMemberModal {...props} />);
    const stub = sinon.stub(wrapper.instance(), 'addNewMembers');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#addMembersButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('has it\'s addMember method add an email to the array of the emails to be added to group', () => {
    const wrapper = mount(<AddMemberModal {...props} />);
    wrapper.instance().addMember(true, 'victorgesit@andela.com');
    expect(wrapper.instance().selectedMembers[0]).toEqual('victorgesit@andela.com');
  });
  it('has it\'s addMember method remove an email to the array of the emails to be added to group', () => {
    const wrapper = mount(<AddMemberModal {...props} />);
    wrapper.instance().selectedMembers.push('victorgesit@andela.com');
    wrapper.instance().addMember(false, 'victorgesit@andela.com');
    expect(wrapper.instance().selectedMembers.indexOf('victorgesit@andela.com')).toEqual(-1);
  });
  it('has it\'s addNewMembers method call the action that makes an API call to add new members', () => {
    const wrapper = mount(<AddMemberModal {...props} />);
    wrapper.instance().selectedMembers.push('victorgesit@andela.com');
    wrapper.instance().addNewMembers();
    expect(props.store.addUser.calledOnce).toEqual(true);
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
    wrapper.find('#addCheckbox').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('calls the addMember method when the button that calls addOrRemove() is clicked', () => {
    const wrapper = mount(<RegisteredMember {...props} />);
    wrapper.instance().addOrRemove();
    expect(props.addMember.calledOnce).toEqual(true);
  });
});
