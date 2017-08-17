webpackHotUpdate(0,{

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactNotificationSystem = __webpack_require__(43);

var _reactNotificationSystem2 = _interopRequireDefault(_reactNotificationSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


/**
 * React component to display the sign in form
 */
var SignInForm = function (_React$Component) {
  _inherits(SignInForm, _React$Component);

  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  function SignInForm(props) {
    _classCallCheck(this, SignInForm);

    var _this = _possibleConstructorReturn(this, (SignInForm.__proto__ || Object.getPrototypeOf(SignInForm)).call(this, props));

    _this.signIn = _this.signIn.bind(_this);
    _this.showNotification = _this.showNotification.bind(_this);
    _this.notificationSystem = null;
    return _this;
  }
  /**
   * Component method called after component renders, to set page focus
   * to sign in button
   * @returns {undefined} This method returns nothing
   */


  _createClass(SignInForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Initialize notification component
      this.notificationSystem = this.notificationRef;
      // Set focus to Sign in button
      $('.signin-form').keypress(function (event) {
        if (event.which && event.which === 13 || event.keyCode && event.keyCode === 13) {
          $('#signInButton').click();
          return false;
        } else {
          return true;
        }
      });
    }
    /**
     * Component method called before component receives new properties
     * @returns {undefined} This method returns nothing
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.button.focus();
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
     * Method called to send user auth data to the API
     * @returns {undefined} This method returns nothing
     */

  }, {
    key: 'signIn',
    value: function signIn() {
      var email = this.email.value;
      var password = this.password.value;
      this.props.store.signIn(email, password);
    }
    /**
     * @param {String} level The severity of the notification
     * @param {String} message The message to be displayed by the notification
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
     * Component method called to render page
     * @returns {Object} returns the DOM object to be displayed
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dataLoading = this.props.store.dataLoading;
      // Style for notification
      var style = {
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
      };
      return _react2.default.createElement(
        'div',
        { id: 'signinform', className: 'col s12 m6 l5' },
        dataLoading ? _react2.default.createElement(
          'div',
          { className: 'signin-form' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(_reactNotificationSystem2.default, { className: 'notification', style: style,
              ref: function ref(notificationRef) {
                _this2.notificationRef = notificationRef;
              } }),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                { className: 'center' },
                'Sign In'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement('input', { id: 'email', ref: function ref(email) {
                  _this2.email = email;
                },
                type: 'email', className: 'validate' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'email', 'data-error': 'Enter valid email' },
                'Email'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement('input', { id: 'password', ref: function ref(password) {
                  _this2.password = password;
                },
                type: 'password', className: 'validate' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'password' },
                'Password'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s12 center' },
              _react2.default.createElement(
                'button',
                { id: 'signInButton', onClick: this.signIn,
                  className: 'btn green darken-4',
                  ref: function ref(button) {
                    _this2.button = button;
                  } },
                'Sign in'
              )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              { className: 'col s12' },
              _react2.default.createElement('input', { id: 'signedin', className: 'teal-text', type: 'checkbox', name: 'signedin' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'signedin' },
                'Keep me signed in'
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'p',
                null,
                'Don\'t have an account? ',
                _react2.default.createElement(
                  'a',
                  { href: '/signup' },
                  'Sign up'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'userlist-preloader' },
            _react2.default.createElement(
              'div',
              { className: 'preloader-wrapper loader big active valign-wrapper' },
              _react2.default.createElement(
                'div',
                { className: 'spinner-layer spinner-white-only' },
                _react2.default.createElement(
                  'div',
                  { className: 'circle-clipper left' },
                  _react2.default.createElement('div', { className: 'circle' })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'gap-patch' },
                  _react2.default.createElement('div', { className: 'circle' })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'circle-clipper right' },
                  _react2.default.createElement('div', { className: 'circle' })
                )
              )
            )
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'signin-form' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(_reactNotificationSystem2.default, { className: 'notification', style: style,
              ref: function ref(notificationRef) {
                _this2.notificationRef = notificationRef;
              } }),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                { className: 'center' },
                'Sign In'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement('input', { id: 'email', ref: function ref(email) {
                  _this2.email = email;
                }, type: 'email',
                className: 'validate' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'email', 'data-error': 'Enter valid email' },
                'Email'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement('input', { id: 'password', ref: function ref(password) {
                  _this2.password = password;
                },
                type: 'password', className: 'validate' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'password' },
                'Password'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s12 center' },
              _react2.default.createElement(
                'button',
                { id: 'signInButton', onClick: this.signIn, className: 'btn green darken-4',
                  ref: function ref(button) {
                    _this2.button = button;
                  } },
                'Sign in'
              )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              { className: 'col s12' },
              _react2.default.createElement('input', { id: 'signedin', className: 'teal-text', type: 'checkbox', name: 'signedin' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'signedin' },
                'Keep me signed in'
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'p',
                null,
                'Don\'t have an account? ',
                _react2.default.createElement(
                  'a',
                  { href: '/#/signup' },
                  'Sign up'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return SignInForm;
}(_react2.default.Component);

exports.default = SignInForm;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })

})
//# sourceMappingURL=0.e505d42d138016e7c44a.hot-update.js.map