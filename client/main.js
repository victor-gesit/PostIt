import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IndexRoute } from 'react-router';
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

$(document).ready(() => {
  $('.button-collapse').sideNav();
}); 

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/creategroup' component={CreateGroup}/>
        <Route exact path='/messageboard' component={MessageBoard}/>
        <Route exact path='/postmessage' component={PostMessage}/>
      </Switch>
    </BrowserRouter>, document.getElementById('app'));


