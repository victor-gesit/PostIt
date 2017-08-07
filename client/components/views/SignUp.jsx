import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import { signUp, resetErrorLog } from '../../actions';

class SignUp extends React.Component {
  render() {
    return(
      <div>
        <Body _that={this}/>
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
    this.signUp = this.signUp.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this._notificationSystem = null;
  }
  componentDidMount() {
    // Initialize notification component
    this._notificationSystem = this.notificationRef;
    // Set focus to SignUp button
    $('#signUpForm').keypress((event) => {
      if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)) {
          $('#signUpButton').click();
          return false;
      } else {
          return true;
      }
    })
  }
  componentWillUpdate() {
    const isSignedIn = this.props._that.props.appInfo.authState.signedIn;
    const errorMessage = this.props._that.props.apiError.message;
    if(isSignedIn) {
      const token = this.props._that.props.appInfo.userDetails.token;
      const userId = this.props._that.props.appInfo.userDetails.id;
      const userDetails = this.props._that.props.appInfo.userDetails;
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      window.location = '/messageboard';
    } else {
      if(errorMessage) {
        this.showNotification('error', errorMessage);
        this.props._that.props.resetErrorLog();
      }
    }
    
  }
  signUp() {
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const email = this.email.value;
    const phone = this.phone.value;
    const password = this.password.value;
    this.props._that.props.signUp(firstName, lastName, email, password, phone);
  }
  showNotification(level, message) {
      this._notificationSystem.addNotification({
      message: message,
      level: level
    });
  }
  render() {
    const style = {
      NotificationItem: { 
        DefaultStyle: { 
          margin: '100px 5px 2px 1px',
          position: 'fixed',
          width: '320px'
        },
    
        success: { 
          color: 'red'
        }
      }
    }
    return(
      <div id="body">
      <Nav/>
      <div id="main">
        <div className="row">
          <div className="col s8 m6 l4 offset-s2 offset-m3 offset-l4 signup-form">
            <NotificationSystem className='notification' style={style} ref={(notificationRef) => { this.notificationRef = notificationRef }} />
            <div id="signUpForm" className="row">
              <div>
                <h3 className="center">Sign Up</h3>
              </div>
              <div className="input-field col s12">
                <input id="firstName" ref={(firstName) => {this.firstName = firstName;}} type="text" name="fname" className="validate" />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s12">
                <input id="lastName" ref={(lastName) => {this.lastName = lastName;}} type="text" name="lastName" className="validate" />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="input-field col s12">
                <input type="text" ref={(phone) => {this.phone = phone;}}   id="phone" name="number" className="validate" />
                <label htmlFor="phone">Phone</label>
              </div>
              <div className="input-field col s12">
                <input id="email" ref={(email) => {this.email = email;}}  type="email" name="email" className="validate" />
                <label htmlFor="email" data-error="Enter valid email">Email</label>
              </div>
              <div className="input-field col s12">
                <input ref={(password) => {this.password = password;}} id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="center">
                <button onClick={this.signUp} id="signUpButton" className="btn center green darken-4" autoFocus>Sign up</button>
              </div>
              <div>
                <p>Already have an account? <a href="/" >Sign in</a></p>
              </div>
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


function mapStateToProps(state) {
  return {
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState
    }
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (firstName, lastName, email, password, phone) => dispatch(signUp(firstName, lastName, email, password, phone)),
    resetErrorLog: () => dispatch(resetErrorLog())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);