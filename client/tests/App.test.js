import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import sinon from 'sinon';
import { App } from '../components/App.jsx';
import dataService from '../services/dataservice';
import reducers from '../reducers';
import {
  getGroupMembers, addUser, getMessages, loadMessages,
  resetRedirect, deleteMember, leaveGroup, getPostItMembers,
  deleteGroup, getAllGroupsForUser, resetLoadingState,
  postMessage, verifyToken, signOut, notify, seenBy, searchGroup
} from '../actions';

const store = createStore(reducers, {}, applyMiddleware(dataService));

describe('<App/>', () => {
  const props = {
    leaveGroup: sinon.spy(),

  };
  it('loads the full application successfully', () => {
    const wrapper = shallow(
      <Provider
        store={ store }
      >
        <App />
      </Provider>
    );
    store.dispatch({
      type: 'VERIFY_TOKEN',
      token: 'abracadabra'
    });
    wrapper.instance();
  });
});
