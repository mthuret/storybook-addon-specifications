"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _aphrodite = require("aphrodite");

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Specifications = function (_Component) {
  _inherits(Specifications, _Component);

  function Specifications() {
    _classCallCheck(this, Specifications);

    return _possibleConstructorReturn(this, (Specifications.__proto__ || Object.getPrototypeOf(Specifications)).apply(this, arguments));
  }

  _createClass(Specifications, [{
    key: "render",
    value: function render() {
      var results = this.props.results;

      return _react2.default.createElement(
        "ul",
        { className: (0, _aphrodite.css)(_style2.default.wrapper) },
        results.wrongResults.map(function (r, idx) {
          return _react2.default.createElement(
            "li",
            { className: (0, _aphrodite.css)(_style2.default.error, _style2.default.li), key: idx },
            _react2.default.createElement(
              "p",
              null,
              r.spec
            ),
            _react2.default.createElement(
              "p",
              { className: (0, _aphrodite.css)(_style2.default.message) },
              r.message
            )
          );
        }),
        results.goodResults.map(function (r, idx) {
          return _react2.default.createElement(
            "li",
            { className: (0, _aphrodite.css)(_style2.default.pass, _style2.default.li), key: idx },
            _react2.default.createElement(
              "p",
              null,
              r
            )
          );
        })
      );
    }
  }]);

  return Specifications;
}(_react.Component);

exports.default = Specifications;