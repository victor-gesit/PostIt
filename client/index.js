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

const store = createStore(postItApp, {}, applyMiddleware(dataService));

const authState = {
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
  </Provider>, document.getElementById('app') || document.createElement('div')
);

