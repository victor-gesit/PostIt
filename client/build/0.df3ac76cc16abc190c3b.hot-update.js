webpackHotUpdate(0,{

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

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
 * React component to display the message input div
 */
var MessageInputBox = function (_React$Component) {
  _inherits(MessageInputBox, _React$Component);

  /**
   * @param {Object} props Component properties passed from parent component
   */
  function MessageInputBox(props) {
    _classCallCheck(this, MessageInputBox);

    var _this = _possibleConstructorReturn(this, (MessageInputBox.__proto__ || Object.getPrototypeOf(MessageInputBox)).call(this, props));

    _this.priority = 'normal'; // Default priority
    _this.isComment = 'true';
    _this.setPriority = _this.setPriority.bind(_this);
    _this.sendMessage = _this.sendMessage.bind(_this);
    _this.state = {
      priority: 'normal'
    };
    return _this;
  }
  /**
   * Method called after a component is rendered, to attach event listeners to send message button
   * @return {undefined} This method returns nothing
   */


  _createClass(MessageInputBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Set focus to 'send' button
      $('.message-box').keypress(function (event) {
        if (event.which && event.which === 13 || event.keyCode && event.keyCode === 13) {
          $('#member-list-button').click();
          return false;
        } else {
          return true;
        }
      });
    }
    /**
     * This method sets the priority of the message to be sent
     * @param {Object} event fired when setting message priority
     * @return {undefined} This method returns nothing
     */

  }, {
    key: 'setPriority',
    value: function setPriority(event) {
      var priority = event.target.id;
      this.setState({ priority: priority });
    }
    /**
     * This method sends a message to the group
     * @return {undefined} This method returns nothing
     */

  }, {
    key: 'sendMessage',
    value: function sendMessage() {
      var token = localStorage.getItem('token');
      var decode = (0, _jwtDecode2.default)(token);
      var senderId = decode.id;
      var groupId = localStorage.getItem('groupId');
      var priority = this.state.priority;
      var body = void 0;
      if (this.state.priority === 'comment') {
        priority = 'normal'; // A comment has normal priority
        body = this.commentBody.value;
        this.isComment = 'true';
        // Clear input bo
        this.commentBody.value = '';
      } else {
        body = this.postBody.value;
        this.isComment = 'false';
        // Clear input box
        this.postBody.value = '';
      }
      // Check for empty message body before sending
      if (body && body.trim()) {
        this.props.store.postMessage(senderId, groupId, body, priority, this.isComment, token);
      }
    }
    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { id: 'messageInputBox' },
        _react2.default.createElement(
          'div',
          { id: 'messageInput' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col center s12 m8 offset-m2 l8 offset-l2' },
              _react2.default.createElement('input', { name: 'priority', onClick: this.setPriority,
                ref: function ref(normal) {
                  _this2.normal = normal;
                }, type: 'radio',
                id: 'normal', defaultChecked: true }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'normal' },
                'Normal'
              ),
              _react2.default.createElement('input', { name: 'priority', onClick: this.setPriority,
                ref: function ref(urgent) {
                  _this2.urgent = urgent;
                }, type: 'radio', id: 'urgent' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'urgent' },
                'Urgent'
              ),
              _react2.default.createElement('input', { name: 'priority', onClick: this.setPriority,
                ref: function ref(critical) {
                  _this2.critical = critical;
                }, type: 'radio', id: 'critical' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'critical' },
                'Critical'
              ),
              _react2.default.createElement('input', { name: 'priority', onClick: this.setPriority,
                ref: function ref(comment) {
                  _this2.comment = comment;
                }, type: 'radio', id: 'comment' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'comment' },
                'Comment'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s12 m8 offset-m2 l8 offset-l2' },
              this.state.priority === 'comment' ? _react2.default.createElement(
                'div',
                { className: 'message-box' },
                _react2.default.createElement(
                  'div',
                  { className: 'text-input-field' },
                  _react2.default.createElement('input', { className: 'black-text materialize-textarea',
                    ref: function ref(commentBody) {
                      _this2.commentBody = commentBody;
                    },
                    type: 'text', name: 'mymessage', defaultValue: '' })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'send-comment-button' },
                  _react2.default.createElement(
                    'button',
                    { autoFocus: true, id: 'member-list-button', onClick: this.sendMessage,
                      className: 'btn' },
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons' },
                      'send'
                    )
                  )
                )
              ) : _react2.default.createElement(
                'div',
                { className: 'message-box' },
                _react2.default.createElement(
                  'div',
                  { className: 'text-input-field' },
                  _react2.default.createElement('textarea', { className: 'black-text materialize-textarea',
                    ref: function ref(postBody) {
                      _this2.postBody = postBody;
                    }, type: 'text',
                    name: 'mymessage', defaultValue: '' })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'send-button' },
                  _react2.default.createElement(
                    'button',
                    { autoFocus: true, id: 'member-list-button', onClick: this.sendMessage,
                      className: 'btn' },
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons' },
                      'send'
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return MessageInputBox;
}(_react2.default.Component);

exports.default = MessageInputBox;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })

})
//# sourceMappingURL=0.df3ac76cc16abc190c3b.hot-update.js.map