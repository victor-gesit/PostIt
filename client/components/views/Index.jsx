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
      <div className="navbar-fixed">
        <nav className="pink darken-4" role="navigation">
          <div className="nav-wrapper">
            <a href="#" id="brand" className="brand-logo">PostIt</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="#">About PostIt</a></li>
            </ul>
            <ul id="mobile-demo" className="side-nav">
              <li>
                <div className="user-details">
                  <div className="background">
                    <img src="images/fire2.png" />
                  </div>
                </div>
              </li>
              <li><a href="#"><i className="large material-icons black-text">info</i>About PostIt</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  signIn(e) {
    // Stop default button click action
    console.log(this.refs['email'].value);

    var details = {
        email: this.refs['email'].value,
        password: this.refs['password'].value
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('https://postit-api-victor.herokuapp.com/api/user/signin', {
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
          <div className="fixed-action-btn hide-on-med-and-up">
            <a className="btn-floating btn-large red" href="#signinform">
              <i className="large material-icons">lock_outline</i>
            </a>
          </div>
          <div className="transparent-body">
            <div className="row">
              <div className="col s12 m6 l7 center">
                <h3 className="brown-text accent-4 lighten-3 center">Why meet when you can PostIt?</h3>
                <div className="row">
                  <div className="col s12 m12 l6">
                    <i className="large green-text text-darken-4 material-icons">people</i>
                    <h6 className="brown-text accent-4">Create teams of all sizes</h6>
                  </div>
                  <div className="col s12 m12 l6">
                    <i className="large green-text text-darken-4 material-icons">perm_scan_wifi</i>
                    <h6 className="brown-text accent-4">Send broadcast messages to team members</h6>
                  </div>
                  <div className="col s12 m12 l6">
                    <i className="large green-text text-darken-4 material-icons">done_all</i>
                    <h6 className="brown-text accent-4">Get receipt notifications</h6>
                  </div>
                  <div className="col s12 m12 l6">
                    <i className="large green-text text-darken-4 material-icons">trending_up</i>
                    <h6 className="brown-text accent-4">Achieve more in less time</h6>
                  </div>
                </div>
              </div>
              <div id="signinform" className="col s12 m6 l5">
                <form className="signin-form">
                  <div className="row">
                    <div>
                      <h3 className="center">Sign In</h3>
                    </div>
                    <div className="input-field col s12">
                      <input id="email" type="email" className="validate" />
                      <label htmlFor="email" data-error="Enter valid email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input id="password" type="password" className="validate" />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="col s12 center">
                      <button className="btn green darken-4" autofocus>Sign in</button>
                    </div>
                    <br /><br />
                    <div className="col s12">
                      <input id="signedin" className="teal-text" type="checkbox" name="signedin" />
                      <label htmlFor="signedin">Keep me signed in</label>
                    </div>
                    <div>
                      <p>Don't have an account? <a href="#">Sign up</a></p>
                    </div>
                  </div>
                </form>
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
      <footer className="page-footer pink darken-4">
        <div className="shift-left white-text">Built by Victor Idongesit</div>
        <div className="footer-copyright shift-left">    © Andela, 2017</div>
      </footer>
    );
  }
}
