/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import { signUp, resetErrorLog, resetLoadingState } from '../../actions';
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
    this.signUp = this.signUp.bind(this);
    this.showNotification = this.showNotification.bind(this);
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
  componentWillUpdate() {
    const isSignedIn = this.props.store.appInfo.authState.signedIn;
    const errorMessage = this.props.store.apiError.message;
    if (isSignedIn) {
      const token = this.props.store.appInfo.userDetails.token;
      localStorage.setItem('token', token);
      window.location = '/#/messageboard';
    } else {
      if (errorMessage) {
        this.showNotification('error', errorMessage);
        this.props.store.resetErrorLog();
      }
    }
  }
  /**
   * Method called to sign up a user
   * @returns {undefined} This method returns nothing
   */
  signUp() {
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const email = this.email.value;
    const phone = this.phone.value;
    const password = this.password.value;
    this.props.store.signUp(firstName, lastName, email, password, phone);
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
    return (
      <div id="body">
      <NavBar/>
      <div id="main">
        <div className="row">
          <div className="col s10 m6 l4 offset-s1 offset-m3 offset-l4 signup-form">
            <NotificationSystem className='notification'style={style}
              ref={(notificationRef) => { this.notificationRef = notificationRef; }} />
            <div id="signUpForm" className="row">
              <div>
                <h3 className="center">Sign Up</h3>
              </div>
              <div className="input-field col s12">
                <input id="firstName" ref={(firstName) => { this.firstName = firstName; }}
                  type="text" name="fname" className="validate" />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s12">
                <input id="lastName" ref={(lastName) => { this.lastName = lastName; }}
                  type="text" name="lastName" className="validate" />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="input-field col s12">
                <input type="text" ref={(phone) => { this.phone = phone; }} id="phone"
                  name="number" className="validate" />
                <label htmlFor="phone">Phone</label>
              </div>
              <div className="input-field col s12">
                <input id="email" ref={(email) => { this.email = email; }}
                  type="email" name="email" className="validate" />
                <label htmlFor="email" data-error="Enter valid email">Email</label>
              </div>
              <div className="input-field col s12">
                <input ref={(password) => { this.password = password; }}
                  id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="center">
                <button onClick={this.signUp} id="signUpButton"
                  className="btn center green darken-4" autoFocus>Sign up</button>
              </div>
              <div>
                <p>Already have an account? <a href="/#/" >Sign in</a></p>
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
    resetErrorLog: () => dispatch(resetErrorLog()),
    resetLoadingState: () => dispatch(resetLoadingState())
  });

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
