import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

// Routes
import Home from './views/Index.jsx';
import CreateGroupComponent from './views/CreateGroup.jsx';
import MessageBoardComponent from './views/MessageBoard.jsx';
import PostMessageComponent from './views/PostMessage.jsx';
import SignUpComponent from './views/SignUp.jsx';
import NotFoundComponent from './views/NotFound.jsx';
import PrivateRouteComponent from './views/PrivateRoute.jsx';
import ForgottenPasswordComponent from './views/ForgottenPassword.jsx';
import NewPasswordComponent from './views/NewPassword.jsx';

/**
 * React component to server the various routes in the app
 */
export class App extends React.Component {
  /**
   * Component render method to display the DOM of the component
   * @returns {Object} This method returns the DOM object of the react component
   */
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <PrivateRouteComponent exact path='/creategroup'
              component={CreateGroupComponent}/>
            <PrivateRouteComponent exact path='/messageboard'
              component={MessageBoardComponent}
              />
            <PrivateRouteComponent exact path="/postmessage/:groupId"
              component={PostMessageComponent}/>
            <Route exact path='/signup' component={SignUpComponent}/>
            <Route exact path='/forgotpassword'
              component={ForgottenPasswordComponent}/>
            <Route exact path='/newpassword/:token'
              component={NewPasswordComponent}/>
            <PrivateRouteComponent path="*" component={NotFoundComponent}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
