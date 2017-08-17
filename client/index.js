/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// Styling
import 'materialize-css/bin/materialize.css';
import 'jquery/dist/jquery';
import './scss/style.scss'; // Custom styling
import './js/customJS';
import './js/materialize';
import postItApp from './reducers';

// API Query middlweare
import dataService from './services/dataservice';

// Routes
import Home from './components/views/Index.jsx';
import CreateGroup from './components/views/CreateGroup.jsx';
import MessageBoard from './components/views/MessageBoard.jsx';
import PostMessage from './components/views/PostMessage.jsx';
import SignUp from './components/views/SignUp.jsx';
import NotFound from './components/views/NotFound.jsx';

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
  dataLoading: false,
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


let store = createStore(postItApp, appStore, applyMiddleware(dataService));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/creategroup' component={CreateGroup}/>
          <Route exact path='/messageboard' component={MessageBoard}/>
          <Route exact path="/postmessage/:groupId" component={PostMessage}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    </HashRouter>
  </Provider>, document.getElementById('app')
);

