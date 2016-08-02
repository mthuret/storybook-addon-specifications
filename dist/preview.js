'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sayHello = sayHello;

var _storybookAddons = require('@kadira/storybook-addons');

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// hello function will return a function which will set the text inside
// the "Hello World" panel. The new text is sent using the channel.
function sayHello(text) {
  return function () {
    // get `channel` from the addon API
    var channel = _storybookAddons2.default.getChannel();
    // send the message using the channel
    channel.emit(_.EVENT_ID, { text: text });
  };
}