webpackHotUpdate(0,{

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React component to display a modal for deleting a member
 */
var DeleteMemberModal = function (_React$Component) {
  _inherits(DeleteMemberModal, _React$Component);

  function DeleteMemberModal() {
    _classCallCheck(this, DeleteMemberModal);

    return _possibleConstructorReturn(this, (DeleteMemberModal.__proto__ || Object.getPrototypeOf(DeleteMemberModal)).apply(this, arguments));
  }

  _createClass(DeleteMemberModal, [{
    key: "render",

    /**
     * Render method of React component
     * @returns {Object} Returns the DOM object to be rendered
     */
    value: function render() {
      return _react2.default.createElement(
        "div",
        { id: "deleteMemberModal", className: "modal grey" },
        _react2.default.createElement(
          "div",
          { className: "modal-content" },
          _react2.default.createElement(
            "h5",
            { className: "orange-text" },
            "Delete Member?"
          ),
          _react2.default.createElement(
            "p",
            { className: "white-text" },
            "This group member will be removed from this group."
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "modal-footer" },
          _react2.default.createElement(
            "button",
            { onClick: this.props.deleteMember,
              className: "modal-action modal-close waves-effect waves-green btn-flat green-text" },
            "Delete"
          ),
          _react2.default.createElement(
            "button",
            { className: "modal-action modal-close waves-effect waves-green btn-flat green-text" },
            "Cancel"
          )
        )
      );
    }
  }]);

  return DeleteMemberModal;
}(_react2.default.Component);

exports.default = DeleteMemberModal;

/***/ })

})
//# sourceMappingURL=0.6fbdafc90ba653daff58.hot-update.js.map