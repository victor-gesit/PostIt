import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Home from './components/views/Index.jsx';
import CreateGroup from './components/views/CreateGroup.jsx';
import MessageBoard from './components/views/MessageBoard.jsx';
import PostMessage from './components/views/PostMessage.jsx';
import SignUp from './components/views/SignUp.jsx';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/signup' component={SignUp}/>
    <Route path='creategroup' component={CreateGroup}/>
    <Route path='messageboard' component={MessageBoard}/>
    <Route path='postmessage' component={PostMessage}/>
    <Route path='*' component={Home}/>
  </Route>
);

