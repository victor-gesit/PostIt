import { Route, Switch } from 'react-router-dom';
import React from 'react'

// Routes
import Home from './views/Index.jsx';
import CreateGroup from './views/CreateGroup.jsx';
import MessageBoard from './views/MessageBoard.jsx';
import PostMessage from './views/PostMessage.jsx';
import SignUp from './views/SignUp.jsx';


class Main extends React.Component {
  
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/creategroup' component={CreateGroup}/>
          <Route exact path='/messageboard' component={MessageBoard}/>
          <Route exact path='/postmessage' component={PostMessage}/>
          <Route exact path='/signup' component={SignUp}/>
        </Switch>
      </main>
    )
  }
}

export default Main;
