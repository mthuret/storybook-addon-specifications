'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.it = exports.describe = undefined;
exports.specs = specs;

var _storybookAddons = require('@kadira/storybook-addons');

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var results = {
  goodResults: [],
  wrongResults: []
};

function specs(specs) {
  specs();
  // get `channel` from the addon API
  var channel = _storybookAddons2.default.getChannel();
  // send the message using the channel
  channel.emit(_.EVENT_ID, { results: results });
}

var describe = exports.describe = function describe(desc, func) {
  results.goodResults = [];
  results.wrongResults = [];
  return func;
};

var it = exports.it = function it(desc, func) {
  try {
    func();
    results.goodResults.push(desc);
  } catch (e) {
    results.wrongResults.push({ spec: desc, message: e.message });
  }
};