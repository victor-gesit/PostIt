import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { SignInForm } from '../../../components/views/partials/SignInForm.jsx';

describe('<SignInForm/>', () => {
  const props = {
    allUserGroups: {

    },
    store: {
      getPostItMembers: sinon.spy(),
      // method that makes API call to add members
      addUser: sinon.spy(),
      deleteGroup: sinon.spy(),
      resetErrorLog: sinon.spy(),
      appInfo: {
        authState: {
          message: 'Signed In'
        }
      },
      apiError: {
        message: 'No Error'
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
  it('calls the leaveGroup method on button click', () => {
    const wrapper = shallow(<SignInForm {...props} />);
  });
  it('calls a the signIn method on button click', () => {
    const wrapper = shallow(<SignInForm {...props} />);
    const stub = sinon.stub(wrapper.instance(), 'signIn');
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#signInButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
  it('it calls the showNotification component method when an error occurs', () => {
    const propsWithError = {
      store: {
        getPostItMembers: sinon.spy(),
        // method that makes API call to add members
        addUser: sinon.spy(),
        deleteGroup: sinon.spy(),
        resetErrorLog: sinon.spy(),
        signIn: sinon.spy(),
        appInfo: {
          authState: {
            message: 'Signed In'
          }
        },
        apiError: {
          errored: true,
          message: 'Error message'
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
    const wrapper = shallow(<SignInForm {...propsWithError} />);
    const stub = sinon.stub(wrapper.instance(), 'showNotification');
    wrapper.instance().button = { focus: () => {} };
    wrapper.instance().notificationSystem = {
      addNotification: () => {}
    };
    wrapper.instance().email = {
      value: 'victorgesit@andela.com'
    };
    wrapper.instance().password = {
      value: 'password'
    };
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('#signInButton').simulate('click');
    expect(stub.called).toEqual(true);
  });
});
