webpackHotUpdate(0,{

/***/ 138:
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


/**
 * React component to hold the groups a user belongs to
 */
var Groups = function (_React$Component) {
  _inherits(Groups, _React$Component);

  function Groups() {
    _classCallCheck(this, Groups);

    return _possibleConstructorReturn(this, (Groups.__proto__ || Object.getPrototypeOf(Groups)).apply(this, arguments));
  }

  _createClass(Groups, [{
    key: 'render',

    /**
     * Render method of React component
     * @returns {undefined} This function returns nothing
     */
    value: function render() {
      var _this2 = this;

      var allUserGroups = this.props.allUserGroups;
      return _react2.default.createElement(
        'ul',
        { className: 'list-side-nav' },
        Object.keys(allUserGroups).map(function (groupId, index) {
          return _react2.default.createElement(UserGroup, { store: _this2.props.store, key: index,
            groupDetails: allUserGroups[groupId].info });
        })
      );
    }
  }]);

  return Groups;
}(_react2.default.Component);

/**
 * React component that holds details of each group a user belongs to
 */


exports.default = Groups;

var UserGroup = function (_React$Component2) {
  _inherits(UserGroup, _React$Component2);

  /**
   * @param {Object} props Component properties passed from parent component
   */
  function UserGroup(props) {
    _classCallCheck(this, UserGroup);

    var _this3 = _possibleConstructorReturn(this, (UserGroup.__proto__ || Object.getPrototypeOf(UserGroup)).call(this, props));

    _this3.loadMessagesAndMembers = _this3.loadMessagesAndMembers.bind(_this3);
    return _this3;
  }
  /**
   * method called when component properties are changed
   * @returns {undefined} This method returns nothing
   */


  _createClass(UserGroup, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var redirect = this.props.store.apiError.redirect;
      var path = this.props.store.match.path;
      // Check to see what page is loading the group. /postmessage route shouldn't reload page
      if (path !== '/postmessage' && redirect.yes) {
        // If page is redirecting to postmessage page
        if (redirect.to.indexOf('postmessage') !== -1) {
          var groupId = this.props.store.appInfo.loadedMessages.groupId;
          localStorage.setItem('groupId', groupId); // Save id of group to local storage
        }
        this.props.store.resetRedirect();
        window.location = redirect.to;
      }
    }
    /**
     * @param {Object} event fired when the link to load details of a group is clicked
     * @returns {undefined} This method returns nothing
     */

  }, {
    key: 'loadMessagesAndMembers',
    value: function loadMessagesAndMembers(event) {
      var groupId = event.target.id;
      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var userId = decode.id;
      // Load messages into the conversation page
      this.props.store.loadMessages(groupId);
      this.props.store.getMessages(groupId, token);

      // Load user groups
      this.props.store.getAllGroupsForUser(userId, token);
      // Load all members of the group
      this.props.store.getGroupMembers(groupId, token);
      localStorage.setItem('groupId', groupId);
    }
    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */

  }, {
    key: 'render',
    value: function render() {
      var groupDetails = this.props.groupDetails;
      return _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'a',
          { onClick: this.loadMessagesAndMembers, id: groupDetails.id },
          _react2.default.createElement(
            'i',
            { className: 'material-icons teal-text' },
            'people_outline'
          ),
          groupDetails.title
        )
      );
    }
  }]);

  return UserGroup;
}(_react2.default.Component);

/***/ })

})
//# sourceMappingURL=0.5a47119a70f252a0ec09.hot-update.js.map