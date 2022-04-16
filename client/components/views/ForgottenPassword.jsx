/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import { signUp, googleLogin,
  resetErrorLog, resetLoadingState,
  recoverPassword } from '../../actions';
import Footer from './partials/Footer.jsx';
import Spinner from './partials/Spinner.jsx';
import AuthNav from './partials/AuthNav.jsx';

/**
 * React component that displays the Sign Up page
 */
export class ForgottenPassword extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.recoverPassword = this.recoverPassword.bind(this);
    this.notificationSystem = null;
  }
  /**
   * Component method called after component has rendered to make
   * sign in button hold page focus
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    this.props.resetLoadingState();
    $('#sidenav-overlay').trigger('click');
    // Initialize notification component
    this.notificationSystem = this.notificationRef;
  }
  /**
   * Component method called before component properties are updated,
   * to save user token to local storage,
   * or flash an error message if sign up failed
   * @returns {undefined} This method returns nothing
   */
  componentDidUpdate() {
    const errored = this.props.apiError.errored;
    const message = this.props.apiError.message;
    if (errored) {
      this.showNotification('error', message);
      this.props.resetErrorLog();
    } else if (message) {
      this.showNotification('success', message);
      this.props.resetErrorLog();
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
   * Method called when to make API call for password recovery
   * @param {String} response Token returned from google
   * @returns {undefined} This method returns nothing
   */
  recoverPassword() {
    const email = this.email.value;
    this.props.recoverPassword(email);
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
    const dataLoading = this.props.dataLoading;
    return (
      <div id="body">
      <AuthNav/>
      <div id="main">
        {
          dataLoading ? (
          <div>
            <NotificationSystem
              className='notification'style={style}
              ref={(notificationRef) => { this.notificationRef = notificationRef; }}
            />
            <div className="row">
              <div className="col s12 m6 l6 offset-m3 offset-l3 center">
                <h5>Enter your email to get a password recovery link</h5>
              </div>
              <div className="input-field col s12 m6 offset-m3 offset-l3 l6">
                <input id="email"
                  ref={(email) => { this.email = email; }} type="email"
                  className="validate" >
                </input>
                <label htmlFor="email"
                  data-error="Enter valid email">Enter email</label>
              </div>
              <div className="col s12 center">
                <button id="signInButton"
                  onClick={this.signIn} className="btn green darken-4"
                  ref={(button) => { this.button = button; }} >Submit</button>
              </div>
            </div>
            <div className="userlist-preloader">
              <Spinner/>
            </div>
          </div>
          ) : (
          <div className="row">
            <NotificationSystem
              className='notification'style={style}
              ref={(notificationRef) => { this.notificationRef = notificationRef; }}
            />
            <div className="col s12 m6 l6 offset-m3 offset-l3 center">
              <h5>Enter your email to get a password recovery link</h5>
            </div>
            <div className="input-field col s12 m6 offset-m3 offset-l3 l6">
              <input id="email"
                ref={(email) => { this.email = email; }} type="email"
                className="validate" ></input>
              <label htmlFor="email"
                data-error="Enter valid email">Enter email</label>
            </div>
            <div className="col s12 center">
              <button id="submitButton" onClick={this.recoverPassword}
                className="btn green darken-4"
                ref={(button) => { this.button = button; }} >Submit</button>
            </div>
          </div>
          )
        }
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
    resetLoadingState: () => dispatch(resetLoadingState()),
    recoverPassword: email => dispatch(recoverPassword(email))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPassword);
