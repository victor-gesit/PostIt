import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import { CreateGroup, RegisteredMember } from '../../components/views/CreateGroup.jsx';
import Spinner from '../../components/views/partials/Spinner.jsx';

describe('<CreateGroup/>', () => {
  const props = {
    allUserGroups: {
      userGroups: {

      }
    },
    apiError: {
      redirect: {

      }
    },
    match: {
      params: {
        groupId: '12345'
      }
    },
    postItInfo: {
      members: {
        postItMembers: {
          mnopq: {
            id: 'mnopq'
          }
        }
      }
    },
    resetRedirect: sinon.spy(),
    createGroup: sinon.spy(),
    getPostItMembers: sinon.spy(),
    getAllGroupsForUser: sinon.spy(),
  };
  it('renders the component', () => {
    const wrapper = mount(
      <StaticRouter>
        <CreateGroup {...props} />
      </StaticRouter>
    );
  });
  it('calls createGroup method on button click', () => {
    const wrapper = shallow(
      <CreateGroup { ...props }/>
    );
    const stub = sinon.stub(wrapper.instance(), 'createGroup');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#createGroupButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('renders spinners when data is being loaded from API', () => {
    props.dataLoading = true;
    const wrapper = shallow(<CreateGroup { ...props }/>);
    expect(wrapper.find(Spinner).length).toEqual(2);
  });
  it('redirects to the group messages page when the store is set to redirect', () => {
    props.apiError.redirect.yes = true;
    const wrapper = shallow(<CreateGroup { ...props }/>);
    // Force a call to componentWillUpdate
    wrapper.setProps({ });
    wrapper.instance().forceUpdate();
    wrapper.update();
    expect(props.resetRedirect.calledOnce).toEqual(true);
  });
  it('calls switchTab method on button click', () => {
    const wrapper = shallow(
      <CreateGroup { ...props }/>
    );
    const stub = sinon.stub(wrapper.instance(), 'switchTab');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#defaultTab').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('adds an email to the list of users to be added to the new group on method call', () => {
    const wrapper = shallow(
      <CreateGroup { ...props }/>
    );
    wrapper.instance().addMember(true, 'victorgesit@andela.com');
    expect(wrapper.instance().selectedMembers[0]).toEqual('victorgesit@andela.com');
  });
  it('removes an email to the list of users to be added when checkbox is unchecked', () => {
    const wrapper = shallow(
      <CreateGroup { ...props }/>
    );
    wrapper.instance().selectedMembers.push('victorgesit@andela.com');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().addMember(false, 'victorgesit@andela.com');
    expect(wrapper.instance().selectedMembers.indexOf('victorgesit@andela.com')).toEqual(-1);
  });
  it('can call switchTab method', () => {
    const wrapper = shallow(
      <CreateGroup { ...props }/>
    );
    wrapper.instance().refs = {
      members: {
        style: {
          display: 'in-line'
        }
      },
      info: {
        style: {
          display: 'in-line'
        }
      },
      'add-members': {
        className: 'active'
      }
    };
    wrapper.instance().switchTab('add-members', 'members');
  });
  it('can call createGroup method that makes API call to create the group', () => {
    const wrapper = shallow(
      <CreateGroup { ...props }/>
    );
    wrapper.instance().title = {
      value: 'Group Title',
    };
    wrapper.instance().description = { value: 'Group Description' };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().createGroup();
  });
  it('calls the method to display a notification when one exists', () => {
    const propsWithError = {
      allUserGroups: {
        userGroups: {

        }
      },
      apiError: {
        message: 'An Error Occured',
        redirect: {
          yes: false
        }
      },
      match: {
        params: {
          groupId: '12345'
        }
      },
      postItInfo: {
        members: {
          postItMembers: {
            mnopq: {
              id: 'mnopq'
            }
          }
        }
      },
      resetErrorLog: sinon.spy(),
      getPostItMembers: sinon.spy(),
      getAllGroupsForUser: sinon.spy(),
    };
    const wrapper = shallow(
      <CreateGroup { ...propsWithError }/>
    );
    const stub = sinon.stub(wrapper.instance(), 'showNotification');
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    // Force a call to componentWillUpdate
    wrapper.setProps({ });
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.instance().showNotification('error', 'An error occured');
    expect(stub.called).toEqual(true);
  });
});




describe('<RegisteredMember/>', () => {
  it('renders the component', () => {
    const props = {
      userInfo: {
        email: 'victorgesit@andela.com',
        id: '12345'
      },
      store: {
        signOut: sinon.spy()
      }
    };
    const wrapper = mount(
      <RegisteredMember { ...props }/>
    );
  });
  it('calls method to add a user to the new group on button click', () => {
    const props = {
      userInfo: {
        email: 'victorgesit@andela.com',
        id: '12345'
      },
      store: {
        signOut: sinon.spy()
      }
    };
    const wrapper = mount(
      <RegisteredMember { ...props }/>
    );
    const stub = sinon.stub(wrapper.instance(), 'addOrRemove');
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#victorgesit@andela.com').simulate('click');
    expect(stub.called).toEqual(true);
  });
});
