import React from 'react';
import GoogleLogin from 'react-google-login';
import NotificationSystem from 'react-notification-system';
/**
 * React component to display a modal for deleting a member
 */
export class SignUpForm extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.enterText = this.enterText.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.notificationSystem = null;
    this.state = {
      validInput: true,
      enableButton: false
    };
  }
  /**
   * Component method called after component has rendered to make
   * sign in button hold page focus
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
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
    const isSignedIn = this.props.store.appInfo.authState.signedIn;
    const errorMessage = this.props.store.apiError.message;
    const { from } = this.props.store.location.state || { from: null };
    if (isSignedIn) {
      if (from) {
        this.props.store.history.push(from);
      } else {
        this.props.store.history.push('/messageboard');
      }
    }
    if (!isSignedIn && errorMessage) {
      this.showNotification('error', errorMessage);
      this.props.store.resetErrorLog();
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
   * Method called so log a user in with Google
   * @param {String} response Token returned from google
   * @returns {undefined} This method returns nothing
   */
  googleLogin(response) {
    const profileObj = response.profileObj;
    const firstName = profileObj.givenName;
    const lastName = profileObj.familyName;
    const email = profileObj.email;
    const googleId = profileObj.googleId;
    const password = response.accessToken;
    const userDetails = {
      firstName,
      lastName,
      email,
      googleId,
      password
    };
    this.props.store.googleLogin(userDetails);
  }
  /**
   * Handle when a user types input
   * @returns {undefined} This method returns nothing
   */
  enterText() {
    const enableButton =
      this.email.value.length > 0 &&
      this.password.value.length > 0 &&
      this.firstName.value.length > 0 &&
      this.lastName.value.length > 0 &&
      this.phone.value.length > 0;
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
      <div className="col s10 m6 l4 offset-s1 offset-m3 offset-l4 signup-form">
        <NotificationSystem className='notification'style={style}
          ref={
            (notificationRef) => { this.notificationRef = notificationRef; }} />
        <div id="signUpForm" className="row">
          <div>
            <h3 className="center">Sign Up</h3>
          </div>
          <div className="input-field col s12">
            <input id="firstName"
              ref={(firstName) => { this.firstName = firstName; }}
              onKeyUp={this.enterText}
              type="text" name="fname" className="validate" />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="input-field col s12">
            <input id="lastName"
              ref={(lastName) => { this.lastName = lastName; }}
              onKeyUp={this.enterText}
              type="text" name="lastName" className="validate" />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="input-field col s12">
            <input type="text"
              ref={(phone) => { this.phone = phone; }} id="phone"
              onKeyUp={this.enterText}
              name="number" className="validate" />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="input-field col s12">
            <input id="email" ref={(email) => { this.email = email; }}
              onKeyUp={this.enterText}
              type="email" name="email" className="validate" />
            <label htmlFor="email" data-error="Enter valid email">Email</label>
          </div>
          <div className="input-field col s12">
            <input ref={(password) => { this.password = password; }}
              onKeyUp={this.enterText}
              id="password" type="password" className="validate" />
            <label htmlFor="password">Password</label>
          </div>
          <div className="center">
            <button onClick={this.signUp} id="signUpButton"
              disabled={!this.state.enableButton}
              className="btn center green darken-4" autoFocus>Sign up</button>
          </div>
          <div>
            <p>Already have an account? <a href="/#/" >Sign in</a></p>
          </div>
          <div className="center">
            <GoogleLogin
              id= 'googleLoginButton'
              clientId='856410977175-5n2ns6ad2p5ofrrtma3jgun5f7paif78.apps.googleusercontent.com'
              buttonText="Login"
              onSuccess={this.googleLogin}
              onFailure={() => {}}
            >
            <i className="fa fa-google-plus"></i> Sign in with Google
            </GoogleLogin>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
