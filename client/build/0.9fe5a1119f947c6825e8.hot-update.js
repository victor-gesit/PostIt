webpackHotUpdate(0,{

/***/ 128:
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

var _actions = __webpack_require__(23);

var _SignInForm = __webpack_require__(141);

var _SignInForm2 = _interopRequireDefault(_SignInForm);

var _Footer = __webpack_require__(28);

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));
  }

  _createClass(Index, [{
    key: 'render',

    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */
    value: function render() {
      var redirect = this.props.apiError.redirect;
      console.log(redirect.to);
      if (redirect.yes) {
        this.props.resetRedirect();
        // window.location = redirect.to;
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Body, { store: this.props })
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

/**
 * React component that displays Navigation Bar
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
 * React component for displaying page body
 */


var Body = function (_React$Component3) {
  _inherits(Body, _React$Component3);

  function Body() {
    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).apply(this, arguments));
  }

  _createClass(Body, [{
    key: 'componentDidMount',

    /**
     * Component method called after component renders to add
     * listener to floating action button and activate side nav
     * @returns {undefined} This method returns nothing
     */
    value: function componentDidMount() {
      $('.button-collapse').sideNav({
        closeOnClick: true
      });
      $('#goToSignin').click(function () {
        $('html, body').animate({
          scrollTop: $('#signinform').offset().top
        }, 2000);
      });
    }
    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'body' },
        _react2.default.createElement(NavBar, null),
        _react2.default.createElement(
          'div',
          { id: 'main' },
          _react2.default.createElement(
            'div',
            { className: 'fixed-action-btn hide-on-med-and-up' },
            _react2.default.createElement(
              'a',
              { id: 'goToSignin', className: 'btn-floating btn-large red' },
              _react2.default.createElement(
                'i',
                { className: 'large material-icons' },
                'lock_outline'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'transparent-body' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col s12 m6 l7 center' },
                _react2.default.createElement(
                  'h3',
                  { className: 'brown-text accent-4 lighten-3 center' },
                  'Why meet when you can PostIt?'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'col s12 m12 l6' },
                    _react2.default.createElement(
                      'i',
                      { className: 'large green-text text-darken-4 material-icons' },
                      'people'
                    ),
                    _react2.default.createElement(
                      'h6',
                      { className: 'brown-text accent-4' },
                      'Create teams of all sizes'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'col s12 m12 l6' },
                    _react2.default.createElement(
                      'i',
                      { className: 'large green-text text-darken-4 material-icons' },
                      'perm_scan_wifi'
                    ),
                    _react2.default.createElement(
                      'h6',
                      { className: 'brown-text accent-4' },
                      'Send broadcast messages to team members'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'col s12 m12 l6' },
                    _react2.default.createElement(
                      'i',
                      { className: 'large green-text text-darken-4 material-icons' },
                      'done_all'
                    ),
                    _react2.default.createElement(
                      'h6',
                      { className: 'brown-text accent-4' },
                      'Get receipt notifications'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'col s12 m12 l6' },
                    _react2.default.createElement(
                      'i',
                      { className: 'large green-text text-darken-4 material-icons' },
                      'trending_up'
                    ),
                    _react2.default.createElement(
                      'h6',
                      { className: 'brown-text accent-4' },
                      'Achieve more in less time'
                    )
                  )
                )
              ),
              _react2.default.createElement(_SignInForm2.default, { store: this.props.store })
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
    signIn: function signIn(email, password) {
      return dispatch((0, _actions.signIn)(email, password));
    },
    resetErrorLog: function resetErrorLog() {
      return dispatch((0, _actions.resetErrorLog)());
    },
    resetRedirect: function resetRedirect() {
      return dispatch((0, _actions.resetRedirect)());
    },
    verifyToken: function verifyToken(token) {
      return dispatch((0, _actions.verifyToken)(token));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Index);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })

})
//# sourceMappingURL=0.9fe5a1119f947c6825e8.hot-update.js.map