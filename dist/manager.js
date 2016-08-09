'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybookAddons = require('@kadira/storybook-addons');

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _Specifications = require('./containers/Specifications');

var _Specifications2 = _interopRequireDefault(_Specifications);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// register function will call addons.register to register an addon loader
// This is executed when importing `@kadira/storybook-addon-hello/register`
function register() {
  // addons.register can be used to register a new addon loader function.
  // Addon loader will receive `api` as an argument which can be used to
  // interact with the storybook manager. We're not using it in this addon.
  _storybookAddons2.default.register(_.ADDON_ID, function (api) {
    // get `channel` from the addon API
    var channel = _storybookAddons2.default.getChannel();
    // addons.addPanel can be used to add a new panel to storybook manager
    // The `title` field will be used as the tab title and the `render` field
    // will be executed to render the tab content.
    _storybookAddons2.default.addPanel(_.PANEL_ID, {
      title: 'Specifications',
      render: function render() {
        return _react2.default.createElement(_Specifications2.default, { api: api, channel: channel });
      }
    });
  });
}