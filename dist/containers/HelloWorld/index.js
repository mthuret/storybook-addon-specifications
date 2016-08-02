'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HelloWorld = require('../../components/HelloWorld/');

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HelloWorld = function (_Component) {
  _inherits(HelloWorld, _Component);

  function HelloWorld(props) {
    var _Object$getPrototypeO;

    _classCallCheck(this, HelloWorld);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HelloWorld)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

    _this.state = { text: '' };
    _this._listener = function (d) {
      return _this.setState({ text: d.text });
    };
    return _this;
  }

  _createClass(HelloWorld, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.channel.on(_.EVENT_ID, this._listener);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.channel.removeListener(_.EVENT_ID, this._listener);
    }
  }, {
    key: 'render',
    value: function render() {
      var text = this.state.text;
      return _react2.default.createElement(_HelloWorld2.default, { text: text });
    }
  }]);

  return HelloWorld;
}(_react.Component);

exports.default = HelloWorld;