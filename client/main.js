import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { IndexRoute, Route } from 'react-router';
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

ReactDOM.render(<Router>
    <Switch>
        <Route path='/' component={CreateGroup}/>
        <Route path='signup' component={SignUp}/>
        <Route path='creategroup' component={SignUp}/>
        <Route path='messageboard' component={MessageBoard}/>
        <Route path='postmessage' component={PostMessage}/>
    </Switch>
  </Router>, document.getElementById('app'));


