import React from 'react';
import { browserHistory } from 'react-router';

export default class Index extends React.Component {
  render() {
    return(
      <div>
        <Nav/>
        <Body/>
      </div>
    );
  }
}


class Nav extends React.Component {
  componentDidMount() {
  }
  render() {
    return(
      <nav className="lime darken-4">
        <div className="nav-wrapper">
          <a href="#" id="brand" className="brand-logo">PostIt</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a href="#">About PostIt</a></li>
          </ul>
          <ul id="mobile-demo" className="side-nav">
            <li><a href="#">About PostIt</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }
  signUp(e) {
    // Stop default button click action

    var details = {
      firstName: this.refs['firstName'].value,
      lastName: this.refs['lastName'].value,
      phone: this.refs['phone'].value,
      email: this.refs['email'].value,
      password: this.refs['password'].value
    };
    console.log(details);
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('https://postit-api-victor.herokuapp.com/api/user/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    }).then((res) => res.json())
    .then((data) => { console.log(data)})
  }
  render() {
    return(
      <div id="body">
      <div id="main">
        <div className="row">
          <div className="col s2 m3 l4">
          </div>
          <div className="col s8 m6 l4 signup-form">
            <div>
              <h3 className="center">Sign Up</h3>
            </div>
            <div>
              <input type="text" ref="firstName" className="white-text" name="fname" placeholder="First Name" />
            </div>
            <div>
              <input type="text" ref="lastName" className="white-text" name="lname" placeholder="Last Name" />
            </div>
            <div>
              <input type="text" ref="phone" className="white-text" name="number" placeholder="Phone Number" />
            </div>
            <div>
              <input type="text" ref="email" className="white-text" name="email" placeholder="Email" />
            </div>
            <div>
              <input type="password" ref="password" name="password" placeholder="Password" />
            </div>
            <button className="btn" onClick={this.signUp}>Sign up</button>
            <div>
              <p>Already have an account? <a href="#">Sign in</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
      return (
      <footer className="page-footer lime darken-4">
        <div className="container">Built by Victor Idongesit</div>
        <div className="footer-copyright">    © Andela, 2017</div>
      </footer>
    );
  }
}
