import React from 'react';
import NotificationSystem from 'react-notification-system';

export default class SignInForm extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.notificationSystem = null;
  }
  componentDidMount() {
    // Initialize notification component
    this.notificationSystem = this.notificationRef;
    // Set focus to Sign in button
    $('.signin-form').keypress((event) => {
      if ((event.which && event.which === 13) || (event.keyCode && event.keyCode === 13)) {
        $('#signInButton').click();
        return false;
      } else {
        return true;
      }
    })
  }
  componentWillUpdate() {
    this.button.focus();
    const isSignedIn = this.props.store.appInfo.authState.signedIn;
    const errorMessage = this.props.store.apiError.message;
    if(isSignedIn) {
      const token = this.props.store.appInfo.userDetails.token;
      const userId = this.props.store.appInfo.userDetails.id;
      const userDetails = this.props.store.appInfo.userDetails;
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      window.location = '/messageboard';
    } else {
      if(errorMessage) {
        this.showNotification('error', errorMessage);
        this.props.store.resetErrorLog();
      }
    }
  }
  signIn(e) {
    const email = this.email.value;
    const password = this.password.value;
    this.props.store.signIn(email, password);
  }
  showNotification(level, message) {
      this.notificationSystem.addNotification({
      message: message,
      level: level
    });
  }
  render() {
    let dataLoading  = this.props.store.dataLoading;
    // Style for notification
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
      <div id="signinform" className="col s12 m6 l5">
        {
          dataLoading ? (
            <div className="signin-form">
              <div className="row">
                <NotificationSystem className='notification' style={style} ref={(notificationRef) => { this.notificationRef = notificationRef }} />
                <div>
                  <h3 className="center">Sign In</h3>
                </div>
                <div className="input-field col s12">
                  <input id="email" ref={(email) => { this.email = email; }} type="email" className="validate" ></input>
                  <label htmlFor="email" data-error="Enter valid email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input id="password" ref={(password) => { this.password = password; }}  type="password" className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col s12 center">
                  <button id="signInButton" onClick={this.signIn} className="btn green darken-4" ref={(button) => { this.button = button; }} >Sign in</button>
                </div>
                <br /><br />
                <div className="col s12">
                  <input id="signedin" className="teal-text" type="checkbox" name="signedin" />
                  <label htmlFor="signedin">Keep me signed in</label>
                </div>
                <div>
                  <p>Don't have an account? <a href="/signup">Sign up</a></p>
                </div>
              </div>
              <div className="userlist-preloader">
                <div className="preloader-wrapper loader big active valign-wrapper">
                  <div className="spinner-layer spinner-white-only">
                    <div className="circle-clipper left">
                    <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                    <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                    <div className="circle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ):(
          <div className="signin-form">
            <div className="row">
              <NotificationSystem className='notification' style={style} ref={(notificationRef) => { this.notificationRef = notificationRef }} />
              <div>
                <h3 className="center">Sign In</h3>
              </div>
              <div className="input-field col s12">
                <input id="email" ref={(email) => { this.email = email; }} type="email" className="validate" ></input>
                <label htmlFor="email" data-error="Enter valid email">Email</label>
              </div>
              <div className="input-field col s12">
                <input id="password" ref={(password) => { this.password = password; }}  type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12 center">
                <button id="signInButton" onClick={this.signIn} className="btn green darken-4" ref={(button) => { this.button = button; }} >Sign in</button>
              </div>
              <br /><br />
              <div className="col s12">
                <input id="signedin" className="teal-text" type="checkbox" name="signedin" />
                <label htmlFor="signedin">Keep me signed in</label>
              </div>
              <div>
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
              </div>
            </div>
          </div>
          )
        }
      </div>
    )
  }
}