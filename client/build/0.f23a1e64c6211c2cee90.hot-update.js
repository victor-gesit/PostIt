webpackHotUpdate(0,{

/***/ 140:
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
 * A React ccomponent that displays all the messages for a group
 */
var Messages = function (_React$Component) {
  _inherits(Messages, _React$Component);

  function Messages() {
    _classCallCheck(this, Messages);

    return _possibleConstructorReturn(this, (Messages.__proto__ || Object.getPrototypeOf(Messages)).apply(this, arguments));
  }

  _createClass(Messages, [{
    key: 'componentDidUpdate',

    /**
     * component method called when component properties change
     * @return {undefined} this method returns nothing
     */
    value: function componentDidUpdate() {
      // Scroll page body to last message
      this.bodyRef.scrollIntoView({
        behavior: 'smooth'
      });
    }
    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var groupId = localStorage.getItem('groupId'); // My Hack
      var groupLoaded = this.props.store.groups.userGroups[groupId];
      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var userId = decode.id;
      var messages = void 0;
      // Check that group data is loaded
      if (groupLoaded && userId) {
        messages = this.props.store.groups.userGroups[groupId].messages;
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          { id: 'messages', className: 'messages row' },
          messages ? messages.length === 0 ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h3',
              { className: 'grey-text center' },
              'No Messages'
            )
          ) : _react2.default.createElement(
            'div',
            null,
            messages.map(function (messageDetails, index) {
              return _react2.default.createElement(Message, { userId: userId, key: index, messageDetails: messageDetails });
            })
          ) : _react2.default.createElement(
            'div',
            { className: 'preloader-wrapper loader big active' },
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
        ),
        _react2.default.createElement('div', { ref: function ref(bodyRef) {
            _this2.bodyRef = bodyRef;
          } })
      );
    }
  }]);

  return Messages;
}(_react2.default.Component);

/**
 * React component to display each message
 */


exports.default = Messages;

var Message = function (_React$Component2) {
  _inherits(Message, _React$Component2);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
  }

  _createClass(Message, [{
    key: 'render',

    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */
    value: function render() {
      var messageDetails = this.props.messageDetails;
      var userId = this.props.userId;
      var priority = messageDetails.priority;
      var isComment = messageDetails.isComment;
      var className = void 0;
      if (userId === messageDetails.senderId) {
        className = 'ownmessage message card col s11 offset-s1';
      } else {
        className = 'message card col s11';
      }
      switch (priority) {
        case 'normal':
          // Comments also have normal priority, but don't send notificatins
          return isComment ? _react2.default.createElement(
            'li',
            { className: className },
            _react2.default.createElement(
              'small',
              { className: 'sender-name' },
              messageDetails.sentBy,
              _react2.default.createElement(
                'a',
                { className: 'secondary-content grey-text' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'lens'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-body white-text' },
              messageDetails.body
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-info' },
              _react2.default.createElement(
                'small',
                null,
                messageDetails.createdAt
              )
            )
          ) : _react2.default.createElement(
            'li',
            { className: className },
            _react2.default.createElement(
              'small',
              { className: 'sender-name' },
              messageDetails.sentBy,
              _react2.default.createElement(
                'a',
                { className: 'secondary-content green-text' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'lens'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-body white-text' },
              messageDetails.body
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-info' },
              _react2.default.createElement(
                'small',
                null,
                messageDetails.createdAt
              )
            )
          );
        case 'urgent':
          return _react2.default.createElement(
            'li',
            { className: className },
            _react2.default.createElement(
              'small',
              { className: 'sender-name' },
              messageDetails.sentBy,
              _react2.default.createElement(
                'a',
                { className: 'secondary-content orange-text' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'lens'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-body white-text' },
              messageDetails.body
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-info' },
              _react2.default.createElement(
                'small',
                null,
                messageDetails.createdAt
              )
            )
          );
        case 'critical':
          return _react2.default.createElement(
            'li',
            { className: className },
            _react2.default.createElement(
              'small',
              { className: 'sender-name' },
              messageDetails.sentBy,
              _react2.default.createElement(
                'a',
                { className: 'secondary-content red-text' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'lens'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-body white-text' },
              messageDetails.body
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-info' },
              _react2.default.createElement(
                'small',
                null,
                messageDetails.createdAt
              )
            )
          );
        default:
          return _react2.default.createElement(
            'li',
            { className: className },
            _react2.default.createElement(
              'small',
              { className: 'sender-name' },
              messageDetails.sentBy,
              _react2.default.createElement(
                'a',
                { className: 'secondary-content grey-text' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'lens'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-body white-text' },
              messageDetails.body
            ),
            _react2.default.createElement(
              'div',
              { className: 'message-info' },
              _react2.default.createElement(
                'small',
                null,
                messageDetails.createdAt
              )
            )
          );
      }
    }
  }]);

  return Message;
}(_react2.default.Component);

/***/ })

})
//# sourceMappingURL=0.f23a1e64c6211c2cee90.hot-update.js.map