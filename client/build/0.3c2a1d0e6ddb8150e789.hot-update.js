webpackHotUpdate(0,{

/***/ 137:
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
 * A React component that displays the groups a user belongs to, as a list
 */
var GroupList = function (_React$Component) {
  _inherits(GroupList, _React$Component);

  function GroupList() {
    _classCallCheck(this, GroupList);

    return _possibleConstructorReturn(this, (GroupList.__proto__ || Object.getPrototypeOf(GroupList)).apply(this, arguments));
  }

  _createClass(GroupList, [{
    key: 'render',

    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */
    value: function render() {
      var groupId = localStorage.getItem('groupId');
      var groupLoaded = this.props.store.groups.userGroups[groupId];
      var titleLoaded = this.props.store.allUserGroups.userGroups[groupId];
      var token = localStorage.getItem('token');
      var userDetails = (0, _jwtDecode2.default)(token);
      var groupCount = '...';
      var groupTitle = '...';
      var groupMembers = void 0;
      var creatorEmail = void 0;
      // Get group title if loading is complete
      if (titleLoaded) {
        groupTitle = titleLoaded.info.title;
        creatorEmail = titleLoaded.info.creatorEmail;
      }
      // Load the group members if group has loaded
      if (groupLoaded) {
        groupMembers = this.props.store.groups.userGroups[groupId].members;
        if (groupMembers) {
          groupCount = Object.keys(groupMembers).length;
        }
      }
      return _react2.default.createElement(
        'div',
        { id: 'memberList', className: 'members-list-container m4 l3' },
        _react2.default.createElement(
          'div',
          { className: 'row searchbox valign-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'col s9' },
            _react2.default.createElement('input', { type: 'search', className: 'black-text' })
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
        groupLoaded ? _react2.default.createElement(
          'div',
          null,
          groupTitle,
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'badge' },
            groupCount
          )
        ) : _react2.default.createElement(
          'div',
          null,
          groupTitle,
          ' ',
          _react2.default.createElement('span', { className: 'badge' })
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            null,
            'Members List',
            _react2.default.createElement(
              'a',
              { href: '#addMemberModal',
                className: 'secondary-content modal-trigger green-text' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'person_add'
              )
            )
          )
        ),
        groupLoaded ? _react2.default.createElement(GroupMembers, { userEmail: userDetails.email, creatorEmail: creatorEmail,
          groupMembers: groupMembers }) : _react2.default.createElement(
          'div',
          { className: 'preloader-wrapper loader small active' },
          _react2.default.createElement(
            'div',
            { className: 'spinner-layer spinner-green-only' },
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
      );
    }
  }]);

  return GroupList;
}(_react2.default.Component);

/**
 * A React component that displays all the membrs of a group
 */


exports.default = GroupList;

var GroupMembers = function (_React$Component2) {
  _inherits(GroupMembers, _React$Component2);

  function GroupMembers() {
    _classCallCheck(this, GroupMembers);

    return _possibleConstructorReturn(this, (GroupMembers.__proto__ || Object.getPrototypeOf(GroupMembers)).apply(this, arguments));
  }

  _createClass(GroupMembers, [{
    key: 'render',

    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */
    value: function render() {
      var groupMembers = this.props.groupMembers;
      var creatorEmail = this.props.creatorEmail;
      var userEmail = this.props.userEmail;
      var userIsCreator = userEmail === creatorEmail;
      return _react2.default.createElement(
        'ul',
        { className: 'collection members-list' },
        groupMembers ? Object.keys(groupMembers).map(function (memberId, index) {
          return _react2.default.createElement(GroupMember, { userIsCreator: userIsCreator, key: index,
            creatorEmail: creatorEmail, memberDetails: groupMembers[memberId] });
        }) : _react2.default.createElement(
          'div',
          { className: 'progress center pink-text' },
          _react2.default.createElement('div', { className: 'indeterminate' })
        )
      );
    }
  }]);

  return GroupMembers;
}(_react2.default.Component);
/**
 * React component that displays the details of each member of a group
 */


var GroupMember = function (_React$Component3) {
  _inherits(GroupMember, _React$Component3);

  function GroupMember() {
    _classCallCheck(this, GroupMember);

    return _possibleConstructorReturn(this, (GroupMember.__proto__ || Object.getPrototypeOf(GroupMember)).apply(this, arguments));
  }

  _createClass(GroupMember, [{
    key: 'render',

    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */
    value: function render() {
      var memberDetails = this.props.memberDetails;
      var creatorEmail = this.props.creatorEmail;
      var userIsCreator = this.props.userIsCreator;
      var styleClassName = 'secondary-content modal-trigger green-text text-darken-4',
          icon = 'person';
      if (userIsCreator) {
        styleClassName = 'secondary-content modal-trigger red-text';
        icon = 'clear';
      }
      return memberDetails.email === creatorEmail ? _react2.default.createElement(
        'li',
        { className: 'collection-item' },
        memberDetails.firstName,
        ' ',
        memberDetails.lastName,
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'small',
          { className: 'grey-text' },
          memberDetails.email
        ),
        _react2.default.createElement(
          'a',
          { id: memberDetails.id, value: memberDetails.name,
            className: 'secondary-content modal-trigger pink-text text-darken-4' },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'person'
          )
        )
      ) : _react2.default.createElement(
        'li',
        { className: 'collection-item' },
        memberDetails.firstName,
        ' ',
        memberDetails.lastName,
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'small',
          { className: 'grey-text' },
          memberDetails.email
        ),
        userIsCreator ? _react2.default.createElement(
          'a',
          { href: '#deleteMemberModal', id: memberDetails.id, value: memberDetails.name,
            className: styleClassName },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            icon
          )
        ) : _react2.default.createElement(
          'a',
          { id: memberDetails.id, value: memberDetails.name,
            className: styleClassName },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            icon
          )
        )
      );
    }
  }]);

  return GroupMember;
}(_react2.default.Component);

/***/ })

})
//# sourceMappingURL=0.3c2a1d0e6ddb8150e789.hot-update.js.map