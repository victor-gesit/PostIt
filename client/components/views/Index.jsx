import React from 'react';
import { connect } from 'react-redux';
import { signIn, resetErrorLog, resetRedirect, verifyToken } from '../../actions';
import NotificationSystem from 'react-notification-system';

class Index extends React.Component {
  constructor(props){
    super(props);
  };
  componentWillMount() {
    const token = localStorage.getItem('token');
    if(token !== 'undefined' && token !== 'null' && token !== null) {
      this.props.verifyToken(token);
    }
  }
  render() {
    const redirect = this.props.apiError.redirect;
    if(redirect.yes) {
      this.props.resetRedirect();
      console.log(redirect);
      // window.location = redirect.to;
    }
    return(
      <div>
        <Body _that={this}/>
      </div>
    );
  }
}


class NavBar extends React.Component {
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
  render() {
    return(
      <div id="body">
        <NavBar/>
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
              <SignInForm _that={this.props._that}/>
            </div>
          </div>

        </div>
      <Footer/>
    </div>
    );
  }
}

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this._notificationSystem = null;
  }
  componentDidMount() {
    // Initialize notification component
    this._notificationSystem = this.notificationRef;
    // Set focus to Sign in button
    $('.signin-form').keypress((event) => {
      if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)) {
          $('#signInButton').click();
          return false;
      } else {
          return true;
      }
    })
  }
  componentWillUpdate() {
    this.button.focus();
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
  signIn(e) {
    const email = this.email.value;
    const password = this.password.value;
    this.props._that.props.signIn(email, password);
  }
  showNotification(level, message) {
      this._notificationSystem.addNotification({
      message: message,
      level: level
    });
  }
  render() {
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
      </div>
    )
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


const mapStateToProps = (state)  => {
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
    signIn: (email, password) => dispatch(signIn(email, password)),
    resetErrorLog: () => dispatch(resetErrorLog()),
    resetRedirect: () => dispatch(resetRedirect()),
    verifyToken: (token) => dispatch(verifyToken(token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);