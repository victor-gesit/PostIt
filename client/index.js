/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// Styling
import 'materialize-css/bin/materialize.css';
import 'jquery/dist/jquery';
import 'jquery-validation';
import 'font-awesome/css/font-awesome.css';
import 'material-design-icons/iconfont/material-icons.css';
 // Custom styling
import './scss/style.scss';
import './js/materialize';
import reducers from './reducers';

// API Query middlweare
import { authMiddleware,
  createGroupMiddleware,
  messageBoardMiddleware,
  postMessageMiddleware } from './middlewares';

// Routes
import PostItApp from './components/App.jsx';

const store = createStore(reducers, {}, applyMiddleware(authMiddleware,
  messageBoardMiddleware,
  createGroupMiddleware,
  postMessageMiddleware));

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
      <PostItApp/>
  </Provider>, document.getElementById('app') || document.createElement('div')
);

