webpackHotUpdate(0,{

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(5);

var _reactRedux = __webpack_require__(20);

var _jwtDecode = __webpack_require__(16);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _actions = __webpack_require__(23);

var _NavBar = __webpack_require__(35);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _GroupList = __webpack_require__(137);

var _GroupList2 = _interopRequireDefault(_GroupList);

var _Messages = __webpack_require__(140);

var _Messages2 = _interopRequireDefault(_Messages);

var _AddMemberModal = __webpack_require__(133);

var _AddMemberModal2 = _interopRequireDefault(_AddMemberModal);

var _MessageInputBox = __webpack_require__(139);

var _MessageInputBox2 = _interopRequireDefault(_MessageInputBox);

var _DeleteMemberModal = __webpack_require__(134);

var _DeleteMemberModal2 = _interopRequireDefault(_DeleteMemberModal);

__webpack_require__(45);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-env browser */


// Partials


/**
 * React component that displays the Post Message page
 */
var PostMessage = function (_React$Component) {
  _inherits(PostMessage, _React$Component);

  function PostMessage() {
    _classCallCheck(this, PostMessage);

    return _possibleConstructorReturn(this, (PostMessage.__proto__ || Object.getPrototypeOf(PostMessage)).apply(this, arguments));
  }

  _createClass(PostMessage, [{
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

  return PostMessage;
}(_react2.default.Component);

/**
 * React component that displays the body of the page
 */


var Body = function (_React$Component2) {
  _inherits(Body, _React$Component2);

  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  function Body(props) {
    _classCallCheck(this, Body);

    var _this2 = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

    _this2.deleteMember = _this2.deleteMember.bind(_this2);
    _this2.deleteGroup = _this2.deleteGroup.bind(_this2);
    _this2.memberIdToDelete = '';
    _this2.groupIdToDelete = '';
    return _this2;
  }
  /**
   * Component method called after componetn renders to initialize modals
   * @returns {undefined} This method returns nothing
   */


  _createClass(Body, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var userId = decode.id;
      var groupId = this.props.store.match.params.groupId;
      // Load all messages for the group
      this.props.store.getMessages(groupId, token);
      // Load user groups
      this.props.store.getAllGroupsForUser(userId, token);
      // Load all members of the group
      this.props.store.getGroupMembers(groupId, token);

      // Initialize side nav
      $('.button-collapse').sideNav();
      /* Toggle group list*/
      $('#member-list-toggle').off().on('click', function () {
        $('#memberList').animate({ width: 'toggle' });
      });
      $('.modal').modal({
        // Handle modal dialog box
        ready: function ready(modal, trigger) {
          // Check if modal is for deleting group member or entire group
          if (modal[0].id === 'deleteMemberModal') {
            _this3.memberIdToDelete = trigger[0].id;
          } else {
            _this3.groupIdToDelete = trigger[0].id;
          }
        }
      });
      // Toggle memberList
      $(document).on('click', function (e) {
        var target = $(e.target);
        // Hide member list when a click is made outside of memberlist window or deleteMemberModal
        if (!target.is('#member-list-toggle')) {
          if (!target.parents('#memberList').length) {
            if (!target.parents('#deleteMemberModal').length) {
              if (!target.parents('#addMemberModal').length) {
                $('#memberList').fadeOut();
              }
            }
          }
        }
      });
    }
    /**
     * Method to delete a member from a group
     * @returns {undefined} This method returns nothing
     */

  }, {
    key: 'deleteMember',
    value: function deleteMember() {
      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var ownerId = decode.id;
      var idToDelete = this.memberIdToDelete;
      var groupId = this.props.store.match.params.groupId;
      // Call the redux action to delete the member
      this.props.store.deleteMember(ownerId, idToDelete, groupId, token);
    }
    /**
     * Method to delete a group
     * @returns {undefined} This method returns nothing
     */

  }, {
    key: 'deleteGroup',
    value: function deleteGroup() {
      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var ownerId = decode.id;
      var groupId = this.groupIdToDelete;
      // Call redux action to delete the group
      this.props.store.deleteGroup(ownerId, groupId, token);
    }
    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */

  }, {
    key: 'render',
    value: function render() {
      // Accessing a deleted group, or loading messages from a group you've been removed from
      var redirect = this.props.store.apiError.redirect;
      if (redirect.yes) {
        if (redirect.to.indexOf('postmessage') !== -1) {
          // No page reloading when opening a different group
          this.props.store.resetRedirect();
        } else {
          window.location = redirect.to;
        }
      }
      var allUserGroups = {};
      var groupId = this.props.store.match.params.groupId;
      var groupLoaded = this.props.store.allUserGroups.userGroups[groupId];
      var groupTitle = void 0;
      if (groupLoaded) {
        groupTitle = groupLoaded.info.title;
        allUserGroups = this.props.store.allUserGroups.userGroups;
      } else {
        groupTitle = 'Loading...';
      }
      return _react2.default.createElement(
        'div',
        { id: 'body' },
        _react2.default.createElement(_NavBar2.default, { deleteGroup: this.deleteGroup, allUserGroups: allUserGroups,
          store: this.props.store }),
        _react2.default.createElement(
          'div',
          { id: 'main' },
          _react2.default.createElement(
            'div',
            { id: 'main-postmessage' },
            _react2.default.createElement(
              'div',
              { className: 'memberListToggle' },
              _react2.default.createElement(
                'button',
                { id: 'member-list-toggle', className: 'btn s4' },
                'Group Info'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col s12 m8 offset-m2 l8 offset-l2 messageboard' },
                _react2.default.createElement(_Messages2.default, { store: this.props.store })
              ),
              _react2.default.createElement(_GroupList2.default, { store: this.props.store })
            )
          ),
          _react2.default.createElement(_DeleteMemberModal2.default, { deleteMember: this.deleteMember }),
          _react2.default.createElement(_AddMemberModal2.default, { store: this.props.store })
        ),
        _react2.default.createElement(_MessageInputBox2.default, { store: this.props.store })
      );
    }
  }]);

  return Body;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    groups: state.groups,
    allUserGroups: state.allUserGroups,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState,
      loadedMessages: state.appInfo.loadedMessages
    },
    postItInfo: state.postItInfo
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getAllGroupsForUser: function getAllGroupsForUser(userId, token) {
      return dispatch((0, _actions.getAllGroupsForUser)(userId, token));
    },
    getGroupMembers: function getGroupMembers(groupId, token) {
      return dispatch((0, _actions.getGroupMembers)(groupId, token));
    },
    resetRedirect: function resetRedirect() {
      return dispatch((0, _actions.resetRedirect)());
    },
    verifyToken: function verifyToken(token) {
      return dispatch((0, _actions.verifyToken)(token));
    },
    deleteMember: function deleteMember(ownerId, idToDelete, groupId, token) {
      return dispatch((0, _actions.deleteMember)(ownerId, idToDelete, groupId, token));
    },
    deleteGroup: function deleteGroup(ownerId, groupId, token) {
      return dispatch((0, _actions.deleteGroup)(ownerId, groupId, token));
    },
    getMessages: function getMessages(groupId, token) {
      return dispatch((0, _actions.getMessages)(groupId, token));
    },
    loadMessages: function loadMessages(groupId) {
      return dispatch((0, _actions.loadMessages)(groupId));
    },
    getPostItMembers: function getPostItMembers(token) {
      return dispatch((0, _actions.getPostItMembers)(token));
    },
    addUser: function addUser(email, groupId, adderId, token) {
      return dispatch((0, _actions.addUser)(email, groupId, adderId, token));
    },
    postMessage: function postMessage(senderId, groupId, body, priority, isComment, token) {
      return dispatch((0, _actions.postMessage)(senderId, groupId, body, priority, isComment, token));
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PostMessage);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })

})
//# sourceMappingURL=0.ca1ffd558d98edc4a73a.hot-update.js.map