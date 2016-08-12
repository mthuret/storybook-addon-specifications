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

var currentStory = "";
var results = {};

function specs(specs) {
  var storyName = specs();

  // get `channel` from the addon API
  var channel = _storybookAddons2.default.getChannel();
  // send the message using the channel
  channel.emit(_.EVENT_ID, { results: results[storyName] });
}

var describe = exports.describe = function describe(storyName, func) {
  currentStory = storyName;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };

  func();
  return storyName;
};

var it = exports.it = function it(desc, func) {
  try {
    func();
    results[currentStory].goodResults.push(desc);
  } catch (e) {
    console.error(currentStory + ' - ' + desc + ' : ' + e);
    results[currentStory].wrongResults.push({ spec: desc, message: e.message });
  }
};