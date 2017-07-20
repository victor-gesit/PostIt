import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import postItApp from './reducers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import dataService from './services/dataservice';
// Styling
import 'materialize-css/bin/materialize.css';
import 'jquery/dist/jquery';
import './scss/style.scss'; // Custom styling
import './js/creategroup';
import './js/materialize';

// Routes
import App from './components/App.jsx';
import Home from './components/views/Index.jsx';
import CreateGroup from './components/views/CreateGroup.jsx';
import MessageBoard from './components/views/MessageBoard.jsx';
import PostMessage from './components/views/PostMessage.jsx';
import SignUp from './components/views/SignUp.jsx';


let store = createStore(postItApp, {}, applyMiddleware(dataService));




$(document).ready(() => {
  $('.button-collapse').sideNav();
}); 

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>, document.getElementById('app')
);


/*
ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>, document.getElementById('app'));

*/

const appStore = {
  groups: { 1: { members: { 1: {}, 2: {}}, groupId: '1', messages: [], about: { }}, 2: {} }, // This will contain all the groups and everything about each
  dataError: 'a', // This indicates any error during queries to the API
  userDetails: { // This contains all the details about the user. It is populated at signup/in
    id: 1,
    firstName: '1',
    lastName: '1',
    email: '1',
    token: '1'
  },
  allPostItUsers: { 1: {}, 2: {} }, // This will contain all the members registered on postIt.
  allPostItGroups: []

}

// const userReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'CHANGE_NAME': {
//       state.name = 'FROM USER REDUCER';
//       break;
//     }
//     case 'CHANGE_AGE': {
//       state.age = action.age;
//       break;
//     }
//     default: return state;
//   }
//   return state;
// };

// const tweetReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'CHANGE_NAME': {
//       state = [...state, 'abracadabra'];
//       break;
//     }
//     case 'CHANGE_AGE': {
//       state.age = action.age;
//       break;
//     }
//     default: return state;
//   }
//   return state;
// };

// const reducers = combineReducers({
//   user: userReducer,
//   tweets: tweetReducer
// });


// const store = createStore(reducers, { tweets: ['nkechi'] });

// store.subscribe(() => {
//   console.log('Store changed, ', store.getState());
// });

// store.dispatch({ type: 'CHANGE_NAME', payload: 'Victor' });
// // store.dispatch({ type: 'CHANGE_AGE', payload: 25 });
