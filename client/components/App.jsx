import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { verifyToken } from '../actions/';

// Routes
import Home from './views/Index.jsx';
import CreateGroup from './views/CreateGroup.jsx';
import MessageBoard from './views/MessageBoard.jsx';
import PostMessage from './views/PostMessage.jsx';
import SignUp from './views/SignUp.jsx';
import NotFound from './views/NotFound.jsx';
import PrivateRoute from './views/PrivateRoute.jsx';


class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <PrivateRoute exact path='/creategroup' component={CreateGroup}/>
            <PrivateRoute exact path='/messageboard'
              component={MessageBoard}
              />
            <PrivateRoute exact path="/postmessage/:groupId" component={PostMessage}/>
            <Route exact path='/signup' component={SignUp}/>
            <PrivateRoute path="*" component={NotFound}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;