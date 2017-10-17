/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import { signUp, googleLogin,
  resetErrorLog, resetLoadingState,
  resetPassword } from '../../actions';
import Footer from './partials/Footer.jsx';
import AuthNav from './partials/AuthNav.jsx';
/**
 * React component that displays the Sign Up page
 */
export class NewPassword extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.notificationSystem = null;
    this.enterText = this.enterText.bind(this);
    this.state = {
      enableButton: false
    };
  }
  /**
   * Component method called after component has rendered to make
   * sign in button hold page focus
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    this.props.resetLoadingState();
    // Initialize the side nav
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: true
    });
    $('#sidenav-overlay').trigger('click');
    // Initialize notification component
    this.notificationSystem = this.notificationRef;
  }
  /**
   * Component method called before component properties are updated,
   * to reset error log
   * or flash an error message if sign up failed
   * @returns {undefined} This method returns nothing
   */
  componentDidUpdate() {
    const isSignedIn = this.props.appInfo.authState.signedIn;
    const errorMessage = this.props.apiError.message;
    if (isSignedIn) {
      this.props.history.push('/messageboard');
    }
    if (!isSignedIn && errorMessage) {
      this.showNotification('error', errorMessage);
      this.props.resetErrorLog();
    }
  }
  /**
   * Method called to display notifications after API calls
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
    const token = this.props.match.params.token;
    this.props.resetPassword(password, token);
  }
  /**
   * Handle when a user types input
   * @returns {undefined} This method returns nothing
   */
  enterText() {
    const enableButton =
      this.password.value.length > 7 &&
      this.password.value === this.confirmPassword.value;
    this.setState({ enableButton });
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
      <AuthNav/>
      <div id="main">
        <NotificationSystem
          className='notification'style={style}
          ref={
            (notificationRef) => { this.notificationRef = notificationRef; }
            }
        />
        <div className="row">
          <div className="col s12 m6 l6 offset-m3 offset-l3 center">
            <h5>Select a new password</h5>
          </div>
          <div className="input-field col s12 m6 offset-m3 offset-l3 l6">
            <input id="password"
              onKeyUp={this.enterText}
              ref={(password) => { this.password = password; }}
              type="password"
              className="validate" ></input>
            <label htmlFor="password"
              data-error="Enter valid email">
              Enter Password (8 or more characters)</label>
          </div>
          <div className="input-field col s12 m6 offset-m3 offset-l3 l6">
            <input id="password2"
              onKeyUp={this.enterText}
              ref={
                (confirmPassword) => { this.confirmPassword = confirmPassword; }
                }
              type="password"
              className="validate"></input>
            <label htmlFor="password2" data-error="Enter valid email">
              Confirm Password</label>
          </div>
          <div className="col s12 center">
            <button id="submitButton" onClick={this.resetPassword}
              className="btn green darken-4"
              disabled={!this.state.enableButton}
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
    resetPassword: (password, token) =>
      dispatch(resetPassword(password, token)),
    resetLoadingState: () => dispatch(resetLoadingState())
  });

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
