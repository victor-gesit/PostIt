webpackHotUpdate(0,{

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(20);

var _reactNotificationSystem = __webpack_require__(43);

var _reactNotificationSystem2 = _interopRequireDefault(_reactNotificationSystem);

var _actions = __webpack_require__(23);

var _Footer = __webpack_require__(28);

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


/**
 * React component that displays the Sign Up page
 */
var SignUp = function (_React$Component) {
  _inherits(SignUp, _React$Component);

  function SignUp() {
    _classCallCheck(this, SignUp);

    return _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).apply(this, arguments));
  }

  _createClass(SignUp, [{
    key: 'render',

    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Body, { store: this.props })
      );
    }
  }]);

  return SignUp;
}(_react2.default.Component);

/**
 * React componet that displays Navigation Bar
 */


var NavBar = function (_React$Component2) {
  _inherits(NavBar, _React$Component2);

  function NavBar() {
    _classCallCheck(this, NavBar);

    return _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).apply(this, arguments));
  }

  _createClass(NavBar, [{
    key: 'render',

    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'navbar-fixed' },
        _react2.default.createElement(
          'nav',
          { className: 'pink darken-4', role: 'navigation' },
          _react2.default.createElement(
            'div',
            { className: 'nav-wrapper' },
            _react2.default.createElement(
              'a',
              { href: '#', id: 'brand', className: 'brand-logo' },
              'PostIt'
            ),
            _react2.default.createElement(
              'a',
              { href: '#', 'data-activates': 'mobile-demo',
                className: 'button-collapse' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'menu'
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'right hide-on-med-and-down' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '#' },
                  'About PostIt'
                )
              )
            ),
            _react2.default.createElement(
              'ul',
              { id: 'mobile-demo', className: 'side-nav' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'user-details' },
                  _react2.default.createElement(
                    'div',
                    { className: 'background' },
                    _react2.default.createElement('img', { src: 'images/fire2.png' })
                  )
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '#' },
                  _react2.default.createElement(
                    'i',
                    { className: 'large material-icons black-text' },
                    'info'
                  ),
                  'About PostIt'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return NavBar;
}(_react2.default.Component);

/**
 * React component that loads page body
 */


var Body = function (_React$Component3) {
  _inherits(Body, _React$Component3);

  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  function Body(props) {
    _classCallCheck(this, Body);

    var _this3 = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

    _this3.signUp = _this3.signUp.bind(_this3);
    _this3.showNotification = _this3.showNotification.bind(_this3);
    _this3.notificationSystem = null;
    return _this3;
  }
  /**
   * Component method called after component has rendered to make
   * sign in button hold page focus
   * @returns {undefined} This method returns nothing
   */


  _createClass(Body, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Initialize the side nav
      $('.button-collapse').sideNav({
        closeOnClick: true
      });
      // Initialize notification component
      this.notificationSystem = this.notificationRef;
      // Set focus to SignUp button
      $('#signUpForm').keypress(function (event) {
        if (event.which && event.which === 13 || event.keyCode && event.keyCode === 13) {
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

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      var isSignedIn = this.props.store.appInfo.authState.signedIn;
      var errorMessage = this.props.store.apiError.message;
      if (isSignedIn) {
        var token = this.props.store.appInfo.userDetails.token;
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

  }, {
    key: 'signUp',
    value: function signUp() {
      var firstName = this.firstName.value;
      var lastName = this.lastName.value;
      var email = this.email.value;
      var phone = this.phone.value;
      var password = this.password.value;
      this.props.store.signUp(firstName, lastName, email, password, phone);
    }
    /**
     * @param {Sring} level The type of notification (success or failure)
     * @param {String} message The message in the notification
     * @returns {undefined} This method returns nothing
     */

  }, {
    key: 'showNotification',
    value: function showNotification(level, message) {
      this.notificationSystem.addNotification({
        message: message,
        level: level
      });
    }
    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var style = {
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
      return _react2.default.createElement(
        'div',
        { id: 'body' },
        _react2.default.createElement(NavBar, null),
        _react2.default.createElement(
          'div',
          { id: 'main' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col s10 m6 l4 offset-s1 offset-m3 offset-l4 signup-form' },
              _react2.default.createElement(_reactNotificationSystem2.default, { className: 'notification', style: style,
                ref: function ref(notificationRef) {
                  _this4.notificationRef = notificationRef;
                } }),
              _react2.default.createElement(
                'div',
                { id: 'signUpForm', className: 'row' },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'h3',
                    { className: 'center' },
                    'Sign Up'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  _react2.default.createElement('input', { id: 'firstName', ref: function ref(firstName) {
                      _this4.firstName = firstName;
                    },
                    type: 'text', name: 'fname', className: 'validate' }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'firstName' },
                    'First Name'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  _react2.default.createElement('input', { id: 'lastName', ref: function ref(lastName) {
                      _this4.lastName = lastName;
                    },
                    type: 'text', name: 'lastName', className: 'validate' }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'lastName' },
                    'Last Name'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  _react2.default.createElement('input', { type: 'text', ref: function ref(phone) {
                      _this4.phone = phone;
                    }, id: 'phone',
                    name: 'number', className: 'validate' }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'phone' },
                    'Phone'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  _react2.default.createElement('input', { id: 'email', ref: function ref(email) {
                      _this4.email = email;
                    },
                    type: 'email', name: 'email', className: 'validate' }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'email', 'data-error': 'Enter valid email' },
                    'Email'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  _react2.default.createElement('input', { ref: function ref(password) {
                      _this4.password = password;
                    },
                    id: 'password', type: 'password', className: 'validate' }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'password' },
                    'Password'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'center' },
                  _react2.default.createElement(
                    'button',
                    { onClick: this.signUp, id: 'signUpButton',
                      className: 'btn center green darken-4', autoFocus: true },
                    'Sign up'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'Already have an account? ',
                    _react2.default.createElement(
                      'a',
                      { href: '/#/' },
                      'Sign in'
                    )
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(_Footer2.default, null)
      );
    }
  }]);

  return Body;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState
    }
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    signUp: function signUp(firstName, lastName, email, password, phone) {
      return dispatch((0, _actions.signUp)(firstName, lastName, email, password, phone));
    },
    resetErrorLog: function resetErrorLog() {
      return dispatch((0, _actions.resetErrorLog)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SignUp);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })

})
//# sourceMappingURL=0.842b722c661ad9bbfac3.hot-update.js.map