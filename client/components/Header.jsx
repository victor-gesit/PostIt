import { Link } from 'react-router-dom';
import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/creategroup'>Create A Group</Link></li>
            <li><Link to='/messageboard'>Message Board</Link></li>
            <li><Link to='/postmessage'>Post A Message</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}


