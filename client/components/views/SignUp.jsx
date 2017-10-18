/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import SignUpForm from './partials/SignUpForm.jsx';
import Spinner from './partials/Spinner.jsx';
import AuthNav from './partials/AuthNav.jsx';
import { signUp, googleLogin, resetErrorLog, resetLoadingState } from '../../actions';
import Footer from './partials/Footer.jsx';

/**
 * React component that displays the Sign Up page
 */
export class SignUp extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
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
    // Initialize the side nav
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: true
    });
    // Initialize notification component
    this.notificationSystem = this.notificationRef;
  }
  /**
   * Component method called before component properties are updated,
   * to save user token to local storage, or
   * flash an error message if sign up failed
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
    const dataLoading = this.props.dataLoading;
    return (
      <div id="body">
      <AuthNav/>
      <div id="main">
        <div className="row">
          <NotificationSystem
            className='notification'style={style}
            ref={
              (notificationRef) => { this.notificationRef = notificationRef; }
              }
          />
          <SignUpForm store={this.props}/>
          {
            dataLoading ? (
              <div>
                <div className="userlist-preloader">
                  <Spinner/>
                </div>
              </div>
            ) : (
              <div/>
            )
          }
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
    resetLoadingState: () => dispatch(resetLoadingState())
  });

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
