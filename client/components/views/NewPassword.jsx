/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import GoogleLogin from 'react-google-login';
import { signUp, googleLogin, resetErrorLog, resetLoadingState, resetPassword } from '../../actions';
import Footer from './partials/Footer.jsx';

/**
 * React component that displays the Sign Up page
 */
class SignUp extends React.Component {
  /**
   * Component method called when component loads to reset state of spinner
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    this.props.resetLoadingState();
    $('#sidenav-overlay').trigger('click');
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div>
        <Body store={this.props}/>
      </div>
    );
  }
}


/**
 * React componet that displays Navigation Bar
 */
class NavBar extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="pink darken-4" role="navigation">
          <div className="nav-wrapper">
            <a href="#" id="brand" className="brand-logo">PostIt</a>
            <a href="#" data-activates="mobile-demo"
              className="button-collapse"><i className="material-icons">menu</i></a>
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
              <li><a href="#"><i className="large material-icons black-text">info</i>
                About PostIt</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

/**
 * React component that loads page body
 */
class Body extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.notificationSystem = null;
  }
  /**
   * Component method called after component has rendered to make
   * sign in button hold page focus
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    // Initialize the side nav
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
    // Initialize notification component
    this.notificationSystem = this.notificationRef;
    // Set focus to SignUp button
    $('#signUpForm').keypress((event) => {
      if ((event.which && event.which === 13) || (event.keyCode && event.keyCode === 13)) {
        $('#signUpButton').click();
        return false;
      } else {
        return true;
      }
    });
  }
  /**
   * Component method called before component properties are updated,
   * to save user token to local storage, or flash an error message if sign up failed
   * @returns {undefined} This method returns nothing
   */
  componentDidUpdate() {
    const isSignedIn = this.props.store.appInfo.authState.signedIn;
    const errorMessage = this.props.store.apiError.message;
    if (isSignedIn) {
      this.props.store.history.push('/messageboard');
    } else {
      if (errorMessage) {
        this.showNotification('error', errorMessage);
        this.props.store.resetErrorLog();
      }
    }
  }
  /**
   * @param {Sring} level The type of notification (success or failure)
   * @param {String} message The message in the notification
   * @returns {undefined} This method returns nothing
   */
  showNotification(level, message) {
    this.notificationSystem.addNotification({
      message,
      level,
    });
  }
  /**
   * @param {String} response Token returned from google
   * @returns {undefined} This method returns nothing
   */
  resetPassword() {
    const password = this.password.value;
    const token = this.props.store.match.params.token;
    this.props.store.resetPassword(password, token);
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const style = {
      NotificationItem: {
        DefaultStyle: {
          margin: '100px 5px 2px 1px',
          position: 'fixed',
          width: '320px'
        },
        success: {
          color: 'green'
        }
      }
    };
    const dataLoading = this.props.store.dataLoading;
    return (
      <div id="body">
      <NavBar/>
      <div id="main">
        <NotificationSystem className='notification'style={style}
          ref={(notificationRef) => { this.notificationRef = notificationRef; }} />
        <div className="row">
          <div className="col s12 m6 l6 offset-m3 offset-l3 center">
            <h5>Select a new password</h5>
          </div>
          <div className="input-field col s12 m6 offset-m3 offset-l3 l6">
            <input id="password" ref={(password) => { this.password = password; }} type="password"
              className="validate" ></input>
            <label htmlFor="password" data-error="Enter valid email">Enter Password</label>
          </div>
          <div className="input-field col s12 m6 offset-m3 offset-l3 l6">
            <input id="password2" ref={(password2) => { this.password2 = password2; }} type="password"
              className="validate" ></input>
            <label htmlFor="password2" data-error="Enter valid email">Confirm Password</label>
          </div>
          <div className="col s12 center">
            <button id="signInButton" onClick={this.resetPassword} className="btn green darken-4"
              ref={(button) => { this.button = button; }} >Reset</button>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
  }
}


const mapStateToProps = state =>
  ({
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState
    }
  });

const mapDispatchToProps = dispatch =>
  ({
    signUp: (firstName, lastName, email, password, phone) =>
      dispatch(signUp(firstName, lastName, email, password, phone)),
    googleLogin: userDetails => dispatch(googleLogin(userDetails)),
    resetErrorLog: () => dispatch(resetErrorLog()),
    resetPassword: (password, token) => dispatch(resetPassword(password, token)),
    resetLoadingState: () => dispatch(resetLoadingState())
  });

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
