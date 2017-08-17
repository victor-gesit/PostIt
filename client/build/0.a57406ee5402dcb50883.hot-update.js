webpackHotUpdate(0,{

/***/ 127:
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

__webpack_require__(5);

var _jwtDecode = __webpack_require__(16);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _reactNotificationSystem = __webpack_require__(43);

var _reactNotificationSystem2 = _interopRequireDefault(_reactNotificationSystem);

var _actions = __webpack_require__(23);

var _Footer = __webpack_require__(28);

var _Footer2 = _interopRequireDefault(_Footer);

var _NavBar = __webpack_require__(35);

var _NavBar2 = _interopRequireDefault(_NavBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


// Partials


/**
 * React component that displays the page for creating a new group
 */
var CreateGroup = function (_React$Component) {
  _inherits(CreateGroup, _React$Component);

  function CreateGroup() {
    _classCallCheck(this, CreateGroup);

    return _possibleConstructorReturn(this, (CreateGroup.__proto__ || Object.getPrototypeOf(CreateGroup)).apply(this, arguments));
  }

  _createClass(CreateGroup, [{
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

  return CreateGroup;
}(_react2.default.Component);

/**
 * React component for displaying page body
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

    _this2.switchTab = _this2.switchTab.bind(_this2);
    _this2.addMember = _this2.addMember.bind(_this2);
    _this2.createGroup = _this2.createGroup.bind(_this2);
    _this2.showNotification = _this2.showNotification.bind(_this2);
    _this2.selectedMembers = [];
    _this2.registeredMembers = {};
    return _this2;
  }
  /**
   * React component method called after component render
   * @return {undefined} this method returns nothing
   */


  _createClass(Body, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Initialize navbar
      $('.button-collapse').sideNav({
        closeOnClick: true
      });
      // Load a default tab for the createGroup page
      try {
        $('#defaultTab')[0].click();
      } catch (e) {
        return false;
      }
      // Bind the notifications component
      this.notificationSystem = this.notificationRef;
      // Load all registered members
      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var userId = decode.id;
      this.props.store.getPostItMembers(token);
      this.props.store.getAllGroupsForUser(userId, token);
    }
    /**
     * React component method called before componet receives new props
     * @returns {undefined} this method returns nothing
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      var allUsers = this.props.store.postItInfo.members.postItMembers;
      var redirect = this.props.store.apiError.redirect;
      var errorMessage = this.props.store.apiError.message;
      this.registeredMembers = allUsers;
      if (redirect.yes) {
        // Reset state of redirect property
        this.props.store.resetRedirect();
        window.location = redirect.to;
      } else {
        if (errorMessage) {
          // Empty the array of selected members
          this.selectedMembers = [];
          this.showNotification('error', errorMessage);
          // Reset error log
          this.props.store.resetErrorLog();
        }
      }
    }
    /**
     * Method to display notifications
     * @param {String} level the severity of the notification
     * @param {String} message the message to be diplayed
     * @return {undefined} this method returns nothing
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
     * Method for sending new group details to the api
     * @returns {undefined} This method returns nothing
     */

  }, {
    key: 'createGroup',
    value: function createGroup() {
      var title = this.title.value;
      var description = this.description.value;
      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var creatorId = decode.id;
      var selectedMembers = this.selectedMembers;
      this.props.store.createGroup(creatorId, title, description, selectedMembers, token);
    }
    /**
     * This method handles switching tabs in this react component
     * @param {String} button The button that was clicked
     * @param {String} tabName The div for the selected tab
     * @returns {undefined} This method returns nothing
     */

  }, {
    key: 'switchTab',
    value: function switchTab(button, tabName) {
      var tabcontent = document.getElementsByClassName('tabcontent');
      for (var i = 0; i < tabcontent.length; i += 1) {
        tabcontent[i].style.display = 'none';
      }
      var tablinks = document.getElementsByClassName('tablinks');
      for (var _i = 0; _i < tablinks.length; _i += 1) {
        tablinks[_i].className = tablinks[_i].className.replace(' active', '');
      }
      this.refs[tabName].style.display = 'block';
      this.refs[button].className += ' active';
    }
    /**
     * Method to add a member to the list of selected members
     * @param {Boolean} selected indicates if a member was selected or deselected
     * @param {String} memberEmail Email of member to be added
     * @returns {undefined} this method returns nothing
     */

  }, {
    key: 'addMember',
    value: function addMember(selected, memberEmail) {
      if (selected) {
        // Add member
        this.selectedMembers.push(memberEmail);
      } else {
        // Remove member if added earlier
        var index = this.selectedMembers.indexOf(memberEmail);
        this.selectedMembers.splice(index, 1);
      }
    }
    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

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
      var dataLoading = this.props.store.dataLoading;
      var allUserGroups = this.props.store.allUserGroups.userGroups;
      return _react2.default.createElement(
        'div',
        { id: 'body' },
        _react2.default.createElement(_NavBar2.default, { store: this.props.store, allUserGroups: allUserGroups }),
        _react2.default.createElement(_reactNotificationSystem2.default, { className: 'notification', style: style,
          ref: function ref(notificationRef) {
            _this3.notificationRef = notificationRef;
          } }),
        _react2.default.createElement(
          'div',
          { id: 'main' },
          _react2.default.createElement(
            'div',
            { className: 'tab' },
            _react2.default.createElement(
              'button',
              { className: 'tablinks', id: 'defaultTab', ref: 'defaultTab',
                onClick: function onClick() {
                  return _this3.switchTab('defaultTab', 'info');
                } },
              'Group info'
            ),
            _react2.default.createElement(
              'button',
              { className: 'tablinks', id: 'add-members', ref: 'add-members',
                onClick: function onClick() {
                  return _this3.switchTab('add-members', 'members');
                } },
              'Add members'
            )
          ),
          dataLoading ? _react2.default.createElement(
            'div',
            { id: 'info', ref: 'info', className: 'tabcontent' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col s12 m8 offset-m2 offset-l3 l6' },
                _react2.default.createElement(
                  'div',
                  null,
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
              )
            )
          ) : _react2.default.createElement(
            'div',
            { id: 'info', ref: 'info', className: 'tabcontent' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col s12 m8 offset-m2 offset-l3 l6' },
                _react2.default.createElement(
                  'div',
                  { className: 'group-details' },
                  _react2.default.createElement(
                    'h4',
                    { className: 'center' },
                    'Enter group details'
                  ),
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement('input', { type: 'text', ref: function ref(title) {
                          _this3.title = title;
                        },
                        name: 'group-title', placeholder: 'Group Title' })
                    ),
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement('textarea', { id: 'groupDescription',
                        ref: function ref(description) {
                          _this3.description = description;
                        },
                        type: 'text', className: 'materialize-textarea', placeholder: 'Description',
                        name: 'group-desc', defaultValue: '' })
                    )
                  ),
                  _react2.default.createElement(
                    'button',
                    { className: 'btn light-green darken-4',
                      onClick: function onClick() {
                        return _this3.switchTab('add-members', 'members');
                      } },
                    'Next >>'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { id: 'members', ref: 'members', className: 'tabcontent' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col s12 m8 offset-m2 l6 offset-l3' },
                dataLoading ? _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'classListHolder' },
                      _react2.default.createElement(
                        'ul',
                        { className: 'collection with-header registeredMembersList' },
                        _react2.default.createElement(
                          'li',
                          { className: 'collection-header' },
                          _react2.default.createElement(
                            'h4',
                            { className: 'center' },
                            'Add members'
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'collection-item' },
                          _react2.default.createElement('input', { id: 'cb1', type: 'checkbox', disabled: true }),
                          _react2.default.createElement(
                            'label',
                            { htmlFor: 'cb1', className: 'black-text' },
                            _react2.default.createElement('small', { className: 'grey-text' })
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'collection-item' },
                          _react2.default.createElement('input', { id: 'cb2', type: 'checkbox', disabled: true }),
                          _react2.default.createElement(
                            'label',
                            { htmlFor: 'cb2', className: 'black-text' },
                            _react2.default.createElement('small', { className: 'grey-text' })
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'collection-item' },
                          _react2.default.createElement('input', { id: 'cb3', type: 'checkbox', disabled: true }),
                          _react2.default.createElement(
                            'label',
                            { htmlFor: 'cb3', className: 'black-text' },
                            _react2.default.createElement('small', { className: 'grey-text' })
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'collection-item' },
                          _react2.default.createElement('input', { id: 'cb4', type: 'checkbox', disabled: true }),
                          _react2.default.createElement(
                            'label',
                            { htmlFor: 'cb4', className: 'black-text' },
                            _react2.default.createElement('small', { className: 'grey-text' })
                          )
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                          'button',
                          { className: 'btn col s8 offset-s2 m5 l5 light-green darken-4',
                            onClick: function onClick() {
                              return _this3.switchTab('defaultTab', 'info');
                            } },
                          '<< Group info'
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'col s12 m2 s2' },
                          _react2.default.createElement('br', null)
                        ),
                        _react2.default.createElement(
                          'button',
                          { disabled: true, className: 'btn col s8 offset-s2 m5 l5 light-green darken-4' },
                          'Create group'
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'userlist-preloader' },
                    _react2.default.createElement(
                      'div',
                      { className: 'preloader-wrapper big loader active valign-wrapper' },
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
                  null,
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'classListHolder' },
                      _react2.default.createElement(
                        'ul',
                        { className: 'collection with-header registeredMembersList' },
                        _react2.default.createElement(
                          'li',
                          { className: 'collection-header' },
                          _react2.default.createElement(
                            'h4',
                            { className: 'center' },
                            'Add members'
                          )
                        ),
                        Object.keys(this.registeredMembers).map(function (userId, index) {
                          return _react2.default.createElement(RegisteredMember, { addMember: _this3.addMember, key: index,
                            id: userId, userInfo: _this3.registeredMembers[userId] });
                        })
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                          'button',
                          { className: 'btn col s8 offset-s2 m5 l5 light-green darken-4',
                            onClick: function onClick() {
                              return _this3.switchTab('defaultTab', 'info');
                            } },
                          '<< Group info'
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'col s12 m2 s2' },
                          _react2.default.createElement('br', null)
                        ),
                        _react2.default.createElement(
                          'button',
                          { onClick: this.createGroup,
                            className: 'btn col s8 offset-s2 m5 l5 light-green darken-4' },
                          'Create group'
                        )
                      )
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

/**
 *  Component to contain a member loaded from the database
 */


var RegisteredMember = function (_React$Component3) {
  _inherits(RegisteredMember, _React$Component3);

  /**
   * @param {Object} props component props passed from parent component
   */
  function RegisteredMember(props) {
    _classCallCheck(this, RegisteredMember);

    var _this4 = _possibleConstructorReturn(this, (RegisteredMember.__proto__ || Object.getPrototypeOf(RegisteredMember)).call(this, props));

    _this4.selected = false;
    _this4.addOrRemove = _this4.addOrRemove.bind(_this4);
    return _this4;
  }
  /**
   * Method to add a member to a group
   * @param {String} email Email of member to be added
   * @returns {undefined} This method returns nothing
   */


  _createClass(RegisteredMember, [{
    key: 'addOrRemove',
    value: function addOrRemove(email) {
      this.selected = !this.selected;
      this.props.addMember(this.selected, email);
    }
    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var userInfo = this.props.userInfo;
      return _react2.default.createElement(
        'li',
        { className: 'collection-item' },
        _react2.default.createElement('input', { id: this.props.userInfo.email,
          type: 'checkbox',
          onClick: function onClick() {
            return _this5.addOrRemove(_this5.props.userInfo.email);
          },
          ref: this.props.userInfo.email }),
        _react2.default.createElement(
          'label',
          { className: 'brown-text', htmlFor: this.props.userInfo.email },
          userInfo.firstName,
          ' ',
          userInfo.lastName,
          _react2.default.createElement(
            'small',
            { className: 'red-text' },
            ' ',
            this.props.userInfo.email
          )
        )
      );
    }
  }]);

  return RegisteredMember;
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
    resetErrorLog: function resetErrorLog() {
      return dispatch((0, _actions.resetErrorLog)());
    },
    resetRedirect: function resetRedirect() {
      return dispatch((0, _actions.resetRedirect)());
    },
    verifyToken: function verifyToken(token) {
      return dispatch((0, _actions.verifyToken)(token));
    },
    getPostItMembers: function getPostItMembers(token) {
      return dispatch((0, _actions.getPostItMembers)(token));
    },
    getAllGroupsForUser: function getAllGroupsForUser(userId, token) {
      return dispatch((0, _actions.getAllGroupsForUser)(userId, token));
    },
    getMessages: function getMessages(groupId, token) {
      return dispatch((0, _actions.getMessages)(groupId, token));
    },
    loadMessages: function loadMessages(groupId) {
      return dispatch((0, _actions.loadMessages)(groupId));
    },
    getGroupMembers: function getGroupMembers(groupId, token) {
      return dispatch((0, _actions.getGroupMembers)(groupId, token));
    },
    createGroup: function createGroup(creatorId, title, description, selectedMembers, token) {
      return dispatch((0, _actions.createGroup)(creatorId, title, description, selectedMembers, token));
    },
    getGroupsForUser: function getGroupsForUser(userId, offset, limit, token) {
      return dispatch((0, _actions.getGroupsForUser)(userId, offset, limit, token));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CreateGroup);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })

})
//# sourceMappingURL=0.a57406ee5402dcb50883.hot-update.js.map