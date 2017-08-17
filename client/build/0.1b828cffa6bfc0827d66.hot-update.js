webpackHotUpdate(0,{

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactPaginate = __webpack_require__(266);

var _reactPaginate2 = _interopRequireDefault(_reactPaginate);

var _reactRedux = __webpack_require__(20);

var _jwtDecode = __webpack_require__(16);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

__webpack_require__(5);

var _actions = __webpack_require__(23);

var _NavBar = __webpack_require__(35);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _Footer = __webpack_require__(28);

var _Footer2 = _interopRequireDefault(_Footer);

var _GroupCard = __webpack_require__(135);

var _GroupCard2 = _interopRequireDefault(_GroupCard);

__webpack_require__(45);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


/**
 * React component that displays content of the Message Board page
 */
var MessageBoard = function (_React$Component) {
  _inherits(MessageBoard, _React$Component);

  function MessageBoard() {
    _classCallCheck(this, MessageBoard);

    return _possibleConstructorReturn(this, (MessageBoard.__proto__ || Object.getPrototypeOf(MessageBoard)).apply(this, arguments));
  }

  _createClass(MessageBoard, [{
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

  return MessageBoard;
}(_react2.default.Component);

/**
 * React component that contains the page body
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

    _this2.handlePageNumberClick = _this2.handlePageNumberClick.bind(_this2);
    _this2.state = {
      offset: 0,
      perPage: 6
    };
    return _this2;
  }
  /**
   * Component method called after a component renders
   * @returns {undefined} This method returns nothing
   */


  _createClass(Body, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.button-collapse').sideNav({
        closeOnClick: true
      });
      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var userId = decode.id;
      var offset = 0;
      var limit = this.state.perPage;
      this.props.store.getGroupsForUser(userId, offset, limit, token);
      this.props.store.getAllGroupsForUser(userId, token);
    }
    /**
     * @param {Object} event Event fired when the pagination is clicked
     * @returns {undefined} This method returns nothing
     */

  }, {
    key: 'handlePageNumberClick',
    value: function handlePageNumberClick(event) {
      var _this3 = this;

      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var userId = decode.id;

      var selected = event.selected;
      var offset = Math.ceil(selected * this.state.perPage);
      var limit = this.state.perPage;
      this.setState({ offset: offset }, function () {
        _this3.props.store.getGroupsForUser(userId, offset, limit, token);
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

      var userGroups = this.props.store.groups.userGroups;
      var dataLoading = this.props.store.dataLoading;
      var totalNoOfGroups = this.props.store.groups.meta.count;
      var limit = this.state.perPage;
      var pageCount = Math.ceil(totalNoOfGroups / limit);
      var userDetails = this.props.store.appInfo.userDetails;
      var allUserGroups = this.props.store.allUserGroups.userGroups;
      return _react2.default.createElement(
        'div',
        { id: 'body' },
        _react2.default.createElement(_NavBar2.default, { store: this.props.store, allUserGroups: allUserGroups, userDetails: userDetails }),
        _react2.default.createElement(
          'div',
          { id: 'main' },
          dataLoading ? _react2.default.createElement(
            'div',
            { className: 'preloader-wrapper loader large active' },
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
          ) : _react2.default.createElement(
            'div',
            null,
            !dataLoading && totalNoOfGroups === 0 ? _react2.default.createElement(
              'div',
              { className: 'row center' },
              _react2.default.createElement(
                'h4',
                { className: 'grey-text' },
                'You don\'t belong to any group'
              ),
              _react2.default.createElement(
                'a',
                { href: '/#/creategroup', className: 'btn' },
                'Create One'
              )
            ) : _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'h3',
                { className: 'board-title center black-text' },
                'Message Board'
              ),
              Object.keys(userGroups).map(function (groupId, index) {
                return _react2.default.createElement(_GroupCard2.default, { store: _this4.props.store,
                  key: index, id: groupId, loading: dataLoading,
                  groupDetails: userGroups[groupId].info });
              })
            )
          )
        ),
        _react2.default.createElement(_reactPaginate2.default, { previousLabel: '<',
          nextLabel: '>',
          breakLabel: _react2.default.createElement(
            'a',
            { href: '' },
            '...'
          ),
          breakClassName: 'break-me pink-text',
          pageCount: pageCount,
          marginPagesDisplayed: 2,
          pageRangeDisplayed: 5,
          onPageChange: this.handlePageNumberClick,
          containerClassName: 'pagination center',
          pageLinkClassName: 'waves-effect',
          previousLinkClassName: 'waves-effect',
          nextLinkClassName: 'waves-effect',
          subContainerClassName: 'pages pagination',
          activeClassName: 'active pink' }),
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
    groups: state.groups,
    allUserGroups: state.allUserGroups,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState,
      loadedMessages: state.appInfo.loadedMessages
    }
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getGroupsForUser: function getGroupsForUser(userId, offset, limit, token) {
      return dispatch((0, _actions.getGroupsForUser)(userId, offset, limit, token));
    },
    loadMessages: function loadMessages(groupId) {
      return dispatch((0, _actions.loadMessages)(groupId));
    },
    resetRedirect: function resetRedirect() {
      return dispatch((0, _actions.resetRedirect)());
    },
    getMessages: function getMessages(groupId, token) {
      return dispatch((0, _actions.getMessages)(groupId, token));
    },
    getGroupMembers: function getGroupMembers(groupId, token) {
      return dispatch((0, _actions.getGroupMembers)(groupId, token));
    },
    getAllGroupsForUser: function getAllGroupsForUser(userId, token) {
      return dispatch((0, _actions.getAllGroupsForUser)(userId, token));
    },
    verifyToken: function verifyToken(token) {
      return dispatch((0, _actions.verifyToken)(token));
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MessageBoard);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })

})
//# sourceMappingURL=0.1b828cffa6bfc0827d66.hot-update.js.map