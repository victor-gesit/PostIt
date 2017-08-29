/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// Styling
import 'materialize-css/bin/materialize.css';
import 'jquery/dist/jquery';
import 'font-awesome/css/font-awesome.css';
import 'material-design-icons/iconfont/material-icons.css';
import './scss/style.scss'; // Custom styling
import './js/customJS';
import './js/materialize';
import postItApp from './reducers';

// API Query middlweare
import dataService from './services/dataservice';

// Routes
import App from './components/App.jsx';

$(document).ready(() => {
  $('.button-collapse').sideNav();
});

const appStore = {
  // Hold some groups (batch loading from db for pagination)
  groups: { meta: { count: 0 }, userGroups: {} },
  // This will contain all the groups and everything about each
  allUserGroups: { meta: { count: 0 }, userGroups: {} },
  // This indicates any error during queries to the API
  apiError: { errored: false, message: null, redirect: { yes: false, to: null } },
  appInfo: {
    userDetails: {
      firstName: null,
      lastName: null,
      id: null,
      token: null,
      email: null,
      phone: null
    },
    authState: { signedIn: false, message: null },
    loadedMessages: {
      groupId: null
    }
  },
  messageInfo: {
    seenBy: []
  },
  dataLoading: true,
  postItInfo: {
    members: {
      postItMembers: {
      },
      meta: { count: 0 }
    },
    groups: {
      postItGroups: {},
      meta: { count: 0 }
    }
  }
};


const store = createStore(postItApp, appStore, applyMiddleware(dataService));

const authState = {
  authenticated: store.getState().appInfo.authState.signedIn,
  authenticate() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      store.dispatch({
        type: 'VERIFY_TOKEN',
        token
      });
    }
  }
};

authState.authenticate();

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>, document.getElementById('app')
);

