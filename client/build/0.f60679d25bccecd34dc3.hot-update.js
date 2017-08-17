webpackHotUpdate(0,{

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _jwtDecode = __webpack_require__(16);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _Groups = __webpack_require__(138);

var _Groups2 = _interopRequireDefault(_Groups);

var _GroupDeleteModal = __webpack_require__(136);

var _GroupDeleteModal2 = _interopRequireDefault(_GroupDeleteModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


/**
 * React component to display the navbar
 */
var NavBar = function (_React$Component) {
  _inherits(NavBar, _React$Component);

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
      var groupId = localStorage.getItem('groupId');
      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var userDetails = decode;
      var allUserGroups = this.props.allUserGroups;
      var path = this.props.store.match.path;
      var sideNavClass = 'side-nav';
      if (path === '/postmessage/:groupId') {
        sideNavClass = 'side-nav fixed';
      }
      return _react2.default.createElement(
        'div',
        { className: 'navbar-fixed' },
        _react2.default.createElement(
          'nav',
          { className: 'pink darken-4' },
          _react2.default.createElement(
            'div',
            { className: 'nav-wrapper' },
            _react2.default.createElement(
              'a',
              { id: 'brand', className: 'brand-logo left' },
              'PostIt'
            ),
            _react2.default.createElement(
              'a',
              { 'data-activates': 'mobile-demo', 'data-hover': 'true',
                className: 'button-collapse show-on-large' },
              _react2.default.createElement(
                'i',
                { id: 'sideNavIcon', className: 'material-icons' },
                'menu'
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'right' },
              path === '/messageboard' ? _react2.default.createElement('li', null) : _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/#/messageboard' },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'view_module'
                  )
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/#/creategroup' },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'library_add'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'ul',
              { id: 'mobile-demo', className: sideNavClass },
              path === '/postmessage/:groupId' ? _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'user-details' },
                  _react2.default.createElement(
                    'div',
                    { className: 'background' },
                    _react2.default.createElement(
                      'div',
                      { id: 'emptySpace', className: 'pink darken-4' },
                      _react2.default.createElement(
                        'div',
                        { className: 'brand-logo' },
                        'PostIt'
                      )
                    ),
                    _react2.default.createElement('img', { id: 'sideNavImage', src: 'images/fire2.png' })
                  )
                ),
                _react2.default.createElement(
                  'ul',
                  { className: 'collection' },
                  _react2.default.createElement(
                    'li',
                    { className: 'collection-item avatar black-text' },
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons purple circle' },
                      'person'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'title black-text' },
                      userDetails.firstName,
                      ' ',
                      userDetails.lastName
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      userDetails.email,
                      _react2.default.createElement('br', null),
                      userDetails.phone
                    )
                  )
                )
              ) : _react2.default.createElement(
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
                ),
                _react2.default.createElement(
                  'ul',
                  { className: 'collection' },
                  _react2.default.createElement(
                    'li',
                    { className: 'collection-item avatar black-text' },
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons purple circle' },
                      'person'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'title black-text' },
                      userDetails.firstName,
                      ' ',
                      userDetails.lastName
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      userDetails.email,
                      _react2.default.createElement('br', null),
                      userDetails.phone
                    )
                  )
                )
              ),
              path === '/postmessage/:groupId' ? _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '#groupDeleteModal', id: groupId },
                  _react2.default.createElement(
                    'i',
                    { className: 'large material-icons red-text' },
                    'texture'
                  ),
                  'Delete Group'
                )
              ) : path === '/#/creategroup' ? _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  null,
                  _react2.default.createElement(
                    'i',
                    { className: 'large material-icons green-text' },
                    'library_add'
                  ),
                  'Create New Group'
                )
              ) : _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/#/creategroup' },
                  _react2.default.createElement(
                    'i',
                    { className: 'large material-icons green-text' },
                    'library_add'
                  ),
                  'Create New Group'
                )
              ),
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  null,
                  _react2.default.createElement(
                    'i',
                    { className: 'large material-icons black-text' },
                    'texture'
                  ),
                  'All Groups'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row searchbox valign-wrapper' },
                _react2.default.createElement(
                  'div',
                  { className: 'col s9' },
                  _react2.default.createElement('input', { type: 'search', placeholder: 'Find a group', className: 'white-text' })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col s3' },
                  _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons black-text' },
                      'search'
                    )
                  )
                )
              ),
              _react2.default.createElement(_Groups2.default, { store: this.props.store, allUserGroups: allUserGroups }),
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  null,
                  _react2.default.createElement(
                    'i',
                    { className: 'large material-icons black-text' },
                    'info'
                  ),
                  'About PostIt'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  null,
                  _react2.default.createElement(
                    'i',
                    { className: 'large material-icons red-text' },
                    'exit_to_app'
                  ),
                  'Sign Out'
                )
              )
            )
          ),
          _react2.default.createElement(_GroupDeleteModal2.default, { deleteGroup: this.props.deleteGroup })
        )
      );
    }
  }]);

  return NavBar;
}(_react2.default.Component);

exports.default = NavBar;

/***/ })

})
//# sourceMappingURL=0.f60679d25bccecd34dc3.hot-update.js.map